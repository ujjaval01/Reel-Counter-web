import { useState, useEffect } from 'react';
import { 
  TrendingUp, RefreshCw, AlertCircle, ShieldCheck, UserX, 
  Calendar, Clock, Smartphone, Sparkles, Flame 
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { Skeleton } from './AdminSkeleton';

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
  const versions: any[] = data?.versions || [];
  const rawPeakHours = data?.peakHours;
  let peakHoursList: { interval: string; count: number; percentage: number }[] = [];
  if (Array.isArray(rawPeakHours)) {
    peakHoursList = rawPeakHours.map((item: any) => ({
      interval: typeof item?.interval === 'string' ? item.interval : String(item?.interval || 'General Hours'),
      count: Number(item?.count) || 0,
      percentage: Number(item?.percentage) || 0,
    }));
  } else if (rawPeakHours && typeof rawPeakHours === 'object') {
    peakHoursList = Object.entries(rawPeakHours).map(([key, val]: [string, any]) => {
      if (typeof val === 'object' && val !== null) {
        return {
          interval: typeof val.interval === 'string' ? val.interval : key,
          count: Number(val.count) || 0,
          percentage: Number(val.percentage) || 0,
        };
      }
      return {
        interval: key,
        count: Number(val) || 0,
        percentage: 0,
      };
    });
  }
  const totalSampled = data?.totalSampled || 1;

  const googlePct = authTypes ? Math.round((authTypes.google / totalSampled) * 100) : 0;
  const anonPct = authTypes ? Math.round((authTypes.anonymous / totalSampled) * 100) : 0;

  // Compute SVG Area & Line Chart Paths
  const chartHeight = 160;
  const chartWidth = 600;
  const paddingX = 30;
  const paddingY = 20;

  let points: { x: number; y: number; date: string; count: number }[] = [];
  let pathD = '';
  let areaD = '';

  if (timeline.length > 0) {
    const counts = timeline.map((t) => t.count);
    const maxCount = Math.max(...counts, 5);
    const minCount = 0;
    const range = maxCount - minCount || 1;

    const effectiveWidth = chartWidth - paddingX * 2;
    const effectiveHeight = chartHeight - paddingY * 2;
    const step = timeline.length > 1 ? effectiveWidth / (timeline.length - 1) : 0;

    points = timeline.map((item, idx) => {
      const x = paddingX + (timeline.length === 1 ? effectiveWidth / 2 : idx * step);
      const y = chartHeight - paddingY - ((item.count - minCount) / range) * effectiveHeight;
      return { x, y, date: item.date, count: item.count };
    });

    if (points.length === 1) {
      pathD = `M ${paddingX} ${points[0].y} L ${chartWidth - paddingX} ${points[0].y}`;
      areaD = `M ${paddingX} ${points[0].y} L ${chartWidth - paddingX} ${points[0].y} L ${chartWidth - paddingX} ${chartHeight - paddingY} L ${paddingX} ${chartHeight - paddingY} Z`;
    } else {
      // Build smooth cubic bezier curve
      pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const cx1 = curr.x + (next.x - curr.x) / 2;
        const cy1 = curr.y;
        const cx2 = curr.x + (next.x - curr.x) / 2;
        const cy2 = next.y;
        pathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${next.x} ${next.y}`;
      }
      const last = points[points.length - 1];
      const first = points[0];
      areaD = `${pathD} L ${last.x} ${chartHeight - paddingY} L ${first.x} ${chartHeight - paddingY} Z`;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2D8A78]" />
            User Acquisition & Growth
          </h3>
          <p className="text-xs text-[#687386] font-medium">Growth velocity, active app versions, and peak scroller windows</p>
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

      {/* SVG Growth Trajectory Chart */}
      <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-[#FF765E] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Acquisition Velocity
            </span>
            <h4 className="text-base font-heading font-extrabold text-[#25334A]">
              Daily User Registrations (SVG Timeline)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-[#687386]">
            {timeline.length} Daily Data Points
          </span>
        </div>

        {loading && !data ? (
          <div className="h-44 w-full flex items-center justify-center">
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        ) : points.length > 0 ? (
          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF765E" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#FF765E" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#F0E5DA" strokeDasharray="4 4" strokeWidth="1" />
              <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#F0E5DA" strokeDasharray="4 4" strokeWidth="1" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#F0E5DA" strokeWidth="1" />

              {/* Area Gradient Fill */}
              <path d={areaD} fill="url(#growthAreaGradient)" />

              {/* Main Line */}
              <path d={pathD} fill="none" stroke="#FF765E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Points */}
              {points.map((p, idx) => (
                <g key={idx} className="group">
                  <circle cx={p.x} cy={p.y} r="4.5" fill="#FFFFFF" stroke="#FF765E" strokeWidth="2.5" className="transition-all hover:scale-150" />
                  <title>{`${p.date}: ${p.count} registrations`}</title>
                </g>
              ))}
            </svg>

            {/* Date Range Footer */}
            <div className="flex items-center justify-between text-[11px] text-[#687386] font-mono pt-2 border-t border-[#F0E5DA]">
              <span>{points[0]?.date}</span>
              <span className="text-[#25334A] font-heading font-extrabold">Active Growth Curve</span>
              <span>{points[points.length - 1]?.date}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#687386] italic py-6 text-center font-medium">No registrations timeline data available.</p>
        )}
      </div>

      {/* Auth Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {loading && !data ? (
          <>
            <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-40 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-xl" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
            <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-40 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-xl" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Analytics Insights: Peak Scrolling Hours & App Version Adoption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Peak Hours Card */}
        <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF765E]" />
              Peak Scrolling Hours (India IST)
            </h4>
            <span className="text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full bg-[#E4F5EE] text-[#2D8A78] border border-[#45BFA8]/30">
              UTC+5:30
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {peakHoursList.length > 0 ? (
              peakHoursList.map((item: any, idx: number) => {
                const isPeak = idx === 0 && item.count > 0;
                return (
                  <div key={item.interval} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-bold text-[#25334A] flex items-center gap-1.5">
                        {item.interval}
                        {isPeak && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFF1E7] text-[#FF765E] text-[10px] font-heading font-extrabold">
                            <Flame className="w-3 h-3 fill-[#FF765E]" /> Prime Peak
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[#687386] font-bold">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FFF1E7] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPeak ? 'bg-gradient-to-r from-[#FF765E] to-rose-500' : 'bg-[#FFB36B]'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-[#687386] italic py-4">No scrolling activity logged yet.</p>
            )}
          </div>
        </div>

        {/* App Version Distribution */}
        <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#2D8A78]" />
              App Version Adoption
            </h4>
            <span className="text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFF1E7] text-[#D9631E] border border-[#FFB36B]/30">
              Android Release
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {versions.length > 0 ? (
              versions.map((v) => (
                <div key={v.version} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-extrabold text-[#25334A] font-mono">
                      {v.version}
                    </span>
                    <span className="font-mono text-[#687386] font-bold">
                      {v.count} scrollers ({v.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E4F5EE] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2D8A78] to-[#45BFA8] transition-all duration-500"
                      style={{ width: `${v.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#687386] italic py-4">No client version telemetry detected yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Signups Timeline Table */}
      <div className="p-7 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
        <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF765E]" />
          Recent Daily Registration Log
        </h4>

        {loading && !data ? (
          <div className="max-h-64 overflow-y-auto rounded-2xl border border-[#F0E5DA]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF8EF] text-[#687386] font-heading font-extrabold uppercase tracking-wider sticky top-0 border-b border-[#F0E5DA]">
                <tr>
                  <th className="p-3 font-extrabold">Date</th>
                  <th className="p-3 font-extrabold text-right">New Users Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E5DA]/60 text-[#25334A]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-[#FFFDF9] transition-colors">
                    <td className="p-3"><Skeleton className="h-3.5 w-24 rounded" /></td>
                    <td className="p-3 flex justify-end"><Skeleton className="h-3.5 w-16 rounded" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : timeline.length > 0 ? (
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