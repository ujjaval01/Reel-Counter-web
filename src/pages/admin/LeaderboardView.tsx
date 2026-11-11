import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, RefreshCw, User as UserIcon } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface LeaderboardViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function LeaderboardView({ cache, setCache }: LeaderboardViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [timeframe, setTimeframe] = useState<'all' | 'weekly' | 'today'>(cache?.timeframe || 'all');
  const [limit, setLimit] = useState<number>(cache?.limit || 50);
  const [leaderboard, setLeaderboard] = useState<any[]>(cache?.leaderboard || []);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async (tf = timeframe, lim = limit) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi(`/api/admin/leaderboard?timeframe=${tf}&limit=${lim}`);
      if (res?.success) {
        setLeaderboard(res.leaderboard);
        setCache({
          leaderboard: res.leaderboard,
          timeframe: tf,
          limit: lim,
          cachedAt: Date.now(),
        });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchLeaderboard(timeframe, limit);
    }
  }, []);

  const handleTimeframeChange = (tf: 'all' | 'weekly' | 'today') => {
    setTimeframe(tf);
    fetchLeaderboard(tf, limit);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    fetchLeaderboard(timeframe, newLimit);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Timeframe Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#F0E5DA] shadow-sm">
          <button
            onClick={() => handleTimeframeChange('all')}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
              timeframe === 'all'
                ? 'bg-gradient-to-r from-[#FF7E67] to-[#FF6F56] text-white shadow-md'
                : 'text-[#687386] hover:text-[#25334A] hover:bg-[#FFF1E7]'
            }`}
          >
            All-Time
          </button>
          <button
            onClick={() => handleTimeframeChange('weekly')}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-gradient-to-r from-[#FF7E67] to-[#FF6F56] text-white shadow-md'
                : 'text-[#687386] hover:text-[#25334A] hover:bg-[#FFF1E7]'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleTimeframeChange('today')}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
              timeframe === 'today'
                ? 'bg-gradient-to-r from-[#FF7E67] to-[#FF6F56] text-white shadow-md'
                : 'text-[#687386] hover:text-[#25334A] hover:bg-[#FFF1E7]'
            }`}
          >
            Today (IST)
          </button>
        </div>

        {/* Limit and Refresh */}
        <div className="flex items-center gap-3">
          <select
            value={limit}
            onChange={handleLimitChange}
            className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] text-xs font-heading font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF765E]/20"
          >
            <option value={10}>Top 10</option>
            <option value={50}>Top 50</option>
            <option value={100}>Top 100</option>
          </select>

          <button
            onClick={() => fetchLeaderboard(timeframe, limit)}
            disabled={loading}
            className="p-2.5 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] hover:bg-[#FFFDF9] shadow-sm transition-colors"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 text-[#FF765E] ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans">
          {error}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white border border-[#F0E5DA] rounded-3xl overflow-hidden shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF8EF] text-[#687386] font-heading font-extrabold uppercase tracking-wider text-[11px] border-b border-[#F0E5DA]">
              <tr>
                <th className="p-4 font-extrabold text-center w-16">Rank</th>
                <th className="p-4 font-extrabold">User</th>
                <th className="p-4 font-extrabold text-right">Reels Tracked</th>
                <th className="p-4 font-extrabold text-center">Primary Platform</th>
                <th className="p-4 font-extrabold text-right">All-Time Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E5DA]/60 text-[#25334A]">
              {loading && leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#687386]">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF765E]" />
                    Compiling leaderboard ranks...
                  </td>
                </tr>
              ) : leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#687386] font-medium">
                    No leaderboard data available for this timeframe.
                  </td>
                </tr>
              ) : (
                leaderboard.map((item) => {
                  let rankBadge = (
                    <span className="font-heading font-extrabold text-sm text-[#687386]">{item.rank}</span>
                  );

                  if (item.rank === 1) {
                    rankBadge = (
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center mx-auto shadow-sm">
                        <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
                      </div>
                    );
                  } else if (item.rank === 2) {
                    rankBadge = (
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 border border-slate-300 flex items-center justify-center mx-auto shadow-sm">
                        <Medal className="w-4 h-4" />
                      </div>
                    );
                  } else if (item.rank === 3) {
                    rankBadge = (
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 border border-orange-300 flex items-center justify-center mx-auto shadow-sm">
                        <Trophy className="w-4 h-4" />
                      </div>
                    );
                  }

                  return (
                    <tr key={item.id} className="hover:bg-[#FFFDF9] transition-colors">
                      <td className="p-4 text-center">{rankBadge}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {item.avatarUrl ? (
                              <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm">{item.avatarEmoji || <UserIcon className="w-4 h-4 text-[#687386]" />}</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-heading font-bold text-sm text-[#25334A]">{item.displayName}</p>
                              {item.isAnonymous && (
                                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-slate-100 text-slate-600 font-bold">Anon</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#687386] font-mono">@{item.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-heading font-extrabold text-base text-[#25334A]">
                        {item.reels.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 rounded-full text-[10px] font-heading font-bold bg-[#FFF1E7] text-[#D9631E] border border-[#FFB36B]/30">
                          {item.primaryPlatform}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-[#687386]">
                        {item.totalReels.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
