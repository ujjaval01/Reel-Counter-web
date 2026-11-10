import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getIstDateString, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticateAdmin(req, res);
  if (!auth) return;

  const { db } = auth;
  const istToday = getIstDateString();

  try {
    const usersCol = await getUsersCollectionName(db);

    // 1. Total registered users count
    const usersCountSnap = await db.collection(usersCol).count().get();
    const totalUsers = usersCountSnap.data().count;

    // 2. Today's active users count
    let activeUsersToday = 0;
    try {
      const activeUsersSnap = await db.collection(usersCol)
        .where('todayDate', '==', istToday)
        .count()
        .get();
      activeUsersToday = activeUsersSnap.data().count;
    } catch {
      activeUsersToday = 0;
    }

    // 3. Battles counts
    let totalBattles = 0;
    let activeBattles = 0;
    try {
      const totalBattlesSnap = await db.collection('battles').count().get();
      totalBattles = totalBattlesSnap.data().count;

      const activeBattlesSnap = await db.collection('battles')
        .where('status', '==', 'ACTIVE')
        .count()
        .get();
      activeBattles = activeBattlesSnap.data().count;
    } catch {
      // Collection may be empty
    }

    // 4. Deletion requests count
    let totalDeletionRequests = 0;
    let pendingDeletionRequests = 0;
    try {
      const delSnap = await db.collection('account_deletion_requests').count().get();
      totalDeletionRequests = delSnap.data().count;

      const pendingDelSnap = await db.collection('account_deletion_requests')
        .where('status', '==', 'Pending')
        .count()
        .get();
      pendingDeletionRequests = pendingDelSnap.data().count;
    } catch {
      // If collection does not exist
    }

    // 5. Aggregate reel statistics from top active profiles
    const topProfilesSnap = await db.collection(usersCol)
      .orderBy('totalReels', 'desc')
      .limit(100)
      .get();

    let sampleTotalReels = 0;
    let sampleTodayReels = 0;
    let instagramTotal = 0;
    let youtubeTotal = 0;
    let facebookTotal = 0;
    let snapchatTotal = 0;

    topProfilesSnap.forEach((doc) => {
      const data = doc.data();
      sampleTotalReels += Number(data.totalReels) || 0;
      if (data.todayDate === istToday) {
        sampleTodayReels += Number(data.todayReels) || 0;
      }
      instagramTotal += Number(data.instagramTotal) || 0;
      youtubeTotal += Number(data.youtubeTotal) || 0;
      facebookTotal += Number(data.facebookTotal) || 0;
      snapchatTotal += Number(data.snapchatTotal) || 0;
    });

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      istDate: istToday,
      overview: {
        totalUsers,
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
  } catch (err: any) {
    console.error('Overview API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch overview metrics',
      details: err?.message,
    });
  }
}
