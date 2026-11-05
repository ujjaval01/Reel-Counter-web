import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  body: any;
  method?: string;
  headers: Record<string, string | undefined>;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => this;
}

// In-memory rate limiting map for basic abuse prevention (per serverless instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // Max 10 requests per 15 min window per IP

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

function sanitizeText(str: string, maxLength: number): string {
  if (!str) return '';
  return String(str)
    .replace(/[<>]/g, '') // Strip potential HTML tags
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 150;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const clientIp = (req.headers['x-forwarded-for'] as string) || req.headers['x-real-ip'] || 'unknown';

  // Apply rate limiting
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait 15 minutes before submitting another request.',
    });
  }

  // GET: Check Deletion Request Status
  if (req.method === 'GET') {
    const rawId = req.query.id;
    const requestId = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!requestId || !/^RC-DEL-[A-Z0-9-]{4,20}$/i.test(requestId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Request ID format. Expected format: RC-DEL-XXXXXXXX',
      });
    }

    const normalizedId = requestId.toUpperCase().trim();

    // Check if Firestore environment is configured
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (projectId && process.env.FIREBASE_API_KEY) {
      try {
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/account_deletion_requests/${normalizedId}`;
        const response = await fetch(firestoreUrl);
        if (response.ok) {
          const doc = await response.json();
          const fields = doc.fields || {};
          return res.status(200).json({
            success: true,
            requestId: normalizedId,
            status: fields.status?.stringValue || 'Pending',
            createdAt: fields.createdAt?.stringValue || new Date().toISOString(),
            verificationStatus: fields.verified?.booleanValue ? 'Verified' : 'Pending Ownership Verification',
            deletionScope: [
              'Firebase Authentication Account',
              'Firestore User Profile & Metrics',
              'Daily Reel Tracking History',
              'Multiplayer Battle Records (Anonymized)',
              'Community Leaderboard Standings',
            ],
          });
        }
      } catch (err) {
        console.error('Error fetching Firestore deletion request:', err);
      }
    }

    // Default status response if backend is awaiting manual verification
    return res.status(200).json({
      success: true,
      requestId: normalizedId,
      status: 'Pending',
      step: 1,
      stepLabel: 'Pending Identity Verification',
      message: 'Request is recorded. Awaiting confirmation from registered email address.',
      createdAt: new Date().toISOString(),
      estimatedCompletionDays: 30,
      deletionScope: [
        'Firebase Authentication Account',
        'Firestore User Profile & Metrics',
        'Daily Reel Tracking History',
        'Multiplayer Battle Records (Anonymized)',
        'Community Leaderboard Standings',
        'Cloud-Synced User Goals & Preferences',
      ],
    });
  }

  // POST: Submit New Deletion Request
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid request body.' });
    }

    const { email, googleEmail, reason, comments, confirmUnderstood, honeypot } = body;

    // Honeypot anti-spam check (hidden field should be empty)
    if (honeypot && String(honeypot).trim().length > 0) {
      // Silently accept bot submission to prevent bot retries
      return res.status(200).json({
        success: true,
        requestId: 'RC-DEL-' + crypto.randomBytes(4).toString('hex').toUpperCase(),
        message: 'Request received.',
      });
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid registered email address.',
      });
    }

    // Validate optional Google email if provided
    if (googleEmail && !isValidEmail(googleEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid Google Sign-In email address or leave it blank.',
      });
    }

    // Validate confirmation checkbox
    if (confirmUnderstood !== true) {
      return res.status(400).json({
        success: false,
        error: 'You must confirm that you understand account deletion is permanent.',
      });
    }

    // Generate unique Request ID
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const requestId = `RC-DEL-${randomHex.slice(0, 4)}-${randomHex.slice(4, 8)}`;
    const verificationToken = crypto.randomBytes(16).toString('hex');
    const nowIso = new Date().toISOString();

    const sanitizedReason = sanitizeText(reason || 'Not specified', 100);
    const sanitizedComments = sanitizeText(comments || '', 1000);

    const deletionRecord = {
      requestId,
      email: email.trim().toLowerCase(),
      googleEmail: googleEmail ? googleEmail.trim().toLowerCase() : null,
      reason: sanitizedReason,
      comments: sanitizedComments,
      status: 'Pending', // Pending | Processing | Completed | Rejected
      verificationRequired: true,
      verified: false,
      verificationToken,
      createdAt: nowIso,
      clientIpHash: crypto.createHash('sha256').update(clientIp).digest('hex').slice(0, 16),
      deletionScope: [
        'Firebase Authentication Account',
        'Firestore User Profile & Metrics',
        'Daily Reel Tracking History',
        'Multiplayer Battle Records (Anonymized)',
        'Community Leaderboard Standings',
        'Cloud-Synced User Goals & Preferences',
      ],
    };

    // Attempt to store in Firebase Firestore if configured via environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_API_KEY;

    let storedInFirestore = false;
    if (projectId && apiKey) {
      try {
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/account_deletion_requests?documentId=${requestId}&key=${apiKey}`;
        const firestoreDoc = {
          fields: {
            requestId: { stringValue: deletionRecord.requestId },
            email: { stringValue: deletionRecord.email },
            googleEmail: deletionRecord.googleEmail ? { stringValue: deletionRecord.googleEmail } : { nullValue: null },
            reason: { stringValue: deletionRecord.reason },
            comments: { stringValue: deletionRecord.comments },
            status: { stringValue: deletionRecord.status },
            verified: { booleanValue: deletionRecord.verified },
            verificationToken: { stringValue: deletionRecord.verificationToken },
            createdAt: { stringValue: deletionRecord.createdAt },
          },
        };

        const fbRes = await fetch(firestoreUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(firestoreDoc),
        });

        if (fbRes.ok) {
          storedInFirestore = true;
        } else {
          console.warn('Firestore response not ok:', await fbRes.text());
        }
      } catch (err) {
        console.error('Failed to write deletion request to Firestore:', err);
      }
    }

    console.log(`[DELETION_REQUEST_RECORDED] RequestID: ${requestId}, Email: ${deletionRecord.email}, StoredInFirestore: ${storedInFirestore}`);

    return res.status(201).json({
      success: true,
      requestId,
      status: 'Pending',
      storedInDatabase: storedInFirestore,
      createdAt: nowIso,
      message: 'Your deletion request has been recorded. For account security, identity verification is required.',
      verificationEmail: 'sainiujvl@gmail.com',
      verificationInstructions: 'To protect your account from unauthorized deletion, please send a brief confirmation email from your registered address to sainiujvl@gmail.com including your Request ID.',
      expectedProcessingDays: 30,
    });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed.' });
}

