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
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#45BFA8]" />
            User Acquisition & Growth
          </h3>
          <p className="text-xs text-slate-400">Signup dynamics and account authentication breakdown</p>
        </div>
        <button
          onClick={fetchGrowth}
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

      {/* Auth Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Google Users */}
        <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4" />
              Google Verified Accounts
            </span>
            <p className="text-3xl font-black text-white">{authTypes?.google || 0}</p>
            <p className="text-xs text-slate-400 mt-1">{googlePct}% of total accounts</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 flex items-center justify-center font-bold text-sm text-white">
            {googlePct}%
          </div>
        </div>

        {/* Anonymous Users */}
        <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
              <UserX className="w-4 h-4" />
              Anonymous Guest Accounts
            </span>
            <p className="text-3xl font-black text-white">{authTypes?.anonymous || 0}</p>
            <p className="text-xs text-slate-400 mt-1">{anonPct}% of total accounts</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500 flex items-center justify-center font-bold text-sm text-white">
            {anonPct}%
          </div>
        </div>
      </div>

      {/* Signups Timeline Table */}
      <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF765E]" />
          Recent Daily Registration Log
        </h4>

        {timeline.length > 0 ? (
          <div className="max-h-64 overflow-y-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131B29] text-slate-400 sticky top-0">
                <tr>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold text-right">New Users Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {timeline.map((item) => (
                  <tr key={item.date} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-slate-300">{item.date}</td>
                    <td className="p-3 text-right font-extrabold text-[#45BFA8]">{item.count} users</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-4">No registration timeline data found yet.</p>
        )}
      </div>
    </div>
  );
}
