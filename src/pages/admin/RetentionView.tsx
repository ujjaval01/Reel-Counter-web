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
          <h3 className="text-base font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF765E]" />
            User Retention & Activity Buckets
          </h3>
          <p className="text-xs text-[#687386] font-medium">Classifying user habits by total scroll volume</p>
        </div>
        <button
          onClick={fetchRetention}
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

      {/* High-Level Engagement Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Sample Size</span>
          <p className="text-3xl font-heading font-extrabold text-[#25334A] mt-2">{data?.totalSampled || 0}</p>
          <p className="text-xs text-[#687386] mt-1 font-medium">Users analyzed</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Active Today (IST)</span>
          <p className="text-3xl font-heading font-extrabold text-[#2D8A78] mt-2">{data?.activeToday || 0}</p>
          <p className="text-xs text-[#687386] mt-1 font-medium">Recorded scrolls today</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#687386]">Engagement Ratio</span>
          <p className="text-3xl font-heading font-extrabold text-[#D9631E] mt-2">{data?.engagementRate || 0}%</p>
          <p className="text-xs text-[#687386] mt-1 font-medium">Users with totalReels &gt; 0</p>
        </div>
      </div>

      {/* Scroll Volume Tiers */}
      <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF765E]" />
            Scroll Volume Frequency Buckets
          </h4>
          <span className="text-xs text-[#687386] font-medium">User Distribution</span>
        </div>

        <div className="space-y-4">
          {tiers.map((t, idx) => {
            const barColors = [
              'bg-blue-500',
              'bg-[#45BFA8]',
              'bg-[#FFB36B]',
              'bg-[#FF765E]',
            ];
            return (
              <div key={t.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold text-[#25334A]">{t.label}</span>
                  <span className="text-[#687386] font-mono text-xs">
                    <strong className="text-[#25334A]">{t.count}</strong> users ({t.percentage}%)
                  </span>
                </div>
                <div className="h-3 rounded-full bg-[#FFF1E7] overflow-hidden">
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
