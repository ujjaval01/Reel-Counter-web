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
        <div className="inline-flex p-1.5 rounded-2xl bg-[#192334] border border-slate-700/80">
          <button
            onClick={() => handleTimeframeChange('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              timeframe === 'all'
                ? 'bg-[#FF765E] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All-Time
          </button>
          <button
            onClick={() => handleTimeframeChange('weekly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-[#FF765E] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleTimeframeChange('today')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              timeframe === 'today'
                ? 'bg-[#FF765E] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
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
            className="px-3.5 py-2 rounded-2xl bg-[#192334] border border-slate-700/80 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
          >
            <option value={10}>Top 10</option>
            <option value={50}>Top 50</option>
            <option value={100}>Top 100</option>
          </select>

          <button
            onClick={() => fetchLeaderboard(timeframe, limit)}
            disabled={loading}
            className="p-2.5 rounded-2xl bg-[#192334] border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-[#192334] border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#131B29] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700/60">
              <tr>
                <th className="p-4 font-semibold text-center w-16">Rank</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold text-right">Reels Tracked</th>
                <th className="p-4 font-semibold text-center">Primary Platform</th>
                <th className="p-4 font-semibold text-right">All-Time Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading && leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF765E]" />
                    Compiling leaderboard ranks...
                  </td>
                </tr>
              ) : leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No leaderboard data available for this timeframe.
                  </td>
                </tr>
              ) : (
                leaderboard.map((item) => {
                  let rankBadge = (
                    <span className="font-extrabold text-slate-400">{item.rank}</span>
                  );

                  if (item.rank === 1) {
                    rankBadge = (
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center mx-auto shadow-sm">
                        <Crown className="w-4 h-4 fill-amber-400" />
                      </div>
                    );
                  } else if (item.rank === 2) {
                    rankBadge = (
                      <div className="w-8 h-8 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 flex items-center justify-center mx-auto shadow-sm">
                        <Medal className="w-4 h-4" />
                      </div>
                    );
                  } else if (item.rank === 3) {
                    rankBadge = (
                      <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-600 border border-amber-700/40 flex items-center justify-center mx-auto shadow-sm">
                        <Trophy className="w-4 h-4" />
                      </div>
                    );
                  }

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 text-center">{rankBadge}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center overflow-hidden shrink-0">
                            {item.avatarUrl ? (
                              <img src={item.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm">{item.avatarEmoji || <UserIcon className="w-4 h-4 text-slate-400" />}</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-white">{item.displayName}</p>
                              {item.isAnonymous && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-700 text-slate-400">Anon</span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400">@{item.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-black text-lg text-white">
                        {item.reels.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {item.primaryPlatform}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-slate-400">
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

