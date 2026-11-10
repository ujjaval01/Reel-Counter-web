import { useState, useEffect, Component, type ReactNode } from 'react';
import { 
  LayoutDashboard, Users, Trophy, BarChart3, PieChart, 
  TrendingUp, Activity, Swords, FileText, ShieldCheck, 
  RefreshCw, LogOut, ArrowLeft, Menu, X, Clock, Lock
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { navigate } from '../../router';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackKey?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class TabErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Tab render error:', error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.fallbackKey !== this.props.fallbackKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-3xl bg-[#192334] border border-rose-500/30 text-rose-300 space-y-3">
          <h4 className="text-sm font-bold text-rose-400">View Rendering Notice</h4>
          <p className="text-xs text-slate-300">{this.state.error?.message || 'An unexpected error occurred rendering this section.'}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Retry Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Sub-views
import OverviewView from './OverviewView';
import UsersView from './UsersView';
import LeaderboardView from './LeaderboardView';
import ReelAnalyticsView from './ReelAnalyticsView';
import PlatformAnalyticsView from './PlatformAnalyticsView';
import GrowthView from './GrowthView';
import RetentionView from './RetentionView';
import BattlesView from './BattlesView';
import ReportsView from './ReportsView';
import SystemView from './SystemView';

type TabType = 
  | 'overview' 
  | 'users' 
  | 'leaderboard' 
  | 'reels' 
  | 'platforms' 
  | 'growth' 
  | 'retention' 
  | 'battles' 
  | 'reports' 
  | 'system';

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'High-level metrics, active scrollers, and platform overview' },
  { id: 'users', label: 'User Directory', icon: Users, description: 'Paginated user profiles, search, and deep history inspection' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, description: 'Global and timeframe-based rankings of top reel scrollers' },
  { id: 'reels', label: 'Reel Analytics', icon: BarChart3, description: 'Scroll volumes, today vs weekly comparisons, and averages' },
  { id: 'platforms', label: 'Platform Share', icon: PieChart, description: 'Instagram, YouTube Shorts, Facebook Reels & Snapchat breakdown' },
  { id: 'growth', label: 'User Growth', icon: TrendingUp, description: 'Acquisition velocity and Google vs Anonymous auth share' },
  { id: 'retention', label: 'Retention & Habits', icon: Activity, description: 'Scroll frequency tiers and active engagement distribution' },
  { id: 'battles', label: 'Battle Arena', icon: Swords, description: 'Friend PvP challenge logs and ongoing duel statuses' },
  { id: 'reports', label: 'Executive Reports', icon: FileText, description: 'Printable IST summary brief for operations and review' },
  { id: 'system', label: 'System & Security', icon: ShieldCheck, description: 'Firestore collection health, read-only status & latency monitor' },
];

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tabCache, setTabCache] = useState<Record<string, any>>({});
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('');
  const [istClock, setIstClock] = useState<string>('');

  // Live IST Clock (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istStr = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setIstClock(istStr);
    };

    updateTime();
    setLastRefreshedAt(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGlobalRefresh = () => {
    // Clear cache for current tab to force refetch
    setTabCache((prev) => {
      const next = { ...prev };
      delete next[activeTab];
      return next;
    });
    setLastRefreshedAt(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
  };

  const updateTabCache = (key: string, data: any) => {
    setTabCache((prev) => ({ ...prev, [key]: data }));
    setLastRefreshedAt(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
  };

  const currentTabItem = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans flex antialiased">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-72 bg-[#131B29] border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Lockup */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF765E] to-[#FFB36B] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#131B29] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#FF765E]" />
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight">
                Reel<span className="text-[#FF765E]">Counter</span>
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#45BFA8]">
                Admin Dashboard
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF765E] text-white shadow-[0_4px_14px_rgba(255,118,94,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer User Info & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0F172A]/40 space-y-3">
          {/* Admin User Chip */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.email ? user.email.charAt(0).toUpperCase() : 'A'
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{user?.displayName || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'Owner Account'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-semibold transition-colors border border-rose-500/20"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 bg-[#131B29]/90 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {currentTabItem.label}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                {currentTabItem.description}
              </p>
            </div>
          </div>

          {/* Right Header Status Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live IST Clock */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#FFB36B]" />
              <span>{istClock} IST</span>
            </div>

            {/* Read-Only Safety Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
              <Lock className="w-3 h-3" />
              <span>Read-Only Guard</span>
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={handleGlobalRefresh}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF765E] hover:bg-[#FF6F56] text-white text-xs font-bold shadow-md shadow-[#FF765E]/20 transition-all active:scale-95"
              title="Refresh Current View Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
        </header>

        {/* View Sub-Header Freshness Indicator */}
        <div className="px-4 sm:px-8 pt-4 pb-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Viewing data in India Standard Time (IST, UTC+5:30)</span>
          {lastRefreshedAt && (
            <span>Last refreshed at {lastRefreshedAt} IST</span>
          )}
        </div>

        {/* Dynamic Section Views */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <TabErrorBoundary fallbackKey={activeTab}>
            {activeTab === 'overview' && (
              <OverviewView 
                cache={tabCache['overview']} 
                setCache={(d) => updateTabCache('overview', d)} 
              />
            )}
            {activeTab === 'users' && (
              <UsersView 
                cache={tabCache['users']} 
                setCache={(d) => updateTabCache('users', d)} 
              />
            )}
            {activeTab === 'leaderboard' && (
              <LeaderboardView 
                cache={tabCache['leaderboard']} 
                setCache={(d) => updateTabCache('leaderboard', d)} 
              />
            )}
            {activeTab === 'reels' && (
              <ReelAnalyticsView 
                cache={tabCache['reels']} 
                setCache={(d) => updateTabCache('reels', d)} 
              />
            )}
            {activeTab === 'platforms' && (
              <PlatformAnalyticsView 
                cache={tabCache['platforms']} 
                setCache={(d) => updateTabCache('platforms', d)} 
              />
            )}
            {activeTab === 'growth' && (
              <GrowthView 
                cache={tabCache['growth']} 
                setCache={(d) => updateTabCache('growth', d)} 
              />
            )}
            {activeTab === 'retention' && (
              <RetentionView 
                cache={tabCache['retention']} 
                setCache={(d) => updateTabCache('retention', d)} 
              />
            )}
            {activeTab === 'battles' && (
              <BattlesView 
                cache={tabCache['battles']} 
                setCache={(d) => updateTabCache('battles', d)} 
              />
            )}
            {activeTab === 'reports' && (
              <ReportsView 
                cache={tabCache['reports']} 
                setCache={(d) => updateTabCache('reports', d)} 
              />
            )}
            {activeTab === 'system' && (
              <SystemView 
                cache={tabCache['system']} 
                setCache={(d) => updateTabCache('system', d)} 
              />
            )}
          </TabErrorBoundary>
        </main>
      </div>
    </div>
  );
}
