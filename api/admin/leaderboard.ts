import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getQueryParam, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const auth = await authenticateAdmin(req, res);
    if (!auth) return;

    const { db } = auth;
    const usersCol = await getUsersCollectionName(db);
    const timeframe = getQueryParam(req, 'timeframe', 'all');
    const rawLimit = parseInt(getQueryParam(req, 'limit', '50'), 10);
    const limit = Math.min(Math.max(isNaN(rawLimit) ? 50 : rawLimit, 5), 100);

    let sortField = 'totalReels';
    if (timeframe === 'weekly') {
      sortField = 'weeklyReels';
    } else if (timeframe === 'today') {
      sortField = 'todayReels';
    }

    const snap = await db.collection(usersCol)
      .orderBy(sortField, 'desc')
      .limit(limit)
      .get();

    const leaderboard: any[] = [];
    let rank = 1;

    snap.forEach((doc) => {
      const data = doc.data();
      const ig = Number(data.instagramTotal) || 0;
      const yt = Number(data.youtubeTotal) || 0;
      const fb = Number(data.facebookTotal) || 0;
      const sc = Number(data.snapchatTotal) || 0;

      let primaryPlatform = 'Instagram';
      let maxCount = ig;
      if (yt > maxCount) { primaryPlatform = 'YouTube'; maxCount = yt; }
      if (fb > maxCount) { primaryPlatform = 'Facebook'; maxCount = fb; }
      if (sc > maxCount) { primaryPlatform = 'Snapchat'; maxCount = sc; }

      leaderboard.push({
        rank: rank++,
        id: doc.id,
        uid: data.uid || doc.id,
        username: data.username || data.searchKey || doc.id.slice(0, 8),
        displayName: data.displayName || data.username || 'User',
        avatarId: data.avatarId || null,
        avatarEmoji: data.avatarEmoji || null,
        avatarUrl: data.avatarUrl || data.googlePhotoUrl || null,
        reels: Number(data[sortField]) || 0,
        totalReels: Number(data.totalReels) || 0,
        todayReels: Number(data.todayReels) || 0,
        weeklyReels: Number(data.weeklyReels) || 0,
        primaryPlatform,
        isAnonymous: data.isAnonymous ?? !data.googlePhotoUrl,
      });
    });

    return res.status(200).json({
      success: true,
      timeframe,
      limit,
      leaderboard,
    });
  } catch (err: any) {
    console.error('Leaderboard API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard',
      details: err?.message,
    });
  }
}
