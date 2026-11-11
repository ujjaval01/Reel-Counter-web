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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-heading font-extrabold text-[#25334A] flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#FF765E]" />
            Friend Battle Arena Monitor
          </h3>
          <p className="text-xs font-sans text-[#687386] mt-0.5">PvP reel scroll competitions between friends</p>
        </div>
        <button
          onClick={fetchBattles}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#F0E5DA] text-xs font-sans font-bold text-[#25334A] hover:bg-[#FFF8EF] hover:border-[#FF765E]/40 shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FF765E]' : 'text-[#687386]'}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans flex items-center gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Battle Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#687386]">Total Battles Created</span>
          <p className="text-3xl font-heading font-extrabold text-[#25334A] mt-2">{data?.totalBattles || 0}</p>
          <p className="text-xs font-sans text-[#8B95A5] mt-1">All-time battle duels</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#FF765E]">Active Duels Ongoing</span>
          <p className="text-3xl font-heading font-extrabold text-[#FF765E] mt-2">{data?.activeBattles || 0}</p>
          <p className="text-xs font-sans text-[#8B95A5] mt-1">Currently in progress</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#2D8A78]">Completed Battles</span>
          <p className="text-3xl font-heading font-extrabold text-[#2D8A78] mt-2">{data?.completedBattles || 0}</p>
          <p className="text-xs font-sans text-[#8B95A5] mt-1">Decided winners</p>
        </div>
      </div>

      {/* Battles List Table */}
      <div className="bg-white border border-[#F0E5DA] rounded-3xl overflow-hidden shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)]">
        <div className="p-5 border-b border-[#F0E5DA] flex items-center justify-between bg-[#FFF8EF]">
          <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#25334A]">
            Recent Battle Matchups
          </h4>
          <span className="text-xs font-sans font-semibold text-[#687386]">{recentBattles.length} matches</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF7F2] text-[#687386] uppercase tracking-wider text-[11px] font-bold border-b border-[#F0E5DA]">
              <tr>
                <th className="p-4 font-bold">Matchup</th>
                <th className="p-4 font-bold text-center">Target</th>
                <th className="p-4 font-bold text-center">Score</th>
                <th className="p-4 font-bold text-center">Status</th>
                <th className="p-4 font-bold text-right">Initiated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E5DA] text-[#25334A]">
              {loading && recentBattles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#687386]">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF765E]" />
                    Loading battle records...
                  </td>
                </tr>
              ) : recentBattles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#687386]">
                    No battles logged in Firestore yet.
                  </td>
                </tr>
              ) : (
                recentBattles.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FFF8EF]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-[#25334A]">{b.challengerName}</span>
                        <span className="text-xs font-heading font-extrabold text-[#FF765E]">VS</span>
                        <span className="font-heading font-bold text-[#25334A]">{b.opponentName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-sans font-bold text-[#687386]">
                      {b.targetReels || 0} reels
                    </td>
                    <td className="p-4 text-center font-heading font-extrabold text-[#25334A]">
                      {b.challengerReels || 0} &mdash; {b.opponentReels || 0}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-heading font-bold ${
                        b.status === 'ACTIVE'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-[#E4F5EE] text-[#2D8A78] border border-[#45BFA8]/30'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-[#8B95A5] text-[11px] font-mono">
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
