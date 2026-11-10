import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getQueryParam, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const auth = await authenticateAdmin(req, res);
    if (!auth) return;

    const { db } = auth;
    const uid = getQueryParam(req, 'uid', '').trim();

    if (!uid) {
      return res.status(400).json({ success: false, error: 'Missing required query parameter: uid' });
    }
    const usersCol = await getUsersCollectionName(db);

    // 1. Fetch user doc
    let profileDoc = await db.collection(usersCol).doc(uid).get();
    if (!profileDoc.exists) {
      // Fallback
      profileDoc = await db.collection('publicProfile').doc(uid).get();
    }

    if (!profileDoc.exists) {
      return res.status(404).json({ success: false, error: `User with UID ${uid} not found` });
    }

    const data = profileDoc.data() || {};

    const formatTime = (val: any) => {
      if (!val) return null;
      if (typeof val === 'number') return new Date(val).toISOString();
      if (val.toDate) return val.toDate().toISOString();
      return String(val);
    };

    // 2. Fetch dailyStats subcollection (last 30 days)
    const dailyStats: any[] = [];
    try {
      const dailySnap = await profileDoc.ref
        .collection('dailyStats')
        .orderBy('date', 'desc')
        .limit(30)
        .get();

      dailySnap.forEach((doc) => {
        const d = doc.data();
        dailyStats.push({
          id: doc.id,
          date: d.date || doc.id,
          reelsCount: Number(d.reelsCount || d.totalReels || 0),
          instagram: Number(d.instagram || 0),
          youtube: Number(d.youtube || 0),
          facebook: Number(d.facebook || 0),
          snapchat: Number(d.snapchat || 0),
          updatedAt: formatTime(d.updatedAt),
        });
      });
    } catch {
      // Subcollection might not exist or empty
    }

    // 3. Fetch recent battles
    const recentBattles: any[] = [];
    try {
      const battlesSnap = await db.collection('battles')
        .where('participantIds', 'array-contains', uid)
        .limit(10)
        .get();

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
          winnerId: b.winnerId || null,
          createdAt: formatTime(b.createdAt),
        });
      });
    } catch {
      // Battles query failed
    }

    // 4. Friends count
    let friendsCount = 0;
    try {
      const friendsSnap = await db.collection('friends')
        .where('status', '==', 'ACCEPTED')
        .limit(50)
        .get();

      friendsSnap.forEach((doc) => {
        if (doc.id.includes(uid)) {
          friendsCount++;
        }
      });
    } catch {
      friendsCount = 0;
    }

    const userProfile = {
      id: profileDoc.id,
      uid: data.uid || profileDoc.id,
      username: data.username || data.searchKey || profileDoc.id.slice(0, 8),
      displayName: data.displayName || data.username || 'User',
      email: data.email || null,
      avatarId: data.avatarId || null,
      avatarType: data.avatarType || null,
      avatarEmoji: data.avatarEmoji || null,
      avatarUrl: data.avatarUrl || data.googlePhotoUrl || null,
      totalReels: Number(data.totalReels) || 0,
      todayReels: Number(data.todayReels) || 0,
      weeklyReels: Number(data.weeklyReels) || 0,
      todayDate: data.todayDate || null,
      instagramTotal: Number(data.instagramTotal) || 0,
      youtubeTotal: Number(data.youtubeTotal) || 0,
      facebookTotal: Number(data.facebookTotal) || 0,
      snapchatTotal: Number(data.snapchatTotal) || 0,
      isAnonymous: data.isAnonymous ?? !data.googlePhotoUrl,
      friendsCount,
      createdAt: formatTime(data.createdAt || data.updatedAt),
      updatedAt: formatTime(data.updatedAt),
      dailyStats,
      recentBattles,
    };

    return res.status(200).json({
      success: true,
      user: userProfile,
    });
  } catch (err: any) {
    console.error('User details error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user details',
      details: err?.message,
    });
  }
}
