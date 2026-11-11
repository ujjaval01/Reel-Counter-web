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
          <h3 className="text-base font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#FF765E]" />
            Supported Platform Market Share
          </h3>
          <p className="text-xs text-[#687386] font-medium">Comparing Instagram, YouTube Shorts, Facebook Reels, and Snapchat</p>
        </div>
        <button
          onClick={fetchPlatformStats}
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

      {/* Top Dominant Platform Banner */}
      {topPlatform && (
        <div className="p-7 rounded-3xl bg-gradient-to-r from-[#FFF1E7] via-white to-[#FFF1E7] border border-[#FFB36B]/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE2D5] border border-[#FF765E]/30 flex items-center justify-center text-[#FF765E] shadow-sm">
              <Award className="w-7 h-7 text-[#D9631E]" />
            </div>
            <div>
              <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-[#D9631E]">Dominant Platform</span>
              <h4 className="text-2xl font-heading font-extrabold text-[#25334A]">{topPlatform.name}</h4>
              <p className="text-xs text-[#687386] font-medium mt-0.5">
                Accounts for <span className="font-heading font-extrabold text-[#25334A]">{topPlatform.percentage}%</span> of all short-form video consumption.
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-heading font-extrabold text-[#25334A]">{topPlatform.totalReels.toLocaleString()}</p>
            <p className="text-xs text-[#687386] font-medium">reels logged</p>
          </div>
        </div>
      )}

      {/* 4 Platform Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {platforms.map((p) => (
          <div key={p.key} className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-heading font-extrabold uppercase tracking-wider" style={{ color: p.color }}>
                  {p.name}
                </span>
                <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFF1E7] text-[#D9631E]">
                  {p.percentage}%
                </span>
              </div>
              <p className="text-3xl font-heading font-extrabold text-[#25334A]">{p.totalReels.toLocaleString()}</p>
              <p className="text-xs text-[#687386] font-medium mt-0.5">Total reels</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0E5DA] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#687386] font-medium">
                <span>Active Users:</span>
                <span className="font-heading font-bold text-[#25334A]">{p.activeUserCount}</span>
              </div>
              <div className="flex items-center justify-between text-[#687386] font-medium">
                <span>Adoption Rate:</span>
                <span className="font-heading font-bold text-[#25334A]">{p.adoptionRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
