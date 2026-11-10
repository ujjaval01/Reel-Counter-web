import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, User as UserIcon, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import UserDetailsModal from './UserDetailsModal';

interface UsersViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function UsersView({ cache, setCache }: UsersViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [users, setUsers] = useState<any[]>(cache?.users || []);
  const [total, setTotal] = useState<number>(cache?.total || 0);
  const [page, setPage] = useState<number>(cache?.page || 1);
  const [search, setSearch] = useState<string>(cache?.search || '');
  const [sortBy, setSortBy] = useState<string>(cache?.sortBy || 'totalReels');
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const fetchUsers = async (p = page, q = search, sort = sortBy) => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/admin/users?page=${p}&limit=20&search=${encodeURIComponent(q)}&sortBy=${encodeURIComponent(sort)}`;
      const data = await fetchAdminApi(url);
      if (data?.success) {
        setUsers(data.users);
        setTotal(data.total);
        setPage(data.page);
        setCache({
          users: data.users,
          total: data.total,
          page: data.page,
          search: q,
          sortBy: sort,
          cachedAt: Date.now(),
        });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchUsers(1, search, sortBy);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, search, sortBy);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    fetchUsers(1, search, newSort);
  };

  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search username, display name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#192334] border border-slate-700/80 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
          />
        </form>

        {/* Sort & Refresh */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-3.5 py-2.5 rounded-2xl bg-[#192334] border border-slate-700/80 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
          >
            <option value="totalReels">Most Total Reels</option>
            <option value="todayReels">Most Today Reels</option>
            <option value="createdAt">Newest Users</option>
          </select>

          <button
            onClick={() => fetchUsers(page, search, sortBy)}
            disabled={loading}
            className="p-2.5 rounded-2xl bg-[#192334] border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#192334] border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#131B29] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700/60">
              <tr>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold text-right">Total Reels</th>
                <th className="p-4 font-semibold text-right">Today's Reels</th>
                <th className="p-4 font-semibold text-center">Top Platform</th>
                <th className="p-4 font-semibold">Registered</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF765E]" />
                    Loading user records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    No users match your criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const maxPlatform = [
                    { name: 'Instagram', count: u.instagramTotal || 0, color: 'text-rose-400' },
                    { name: 'YouTube', count: u.youtubeTotal || 0, color: 'text-red-400' },
                    { name: 'Facebook', count: u.facebookTotal || 0, color: 'text-blue-400' },
                    { name: 'Snapchat', count: u.snapchatTotal || 0, color: 'text-yellow-300' },
                  ].sort((a, b) => b.count - a.count)[0];

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center overflow-hidden shrink-0">
                            {u.avatarUrl ? (
                              <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm">{u.avatarEmoji || <UserIcon className="w-4 h-4 text-slate-400" />}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-white truncate max-w-[140px] sm:max-w-xs">{u.displayName}</p>
                              {u.isAnonymous ? (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-700 text-slate-300">Anon</span>
                              ) : (
                                <Sparkles className="w-3 h-3 text-[#FFB36B]" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">@{u.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-extrabold text-white">
                        {u.totalReels.toLocaleString()}
                      </td>
                      <td className="p-4 text-right font-bold text-[#FF765E]">
                        {u.todayReels.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-semibold ${maxPlatform.color}`}>
                          {maxPlatform.count > 0 ? maxPlatform.name : '—'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedUid(u.uid)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#FF765E] hover:text-white text-slate-300 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700/60 bg-[#131B29]/60 text-xs text-slate-400">
          <span>
            Showing {users.length} of {total} registered users &bull; Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchUsers(page - 1, search, sortBy)}
              disabled={page <= 1 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-white px-2">Page {page}</span>
            <button
              onClick={() => fetchUsers(page + 1, search, sortBy)}
              disabled={page >= totalPages || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* User Details Drawer Modal */}
      {selectedUid && (
        <UserDetailsModal
          uid={selectedUid}
          onClose={() => setSelectedUid(null)}
        />
      )}
    </div>
  );
}
