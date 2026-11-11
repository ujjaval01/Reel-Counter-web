import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, AlertCircle, ShieldCheck, UserX, Calendar } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface GrowthViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function GrowthView({ cache, setCache }: GrowthViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchGrowth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/growth');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch user growth data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchGrowth();
    }
  }, []);

  const authTypes = data?.authTypes;
  const timeline: any[] = data?.timeline || [];
  const totalSampled = data?.totalSampled || 1;

  const googlePct = authTypes ? Math.round((authTypes.google / totalSampled) * 100) : 0;
  const anonPct = authTypes ? Math.round((authTypes.anonymous / totalSampled) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2D8A78]" />
            User Acquisition & Growth
          </h3>
          <p className="text-xs text-[#687386] font-medium">Signup dynamics and account authentication breakdown</p>
        </div>
        <button
          onClick={fetchGrowth}
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

      {/* Auth Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Google Users */}
        <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] flex items-center justify-between">
          <div>
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#2D8A78] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#2D8A78]" />
              Google Verified Accounts
            </span>
            <p className="text-3xl font-heading font-extrabold text-[#25334A]">{authTypes?.google || 0}</p>
            <p className="text-xs text-[#687386] font-medium mt-1">{googlePct}% of total accounts</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[#E4F5EE] border-t-[#2D8A78] flex items-center justify-center font-heading font-extrabold text-sm text-[#25334A] shadow-sm">
            {googlePct}%
          </div>
        </div>

        {/* Anonymous Users */}
        <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] flex items-center justify-between">
          <div>
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#D9631E] flex items-center gap-1.5 mb-1">
              <UserX className="w-4 h-4 text-[#D9631E]" />
              Anonymous Guest Accounts
            </span>
            <p className="text-3xl font-heading font-extrabold text-[#25334A]">{authTypes?.anonymous || 0}</p>
            <p className="text-xs text-[#687386] font-medium mt-1">{anonPct}% of total accounts</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[#FFF1E7] border-t-[#D9631E] flex items-center justify-center font-heading font-extrabold text-sm text-[#25334A] shadow-sm">
            {anonPct}%
          </div>
        </div>
      </div>

      {/* Signups Timeline Table */}
      <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
        <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF765E]" />
          Recent Daily Registration Log
        </h4>

        {timeline.length > 0 ? (
          <div className="max-h-64 overflow-y-auto rounded-2xl border border-[#F0E5DA]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF8EF] text-[#687386] font-heading font-extrabold uppercase tracking-wider sticky top-0 border-b border-[#F0E5DA]">
                <tr>
                  <th className="p-3 font-extrabold">Date</th>
                  <th className="p-3 font-extrabold text-right">New Users Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E5DA]/60 text-[#25334A]">
                {timeline.map((item) => (
                  <tr key={item.date} className="hover:bg-[#FFFDF9] transition-colors">
                    <td className="p-3 font-mono text-[#25334A]">{item.date}</td>
                    <td className="p-3 text-right font-heading font-extrabold text-[#2D8A78]">{item.count} users</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-[#687386] italic py-4 font-medium">No registration timeline data found yet.</p>
        )}
      </div>
    </div>
  );
}
