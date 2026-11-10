import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Database, Server, CheckCircle2, Lock } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface SystemViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function SystemView({ cache, setCache }: SystemViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchSystem = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/system');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to inspect system health');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchSystem();
    }
  }, []);

  const collections = data?.collections;
  const integrity = data?.integrityCheck;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-[#45BFA8]" />
            System Health & Security Monitor
          </h3>
          <p className="text-xs text-slate-400">Live inspection of Firestore connectivity, collections, and server status</p>
        </div>
        <button
          onClick={fetchSystem}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#192334] border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF765E]' : ''}`} />
          <span>Run Health Check</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Security Status Card */}
      <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Strict Read-Only Enforcement
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SECURE
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Zero write operations. Dashboard queries are strictly read-only to safeguard Firestore data integrity.
              </p>
            </div>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <p>Query Latency: <strong className="text-emerald-400">{data?.latencyMs || 0} ms</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 font-mono text-[11px]">Authenticated Admin UID:</span>
            <p className="text-slate-300 font-mono text-xs mt-0.5">{data?.adminUid || 'Verified'}</p>
          </div>
          <div>
            <span className="text-slate-500 font-mono text-[11px]">Server IST Timestamp:</span>
            <p className="text-slate-300 font-mono text-xs mt-0.5">{data?.serverTimeIst || 'UTC+5:30'}</p>
          </div>
        </div>
      </div>

      {/* Firestore Collections Inventory */}
      <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-xl space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Database className="w-4 h-4 text-[#FF765E]" />
          Firestore Collection Document Counts
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400 font-medium">users</span>
            <p className="text-2xl font-black text-white mt-1">
              {collections?.users != null ? collections.users.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">User profiles & stats</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400 font-medium">battles</span>
            <p className="text-2xl font-black text-[#FFB36B] mt-1">
              {collections?.battles != null ? collections.battles.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Friend PvP challenges</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400 font-medium">friends</span>
            <p className="text-2xl font-black text-[#45BFA8] mt-1">
              {collections?.friends != null ? collections.friends.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Friend connections</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400 font-medium">account_deletion_requests</span>
            <p className="text-2xl font-black text-purple-400 mt-1">
              {collections?.account_deletion_requests != null ? collections.account_deletion_requests.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Play Store deletion logs</p>
          </div>
        </div>
      </div>

      {/* Data Integrity Check */}
      <div className="p-6 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-xl space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#45BFA8]" />
          Schema & Field Integrity (Sampled {integrity?.sampledProfiles || 0} profiles)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400">Missing Display Name:</span>
            <p className={`text-lg font-bold mt-0.5 ${integrity?.missingDisplayName ? 'text-amber-400' : 'text-emerald-400'}`}>
              {integrity?.missingDisplayName || 0}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400">Missing Today Date:</span>
            <p className={`text-lg font-bold mt-0.5 ${integrity?.missingTodayDate ? 'text-amber-400' : 'text-emerald-400'}`}>
              {integrity?.missingTodayDate || 0}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400">Missing totalReels:</span>
            <p className={`text-lg font-bold mt-0.5 ${integrity?.missingTotalReels ? 'text-amber-400' : 'text-emerald-400'}`}>
              {integrity?.missingTotalReels || 0}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#131B29] border border-slate-800">
            <span className="text-slate-400">Guest / Anon Users:</span>
            <p className="text-lg font-bold text-slate-300 mt-0.5">
              {integrity?.anonymousCount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
