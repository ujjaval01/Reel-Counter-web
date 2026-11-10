import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticateAdmin(req, res);
  if (!auth) return;

  const { db } = auth;

  try {
    const usersCol = await getUsersCollectionName(db);

    const snap = await db.collection(usersCol)
      .orderBy('totalReels', 'desc')
      .limit(100)
      .get();

    let instagramTotal = 0;
    let youtubeTotal = 0;
    let facebookTotal = 0;
    let snapchatTotal = 0;

    let instagramUsers = 0;
    let youtubeUsers = 0;
    let facebookUsers = 0;
    let snapchatUsers = 0;

    snap.forEach((doc) => {
      const d = doc.data();
      const ig = Number(d.instagramTotal) || 0;
      const yt = Number(d.youtubeTotal) || 0;
      const fb = Number(d.facebookTotal) || 0;
      const sc = Number(d.snapchatTotal) || 0;

      instagramTotal += ig;
      youtubeTotal += yt;
      facebookTotal += fb;
      snapchatTotal += sc;

      if (ig > 0) instagramUsers++;
      if (yt > 0) youtubeUsers++;
      if (fb > 0) facebookUsers++;
      if (sc > 0) snapchatUsers++;
    });

    const grandTotal = instagramTotal + youtubeTotal + facebookTotal + snapchatTotal || 1;
    const sampledCount = snap.size || 1;

    const platforms = [
      {
        name: 'Instagram Reels',
        key: 'instagram',
        color: '#E1306C',
        totalReels: instagramTotal,
        percentage: Math.round((instagramTotal / grandTotal) * 1000) / 10,
        activeUserCount: instagramUsers,
        adoptionRate: Math.round((instagramUsers / sampledCount) * 100),
      },
      {
        name: 'YouTube Shorts',
        key: 'youtube',
        color: '#FF0000',
        totalReels: youtubeTotal,
        percentage: Math.round((youtubeTotal / grandTotal) * 1000) / 10,
        activeUserCount: youtubeUsers,
        adoptionRate: Math.round((youtubeUsers / sampledCount) * 100),
      },
      {
        name: 'Facebook Reels',
        key: 'facebook',
        color: '#1877F2',
        totalReels: facebookTotal,
        percentage: Math.round((facebookTotal / grandTotal) * 1000) / 10,
        activeUserCount: facebookUsers,
        adoptionRate: Math.round((facebookUsers / sampledCount) * 100),
      },
      {
        name: 'Snapchat Spotlight',
        key: 'snapchat',
        color: '#FFFC00',
        totalReels: snapchatTotal,
        percentage: Math.round((snapchatTotal / grandTotal) * 1000) / 10,
        activeUserCount: snapchatUsers,
        adoptionRate: Math.round((snapchatUsers / sampledCount) * 100),
      },
    ];

    return res.status(200).json({
      success: true,
      grandTotal,
      sampledCount,
      platforms,
    });
  } catch (err: any) {
    console.error('Platform Stats API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch platform statistics',
      details: err?.message,
    });
  }
}
