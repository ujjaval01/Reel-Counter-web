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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <Server className="w-5 h-5 text-[#2D8A78]" />
            System Health & Security Monitor
          </h3>
          <p className="text-xs font-sans text-[#687386] mt-0.5">Live inspection of Firestore connectivity, collections, and server status</p>
        </div>
        <button
          onClick={fetchSystem}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#F0E5DA] text-xs font-sans font-bold text-[#25334A] hover:bg-[#FFF8EF] hover:border-[#FF765E]/40 shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF765E]' : 'text-[#687386]'}`} />
          <span>Run Health Check</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans flex items-center gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Security Status Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E4F5EE] border border-[#45BFA8]/30 flex items-center justify-center text-[#2D8A78] shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-heading font-extrabold text-[#25334A] flex items-center gap-2">
                Strict Read-Only Enforcement
                <span className="px-2.5 py-0.5 text-[10px] font-heading font-bold rounded-full bg-[#E4F5EE] text-[#2D8A78] border border-[#45BFA8]/30">
                  SECURE
                </span>
              </h4>
              <p className="text-xs font-sans text-[#687386] mt-0.5">
                Zero write operations. Dashboard queries are strictly read-only to safeguard Firestore data integrity.
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right text-xs font-mono text-[#687386]">
            <p>Query Latency: <strong className="text-[#2D8A78]">{data?.latencyMs || 0} ms</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#F0E5DA] text-xs font-sans">
          <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA]">
            <span className="text-[#687386] font-mono text-[11px] block">Authenticated Admin UID:</span>
            <p className="text-[#25334A] font-mono font-bold text-xs mt-1 truncate">{data?.adminUid || 'Verified'}</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA]">
            <span className="text-[#687386] font-mono text-[11px] block">Server IST Timestamp:</span>
            <p className="text-[#25334A] font-mono font-bold text-xs mt-1">{data?.serverTimeIst || 'UTC+5:30'}</p>
          </div>
        </div>
      </div>

      {/* Firestore Collections Inventory */}
      <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
        <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
          <Database className="w-4 h-4 text-[#FF765E]" />
          Firestore Collection Document Counts
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-xs font-bold text-[#687386]">users</span>
            <p className="text-3xl font-heading font-extrabold text-[#25334A] mt-1">
              {collections?.users != null ? collections.users.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-[#8B95A5] mt-1">User profiles & stats</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-xs font-bold text-[#687386]">battles</span>
            <p className="text-3xl font-heading font-extrabold text-[#F7931A] mt-1">
              {collections?.battles != null ? collections.battles.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-[#8B95A5] mt-1">Friend PvP challenges</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-xs font-bold text-[#687386]">friends</span>
            <p className="text-3xl font-heading font-extrabold text-[#2D8A78] mt-1">
              {collections?.friends != null ? collections.friends.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-[#8B95A5] mt-1">Friend connections</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-xs font-bold text-[#687386]">account_deletion_requests</span>
            <p className="text-3xl font-heading font-extrabold text-purple-600 mt-1">
              {collections?.account_deletion_requests != null ? collections.account_deletion_requests.toLocaleString() : '—'}
            </p>
            <p className="text-[10px] text-[#8B95A5] mt-1">Play Store deletion logs</p>
          </div>
        </div>
      </div>

      {/* Data Integrity Check */}
      <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
        <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#2D8A78]" />
          Schema & Field Integrity (Sampled {integrity?.sampledProfiles || 0} profiles)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-[#687386] font-semibold text-xs">Missing Display Name:</span>
            <p className={`text-xl font-heading font-extrabold mt-1 ${integrity?.missingDisplayName ? 'text-amber-600' : 'text-[#2D8A78]'}`}>
              {integrity?.missingDisplayName || 0}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-[#687386] font-semibold text-xs">Missing Today Date:</span>
            <p className={`text-xl font-heading font-extrabold mt-1 ${integrity?.missingTodayDate ? 'text-amber-600' : 'text-[#2D8A78]'}`}>
              {integrity?.missingTodayDate || 0}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-[#687386] font-semibold text-xs">Missing totalReels:</span>
            <p className={`text-xl font-heading font-extrabold mt-1 ${integrity?.missingTotalReels ? 'text-amber-600' : 'text-[#2D8A78]'}`}>
              {integrity?.missingTotalReels || 0}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA]">
            <span className="text-[#687386] font-semibold text-xs">Guest / Anon Users:</span>
            <p className="text-xl font-heading font-extrabold text-[#25334A] mt-1">
              {integrity?.anonymousCount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
