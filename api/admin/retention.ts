import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getIstDateString, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const auth = await authenticateAdmin(req, res);
    if (!auth) return;

    const { db } = auth;
    const istToday = getIstDateString();
    const usersCol = await getUsersCollectionName(db);

    const snap = await db.collection(usersCol)
      .limit(100)
      .get();

    let activeToday = 0;
    let activeWithReels = 0;

    const tiers = {
      casual: 0,      // < 100
      moderate: 0,    // 100 - 500
      dedicated: 0,   // 500 - 1500
      heavy: 0,       // 1500+
    };

    snap.forEach((doc) => {
      const data = doc.data();
      const tr = Number(data.totalReels) || 0;
      const td = Number(data.todayReels) || 0;

      if (data.todayDate === istToday && td > 0) {
        activeToday++;
      }
      if (tr > 0) {
        activeWithReels++;
      }

      if (tr < 100) {
        tiers.casual++;
      } else if (tr <= 500) {
        tiers.moderate++;
      } else if (tr <= 1500) {
        tiers.dedicated++;
      } else {
        tiers.heavy++;
      }
    });

    const totalSampled = snap.size || 1;

    return res.status(200).json({
      success: true,
      istDate: istToday,
      totalSampled,
      activeToday,
      activeWithReels,
      engagementRate: Math.round((activeWithReels / totalSampled) * 100),
      tiers: [
        { label: 'Casual (<100 Reels)', count: tiers.casual, percentage: Math.round((tiers.casual / totalSampled) * 100) },
        { label: 'Moderate (100-500 Reels)', count: tiers.moderate, percentage: Math.round((tiers.moderate / totalSampled) * 100) },
        { label: 'Dedicated (500-1500 Reels)', count: tiers.dedicated, percentage: Math.round((tiers.dedicated / totalSampled) * 100) },
        { label: 'Heavy Scrollers (1500+ Reels)', count: tiers.heavy, percentage: Math.round((tiers.heavy / totalSampled) * 100) },
      ],
    });
  } catch (err: any) {
    console.error('Retention API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch retention metrics',
      details: err?.message,
    });
  }
}
