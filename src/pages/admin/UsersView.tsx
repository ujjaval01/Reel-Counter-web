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
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#687386]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by username, name, or UID..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] placeholder-[#94A3B8] text-xs font-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#FF765E]/20 focus:border-[#FF765E] shadow-sm transition-all"
          />
        </form>

        {/* Sort & Action controls */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] text-xs font-heading font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF765E]/20 focus:border-[#FF765E]"
          >
            <option value="totalReels">Most Total Reels</option>
            <option value="todayReels">Most Today Reels</option>
            <option value="createdAt">Newest Users</option>
          </select>

          <button
            onClick={() => fetchUsers(page, search, sortBy)}
            disabled={loading}
            className="p-2.5 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] hover:bg-[#FFFDF9] shadow-sm transition-colors"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 text-[#FF765E] ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white border border-[#F0E5DA] rounded-3xl overflow-hidden shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF8EF] text-[#687386] font-heading font-extrabold uppercase tracking-wider text-[11px] border-b border-[#F0E5DA]">
              <tr>
                <th className="p-4 font-extrabold">User</th>
                <th className="p-4 font-extrabold text-right">Total Reels</th>
                <th className="p-4 font-extrabold text-right">Today's Reels</th>
                <th className="p-4 font-extrabold text-center">Top Platform</th>
                <th className="p-4 font-extrabold">Registered</th>
                <th className="p-4 font-extrabold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E5DA]/60 text-[#25334A]">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[#687386]">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF765E]" />
                    Loading user records...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[#687386] font-medium">
                    No users match your criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const maxPlatform = [
                    { name: 'Instagram', count: u.instagramTotal || 0, color: 'text-rose-600' },
                    { name: 'YouTube', count: u.youtubeTotal || 0, color: 'text-red-600' },
                    { name: 'Facebook', count: u.facebookTotal || 0, color: 'text-blue-600' },
                    { name: 'Snapchat', count: u.snapchatTotal || 0, color: 'text-amber-600' },
                  ].sort((a, b) => b.count - a.count)[0];

                  return (
                    <tr key={u.id} className="hover:bg-[#FFFDF9] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {u.avatarUrl ? (
                              <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm">{u.avatarEmoji || <UserIcon className="w-4 h-4 text-[#687386]" />}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-heading font-bold text-sm text-[#25334A] truncate max-w-[140px] sm:max-w-xs">{u.displayName}</p>
                              {u.isAnonymous ? (
                                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-slate-100 text-slate-600 font-bold">Anon</span>
                              ) : (
                                <Sparkles className="w-3.5 h-3.5 text-[#FFB36B]" />
                              )}
                            </div>
                            <p className="text-[11px] text-[#687386] font-mono truncate">@{u.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-heading font-extrabold text-sm text-[#25334A]">
                        {u.totalReels.toLocaleString()}
                      </td>
                      <td className="p-4 text-right font-heading font-extrabold text-sm text-[#FF765E]">
                        {u.todayReels.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-heading font-bold text-xs ${maxPlatform.color}`}>
                          {maxPlatform.count > 0 ? maxPlatform.name : '—'}
                        </span>
                      </td>
                      <td className="p-4 text-[#687386] font-mono text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedUid(u.uid)}
                          className="px-3.5 py-1.5 rounded-2xl bg-[#FFF1E7] hover:bg-[#FFE2D5] text-[#FF765E] font-heading font-bold text-xs transition-colors inline-flex items-center gap-1.5 shadow-sm"
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
        <div className="flex items-center justify-between p-4 border-t border-[#F0E5DA] bg-[#FFF8EF] text-xs text-[#687386] font-medium">
          <span>
            Showing {users.length} of {total} registered users &bull; Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchUsers(page - 1, search, sortBy)}
              disabled={page <= 1 || loading}
              className="p-1.5 rounded-xl bg-white border border-[#F0E5DA] text-[#25334A] hover:bg-[#FFFDF9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-heading font-bold text-[#25334A] px-2">Page {page}</span>
            <button
              onClick={() => fetchUsers(page + 1, search, sortBy)}
              disabled={page >= totalPages || loading}
              className="p-1.5 rounded-xl bg-white border border-[#F0E5DA] text-[#25334A] hover:bg-[#FFFDF9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
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
