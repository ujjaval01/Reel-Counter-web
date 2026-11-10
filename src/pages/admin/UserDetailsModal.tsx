import { useState, useEffect } from 'react';
import { X, Copy, Check, Calendar, Swords, AlertCircle, RefreshCw } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface UserDetailsModalProps {
  uid: string | null;
  onClose: () => void;
}

export default function UserDetailsModal({ uid, onClose }: UserDetailsModalProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [copiedUid, setCopiedUid] = useState(false);

  useEffect(() => {
    if (!uid) return;

    let mounted = true;
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAdminApi(`/api/admin/user-details?uid=${encodeURIComponent(uid)}`);
        if (mounted && data?.success) {
          setUserData(data.user);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load user details');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUser();
    return () => { mounted = false; };
  }, [uid, fetchAdminApi]);

  if (!uid) return null;

  const copyUid = () => {
    navigator.clipboard?.writeText(uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl max-h-[90vh] bg-[#192334] border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/60 bg-[#131B29]/60">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF765E] to-[#FFB36B] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#192334] rounded-[14px] flex items-center justify-center overflow-hidden">
                {userData?.avatarUrl ? (
                  <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{userData?.avatarEmoji || '👤'}</span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{userData?.displayName || 'Loading...'}</h3>
                {userData?.isAnonymous ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-700 text-slate-300">
                    Anonymous
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Verified Google
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">@{userData?.username || 'user'}</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-slate-400">
                <span>UID: {uid}</span>
                <button
                  onClick={copyUid}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy UID"
                >
                  {copiedUid ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#FF765E]" />
              <p className="text-sm">Fetching user Firestore records...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : userData ? (
            <>
              {/* Core Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-700/60">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Reels</p>
                  <p className="text-2xl font-black text-white mt-1">{userData.totalReels.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-700/60">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Today's Reels</p>
                  <p className="text-2xl font-black text-[#FF765E] mt-1">{userData.todayReels.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Date: {userData.todayDate || 'N/A'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-700/60">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Weekly Reels</p>
                  <p className="text-2xl font-black text-[#FFB36B] mt-1">{userData.weeklyReels.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-700/60">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Friends</p>
                  <p className="text-2xl font-black text-[#45BFA8] mt-1">{userData.friendsCount || 0}</p>
                </div>
              </div>

              {/* Platform Distribution */}
              <div className="p-5 rounded-2xl bg-[#131B29] border border-slate-700/60 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Platform Scroll Distribution
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <p className="text-[11px] text-rose-400 font-semibold">Instagram</p>
                    <p className="text-lg font-bold text-white mt-0.5">{(userData.instagramTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <p className="text-[11px] text-red-400 font-semibold">YouTube Shorts</p>
                    <p className="text-lg font-bold text-white mt-0.5">{(userData.youtubeTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <p className="text-[11px] text-blue-400 font-semibold">Facebook</p>
                    <p className="text-lg font-bold text-white mt-0.5">{(userData.facebookTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <p className="text-[11px] text-yellow-300 font-semibold">Snapchat</p>
                    <p className="text-lg font-bold text-white mt-0.5">{(userData.snapchatTotal || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* 30-Day Activity History */}
              <div className="p-5 rounded-2xl bg-[#131B29] border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF765E]" />
                    30-Day History (dailyStats subcollection)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {userData.dailyStats?.length || 0} records
                  </span>
                </div>

                {userData.dailyStats?.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-800/70 text-slate-400 sticky top-0">
                        <tr>
                          <th className="p-2.5 font-semibold">Date</th>
                          <th className="p-2.5 font-semibold text-right">Reels</th>
                          <th className="p-2.5 font-semibold text-right">IG</th>
                          <th className="p-2.5 font-semibold text-right">YT</th>
                          <th className="p-2.5 font-semibold text-right">FB</th>
                          <th className="p-2.5 font-semibold text-right">SC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {userData.dailyStats.map((item: any) => (
                          <tr key={item.id} className="hover:bg-slate-800/30">
                            <td className="p-2.5 font-mono text-slate-300">{item.date}</td>
                            <td className="p-2.5 text-right font-bold text-white">{item.reelsCount}</td>
                            <td className="p-2.5 text-right text-rose-400">{item.instagram || 0}</td>
                            <td className="p-2.5 text-right text-red-400">{item.youtube || 0}</td>
                            <td className="p-2.5 text-right text-blue-400">{item.facebook || 0}</td>
                            <td className="p-2.5 text-right text-yellow-300">{item.snapchat || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-2">
                    No dailyStats records logged for this user yet.
                  </p>
                )}
              </div>

              {/* Battles Participation */}
              <div className="p-5 rounded-2xl bg-[#131B29] border border-slate-700/60 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Swords className="w-4 h-4 text-[#FFB36B]" />
                  Battle Participations ({userData.recentBattles?.length || 0})
                </h4>
                {userData.recentBattles?.length > 0 ? (
                  <div className="space-y-2">
                    {userData.recentBattles.map((b: any) => (
                      <div key={b.id} className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-white">
                            {b.challengerName || 'Player 1'} vs {b.opponentName || 'Player 2'}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Status: <span className="font-semibold text-[#45BFA8]">{b.status}</span> &bull; Target: {b.targetReels || 0}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-white">
                            {b.challengerReels || 0} - {b.opponentReels || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-1">
                    No recorded battles found for this user.
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Account Created: {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</span>
                <span>Last Updated: {userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
