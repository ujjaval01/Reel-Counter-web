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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25334A]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl max-h-[90vh] bg-white border border-[#F0E5DA] rounded-3xl shadow-[0_20px_50px_rgba(37,51,74,0.15)] flex flex-col overflow-hidden text-[#25334A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0E5DA] bg-[#FFF8EF]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF7E67] to-[#FF6F56] p-0.5 shadow-md">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                {userData?.avatarUrl ? (
                  <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{userData?.avatarEmoji || '👤'}</span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-heading font-extrabold text-[#25334A]">{userData?.displayName || 'Loading...'}</h3>
                {userData?.isAnonymous ? (
                  <span className="px-2.5 py-0.5 text-[10px] font-sans font-bold rounded-full bg-slate-100 text-[#687386] border border-[#F0E5DA]">
                    Anonymous
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 text-[10px] font-heading font-bold rounded-full bg-[#E4F5EE] text-[#2D8A78] border border-[#45BFA8]/30">
                    Verified Google
                  </span>
                )}
              </div>
              <p className="text-xs font-sans text-[#687386]">@{userData?.username || 'user'}</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-[#8B95A5]">
                <span>UID: {uid}</span>
                <button
                  onClick={copyUid}
                  className="p-1 hover:text-[#25334A] transition-colors"
                  title="Copy UID"
                >
                  {copiedUid ? <Check className="w-3.5 h-3.5 text-[#2D8A78]" /> : <Copy className="w-3.5 h-3.5 text-[#8B95A5]" />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#687386] hover:text-[#25334A] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#687386] gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#FF765E]" />
              <p className="text-sm font-sans">Fetching user Firestore records...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-sans flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          ) : userData ? (
            <>
              {/* Core Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA]">
                  <p className="text-[11px] font-sans font-bold text-[#687386] uppercase tracking-wider">Total Reels</p>
                  <p className="text-2xl font-heading font-extrabold text-[#25334A] mt-1">{userData.totalReels.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA]">
                  <p className="text-[11px] font-sans font-bold text-[#687386] uppercase tracking-wider">Today's Reels</p>
                  <p className="text-2xl font-heading font-extrabold text-[#FF765E] mt-1">{userData.todayReels.toLocaleString()}</p>
                  <p className="text-[10px] font-sans text-[#8B95A5] mt-0.5">Date: {userData.todayDate || 'N/A'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA]">
                  <p className="text-[11px] font-sans font-bold text-[#687386] uppercase tracking-wider">Weekly Reels</p>
                  <p className="text-2xl font-heading font-extrabold text-[#F7931A] mt-1">{userData.weeklyReels.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA]">
                  <p className="text-[11px] font-sans font-bold text-[#687386] uppercase tracking-wider">Friends</p>
                  <p className="text-2xl font-heading font-extrabold text-[#2D8A78] mt-1">{userData.friendsCount || 0}</p>
                </div>
              </div>

              {/* Platform Distribution */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] space-y-3">
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A]">
                  Platform Scroll Distribution
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-[#F0E5DA]">
                    <p className="text-[11px] text-rose-500 font-heading font-bold">Instagram</p>
                    <p className="text-lg font-heading font-extrabold text-[#25334A] mt-0.5">{(userData.instagramTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#F0E5DA]">
                    <p className="text-[11px] text-red-500 font-heading font-bold">YouTube Shorts</p>
                    <p className="text-lg font-heading font-extrabold text-[#25334A] mt-0.5">{(userData.youtubeTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#F0E5DA]">
                    <p className="text-[11px] text-blue-500 font-heading font-bold">Facebook</p>
                    <p className="text-lg font-heading font-extrabold text-[#25334A] mt-0.5">{(userData.facebookTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#F0E5DA]">
                    <p className="text-[11px] text-amber-500 font-heading font-bold">Snapchat</p>
                    <p className="text-lg font-heading font-extrabold text-[#25334A] mt-0.5">{(userData.snapchatTotal || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* 30-Day Activity History */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF765E]" />
                    30-Day History (dailyStats subcollection)
                  </h4>
                  <span className="text-[11px] font-sans font-semibold text-[#8B95A5]">
                    {userData.dailyStats?.length || 0} records
                  </span>
                </div>

                {userData.dailyStats?.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-[#F0E5DA] bg-white">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-[#FFF8EF] text-[#687386] font-bold sticky top-0 border-b border-[#F0E5DA]">
                        <tr>
                          <th className="p-2.5 font-bold">Date</th>
                          <th className="p-2.5 font-bold text-right">Reels</th>
                          <th className="p-2.5 font-bold text-right">IG</th>
                          <th className="p-2.5 font-bold text-right">YT</th>
                          <th className="p-2.5 font-bold text-right">FB</th>
                          <th className="p-2.5 font-bold text-right">SC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0E5DA] text-[#25334A]">
                        {userData.dailyStats.map((item: any) => (
                          <tr key={item.id} className="hover:bg-[#FFF8EF]/50">
                            <td className="p-2.5 font-mono text-[#25334A]">{item.date}</td>
                            <td className="p-2.5 text-right font-heading font-bold text-[#25334A]">{item.reelsCount}</td>
                            <td className="p-2.5 text-right text-rose-500 font-semibold">{item.instagram || 0}</td>
                            <td className="p-2.5 text-right text-red-500 font-semibold">{item.youtube || 0}</td>
                            <td className="p-2.5 text-right text-blue-500 font-semibold">{item.facebook || 0}</td>
                            <td className="p-2.5 text-right text-amber-500 font-semibold">{item.snapchat || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs font-sans text-[#8B95A5] italic py-2">
                    No dailyStats records logged for this user yet.
                  </p>
                )}
              </div>

              {/* Battles Participation */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] space-y-3">
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
                  <Swords className="w-4 h-4 text-[#FF765E]" />
                  Battle Participations ({userData.recentBattles?.length || 0})
                </h4>
                {userData.recentBattles?.length > 0 ? (
                  <div className="space-y-2">
                    {userData.recentBattles.map((b: any) => (
                      <div key={b.id} className="p-3.5 rounded-xl bg-white border border-[#F0E5DA] flex items-center justify-between text-xs">
                        <div>
                          <p className="font-heading font-bold text-[#25334A]">
                            {b.challengerName || 'Player 1'} vs {b.opponentName || 'Player 2'}
                          </p>
                          <p className="text-[10px] font-sans text-[#687386] mt-0.5">
                            Status: <span className="font-heading font-bold text-[#2D8A78]">{b.status}</span> &bull; Target: {b.targetReels || 0}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-heading text-xs font-extrabold text-[#25334A]">
                            {b.challengerReels || 0} - {b.opponentReels || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-sans text-[#8B95A5] italic py-1">
                    No recorded battles found for this user.
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-[#8B95A5] pt-2 border-t border-[#F0E5DA]">
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
