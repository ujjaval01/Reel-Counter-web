import type { VercelRequest, VercelResponse } from './_lib';
import { authenticateAdmin, getQueryParam, getUsersCollectionName } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await authenticateAdmin(req, res);
  if (!auth) return;

  const { db } = auth;

  try {
    const usersCol = await getUsersCollectionName(db);
    const rawLimit = parseInt(getQueryParam(req, 'limit', '25'), 10);
    const limit = Math.min(Math.max(isNaN(rawLimit) ? 25 : rawLimit, 1), 50);
    const page = Math.max(parseInt(getQueryParam(req, 'page', '1'), 10) || 1, 1);
    const search = getQueryParam(req, 'search', '').trim().toLowerCase();
    const sortBy = getQueryParam(req, 'sortBy', 'totalReels');
    const order = getQueryParam(req, 'order', 'desc') === 'asc' ? 'asc' : 'desc';

    // Total users count
    const countSnap = await db.collection(usersCol).count().get();
    const totalCount = countSnap.data().count;

    // Helper to format timestamps
    const formatTime = (val: any) => {
      if (!val) return null;
      if (typeof val === 'number') return new Date(val).toISOString();
      if (val.toDate) return val.toDate().toISOString();
      return String(val);
    };

    // If searching, we fetch a capped batch and filter in memory
    if (search) {
      const snap = await db.collection(usersCol).limit(150).get();
      const allMatched: any[] = [];

      snap.forEach((doc) => {
        const data = doc.data();
        const username = String(data.username || data.searchKey || '').toLowerCase();
        const displayName = String(data.displayName || '').toLowerCase();
        const email = String(data.email || '').toLowerCase();
        const searchKey = String(data.searchKey || '').toLowerCase();

        if (
          username.includes(search) ||
          displayName.includes(search) ||
          email.includes(search) ||
          searchKey.includes(search)
        ) {
          allMatched.push({
            id: doc.id,
            uid: data.uid || doc.id,
            username: data.username || data.searchKey || doc.id.slice(0, 8),
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
            createdAt: formatTime(data.createdAt || data.updatedAt),
            updatedAt: formatTime(data.updatedAt),
          });
        }
      });

      const startIndex = (page - 1) * limit;
      const paginated = allMatched.slice(startIndex, startIndex + limit);

      return res.status(200).json({
        success: true,
        users: paginated,
        total: allMatched.length,
        page,
        limit,
        hasMore: startIndex + limit < allMatched.length,
      });
    }

    // Standard pagination without search
    let queryRef = db.collection(usersCol).orderBy(sortBy, order);
    const offset = (page - 1) * limit;
    const snap = await queryRef.offset(offset).limit(limit).get();

    const users: any[] = [];
    snap.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        uid: data.uid || doc.id,
        username: data.username || data.searchKey || doc.id.slice(0, 8),
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
        createdAt: formatTime(data.createdAt || data.updatedAt),
        updatedAt: formatTime(data.updatedAt),
      });
    });

    return res.status(200).json({
      success: true,
      users,
      total: totalCount,
      page,
      limit,
      hasMore: offset + users.length < totalCount,
    });
  } catch (err: any) {
    console.error('Users API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      details: err?.message,
    });
  }
}
