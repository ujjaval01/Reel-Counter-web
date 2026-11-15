import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, RefreshCw, Eye, Sparkles, Users, CheckCircle, Trash2, XCircle } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import UserDetailsModal from './UserDetailsModal';
import { TableSkeletonRows } from './AdminSkeleton';
import { UserAvatar } from '../../components/UserAvatar';

interface UsersViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function UsersView({ cache, setCache }: UsersViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [subTab, setSubTab] = useState<'directory' | 'deletions'>('directory');
  const [users, setUsers] = useState<any[]>(cache?.users || []);
  const [total, setTotal] = useState<number>(cache?.total || 0);
  const [page, setPage] = useState<number>(cache?.page || 1);
  const [search, setSearch] = useState<string>(cache?.search || '');
  const [sortBy, setSortBy] = useState<string>(cache?.sortBy || 'totalReels');
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  // Deletion requests state
  const [deletionRequests, setDeletionRequests] = useState<any[]>([]);
  const [loadingDeletions, setLoadingDeletions] = useState<boolean>(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

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

  const fetchDeletionRequests = async () => {
    setLoadingDeletions(true);
    try {
      const data = await fetchAdminApi('/api/admin/deletion-requests');
      if (data?.success) {
        setDeletionRequests(data.requests || []);
      }
    } catch (err: any) {
      console.error('Failed to load deletion requests:', err);
    } finally {
      setLoadingDeletions(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchUsers(1, search, sortBy);
    }
  }, []);

  const handleSubTabChange = (t: 'directory' | 'deletions') => {
    setSubTab(t);
    if (t === 'deletions' && deletionRequests.length === 0) {
      fetchDeletionRequests();
    }
  };

  const handleProcessDeletion = async (requestId: string, action: 'approve' | 'reject') => {
    if (processingId) return;
    const confirmMsg = action === 'approve'
      ? 'Are you sure you want to approve this request and purge the user data?'
      : 'Are you sure you want to reject this deletion request?';
    if (!window.confirm(confirmMsg)) return;

    setProcessingId(requestId);
    try {
      const res = await fetchAdminApi('/api/admin/process-deletion', {
        method: 'POST',
        body: JSON.stringify({ requestId, action }),
      });
      if (res?.success) {
        setDeletionRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, status: action === 'approve' ? 'Completed' : 'Rejected' } : r))
        );
      }
    } catch (err: any) {
      alert(err?.message || 'Failed to process deletion request');
    } finally {
      setProcessingId(null);
    }
  };

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
      {/* Sub Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-[#F0E5DA] pb-3">
        <button
          onClick={() => handleSubTabChange('directory')}
          className={`px-4 py-2 rounded-2xl text-xs font-heading font-bold transition-all flex items-center gap-2 ${
            subTab === 'directory'
              ? 'bg-[#25334A] text-white shadow-sm'
              : 'bg-white hover:bg-[#FFFDF9] border border-[#F0E5DA] text-[#687386]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>User Directory ({total})</span>
        </button>

        <button
          onClick={() => handleSubTabChange('deletions')}
          className={`px-4 py-2 rounded-2xl text-xs font-heading font-bold transition-all flex items-center gap-2 ${
            subTab === 'deletions'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white hover:bg-rose-50 border border-[#F0E5DA] text-rose-700'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
          <span>Play Store Deletions {deletionRequests.filter(d => d.status === 'Pending').length > 0 && `(${deletionRequests.filter(d => d.status === 'Pending').length})`}</span>
        </button>
      </div>

      {subTab === 'directory' ? (
        <>
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
                    <th className="p-4 font-extrabold text-center">Status</th>
                    <th className="p-4 font-extrabold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E5DA]/60 text-[#25334A]">
                  {loading && users.length === 0 ? (
                    <TableSkeletonRows rows={6} cols={6} />
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
                              <UserAvatar
                                user={u}
                                className="w-10 h-10 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] shadow-sm"
                                textClassName="text-sm font-bold text-[#687386]"
                              />
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
                          <td className="p-4 text-center">
                            {u.isBanned ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-rose-100 text-rose-700">
                                Banned
                              </span>
                            ) : u.hiddenFromLeaderboard ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-amber-100 text-amber-700">
                                Hidden
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold bg-[#E4F5EE] text-[#2D8A78]">
                                Active
                              </span>
                            )}
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
        </>
      ) : (
        /* Play Store Deletion Requests Table */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-heading font-extrabold text-[#25334A]">Play Store Account Deletion Queue</h4>
              <p className="text-xs text-[#687386]">Review user data deletion requests submitted through web/in-app policy page</p>
            </div>
            <button
              onClick={fetchDeletionRequests}
              disabled={loadingDeletions}
              className="p-2 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] hover:bg-[#FFFDF9] shadow-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-[#FF765E] ${loadingDeletions ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="bg-white border border-[#F0E5DA] rounded-3xl overflow-hidden shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FFF8EF] text-[#687386] font-heading font-extrabold uppercase tracking-wider text-[11px] border-b border-[#F0E5DA]">
                  <tr>
                    <th className="p-4 font-extrabold">Request ID</th>
                    <th className="p-4 font-extrabold">User Email</th>
                    <th className="p-4 font-extrabold">Status</th>
                    <th className="p-4 font-extrabold">Requested At</th>
                    <th className="p-4 font-extrabold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E5DA]/60 text-[#25334A]">
                  {loadingDeletions ? (
                    <TableSkeletonRows rows={4} cols={5} />
                  ) : deletionRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-[#687386] font-medium">
                        No account deletion requests pending.
                      </td>
                    </tr>
                  ) : (
                    deletionRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-[#FFFDF9] transition-colors">
                        <td className="p-4 font-mono font-bold text-xs text-[#25334A]">{req.id}</td>
                        <td className="p-4 font-sans font-medium text-xs">{req.email || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold ${
                            req.status === 'Completed'
                              ? 'bg-[#E4F5EE] text-[#2D8A78]'
                              : req.status === 'Rejected'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-[#687386] text-xs font-mono">
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-4 text-center">
                          {req.status === 'Pending' ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleProcessDeletion(req.id, 'approve')}
                                disabled={processingId === req.id}
                                className="px-3 py-1.5 rounded-xl bg-[#E4F5EE] hover:bg-[#d4efe3] text-[#2D8A78] text-xs font-heading font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Approve &amp; Purge</span>
                              </button>
                              <button
                                onClick={() => handleProcessDeletion(req.id, 'reject')}
                                disabled={processingId === req.id}
                                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-[#8B95A5] font-mono">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Details Drawer Modal */}
      {selectedUid && (
        <UserDetailsModal
          uid={selectedUid}
          onClose={() => setSelectedUid(null)}
          onUserUpdated={() => fetchUsers(page, search, sortBy)}
        />
      )}
    </div>
  );
}
