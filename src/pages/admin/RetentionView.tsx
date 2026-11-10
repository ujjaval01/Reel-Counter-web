import { useState, useEffect } from 'react';
import { Activity, RefreshCw, AlertCircle, Zap } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface RetentionViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function RetentionView({ cache, setCache }: RetentionViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchRetention = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/retention');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch retention metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchRetention();
    }
  }, []);

  const tiers: any[] = data?.tiers || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF765E]" />
            User Retention & Activity Buckets
          </h3>
          <p className="text-xs text-slate-400">Classifying user habits by total scroll volume</p>
        </div>
        <button
          onClick={fetchRetention}
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

      {/* High-Level Engagement Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sample Size</span>
          <p className="text-3xl font-black text-white mt-2">{data?.totalSampled || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Users analyzed</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Today (IST)</span>
          <p className="text-3xl font-black text-[#45BFA8] mt-2">{data?.activeToday || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Recorded scrolls today</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Engagement Ratio</span>
          <p className="text-3xl font-black text-[#FFB36B] mt-2">{data?.engagementRate || 0}%</p>
          <p className="text-xs text-slate-500 mt-1">Users with totalReels &gt; 0</p>
        </div>
      </div>

      {/* Scroll Volume Tiers */}
      <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF765E]" />
            Scroll Volume Frequency Buckets
          </h4>
          <span className="text-xs text-slate-400">User Distribution</span>
        </div>

        <div className="space-y-4">
          {tiers.map((t, idx) => {
            const barColors = [
              'bg-blue-500',
              'bg-emerald-500',
              'bg-amber-500',
              'bg-rose-500',
            ];
            return (
              <div key={t.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{t.label}</span>
                  <span className="text-slate-400 font-mono">
                    <strong className="text-white">{t.count}</strong> users ({t.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${barColors[idx % barColors.length]} rounded-full transition-all duration-500`}
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
