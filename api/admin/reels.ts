import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getIstDateString, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticateAdmin(req, res);
  if (!auth) return;

  const { db } = auth;
  const istToday = getIstDateString();

  try {
    const usersCol = await getUsersCollectionName(db);

    const snap = await db.collection(usersCol)
      .orderBy('totalReels', 'desc')
      .limit(100)
      .get();

    let totalReels = 0;
    let todayReels = 0;
    let weeklyReels = 0;
    let instagramTotal = 0;
    let youtubeTotal = 0;
    let facebookTotal = 0;
    let snapchatTotal = 0;
    let activeUsersToday = 0;

    snap.forEach((doc) => {
      const d = doc.data();
      const tr = Number(d.totalReels) || 0;
      const td = Number(d.todayReels) || 0;
      const wk = Number(d.weeklyReels) || 0;
      const ig = Number(d.instagramTotal) || 0;
      const yt = Number(d.youtubeTotal) || 0;
      const fb = Number(d.facebookTotal) || 0;
      const sc = Number(d.snapchatTotal) || 0;

      totalReels += tr;
      weeklyReels += wk;
      instagramTotal += ig;
      youtubeTotal += yt;
      facebookTotal += fb;
      snapchatTotal += sc;

      if (d.todayDate === istToday && td > 0) {
        todayReels += td;
        activeUsersToday++;
      }
    });

    const totalProfilesSampled = snap.size || 1;
    const avgReelsPerUser = Math.round(totalReels / totalProfilesSampled);
    const avgTodayReelsPerActive = activeUsersToday > 0 ? Math.round(todayReels / activeUsersToday) : 0;

    return res.status(200).json({
      success: true,
      istDate: istToday,
      reelsAnalytics: {
        totalReels,
        todayReels,
        weeklyReels,
        avgReelsPerUser,
        avgTodayReelsPerActive,
        activeUsersToday,
        profilesSampled: totalProfilesSampled,
        platformBreakdown: {
          instagram: instagramTotal,
          youtube: youtubeTotal,
          facebook: facebookTotal,
          snapchat: snapchatTotal,
        },
      },
    });
  } catch (err: any) {
    console.error('Reel Analytics API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch reel analytics',
      details: err?.message,
    });
  }
}
