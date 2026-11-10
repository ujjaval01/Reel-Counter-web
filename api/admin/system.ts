import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getIstDateString, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticateAdmin(req, res);
  if (!auth) return;

  const { db, decodedToken } = auth;
  const istToday = getIstDateString();

  try {
    const startTime = Date.now();
    const usersCol = await getUsersCollectionName(db);

    // 1. Check collections counts
    const usersCount = (await db.collection(usersCol).count().get()).data().count;
    
    let battlesCount = 0;
    try {
      battlesCount = (await db.collection('battles').count().get()).data().count;
    } catch {
      battlesCount = 0;
    }

    let deletionRequestsCount = 0;
    try {
      deletionRequestsCount = (await db.collection('account_deletion_requests').count().get()).data().count;
    } catch {
      deletionRequestsCount = 0;
    }

    let friendsCount = 0;
    try {
      friendsCount = (await db.collection('friends').count().get()).data().count;
    } catch {
      friendsCount = 0;
    }

    const latencyMs = Date.now() - startTime;

    // 2. Sample data integrity check
    const sampleProfiles = await db.collection(usersCol).limit(50).get();
    let missingDisplayName = 0;
    let missingTodayDate = 0;
    let missingTotalReels = 0;
    let anonymousCount = 0;

    sampleProfiles.forEach((doc) => {
      const data = doc.data();
      if (!data.displayName) missingDisplayName++;
      if (!data.todayDate) missingTodayDate++;
      if (typeof data.totalReels !== 'number') missingTotalReels++;
      if (data.isAnonymous || !data.googlePhotoUrl) anonymousCount++;
    });

    return res.status(200).json({
      success: true,
      health: 'OPTIMAL',
      readOnlyMode: true,
      latencyMs,
      adminUid: decodedToken.uid,
      adminEmail: decodedToken.email || 'N/A',
      serverTimeUtc: new Date().toISOString(),
      serverTimeIst: istToday,
      collections: {
        users: usersCount,
        battles: battlesCount,
        friends: friendsCount,
        account_deletion_requests: deletionRequestsCount,
      },
      integrityCheck: {
        sampledProfiles: sampleProfiles.size,
        missingDisplayName,
        missingTodayDate,
        missingTotalReels,
        anonymousCount,
      },
    });
  } catch (err: any) {
    console.error('System API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to inspect system health',
      details: err?.message,
    });
  }
}
