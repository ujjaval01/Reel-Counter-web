import type { IncomingMessage, ServerResponse } from 'http';
import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';

export interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  body: any;
  method?: string;
  headers: Record<string, string | undefined>;
}

export interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => this;
}

// In-memory rate limiting map for admin protection
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // Max 100 requests per 15 min window for admin dashboard

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

/**
 * Returns a singleton instance of Firebase Admin.
 */
export function getFirebaseAdmin(): App {
  const apps = getApps();
  if (apps.length > 0 && apps[0]) {
    return apps[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  const missing: string[] = [];
  if (!projectId) missing.push('FIREBASE_PROJECT_ID');
  if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
  if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');
  if (!process.env.ADMIN_UID) missing.push('ADMIN_UID');

  if (missing.length > 0) {
    throw new Error(
      `Missing server environment variables: ${missing.join(', ')}. Please configure them in your Vercel Project Settings (Settings -> Environment Variables).`
    );
  }

  if (privateKey) {
    privateKey = privateKey.trim();
    // Strip wrapping quotes if user pasted with them in Vercel UI
    if (
      (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))
    ) {
      privateKey = privateKey.slice(1, -1);
    }
    // Handle both raw newlines and escaped \n sequences
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

/**
 * Verifies that the incoming request is from the authenticated admin.
 * Returns { adminApp, decodedToken, db } if authorized, or null if response was handled.
 */
export async function authenticateAdmin(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ adminApp: App; decodedToken: DecodedIdToken; db: Firestore } | null> {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return null;
  }

  const clientIp = (req.headers['x-forwarded-for'] as string) || req.headers['x-real-ip'] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please slow down and try again shortly.',
    });
    return null;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or malformed Authorization header.',
    });
    return null;
  }

  const token = authHeader.split('Bearer ')[1]?.trim();
  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Empty bearer token.',
    });
    return null;
  }

  try {
    const adminApp = getFirebaseAdmin();
    const auth = getAuth(adminApp);
    const decodedToken = await auth.verifyIdToken(token);

    const configuredAdminUid = process.env.ADMIN_UID;
    if (!configuredAdminUid) {
      res.status(500).json({
        success: false,
        error: 'Server Configuration Error: ADMIN_UID is not set in environment variables.',
      });
      return null;
    }

    if (decodedToken.uid !== configuredAdminUid) {
      res.status(403).json({
        success: false,
        error: `Forbidden: Logged-in UID (${decodedToken.uid}) does not match configured ADMIN_UID.`,
      });
      return null;
    }

    const db = getFirestore(adminApp);
    return { adminApp, decodedToken, db };
  } catch (err: any) {
    console.error('Admin Auth Error:', err);
    res.status(401).json({
      success: false,
      error: 'Invalid or expired session token. Please sign in again.',
      details: err?.message,
    });
    return null;
  }
}

/**
 * Returns the active user profiles collection name ('users' or fallback 'publicProfile').
 */
export async function getUsersCollectionName(db: Firestore): Promise<string> {
  try {
    const snap = await db.collection('users').limit(1).get();
    if (!snap.empty) {
      return 'users';
    }
  } catch {
    // ignore error
  }
  return 'publicProfile';
}

/**
 * Returns the current date in Asia/Kolkata (IST, UTC+5:30) as YYYY-MM-DD.
 */
export function getIstDateString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Parses query parameter to string.
 */
export function getQueryParam(req: VercelRequest, key: string, fallback = ''): string {
  const val = req.query[key];
  if (Array.isArray(val)) return val[0] || fallback;
  return val || fallback;
}
