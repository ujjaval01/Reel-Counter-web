import { useState, useEffect } from 'react';
import { Swords, RefreshCw, AlertCircle } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

interface BattlesViewProps {
  cache: any;
  setCache: (data: any) => void;
}

export default function BattlesView({ cache, setCache }: BattlesViewProps) {
  const { fetchAdminApi } = useAdminAuth();
  const [data, setData] = useState<any>(cache || null);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  const fetchBattles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminApi('/api/admin/battles');
      if (res?.success) {
        setData(res);
        setCache({ ...res, cachedAt: Date.now() });
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch battles data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) {
      fetchBattles();
    }
  }, []);

  const recentBattles: any[] = data?.recentBattles || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#FFB36B]" />
            Friend Battle Arena Monitor
          </h3>
          <p className="text-xs text-slate-400">PvP reel scroll competitions between friends</p>
        </div>
        <button
          onClick={fetchBattles}
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

      {/* Battle Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Battles Created</span>
          <p className="text-3xl font-black text-white mt-2">{data?.totalBattles || 0}</p>
          <p className="text-xs text-slate-500 mt-1">All-time battle duels</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF765E]">Active Duels Ongoing</span>
          <p className="text-3xl font-black text-[#FF765E] mt-2">{data?.activeBattles || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Currently in progress</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#192334] border border-slate-700/80 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-[#45BFA8]">Completed Battles</span>
          <p className="text-3xl font-black text-[#45BFA8] mt-2">{data?.completedBattles || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Decided winners</p>
        </div>
      </div>

      {/* Battles List Table */}
      <div className="bg-[#192334] border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Battle Matchups
          </h4>
          <span className="text-xs text-slate-500">{recentBattles.length} matches</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#131B29] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-700/60">
              <tr>
                <th className="p-4 font-semibold">Matchup</th>
                <th className="p-4 font-semibold text-center">Target</th>
                <th className="p-4 font-semibold text-center">Score</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Initiated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading && recentBattles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF765E]" />
                    Loading battle records...
                  </td>
                </tr>
              ) : recentBattles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No battles logged in Firestore yet.
                  </td>
                </tr>
              ) : (
                recentBattles.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{b.challengerName}</span>
                        <span className="text-xs font-bold text-[#FF765E]">VS</span>
                        <span className="font-bold text-white">{b.opponentName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-semibold text-slate-300">
                      {b.targetReels || 0} reels
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-white">
                      {b.challengerReels || 0} &mdash; {b.opponentReels || 0}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'ACTIVE'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-400 text-[11px]">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
