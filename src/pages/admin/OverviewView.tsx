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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl bg-[#E4F5EE] border border-[#45BFA8]/30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#45BFA8]/20 flex items-center justify-center text-[#2D8A78] shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#2D8A78]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-heading font-extrabold text-[#25334A]">System Read-Only Guard Active</span>
              <span className="px-2 py-0.5 text-[10px] font-heading font-extrabold rounded-full bg-[#2D8A78] text-white">
                LIVE
              </span>
            </div>
            <p className="text-xs text-[#687386] font-medium">
              IST Date: <span className="text-[#25334A] font-mono font-bold">{data?.istDate || 'UTC+5:30'}</span> &bull; Safe read queries only
            </p>
          </div>
        </div>

        <button
          onClick={fetchOverview}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-[#FFFDF9] border border-[#F0E5DA] text-[#25334A] text-xs font-heading font-bold shadow-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FF765E] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
          <span className="font-sans font-medium">{error}</span>
        </div>
      )}

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Total Users</span>
            <div className="w-10 h-10 rounded-2xl bg-[#FFE2D5] text-[#FF765E] flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#25334A]">
            {overview ? overview.totalUsers.toLocaleString() : '—'}
          </p>
          <p className="text-xs text-[#687386] mt-2 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#45BFA8]" />
            Firestore registered users
          </p>
        </div>

        {/* Active Today */}
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Active Today (IST)</span>
            <div className="w-10 h-10 rounded-2xl bg-[#E4F5EE] text-[#2D8A78] flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2D8A78]">
            {overview ? overview.activeUsersToday.toLocaleString() : '—'}
          </p>
          <p className="text-xs text-[#687386] mt-2 font-medium">
            Users who scrolled today in India timezone
          </p>
        </div>

        {/* Total Battles */}
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Friend Battles</span>
            <div className="w-10 h-10 rounded-2xl bg-[#FFF1E7] text-[#D9631E] flex items-center justify-center shadow-sm">
              <Swords className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#25334A]">
            {overview ? overview.totalBattles.toLocaleString() : '—'}
          </p>
          <p className="text-xs text-[#687386] mt-2 flex items-center gap-2 font-medium">
            <span className="text-[#FF765E] font-bold">{overview?.activeBattles || 0} active</span>
            &bull;
            <span>{overview?.completedBattles || 0} finished</span>
          </p>
        </div>

        {/* Deletion Requests */}
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Deletion Requests</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#25334A]">
            {overview ? overview.totalDeletionRequests.toLocaleString() : '—'}
          </p>
          <p className="text-xs text-[#687386] mt-2 font-medium">
            <span className="text-amber-600 font-bold">{overview?.pendingDeletionRequests || 0} Pending</span> review
          </p>
        </div>
      </div>

      {/* Reel Counts & Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Total Reels Card */}
        <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
                <PlaySquare className="w-4 h-4 text-[#FF765E]" />
                Reel Volume
              </h3>
              <span className="text-[10px] font-heading font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FFF1E7] text-[#D9631E]">
                Sampled
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-heading font-extrabold text-[#25334A]">
              {overview?.sampleTotalReels ? overview.sampleTotalReels.toLocaleString() : '0'}
            </p>
            <p className="text-xs text-[#687386] font-medium mt-1">Total tracked scrolls</p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0E5DA]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#687386] font-medium">Scrolled Today (IST):</span>
              <span className="font-heading font-extrabold text-sm text-[#FF765E]">
                {overview?.sampleTodayReels ? overview.sampleTodayReels.toLocaleString() : '0'} reels
              </span>
            </div>
          </div>
        </div>

        {/* Platform Share Overview */}
        <div className="lg:col-span-2 p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A]">
              Platform Distribution Overview
            </h3>
            <span className="text-xs text-[#687386] font-medium">Cumulative Counts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Instagram */}
            <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-[#FFE4E6]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-heading font-bold text-rose-600">Instagram</span>
                <span className="text-[10px] text-rose-400 font-medium">Reels</span>
              </div>
              <p className="text-2xl font-heading font-extrabold text-[#25334A]">
                {overview?.platforms?.instagram ? overview.platforms.instagram.toLocaleString() : '0'}
              </p>
            </div>

            {/* YouTube */}
            <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-heading font-bold text-red-600">YouTube</span>
                <span className="text-[10px] text-red-400 font-medium">Shorts</span>
              </div>
              <p className="text-2xl font-heading font-extrabold text-[#25334A]">
                {overview?.platforms?.youtube ? overview.platforms.youtube.toLocaleString() : '0'}
              </p>
            </div>

            {/* Facebook */}
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-heading font-bold text-blue-600">Facebook</span>
                <span className="text-[10px] text-blue-400 font-medium">Reels</span>
              </div>
              <p className="text-2xl font-heading font-extrabold text-[#25334A]">
                {overview?.platforms?.facebook ? overview.platforms.facebook.toLocaleString() : '0'}
              </p>
            </div>

            {/* Snapchat */}
            <div className="p-4 rounded-2xl bg-[#FEFCE8] border border-[#FEF9C3]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-heading font-bold text-amber-700">Snapchat</span>
                <span className="text-[10px] text-amber-500 font-medium">Spotlight</span>
              </div>
              <p className="text-2xl font-heading font-extrabold text-[#25334A]">
                {overview?.platforms?.snapchat ? overview.platforms.snapchat.toLocaleString() : '0'}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#687386] italic font-sans font-medium">
            * All counts are derived from direct Firestore aggregation & profiles. Read-only operations ensure zero Firestore quota abuse.
          </p>
        </div>
      </div>
    </div>
  );
}
