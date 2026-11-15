import type { IncomingMessage, ServerResponse } from 'http';
import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

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

function getQueryParam(req: VercelRequest, key: string, fallback = ''): string {
  const val = req.query[key];
  if (Array.isArray(val)) return val[0] || fallback;
  return val || fallback;
}

function getIstDateString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function getFirebaseAdmin(): App {
  const apps = getApps();
  if (apps.length > 0 && apps[0]) {
    return apps[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing server environment variables for Firebase Admin');
  }

  privateKey = privateKey.trim();
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, '\n');

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

async function getUsersCol(db: Firestore): Promise<string> {
  try {
    const snap = await db.collection('users').limit(1).get();
    if (!snap.empty) return 'users';
  } catch {}
  return 'publicProfile';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Edge Caching: 60s shared cache, 180s stale-while-revalidate
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=180');

  try {
    const rawTimeframe = getQueryParam(req, 'timeframe', 'global').toLowerCase();
    const timeframe = rawTimeframe === 'today' ? 'today' : 'global';
    const limit = Math.min(Math.max(parseInt(getQueryParam(req, 'limit', '6'), 10) || 6, 1), 20);

    const adminApp = getFirebaseAdmin();
    const db = getFirestore(adminApp);
    const usersCol = await getUsersCol(db);
    const istToday = getIstDateString();

    let snap;
    let sortField = 'totalReels';

    if (timeframe === 'today') {
      sortField = 'todayReels';
      // Query by todayReels
      try {
        snap = await db
          .collection(usersCol)
          .where('todayDate', '==', istToday)
          .orderBy('todayReels', 'desc')
          .limit(limit + 5)
          .get();
        
        // If todayDate match has fewer than 3 docs, fallback to general todayReels order
        if (snap.empty || snap.size < 3) {
          snap = await db
            .collection(usersCol)
            .orderBy('todayReels', 'desc')
            .limit(limit + 5)
            .get();
        }
      } catch {
        snap = await db
          .collection(usersCol)
          .orderBy('todayReels', 'desc')
          .limit(limit + 5)
          .get();
      }
    } else {
      // Global (All-Time)
      sortField = 'totalReels';
      snap = await db
        .collection(usersCol)
        .orderBy('totalReels', 'desc')
        .limit(limit + 5)
        .get();
    }

    const leaderboard: any[] = [];
    let rank = 1;

    snap.forEach((doc) => {
      if (leaderboard.length >= limit) return;
      const d = doc.data();

      // Respect admin moderation: skip hidden, banned, or purged accounts
      if (d.hiddenFromLeaderboard || d.isBanned || d.isDeleted) return;

      const ig = Number(d.instagramTotal) || 0;
      const yt = Number(d.youtubeTotal) || 0;
      const fb = Number(d.facebookTotal) || 0;
      const sc = Number(d.snapchatTotal) || 0;

      let primaryPlatform = 'Instagram';
      let maxCount = ig;
      if (yt > maxCount) { primaryPlatform = 'YouTube'; maxCount = yt; }
      if (fb > maxCount) { primaryPlatform = 'Facebook'; maxCount = fb; }
      if (sc > maxCount) { primaryPlatform = 'Snapchat'; }

      const reelsCount = Number(d[sortField]) || 0;

      leaderboard.push({
        rank: rank++,
        id: doc.id,
        displayName: d.displayName || d.username || `Scroller #${rank}`,
        username: d.username || d.searchKey || '',
        avatarUrl: d.avatarUrl || d.googlePhotoUrl || null,
        avatarEmoji: d.avatarEmoji || null,
        reels: reelsCount,
        totalReels: Number(d.totalReels) || 0,
        todayReels: Number(d.todayReels) || 0,
        primaryPlatform,
        isAnonymous: Boolean(d.isAnonymous ?? !d.googlePhotoUrl),
      });
    });

    return res.status(200).json({
      success: true,
      timeframe,
      istDate: istToday,
      totalUsers: leaderboard.length,
      leaderboard,
    });
  } catch (err: any) {
    console.error('Public Leaderboard API error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to fetch public leaderboard',
      leaderboard: [],
    });
  }
}
