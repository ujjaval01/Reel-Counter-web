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

    let todayTotalReels = 0;
    let todayActiveUsers = 0;
    let weeklyTotalReels = 0;
    let allTimeReels = 0;

    let instagramSum = 0;
    let youtubeSum = 0;
    let facebookSum = 0;
    let snapchatSum = 0;

    snap.forEach((doc) => {
      const data = doc.data();
      const tr = Number(data.totalReels) || 0;
      const td = Number(data.todayReels) || 0;
      const wk = Number(data.weeklyReels) || 0;

      allTimeReels += tr;
      weeklyTotalReels += wk;
      instagramSum += Number(data.instagramTotal) || 0;
      youtubeSum += Number(data.youtubeTotal) || 0;
      facebookSum += Number(data.facebookTotal) || 0;
      snapchatSum += Number(data.snapchatTotal) || 0;

      if (data.todayDate === istToday && td > 0) {
        todayTotalReels += td;
        todayActiveUsers++;
      }
    });

    const totalUsersCountSnap = await db.collection(usersCol).count().get();
    const totalUsers = totalUsersCountSnap.data().count;

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
        platforms: {
          instagram: instagramSum,
          youtube: youtubeSum,
          facebook: facebookSum,
          snapchat: snapchatSum,
        },
      },
    });
  } catch (err: any) {
    console.error('Reports API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate reports',
      details: err?.message,
    });
  }
}
