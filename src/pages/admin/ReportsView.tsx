import { useState, useEffect } from 'react';
import { FileText, Printer, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface ReportsViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function ReportsView({ cache, setCache }: ReportsViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/reports');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to generate reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchReports();
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const summary = data?.summary;
  const platforms = summary?.platforms;

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF765E]" />
            Official Metrics Report
          </h3>
          <p className="text-xs text-slate-400">
            Exportable executive brief &bull; Timezone: <span className="font-semibold text-white">Asia/Kolkata (IST, UTC+5:30)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={fetchReports}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#192334] border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title="Refresh Report"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Printable Report Document Card */}
      <div className="p-8 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-2xl space-y-8 text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-700/80 gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white print:text-black">
              ReelCounter &mdash; Executive Analytics Report
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
              Automated Firestore Metrics Audit for App Owner
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-400 print:text-slate-600">
            <p className="font-semibold text-white print:text-black">
              Report Date: {data?.todayDate || 'Today'}
            </p>
            <p className="text-[11px] mt-0.5">
              Generated: {data?.reportGeneratedAt ? new Date(data.reportGeneratedAt).toLocaleTimeString() : 'N/A'} (IST)
            </p>
          </div>
        </div>

        {/* Executive Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800 print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Registered</p>
            <p className="text-2xl font-black text-white print:text-black mt-1">
              {summary ? summary.totalUsers.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">User accounts</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800 print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Active Users</p>
            <p className="text-2xl font-black text-[#45BFA8] mt-1">
              {summary ? summary.todayActiveUsers.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Scrolled in IST today</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800 print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Total Reels</p>
            <p className="text-2xl font-black text-[#FF765E] mt-1">
              {summary ? summary.todayTotalReels.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Reels logged today</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800 print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Weekly Total Reels</p>
            <p className="text-2xl font-black text-[#FFB36B] mt-1">
              {summary ? summary.weeklyTotalReels.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Rolling 7 days</p>
          </div>
        </div>

        {/* Platform Breakdown Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-slate-800">
            Short-Form Video Platform Totals
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 print:bg-white print:border-slate-300">
              <span className="font-bold text-rose-400">Instagram Reels</span>
              <p className="text-xl font-bold text-white print:text-black mt-1">
                {platforms?.instagram ? platforms.instagram.toLocaleString() : 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 print:bg-white print:border-slate-300">
              <span className="font-bold text-red-400">YouTube Shorts</span>
              <p className="text-xl font-bold text-white print:text-black mt-1">
                {platforms?.youtube ? platforms.youtube.toLocaleString() : 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 print:bg-white print:border-slate-300">
              <span className="font-bold text-blue-400">Facebook Reels</span>
              <p className="text-xl font-bold text-white print:text-black mt-1">
                {platforms?.facebook ? platforms.facebook.toLocaleString() : 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 print:bg-white print:border-slate-300">
              <span className="font-bold text-yellow-300 print:text-amber-600">Snapchat Spotlight</span>
              <p className="text-xl font-bold text-white print:text-black mt-1">
                {platforms?.snapchat ? platforms.snapchat.toLocaleString() : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Sign-off / Confidentiality Stamp */}
        <div className="pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} ReelCounter. Confidential Internal Administrator Report.</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            Verified Authentic Firestore Data
          </span>
        </div>
      </div>
    </div>
  );
}
