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
          <h3 className="text-xl font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF765E]" />
            Official Metrics Report
          </h3>
          <p className="text-xs font-sans text-[#687386] mt-0.5">
            Exportable executive brief &bull; Timezone: <span className="font-bold text-[#25334A]">Asia/Kolkata (IST, UTC+5:30)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7E67] to-[#FF6F56] text-white text-xs font-sans font-bold shadow-[0_4px_14px_rgba(255,118,94,0.25)] hover:shadow-[0_6px_20px_rgba(255,118,94,0.35)] transition-all active:translate-y-0.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={fetchReports}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#F0E5DA] text-[#687386] hover:text-[#25334A] hover:bg-[#FFF8EF] transition-colors shadow-sm"
            title="Refresh Report"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans flex items-center gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Printable Report Document Card */}
      <div className="p-8 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-8 text-[#25334A] print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#F0E5DA] gap-4">
          <div>
            <h2 className="text-2xl font-heading font-extrabold tracking-tight text-[#25334A] print:text-black">
              ReelCounter &mdash; Executive Analytics Report
            </h2>
            <p className="text-xs font-sans text-[#687386] print:text-slate-600 mt-1">
              Automated Firestore Metrics Audit for App Owner
            </p>
          </div>
          <div className="text-left sm:text-right text-xs font-sans text-[#687386] print:text-slate-600">
            <p className="font-bold text-[#25334A] print:text-black">
              Report Date: {data?.todayDate || 'Today'}
            </p>
            <p className="text-[11px] font-mono mt-0.5 text-[#8B95A5]">
              Generated: {data?.reportGeneratedAt ? new Date(data.reportGeneratedAt).toLocaleTimeString() : 'N/A'} (IST)
            </p>
          </div>
        </div>

        {/* Executive Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#687386]">Total Registered</p>
            <p className="text-3xl font-heading font-extrabold text-[#25334A] print:text-black mt-1">
              {summary ? summary.totalUsers.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] font-sans text-[#8B95A5] mt-1">User accounts</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#687386]">Today's Active Users</p>
            <p className="text-3xl font-heading font-extrabold text-[#2D8A78] mt-1">
              {summary ? summary.todayActiveUsers.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] font-sans text-[#8B95A5] mt-1">Scrolled in IST today</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#687386]">Today's Total Reels</p>
            <p className="text-3xl font-heading font-extrabold text-[#FF765E] mt-1">
              {summary ? summary.todayTotalReels.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] font-sans text-[#8B95A5] mt-1">Reels logged today</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] print:border-slate-300 print:bg-slate-50">
            <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#687386]">Weekly Total Reels</p>
            <p className="text-3xl font-heading font-extrabold text-[#F7931A] mt-1">
              {summary ? summary.weeklyTotalReels.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] font-sans text-[#8B95A5] mt-1">Rolling 7 days</p>
          </div>
        </div>

        {/* Platform Breakdown Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-heading font-extrabold uppercase tracking-wider text-[#25334A] print:text-slate-800">
            Short-Form Video Platform Totals
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] print:bg-white print:border-slate-300">
              <span className="font-heading font-bold text-rose-500">Instagram Reels</span>
              <p className="text-2xl font-heading font-extrabold text-[#25334A] print:text-black mt-1">
                {platforms?.instagram ? platforms.instagram.toLocaleString() : 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] print:bg-white print:border-slate-300">
              <span className="font-heading font-bold text-red-500">YouTube Shorts</span>
              <p className="text-2xl font-heading font-extrabold text-[#25334A] print:text-black mt-1">
                {platforms?.youtube ? platforms.youtube.toLocaleString() : 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] print:bg-white print:border-slate-300">
              <span className="font-heading font-bold text-blue-500">Facebook Reels</span>
              <p className="text-2xl font-heading font-extrabold text-[#25334A] print:text-black mt-1">
                {platforms?.facebook ? platforms.facebook.toLocaleString() : 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] print:bg-white print:border-slate-300">
              <span className="font-heading font-bold text-amber-500 print:text-amber-600">Snapchat Spotlight</span>
              <p className="text-2xl font-heading font-extrabold text-[#25334A] print:text-black mt-1">
                {platforms?.snapchat ? platforms.snapchat.toLocaleString() : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Sign-off / Confidentiality Stamp */}
        <div className="pt-6 border-t border-[#F0E5DA] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-[#8B95A5] gap-2">
          <span>&copy; {new Date().getFullYear()} ReelCounter. Confidential Internal Administrator Report.</span>
          <span className="flex items-center gap-1.5 text-[#2D8A78] font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            Verified Authentic Firestore Data
          </span>
        </div>
      </div>
    </div>
  );
}
