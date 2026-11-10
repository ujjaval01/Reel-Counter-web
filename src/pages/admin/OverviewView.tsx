import { useState, useEffect } from 'react';
import { Users, Activity, Swords, ShieldCheck, RefreshCw, AlertTriangle, PlaySquare, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface OverviewViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function OverviewView({ cache, setCache }: OverviewViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/overview');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch overview metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchOverview();
    }
  }, []);

  const overview = data?.overview;

  return (
    <div className="space-y-6">
      {/* Top Banner / System Health Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#192334] border border-slate-700/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">System Read-Only Guard Active</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              IST Date: <span className="text-white font-mono">{data?.istDate || 'UTC+5:30'}</span> &bull; Safe read queries only
            </p>
          </div>
        </div>

        <button
          onClick={fetchOverview}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF765E]/10 text-[#FF765E] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">
            {overview ? overview.totalUsers.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#45BFA8]" />
            Firestore publicProfile documents
          </p>
        </div>

        {/* Active Today */}
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Today (IST)</span>
            <div className="w-8 h-8 rounded-xl bg-[#45BFA8]/10 text-[#45BFA8] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#45BFA8]">
            {overview ? overview.activeUsersToday.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            Users who scrolled today in India timezone
          </p>
        </div>

        {/* Total Battles */}
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Friend Battles</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFB36B]/10 text-[#FFB36B] flex items-center justify-center">
              <Swords className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">
            {overview ? overview.totalBattles.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-2">
            <span className="text-[#FF765E] font-semibold">{overview?.activeBattles || 0} active</span>
            &bull;
            <span>{overview?.completedBattles || 0} finished</span>
          </p>
        </div>

        {/* Deletion Requests */}
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Deletion Requests</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">
            {overview ? overview.totalDeletionRequests.toLocaleString() : '—'}
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            <span className="text-amber-400 font-semibold">{overview?.pendingDeletionRequests || 0} Pending</span> review
          </p>
        </div>
      </div>

      {/* Reel Counts & Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Total Reels Card */}
        <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <PlaySquare className="w-4 h-4 text-[#FF765E]" />
                Reel Volume
              </h3>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                Sampled
              </span>
            </div>
            <p className="text-4xl font-black text-white">
              {overview?.sampleTotalReels ? overview.sampleTotalReels.toLocaleString() : '0'}
            </p>
            <p className="text-xs text-slate-400 mt-1">Total tracked scrolls</p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Scrolled Today (IST):</span>
              <span className="font-extrabold text-[#FF765E]">
                {overview?.sampleTodayReels ? overview.sampleTodayReels.toLocaleString() : '0'} reels
              </span>
            </div>
          </div>
        </div>

        {/* Platform Share Overview */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Platform Distribution Overview
            </h3>
            <span className="text-xs text-slate-400">Cumulative Counts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Instagram */}
            <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-400">Instagram</span>
                <span className="text-[10px] text-slate-500">Reels</span>
              </div>
              <p className="text-xl font-black text-white">
                {overview?.platforms?.instagram ? overview.platforms.instagram.toLocaleString() : '0'}
              </p>
            </div>

            {/* YouTube */}
            <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-red-400">YouTube</span>
                <span className="text-[10px] text-slate-500">Shorts</span>
              </div>
              <p className="text-xl font-black text-white">
                {overview?.platforms?.youtube ? overview.platforms.youtube.toLocaleString() : '0'}
              </p>
            </div>

            {/* Facebook */}
            <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-400">Facebook</span>
                <span className="text-[10px] text-slate-500">Reels</span>
              </div>
              <p className="text-xl font-black text-white">
                {overview?.platforms?.facebook ? overview.platforms.facebook.toLocaleString() : '0'}
              </p>
            </div>

            {/* Snapchat */}
            <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-yellow-300">Snapchat</span>
                <span className="text-[10px] text-slate-500">Spotlight</span>
              </div>
              <p className="text-xl font-black text-white">
                {overview?.platforms?.snapchat ? overview.platforms.snapchat.toLocaleString() : '0'}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            * All counts are derived from direct Firestore aggregation & profiles. Read-only operations ensure zero Firestore quota abuse.
          </p>
        </div>
      </div>
    </div>
  );
}
