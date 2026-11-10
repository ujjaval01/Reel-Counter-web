import { useState, useEffect } from 'react';
import { PieChart, RefreshCw, AlertCircle, Award } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface PlatformAnalyticsViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function PlatformAnalyticsView({ cache, setCache }: PlatformAnalyticsViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchPlatformStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/platform-stats');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch platform analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchPlatformStats();
    }
  }, []);

  const platforms: any[] = data?.platforms || [];
  const topPlatform = [...platforms].sort((a, b) => b.totalReels - a.totalReels)[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#FF765E]" />
            Supported Platform Market Share
          </h3>
          <p className="text-xs text-slate-400">Comparing Instagram, YouTube Shorts, Facebook Reels, and Snapchat</p>
        </div>
        <button
          onClick={fetchPlatformStats}
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

      {/* Top Dominant Platform Banner */}
      {topPlatform && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#192334] via-[#212E42] to-[#192334] border border-slate-700/80 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Dominant Platform</span>
              <h4 className="text-xl font-black text-white">{topPlatform.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Accounts for <span className="font-bold text-white">{topPlatform.percentage}%</span> of all short-form video consumption.
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-white">{topPlatform.totalReels.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400">reels logged</p>
          </div>
        </div>
      )}

      {/* 4 Platform Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((p) => (
          <div key={p.key} className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: p.color }}>
                  {p.name}
                </span>
                <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {p.percentage}%
                </span>
              </div>
              <p className="text-2xl font-black text-white">{p.totalReels.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-0.5">Total reels</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Active Users:</span>
                <span className="font-semibold text-white">{p.activeUserCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Adoption Rate:</span>
                <span className="font-semibold text-white">{p.adoptionRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
