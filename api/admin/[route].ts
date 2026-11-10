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

// In-memory rate limiting map (per serverless container)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 120;

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

function formatTime(val: any): string | null {
  if (!val) return null;
  if (typeof val === 'number') return new Date(val).toISOString();
  if (val.toDate) return val.toDate().toISOString();
  return String(val);
}

function getFirebaseAdmin(): App {
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
      `Missing server environment variables: ${missing.join(', ')}. Please add them under Vercel Settings -> Environment Variables.`
    );
  }

  if (privateKey) {
    privateKey = privateKey.trim();
    if (
      (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))
    ) {
      privateKey = privateKey.slice(1, -1);
    }
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

async function authenticateAdmin(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ adminApp: App; decodedToken: DecodedIdToken; db: Firestore } | null> {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.headers['x-real-ip'] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      success: false,
      error: 'Rate limit reached. Please wait a moment before making more requests.',
    });
    return null;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing Authorization header.',
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

  const adminApp = getFirebaseAdmin();
  const auth = getAuth(adminApp);
  const decodedToken = await auth.verifyIdToken(token);

  const configuredAdminUid = process.env.ADMIN_UID;
  if (!configuredAdminUid) {
    res.status(500).json({
      success: false,
      error: 'ADMIN_UID environment variable is not configured on the server.',
    });
    return null;
  }

  if (decodedToken.uid !== configuredAdminUid) {
    res.status(403).json({
      success: false,
      error: `Forbidden: Logged-in UID (${decodedToken.uid}) does not match ADMIN_UID.`,
    });
    return null;
  }

  const db = getFirestore(adminApp);
  return { adminApp, decodedToken, db };
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Determine requested action/route
  const rawRoute = getQueryParam(req, 'route', '') || getQueryParam(req, 'action', '');
  // Also parse from url path if called directly
  const urlParts = (req.url || '').split('?')[0].split('/');
  const lastPart = urlParts[urlParts.length - 1];
  const route = rawRoute || (lastPart && lastPart !== 'admin' && lastPart !== '[route]' ? lastPart : 'overview');

  // Diagnostic Test endpoint (does not require Bearer token)
  if (route === 'test' || route === 'diagnostics') {
    const pk = process.env.FIREBASE_PRIVATE_KEY || '';
    return res.status(200).json({
      status: 'ok',
      nodeVersion: process.version,
      hasAdminUid: Boolean(process.env.ADMIN_UID),
      hasProjectId: Boolean(process.env.FIREBASE_PROJECT_ID),
      hasClientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
      hasPrivateKey: Boolean(pk),
      privateKeyLength: pk.length,
      privateKeyHeaderValid: pk.replace(/\\n/g, '\n').includes('-----BEGIN PRIVATE KEY-----'),
    });
  }

  try {
    const auth = await authenticateAdmin(req, res);
    if (!auth) return;

    const { db, decodedToken } = auth;
    const istToday = getIstDateString();
    const usersCol = await getUsersCol(db);

    // ==========================================
    // 1. OVERVIEW
    // ==========================================
    if (route === 'overview') {
      const usersCount = (await db.collection(usersCol).count().get()).data().count;

      let activeUsersToday = 0;
      try {
        const activeSnap = await db.collection(usersCol).where('todayDate', '==', istToday).count().get();
        activeUsersToday = activeSnap.data().count;
      } catch {}

      let totalBattles = 0;
      let activeBattles = 0;
      try {
        totalBattles = (await db.collection('battles').count().get()).data().count;
        activeBattles = (await db.collection('battles').where('status', '==', 'ACTIVE').count().get()).data().count;
      } catch {}

      let totalDeletionRequests = 0;
      let pendingDeletionRequests = 0;
      try {
        totalDeletionRequests = (await db.collection('account_deletion_requests').count().get()).data().count;
        pendingDeletionRequests = (await db.collection('account_deletion_requests').where('status', '==', 'Pending').count().get()).data().count;
      } catch {}

      const topProfilesSnap = await db.collection(usersCol).orderBy('totalReels', 'desc').limit(100).get();
      let sampleTotalReels = 0;
      let sampleTodayReels = 0;
      let instagramTotal = 0;
      let youtubeTotal = 0;
      let facebookTotal = 0;
      let snapchatTotal = 0;

      topProfilesSnap.forEach((doc) => {
        const d = doc.data();
        sampleTotalReels += Number(d.totalReels) || 0;
        if (d.todayDate === istToday) {
          sampleTodayReels += Number(d.todayReels) || 0;
        }
        instagramTotal += Number(d.instagramTotal) || 0;
        youtubeTotal += Number(d.youtubeTotal) || 0;
        facebookTotal += Number(d.facebookTotal) || 0;
        snapchatTotal += Number(d.snapchatTotal) || 0;
      });

      return res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        istDate: istToday,
        overview: {
          totalUsers: usersCount,
          activeUsersToday,
          totalBattles,
          activeBattles,
          completedBattles: Math.max(0, totalBattles - activeBattles),
          totalDeletionRequests,
          pendingDeletionRequests,
          sampleTotalReels,
          sampleTodayReels,
          platforms: {
            instagram: instagramTotal,
            youtube: youtubeTotal,
            facebook: facebookTotal,
            snapchat: snapchatTotal,
          },
        },
      });
    }

    // ==========================================
    // 2. USERS DIRECTORY
    // ==========================================
    if (route === 'users') {
      const rawLimit = parseInt(getQueryParam(req, 'limit', '25'), 10);
      const limit = Math.min(Math.max(isNaN(rawLimit) ? 25 : rawLimit, 1), 50);
      const page = Math.max(parseInt(getQueryParam(req, 'page', '1'), 10) || 1, 1);
      const search = getQueryParam(req, 'search', '').trim().toLowerCase();
      const sortBy = getQueryParam(req, 'sortBy', 'totalReels');
      const order = getQueryParam(req, 'order', 'desc') === 'asc' ? 'asc' : 'desc';

      const totalCount = (await db.collection(usersCol).count().get()).data().count;

      if (search) {
        const snap = await db.collection(usersCol).limit(150).get();
        const allMatched: any[] = [];

        snap.forEach((doc) => {
          const d = doc.data();
          const username = String(d.username || d.searchKey || '').toLowerCase();
          const displayName = String(d.displayName || '').toLowerCase();
          const email = String(d.email || '').toLowerCase();

          if (username.includes(search) || displayName.includes(search) || email.includes(search)) {
            allMatched.push({
              id: doc.id,
              uid: d.uid || doc.id,
              username: d.username || d.searchKey || doc.id.slice(0, 8),
              displayName: d.displayName || d.username || 'User',
              email: d.email || null,
              avatarId: d.avatarId || null,
              avatarType: d.avatarType || null,
              avatarEmoji: d.avatarEmoji || null,
              avatarUrl: d.avatarUrl || d.googlePhotoUrl || null,
              totalReels: Number(d.totalReels) || 0,
              todayReels: Number(d.todayReels) || 0,
              weeklyReels: Number(d.weeklyReels) || 0,
              todayDate: d.todayDate || null,
              instagramTotal: Number(d.instagramTotal) || 0,
              youtubeTotal: Number(d.youtubeTotal) || 0,
              facebookTotal: Number(d.facebookTotal) || 0,
              snapchatTotal: Number(d.snapchatTotal) || 0,
              isAnonymous: d.isAnonymous ?? !d.googlePhotoUrl,
              createdAt: formatTime(d.createdAt || d.updatedAt),
              updatedAt: formatTime(d.updatedAt),
            });
          }
        });

        const startIndex = (page - 1) * limit;
        return res.status(200).json({
          success: true,
          users: allMatched.slice(startIndex, startIndex + limit),
          total: allMatched.length,
          page,
          limit,
          hasMore: startIndex + limit < allMatched.length,
        });
      }

      const offset = (page - 1) * limit;
      const snap = await db.collection(usersCol).orderBy(sortBy, order).offset(offset).limit(limit).get();
      const users: any[] = [];

      snap.forEach((doc) => {
        const d = doc.data();
        users.push({
          id: doc.id,
          uid: d.uid || doc.id,
          username: d.username || d.searchKey || doc.id.slice(0, 8),
          displayName: d.displayName || d.username || 'User',
          email: d.email || null,
          avatarId: d.avatarId || null,
          avatarType: d.avatarType || null,
          avatarEmoji: d.avatarEmoji || null,
          avatarUrl: d.avatarUrl || d.googlePhotoUrl || null,
          totalReels: Number(d.totalReels) || 0,
          todayReels: Number(d.todayReels) || 0,
          weeklyReels: Number(d.weeklyReels) || 0,
          todayDate: d.todayDate || null,
          instagramTotal: Number(d.instagramTotal) || 0,
          youtubeTotal: Number(d.youtubeTotal) || 0,
          facebookTotal: Number(d.facebookTotal) || 0,
          snapchatTotal: Number(d.snapchatTotal) || 0,
          isAnonymous: d.isAnonymous ?? !d.googlePhotoUrl,
          createdAt: formatTime(d.createdAt || d.updatedAt),
          updatedAt: formatTime(d.updatedAt),
        });
      });

      return res.status(200).json({
        success: true,
        users,
        total: totalCount,
        page,
        limit,
        hasMore: offset + users.length < totalCount,
      });
    }

    // ==========================================
    // 3. USER DETAILS
    // ==========================================
    if (route === 'user-details') {
      const uid = getQueryParam(req, 'uid', '').trim();
      if (!uid) return res.status(400).json({ success: false, error: 'Missing uid parameter' });

      let profileDoc = await db.collection(usersCol).doc(uid).get();
      if (!profileDoc.exists) {
        profileDoc = await db.collection('publicProfile').doc(uid).get();
      }
      if (!profileDoc.exists) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      const d = profileDoc.data() || {};
      const dailyStats: any[] = [];
      try {
        const dailySnap = await profileDoc.ref.collection('dailyStats').orderBy('date', 'desc').limit(30).get();
        dailySnap.forEach((doc) => {
          const s = doc.data();
          dailyStats.push({
            id: doc.id,
            date: s.date || doc.id,
            reelsCount: Number(s.reelsCount || s.totalReels || 0),
            instagram: Number(s.instagram || 0),
            youtube: Number(s.youtube || 0),
            facebook: Number(s.facebook || 0),
            snapchat: Number(s.snapchat || 0),
            updatedAt: formatTime(s.updatedAt),
          });
        });
      } catch {}

      const recentBattles: any[] = [];
      try {
        const battlesSnap = await db.collection('battles').where('participantIds', 'array-contains', uid).limit(10).get();
        battlesSnap.forEach((doc) => {
          const b = doc.data();
          const pList = Object.values(b.participants || {}) as any[];
          recentBattles.push({
            id: doc.id,
            challengerName: pList[0]?.displayName || 'Player 1',
            opponentName: pList[1]?.displayName || 'Player 2',
            targetReels: b.targetLimitReels || b.targetReels || 0,
            challengerReels: pList[0]?.reelsScrolled || 0,
            opponentReels: pList[1]?.reelsScrolled || 0,
            status: b.status || 'COMPLETED',
            createdAt: formatTime(b.createdAt),
          });
        });
      } catch {}

      return res.status(200).json({
        success: true,
        user: {
          id: profileDoc.id,
          uid: d.uid || profileDoc.id,
          username: d.username || d.searchKey || profileDoc.id.slice(0, 8),
          displayName: d.displayName || d.username || 'User',
          email: d.email || null,
          avatarUrl: d.avatarUrl || d.googlePhotoUrl || null,
          totalReels: Number(d.totalReels) || 0,
          todayReels: Number(d.todayReels) || 0,
          weeklyReels: Number(d.weeklyReels) || 0,
          todayDate: d.todayDate || null,
          instagramTotal: Number(d.instagramTotal) || 0,
          youtubeTotal: Number(d.youtubeTotal) || 0,
          facebookTotal: Number(d.facebookTotal) || 0,
          snapchatTotal: Number(d.snapchatTotal) || 0,
          isAnonymous: d.isAnonymous ?? !d.googlePhotoUrl,
          createdAt: formatTime(d.createdAt || d.updatedAt),
          updatedAt: formatTime(d.updatedAt),
          dailyStats,
          recentBattles,
        },
      });
    }

    // ==========================================
    // 4. LEADERBOARD
    // ==========================================
    if (route === 'leaderboard') {
      const timeframe = getQueryParam(req, 'timeframe', 'all');
      const limit = Math.min(Math.max(parseInt(getQueryParam(req, 'limit', '50'), 10) || 50, 5), 100);

      let sortField = 'totalReels';
      if (timeframe === 'weekly') sortField = 'weeklyReels';
      else if (timeframe === 'today') sortField = 'todayReels';

      const snap = await db.collection(usersCol).orderBy(sortField, 'desc').limit(limit).get();
      const leaderboard: any[] = [];
      let rank = 1;

      snap.forEach((doc) => {
        const d = doc.data();
        const ig = Number(d.instagramTotal) || 0;
        const yt = Number(d.youtubeTotal) || 0;
        const fb = Number(d.facebookTotal) || 0;
        const sc = Number(d.snapchatTotal) || 0;

        let primaryPlatform = 'Instagram';
        let maxCount = ig;
        if (yt > maxCount) { primaryPlatform = 'YouTube'; maxCount = yt; }
        if (fb > maxCount) { primaryPlatform = 'Facebook'; maxCount = fb; }
        if (sc > maxCount) { primaryPlatform = 'Snapchat'; }

        leaderboard.push({
          rank: rank++,
          id: doc.id,
          uid: d.uid || doc.id,
          username: d.username || d.searchKey || doc.id.slice(0, 8),
          displayName: d.displayName || d.username || 'User',
          avatarUrl: d.avatarUrl || d.googlePhotoUrl || null,
          reels: Number(d[sortField]) || 0,
          totalReels: Number(d.totalReels) || 0,
          todayReels: Number(d.todayReels) || 0,
          weeklyReels: Number(d.weeklyReels) || 0,
          primaryPlatform,
          isAnonymous: d.isAnonymous ?? !d.googlePhotoUrl,
        });
      });

      return res.status(200).json({ success: true, timeframe, limit, leaderboard });
    }

    // ==========================================
    // 5. REEL ANALYTICS
    // ==========================================
    if (route === 'reels') {
      const snap = await db.collection(usersCol).orderBy('totalReels', 'desc').limit(100).get();
      let totalReels = 0, todayReels = 0, weeklyReels = 0;
      let ig = 0, yt = 0, fb = 0, sc = 0, activeToday = 0;

      snap.forEach((doc) => {
        const d = doc.data();
        const tr = Number(d.totalReels) || 0;
        const td = Number(d.todayReels) || 0;
        totalReels += tr;
        weeklyReels += Number(d.weeklyReels) || 0;
        ig += Number(d.instagramTotal) || 0;
        yt += Number(d.youtubeTotal) || 0;
        fb += Number(d.facebookTotal) || 0;
        sc += Number(d.snapchatTotal) || 0;

        if (d.todayDate === istToday && td > 0) {
          todayReels += td;
          activeToday++;
        }
      });

      const sampled = snap.size || 1;
      return res.status(200).json({
        success: true,
        istDate: istToday,
        reelsAnalytics: {
          totalReels,
          todayReels,
          weeklyReels,
          avgReelsPerUser: Math.round(totalReels / sampled),
          avgTodayReelsPerActive: activeToday > 0 ? Math.round(todayReels / activeToday) : 0,
          activeUsersToday: activeToday,
          profilesSampled: sampled,
          platformBreakdown: { instagram: ig, youtube: yt, facebook: fb, snapchat: sc },
        },
      });
    }

    // ==========================================
    // 6. PLATFORM STATS
    // ==========================================
    if (route === 'platform-stats') {
      const snap = await db.collection(usersCol).orderBy('totalReels', 'desc').limit(100).get();
      let ig = 0, yt = 0, fb = 0, sc = 0;
      let igu = 0, ytu = 0, fbu = 0, scu = 0;

      snap.forEach((doc) => {
        const d = doc.data();
        const igC = Number(d.instagramTotal) || 0;
        const ytC = Number(d.youtubeTotal) || 0;
        const fbC = Number(d.facebookTotal) || 0;
        const scC = Number(d.snapchatTotal) || 0;

        ig += igC; yt += ytC; fb += fbC; sc += scC;
        if (igC > 0) igu++;
        if (ytC > 0) ytu++;
        if (fbC > 0) fbu++;
        if (scC > 0) scu++;
      });

      const grandTotal = ig + yt + fb + sc || 1;
      const sampled = snap.size || 1;

      return res.status(200).json({
        success: true,
        grandTotal,
        platforms: [
          { name: 'Instagram Reels', key: 'instagram', color: '#E1306C', totalReels: ig, percentage: Math.round((ig / grandTotal) * 1000) / 10, activeUserCount: igu, adoptionRate: Math.round((igu / sampled) * 100) },
          { name: 'YouTube Shorts', key: 'youtube', color: '#FF0000', totalReels: yt, percentage: Math.round((yt / grandTotal) * 1000) / 10, activeUserCount: ytu, adoptionRate: Math.round((ytu / sampled) * 100) },
          { name: 'Facebook Reels', key: 'facebook', color: '#1877F2', totalReels: fb, percentage: Math.round((fb / grandTotal) * 1000) / 10, activeUserCount: fbu, adoptionRate: Math.round((fbu / sampled) * 100) },
          { name: 'Snapchat Spotlight', key: 'snapchat', color: '#FFFC00', totalReels: sc, percentage: Math.round((sc / grandTotal) * 1000) / 10, activeUserCount: scu, adoptionRate: Math.round((scu / sampled) * 100) },
        ],
      });
    }

    // ==========================================
    // 7. USER GROWTH
    // ==========================================
    if (route === 'growth') {
      const snap = await db.collection(usersCol).limit(100).get();
      let anon = 0, google = 0;
      const daily: Record<string, number> = {};

      snap.forEach((doc) => {
        const d = doc.data();
        if (d.isAnonymous || !d.googlePhotoUrl) anon++;
        else google++;

        const timeVal = d.createdAt || d.updatedAt;
        if (timeVal) {
          try {
            const date = new Date(timeVal).toISOString().split('T')[0];
            daily[date] = (daily[date] || 0) + 1;
          } catch {}
        }
      });

      const timeline = Object.entries(daily).sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count }));
      return res.status(200).json({
        success: true,
        totalSampled: snap.size,
        authTypes: { google, anonymous: anon },
        timeline,
      });
    }

    // ==========================================
    // 8. RETENTION & HABITS
    // ==========================================
    if (route === 'retention') {
      const snap = await db.collection(usersCol).limit(100).get();
      let activeToday = 0, activeWithReels = 0;
      const tiers = { casual: 0, moderate: 0, dedicated: 0, heavy: 0 };

      snap.forEach((doc) => {
        const d = doc.data();
        const tr = Number(d.totalReels) || 0;
        if (d.todayDate === istToday && Number(d.todayReels) > 0) activeToday++;
        if (tr > 0) activeWithReels++;

        if (tr < 100) tiers.casual++;
        else if (tr <= 500) tiers.moderate++;
        else if (tr <= 1500) tiers.dedicated++;
        else tiers.heavy++;
      });

      const sampled = snap.size || 1;
      return res.status(200).json({
        success: true,
        istDate: istToday,
        totalSampled: sampled,
        activeToday,
        activeWithReels,
        engagementRate: Math.round((activeWithReels / sampled) * 100),
        tiers: [
          { label: 'Casual (<100 Reels)', count: tiers.casual, percentage: Math.round((tiers.casual / sampled) * 100) },
          { label: 'Moderate (100-500 Reels)', count: tiers.moderate, percentage: Math.round((tiers.moderate / sampled) * 100) },
          { label: 'Dedicated (500-1500 Reels)', count: tiers.dedicated, percentage: Math.round((tiers.dedicated / sampled) * 100) },
          { label: 'Heavy Scrollers (1500+ Reels)', count: tiers.heavy, percentage: Math.round((tiers.heavy / sampled) * 100) },
        ],
      });
    }

    // ==========================================
    // 9. BATTLES
    // ==========================================
    if (route === 'battles') {
      let totalBattles = 0, activeBattles = 0;
      try {
        totalBattles = (await db.collection('battles').count().get()).data().count;
        activeBattles = (await db.collection('battles').where('status', '==', 'ACTIVE').count().get()).data().count;
      } catch {}

      const recentBattles: any[] = [];
      try {
        const snap = await db.collection('battles').limit(25).get();
        snap.forEach((doc) => {
          const b = doc.data();
          const pList = Object.values(b.participants || {}) as any[];
          recentBattles.push({
            id: doc.id,
            challengerName: pList[0]?.displayName || 'Player 1',
            opponentName: pList[1]?.displayName || 'Player 2',
            targetReels: b.targetLimitReels || b.targetReels || 0,
            challengerReels: pList[0]?.reelsScrolled || 0,
            opponentReels: pList[1]?.reelsScrolled || 0,
            status: b.status || 'COMPLETED',
            createdAt: formatTime(b.createdAt),
          });
        });
      } catch {}

      return res.status(200).json({
        success: true,
        totalBattles,
        activeBattles,
        completedBattles: Math.max(0, totalBattles - activeBattles),
        recentBattles,
      });
    }

    // ==========================================
    // 10. REPORTS
    // ==========================================
    if (route === 'reports') {
      const snap = await db.collection(usersCol).orderBy('totalReels', 'desc').limit(100).get();
      let todayTotalReels = 0, todayActiveUsers = 0, weeklyTotalReels = 0, allTimeReels = 0;
      let ig = 0, yt = 0, fb = 0, sc = 0;

      snap.forEach((doc) => {
        const d = doc.data();
        const tr = Number(d.totalReels) || 0;
        const td = Number(d.todayReels) || 0;
        allTimeReels += tr;
        weeklyTotalReels += Number(d.weeklyReels) || 0;
        ig += Number(d.instagramTotal) || 0;
        yt += Number(d.youtubeTotal) || 0;
        fb += Number(d.facebookTotal) || 0;
        sc += Number(d.snapchatTotal) || 0;

        if (d.todayDate === istToday && td > 0) {
          todayTotalReels += td;
          todayActiveUsers++;
        }
      });

      const totalUsers = (await db.collection(usersCol).count().get()).data().count;
      return res.status(200).json({
        success: true,
        reportGeneratedAt: new Date().toISOString(),
        timezone: 'Asia/Kolkata (IST)',
        todayDate: istToday,
        summary: {
          totalUsers,
          todayActiveUsers,
          todayTotalReels,
          weeklyTotalReels,
          allTimeReelsSampled: allTimeReels,
          platforms: { instagram: ig, youtube: yt, facebook: fb, snapchat: sc },
        },
      });
    }

    // ==========================================
    // 11. SYSTEM & SECURITY
    // ==========================================
    if (route === 'system') {
      const startTime = Date.now();
      const usersCount = (await db.collection(usersCol).count().get()).data().count;

      let battlesCount = 0;
      try { battlesCount = (await db.collection('battles').count().get()).data().count; } catch {}

      let deletionCount = 0;
      try { deletionCount = (await db.collection('account_deletion_requests').count().get()).data().count; } catch {}

      let friendsCount = 0;
      try { friendsCount = (await db.collection('friends').count().get()).data().count; } catch {}

      const sample = await db.collection(usersCol).limit(50).get();
      let missingDisplayName = 0, missingTodayDate = 0, missingTotalReels = 0, anonymousCount = 0;

      sample.forEach((doc) => {
        const d = doc.data();
        if (!d.displayName) missingDisplayName++;
        if (!d.todayDate) missingTodayDate++;
        if (typeof d.totalReels !== 'number') missingTotalReels++;
        if (d.isAnonymous || !d.googlePhotoUrl) anonymousCount++;
      });

      return res.status(200).json({
        success: true,
        health: 'OPTIMAL',
        readOnlyMode: true,
        latencyMs: Date.now() - startTime,
        adminUid: decodedToken.uid,
        adminEmail: decodedToken.email || 'N/A',
        serverTimeUtc: new Date().toISOString(),
        serverTimeIst: istToday,
        collections: {
          users: usersCount,
          battles: battlesCount,
          friends: friendsCount,
          account_deletion_requests: deletionCount,
        },
        integrityCheck: {
          sampledProfiles: sample.size,
          missingDisplayName,
          missingTodayDate,
          missingTotalReels,
          anonymousCount,
        },
      });
    }

    return res.status(404).json({ success: false, error: `Unknown admin route: ${route}` });
  } catch (err: any) {
    console.error('Admin API error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Internal server error',
    });
  }
}
