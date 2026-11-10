import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const auth = await authenticateAdmin(req, res);
    if (!auth) return;

    const { db } = auth;
    const usersCol = await getUsersCollectionName(db);

    const snap = await db.collection(usersCol)
      .limit(100)
      .get();

    const dailySignups: Record<string, number> = {};
    let anonymousCount = 0;
    let googleAuthCount = 0;

    snap.forEach((doc) => {
      const data = doc.data();
      if (data.isAnonymous || !data.googlePhotoUrl) {
        anonymousCount++;
      } else {
        googleAuthCount++;
      }

      let dateKey = 'Unknown';
      const timeVal = data.createdAt || data.updatedAt;
      if (timeVal) {
        try {
          const d = typeof timeVal === 'number' 
            ? new Date(timeVal) 
            : (timeVal.toDate ? timeVal.toDate() : new Date(timeVal));
          if (!isNaN(d.getTime())) {
            dateKey = d.toISOString().split('T')[0];
          }
        } catch {
          // ignore parsing error
        }
      }

      dailySignups[dateKey] = (dailySignups[dateKey] || 0) + 1;
    });

    const timeline = Object.entries(dailySignups)
      .filter(([k]) => k !== 'Unknown')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    return res.status(200).json({
      success: true,
      totalSampled: snap.size,
      authTypes: {
        google: googleAuthCount,
        anonymous: anonymousCount,
      },
      timeline,
    });
  } catch (err: any) {
    console.error('Growth API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user growth data',
      details: err?.message,
    });
  }
}
