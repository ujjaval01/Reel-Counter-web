import { useState, useEffect } from 'react';
import { PlaySquare, Flame, BarChart3, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface ReelAnalyticsViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function ReelAnalyticsView({ cache, setCache }: ReelAnalyticsViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchReels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/reels');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch reel analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchReels();
    }
  }, []);

  const stats = data?.reelsAnalytics;
  const pb = stats?.platformBreakdown;
  const totalPlatformReels = pb ? (pb.instagram + pb.youtube + pb.facebook + pb.snapchat) || 1 : 1;

  return (
    <div className="space-y-6">
      {/* Header Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Reel Consumption Deep Dive</h3>
          <p className="text-xs text-slate-400">Analysis of user scroll patterns and volume aggregates</p>
        </div>
        <button
          onClick={fetchReels}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#192334] border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Tracked Reels</span>
            <PlaySquare className="w-4 h-4 text-[#FF765E]" />
          </div>
          <p className="text-3xl font-black text-white">
            {stats ? stats.totalReels.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Across sampled active profiles</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Reels (IST)</span>
            <Flame className="w-4 h-4 text-[#FFB36B]" />
          </div>
          <p className="text-3xl font-black text-[#FF765E]">
            {stats ? stats.todayReels.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">From {stats?.activeUsersToday || 0} active users today</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Reels</span>
            <TrendingUp className="w-4 h-4 text-[#45BFA8]" />
          </div>
          <p className="text-3xl font-black text-white">
            {stats ? stats.weeklyReels.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Rolling 7-day cumulative count</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Reels / Active</span>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-black text-white">
            {stats ? stats.avgTodayReelsPerActive.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Average daily scrolls per active user</p>
        </div>
      </div>

      {/* Visual Platform Share Progress Bars */}
      <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Scroll Volume Share By Platform
        </h4>

        {pb && (
          <div className="space-y-4">
            {/* Instagram */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-400">Instagram Reels</span>
                <span className="text-slate-300 font-mono">
                  {pb.instagram.toLocaleString()} reels ({Math.round((pb.instagram / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.instagram / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>

            {/* YouTube */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-red-400">YouTube Shorts</span>
                <span className="text-slate-300 font-mono">
                  {pb.youtube.toLocaleString()} reels ({Math.round((pb.youtube / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.youtube / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-400">Facebook Reels</span>
                <span className="text-slate-300 font-mono">
                  {pb.facebook.toLocaleString()} reels ({Math.round((pb.facebook / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.facebook / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>

            {/* Snapchat */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-yellow-300">Snapchat Spotlight</span>
                <span className="text-slate-300 font-mono">
                  {pb.snapchat.toLocaleString()} reels ({Math.round((pb.snapchat / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.snapchat / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
