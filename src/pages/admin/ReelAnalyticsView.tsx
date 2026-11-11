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
          <h3 className="text-base font-heading font-extrabold text-[#25334A]">Reel Consumption Deep Dive</h3>
          <p className="text-xs text-[#687386] font-medium">Analysis of user scroll patterns and volume aggregates</p>
        </div>
        <button
          onClick={fetchReels}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-[#FFFDF9] border border-[#F0E5DA] text-xs font-heading font-bold text-[#25334A] shadow-sm transition-all hover:-translate-y-0.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FF765E] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span className="font-sans font-medium">{error}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Total Tracked Reels</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFE2D5] text-[#FF765E] flex items-center justify-center">
              <PlaySquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-extrabold text-[#25334A]">
            {stats ? stats.totalReels.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-[#687386] mt-1 font-medium">Across active profiles</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Today's Reels (IST)</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF1E7] text-[#D9631E] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-extrabold text-[#FF765E]">
            {stats ? stats.todayReels.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-[#687386] mt-1 font-medium">From {stats?.activeUsersToday || 0} active users today</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Weekly Reels</span>
            <div className="w-8 h-8 rounded-xl bg-[#E4F5EE] text-[#2D8A78] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-extrabold text-[#25334A]">
            {stats ? stats.weeklyReels.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-[#687386] mt-1 font-medium">Rolling 7-day cumulative count</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Avg Reels / Active</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-extrabold text-[#25334A]">
            {stats ? stats.avgTodayReelsPerActive.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-[#687386] mt-1 font-medium">Average daily scrolls per active user</p>
        </div>
      </div>

      {/* Visual Platform Share Progress Bars */}
      <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-6">
        <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A]">
          Scroll Volume Share By Platform
        </h4>

        {pb && (
          <div className="space-y-4">
            {/* Instagram */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-rose-600">Instagram Reels</span>
                <span className="text-[#25334A] font-mono font-bold">
                  {pb.instagram.toLocaleString()} reels ({Math.round((pb.instagram / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#FFF1E7] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.instagram / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>

            {/* YouTube */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-red-600">YouTube Shorts</span>
                <span className="text-[#25334A] font-mono font-bold">
                  {pb.youtube.toLocaleString()} reels ({Math.round((pb.youtube / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#FFF1E7] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.youtube / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-blue-600">Facebook Reels</span>
                <span className="text-[#25334A] font-mono font-bold">
                  {pb.facebook.toLocaleString()} reels ({Math.round((pb.facebook / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#FFF1E7] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((pb.facebook / totalPlatformReels) * 100)}%` }}
                />
              </div>
            </div>

            {/* Snapchat */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-amber-700">Snapchat Spotlight</span>
                <span className="text-[#25334A] font-mono font-bold">
                  {pb.snapchat.toLocaleString()} reels ({Math.round((pb.snapchat / totalPlatformReels) * 100)}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#FFF1E7] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
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
