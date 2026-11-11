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
        <div className="p-8 rounded-3xl bg-white border border-rose-200 text-rose-800 space-y-3 shadow-sm">
          <h4 className="text-sm font-heading font-bold text-rose-900">View Rendering Notice</h4>
          <p className="text-xs font-sans text-[#687386]">{this.state.error?.message || 'An unexpected error occurred rendering this section.'}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-2xl bg-[#FFF1E7] hover:bg-[#FFE2D5] text-[#FF765E] text-xs font-heading font-bold transition-colors"
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

interface TabItem {
  id: string;
  label: string;
  icon: any;
  description: string;
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'High-level metrics, active scrollers, and platform overview' },
  { id: 'users', label: 'User Directory', icon: Users, description: 'Searchable roster of registered scrollers with full profile drilldown' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, description: 'Global and timeframe-based rankings of top reel scrollers' },
  { id: 'reels', label: 'Reel Analytics', icon: BarChart3, description: 'Detailed volume analysis, daily averages, and distribution trends' },
  { id: 'platforms', label: 'Platform Share', icon: PieChart, description: 'Instagram, YouTube Shorts, Facebook, and Snapchat comparison' },
  { id: 'growth', label: 'User Growth', icon: TrendingUp, description: 'New account registrations over time and acquisition velocity' },
  { id: 'retention', label: 'Retention & Habits', icon: Activity, description: 'Streak analysis, consistency ratios, and active habit metrics' },
  { id: 'battles', label: 'Battle Arena', icon: Swords, description: 'Friend challenges, status breakdown, and participant metrics' },
  { id: 'reports', label: 'Executive Reports', icon: FileText, description: 'Consolidated performance digests with instant CSV export' },
  { id: 'system', label: 'System & Security', icon: ShieldCheck, description: 'Collection counts, data integrity checks, and read-only telemetry' },
];

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [istClock, setIstClock] = useState<string>('');
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('');

  // Cache store for views to avoid repeated Firestore fetches when switching tabs
  const [tabCache, setTabCache] = useState<Record<string, any>>({});

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
    <div className="min-h-screen bg-[#FFF8EF] text-[#25334A] font-sans flex antialiased">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#F0E5DA] shadow-[0_4px_24px_rgba(37,51,74,0.03)] flex flex-col justify-between transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Lockup */}
        <div className="p-5 border-b border-[#F0E5DA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF765E] to-[#FFB36B] p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#FFF8EF] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#FF765E]" />
              </div>
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base text-[#25334A] tracking-tight">
                Reel<span className="text-[#FF765E]">Counter</span>
              </h2>
              <span className="text-[10px] uppercase font-heading font-extrabold tracking-widest text-[#2D8A78]">
                Admin Dashboard
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-[#687386] hover:text-[#25334A] hover:bg-[#FFF1E7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 overflow-y-auto p-3.5 space-y-1.5">
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
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-heading font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF7E67] to-[#FF6F56] text-white shadow-[0_6px_16px_rgba(255,118,94,0.32)] -translate-y-0.5'
                    : 'text-[#687386] hover:text-[#25334A] hover:bg-[#FFF1E7]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#687386]'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer User Info & Logout */}
        <div className="p-4 border-t border-[#F0E5DA] bg-[#FFFDF9] space-y-3">
          {/* Admin User Chip */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-full bg-[#FFE2D5] border border-[#FF765E]/30 flex items-center justify-center text-xs font-heading font-extrabold text-[#FF765E] shrink-0 overflow-hidden shadow-sm">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.email ? user.email.charAt(0).toUpperCase() : 'A'
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-heading font-extrabold text-[#25334A] truncate">{user?.displayName || 'Administrator'}</p>
              <p className="text-[10px] text-[#687386] truncate font-medium">{user?.email || 'Owner Account'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-white hover:bg-[#FFF8EF] text-[#25334A] text-xs font-heading font-bold transition-all border border-[#F0E5DA] shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF765E]" />
              <span>Public Site</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-heading font-bold transition-all border border-rose-200 shadow-sm"
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
        <header className="h-20 bg-white/80 border-b border-[#F0E5DA] px-4 sm:px-8 flex items-center justify-between backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-2xl bg-white border border-[#F0E5DA] text-[#25334A] shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#25334A] tracking-tight">
                {currentTabItem.label}
              </h1>
              <p className="text-xs text-[#687386] font-medium hidden sm:block">
                {currentTabItem.description}
              </p>
            </div>
          </div>

          {/* Right Header Status Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live IST Clock */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-[#F0E5DA] text-xs font-mono font-bold text-[#25334A] shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#D9631E]" />
              <span>{istClock} IST</span>
            </div>

            {/* Read-Only Safety Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#E4F5EE] border border-[#45BFA8]/30 text-xs font-heading font-bold text-[#2D8A78]">
              <Lock className="w-3.5 h-3.5" />
              <span>Read-Only Guard</span>
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={handleGlobalRefresh}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-b from-[#FF7E67] to-[#FF6F56] text-white text-xs font-heading font-bold shadow-[0_6px_16px_rgba(255,118,94,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              title="Refresh Current View Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
        </header>

        {/* View Sub-Header Freshness Indicator */}
        <div className="px-4 sm:px-8 pt-4 pb-2 flex items-center justify-between text-xs text-[#687386] font-medium">
          <span>Viewing data in India Standard Time (IST, UTC+5:30)</span>
          {lastRefreshedAt && (
            <span className="font-mono">Last refreshed at {lastRefreshedAt} IST</span>
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
