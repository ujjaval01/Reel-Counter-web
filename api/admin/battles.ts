import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticateAdmin(req, res);
  if (!auth) return;

  const { db } = auth;

  try {
    let totalBattles = 0;
    let activeBattles = 0;

    try {
      const totalCountSnap = await db.collection('battles').count().get();
      totalBattles = totalCountSnap.data().count;

      const activeCountSnap = await db.collection('battles')
        .where('status', '==', 'ACTIVE')
        .count()
        .get();
      activeBattles = activeCountSnap.data().count;
    } catch {
      // Battles collection might be newly initialized
    }

    const formatTime = (val: any) => {
      if (!val) return null;
      if (typeof val === 'number') return new Date(val).toISOString();
      if (val.toDate) return val.toDate().toISOString();
      return String(val);
    };

    const recentBattles: any[] = [];
    try {
      const battlesSnap = await db.collection('battles')
        .limit(25)
        .get();

      battlesSnap.forEach((doc) => {
        const d = doc.data();
        const pList = Object.values(d.participants || {}) as any[];
        recentBattles.push({
          id: doc.id,
          title: d.title || 'Battle Duel',
          challengerName: pList[0]?.displayName || 'Player 1',
          opponentName: pList[1]?.displayName || 'Player 2',
          targetReels: d.targetLimitReels || d.targetReels || 0,
          challengerReels: pList[0]?.reelsScrolled || 0,
          opponentReels: pList[1]?.reelsScrolled || 0,
          status: d.status || 'COMPLETED',
          winnerId: d.winnerId || null,
          createdAt: formatTime(d.createdAt),
        });
      });
    } catch {
      // If collection doesn't exist yet
    }

    return res.status(200).json({
      success: true,
      totalBattles,
      activeBattles,
      completedBattles: Math.max(0, totalBattles - activeBattles),
      recentBattles,
    });
  } catch (err: any) {
    console.error('Battles API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch battles data',
      details: err?.message,
    });
  }
}
