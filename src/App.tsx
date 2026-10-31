import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, ArrowRight, ShieldCheck, Flame, Trophy, 
  Swords, BellRing, Sparkles, ChevronDown, Check, Smartphone, 
  Share2, Compass, BarChart3, Users, Clock, AlertTriangle, Layers,
  Instagram, Youtube
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'battle' | 'leaderboard' | 'dashboard'>('home');
  const [lbFilter, setLbFilter] = useState<'global' | 'india' | 'friends'>('global');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const setFavicon = (mode: 'dark' | 'light') => {
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = mode === 'dark' ? '/icon-dark.png' : '/icon-light.png';
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setFavicon(next);
    if (next === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    setFavicon(theme);
  }, [theme]);

  const copyCode = () => {
    navigator.clipboard?.writeText('SC2025');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0A0D18] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${
        isDark ? 'bg-[#0A0D18]/80 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={isDark ? '/icon-dark.png' : '/icon-light.png'}
              alt="ReelCounter"
              className="w-10 h-10 rounded-xl shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                ReelCounter
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400/80">Digital Wellbeing</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#preview" className="hover:text-purple-400 transition-colors">Interactive Demo</a>
            <a href="#battle" className="hover:text-purple-400 transition-colors">Battle Mode</a>
            <a href="#leaderboard" className="hover:text-purple-400 transition-colors">Leaderboard</a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-yellow-400' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a 
              href="#download"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:-translate-y-0.5"
            >
              Get the App
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 rounded-xl border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-6 py-6 border-b space-y-4 ${isDark ? 'bg-[#0E1326] border-slate-800' : 'bg-white border-slate-200'}`}>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold">Features</a>
            <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold">App Preview</a>
            <a href="#battle" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold">Battle Mode</a>
            <a href="#leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold">Leaderboard</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold">How It Works</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold">FAQ</a>
            <a href="#download" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600">
              Get the App
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-indigo-500/20 to-pink-500/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Built for smarter scrolling • Android wellbeing</span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Your Scroll. <br />
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                  Your Rules.
                </span>
              </h1>
              <p className={`text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Track every scroll across Instagram Reels, YouTube Shorts, and Facebook Reels. Set realistic limits, battle friends, and reclaim your attention.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#download" 
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all text-center"
                >
                  Get ReelCounter
                </a>
                <a 
                  href="#preview" 
                  className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base border transition-all text-center ${
                    isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Explore Features
                </a>
              </div>

              {/* Floating feature pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${isDark ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                  🎯 Daily Limit Meters
                </span>
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${isDark ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                  ⚔️ Friend Battle Mode
                </span>
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${isDark ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                  🔒 No Mandatory Sign-Up
                </span>
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Floating pill 1 */}
                <div className="absolute -left-6 top-16 z-20 px-3.5 py-2.5 rounded-2xl border border-purple-500/30 bg-[#12172A]/90 backdrop-blur-md shadow-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">🎯</div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold">DAILY LIMIT</div>
                    <div className="text-xs font-bold text-slate-200">253 / 600 Reels</div>
                  </div>
                </div>

                {/* Floating pill 2 */}
                <div className="absolute -right-6 bottom-24 z-20 px-3.5 py-2.5 rounded-2xl border border-pink-500/30 bg-[#12172A]/90 backdrop-blur-md shadow-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">⚔️</div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold">BATTLE ACTIVE</div>
                    <div className="text-xs font-bold text-emerald-400">Winning +67 Scrolls</div>
                  </div>
                </div>

                {/* Phone Frame */}
                <div className="relative rounded-[48px] p-3 border-4 border-slate-700/60 bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 shadow-2xl shadow-purple-500/20">
                  <div className="rounded-[40px] overflow-hidden bg-[#F6F8FD] text-slate-900 p-5 space-y-4">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">▶</div>
                        <div>
                          <div className="text-xs font-black text-slate-900">ReelCounter</div>
                          <div className="text-[8px] text-slate-500">Scroll More. Score More.</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="p-1 rounded-full bg-amber-100 text-amber-600">☀️</span>
                        <span className="p-1 rounded-full bg-pink-100 text-pink-600">🔔</span>
                      </div>
                    </div>

                    {/* Limit Card */}
                    <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-xs">🎯</div>
                          <div>
                            <div className="text-xs font-bold">Daily Limit</div>
                            <div className="text-[10px] text-slate-400">600 reels</div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-slate-800">42%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-full w-[42%] rounded-full" />
                      </div>
                    </div>

                    {/* Streak encouragement */}
                    <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs">🔥</div>
                        <div>
                          <div className="text-xs font-bold">Keep Going!</div>
                          <div className="text-[9px] text-slate-400">You're 347 reels away from limit</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-purple-600">›</span>
                    </div>

                    {/* Today's breakdown */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-slate-900">Today's Count</span>
                        <span className="font-bold text-purple-600">253 reels</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="text-pink-500 font-bold text-xs">Instagram</div>
                          <div className="text-base font-black text-slate-900">126</div>
                          <div className="text-[9px] text-slate-400">Reels</div>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="text-red-500 font-bold text-xs">YouTube</div>
                          <div className="text-base font-black text-slate-900">72</div>
                          <div className="text-[9px] text-slate-400">Shorts</div>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="text-slate-900 font-bold text-xs">TikTok</div>
                          <div className="text-base font-black text-slate-900">38</div>
                          <div className="text-[9px] text-slate-400">Videos</div>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="text-blue-600 font-bold text-xs">Facebook</div>
                          <div className="text-base font-black text-slate-900">17</div>
                          <div className="text-[9px] text-slate-400">Reels</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={`py-24 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Everything You Need to Scroll Smarter
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Precision tracking, personalized boundary setting, and gamified friend challenges designed to restore balance to your screen time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${
              isDark ? 'bg-slate-900/50 border-slate-800 hover:border-purple-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Smart Scroll Tracking</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Accurately track your scrolling frequency across supported platforms including Instagram Reels, YouTube Shorts, and Facebook Reels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${
              isDark ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Personal Daily Limits</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Configure your custom daily scrolling thresholds. Follow your real-time consumption with dynamic circular and linear meters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${
              isDark ? 'bg-slate-900/50 border-slate-800 hover:border-pink-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-6">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Real-Time Limit Alerts</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Receive timely system alerts and overlays whenever configured boundaries are reached, with clear choices to quit or wrap up.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${
              isDark ? 'bg-slate-900/50 border-slate-800 hover:border-purple-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <Swords className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">4. Battle Your Friends</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Turn digital wellness into a friendly challenge. Share custom invite codes, pair up with peers, and see who keeps their reel count lowest.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${
              isDark ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">5. Leaderboard & Rankings</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Compare your mindful scrolling discipline against your friend circle, regional peers, or global users on daily and weekly ranking tiers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${
              isDark ? 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">6. Insights & Daily Goals</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Unpack detailed 7-day breakdowns, spot high-consumption peak hours, and set gradual goals to reduce doomscrolling week by week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE APP PREVIEW */}
      <section id="preview" className={`py-24 border-t ${isDark ? 'bg-[#080B14] border-slate-800/80' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="text-xs uppercase font-extrabold tracking-widest text-purple-400">Interactive Experience</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Explore the Live App UI</h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Click the tabs below to preview actual Android app views with sample data.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'home', label: 'Home View' },
              { id: 'battle', label: 'Battle Mode' },
              { id: 'leaderboard', label: 'Leaderboard' },
              { id: 'dashboard', label: 'Analytics Dashboard' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : isDark ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Phone Mockup */}
          <div className="flex justify-center">
            <div className="w-full max-w-[380px] rounded-[48px] p-3 border-4 border-slate-700/60 bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 shadow-2xl">
              <div className="rounded-[40px] overflow-hidden bg-[#F6F8FD] text-slate-900 min-h-[580px] flex flex-col justify-between">
                
                {/* PREVIEW TAB 1: HOME */}
                {activeTab === 'home' && (
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">▶</div>
                        <div>
                          <div className="text-xs font-black">ReelCounter</div>
                          <div className="text-[8px] text-slate-500">Scroll More. Score More.</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 text-xs">
                        <span className="p-1 rounded-full bg-amber-100 text-amber-600">☀️</span>
                        <span className="p-1 rounded-full bg-pink-100 text-pink-600">🔔</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-xs">🎯</div>
                          <div>
                            <div className="text-xs font-bold">Daily Limit</div>
                            <div className="text-[10px] text-slate-400">600 reels</div>
                          </div>
                        </div>
                        <span className="text-xs font-black">42%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-full w-[42%] rounded-full" />
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <div>
                          <div className="text-xs font-bold">Keep Going!</div>
                          <div className="text-[9px] text-slate-400">You're 347 reels away from limit</div>
                        </div>
                      </div>
                      <span className="text-xs text-purple-600 font-bold">›</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2 font-bold">
                        <span>Today's Count</span>
                        <span className="text-purple-600">253 reels</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="text-pink-500 font-bold">Instagram</div>
                          <div className="text-base font-black">126</div>
                          <div className="text-[9px] text-slate-400">Reels</div>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="text-red-500 font-bold">YouTube</div>
                          <div className="text-base font-black">72</div>
                          <div className="text-[9px] text-slate-400">Shorts</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50 text-[10px] text-purple-700 flex items-center justify-between font-semibold">
                      <span>⚙️ Service Active & Standing By</span>
                      <span className="text-purple-600">▼ Show</span>
                    </div>
                  </div>
                )}

                {/* PREVIEW TAB 2: BATTLE */}
                {activeTab === 'battle' && (
                  <div className="p-5 space-y-4">
                    <div className="text-center font-bold text-sm text-slate-800">⚔️ Battle Mode</div>
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-center space-y-1 shadow-md">
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Active Duel</div>
                      <div className="text-base font-black">Challenge Your Friends</div>
                      <div className="text-[10px] text-white/80">Invite friends and see who scrolls less!</div>
                      <div className="pt-2">
                        <span className="inline-block px-4 py-1.5 rounded-lg bg-white text-purple-700 font-bold text-xs shadow-sm">
                          Invite Code: SC2025
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">👦 You vs Vanshika 💕</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">● Live</span>
                      </div>
                      
                      <div className="flex items-center justify-around py-2">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold">👦</div>
                          <div className="text-xs font-bold mt-1">You</div>
                          <div className="text-base font-black text-purple-600">253</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-purple-600 text-white font-black text-xs shadow-sm">VS</div>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-xl font-bold">👧</div>
                          <div className="text-xs font-bold mt-1">Vanshika</div>
                          <div className="text-base font-black text-pink-600">186</div>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-purple-600 h-full w-[58%]" />
                        <div className="bg-pink-500 h-full w-[42%]" />
                      </div>
                      <div className="text-[10px] text-center text-slate-400 font-medium">Cap: 500 Reels each</div>
                    </div>
                  </div>
                )}

                {/* PREVIEW TAB 3: LEADERBOARD */}
                {activeTab === 'leaderboard' && (
                  <div className="p-5 space-y-4">
                    <div className="text-center font-bold text-sm text-slate-800">🏆 Top Scorers</div>
                    
                    {/* Podium */}
                    <div className="grid grid-cols-3 gap-2 items-end pt-4 pb-2 text-center">
                      <div className="p-2 rounded-xl bg-slate-100">
                        <div className="text-xl">🥈</div>
                        <div className="text-[11px] font-bold truncate">Rahul</div>
                        <div className="text-[10px] text-purple-600 font-black">142</div>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 transform -translate-y-2">
                        <div className="text-2xl">🥇</div>
                        <div className="text-xs font-black truncate">Arjun</div>
                        <div className="text-xs text-amber-700 font-black">98</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100">
                        <div className="text-xl">🥉</div>
                        <div className="text-[11px] font-bold truncate">Priya</div>
                        <div className="text-[10px] text-purple-600 font-black">189</div>
                      </div>
                    </div>

                    {/* Ranked List */}
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-500">#4 Aman V.</span>
                        <span className="font-black text-slate-700">210 reels</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-500">#5 Ritu S.</span>
                        <span className="font-black text-slate-700">230 reels</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-between text-xs">
                        <span className="font-black text-purple-700">#14 You</span>
                        <span className="font-black text-purple-700">253 reels</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PREVIEW TAB 4: DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-800">📊 Weekly Summary</span>
                      <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded-md">This Week ▼</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <div className="text-[9px] text-slate-400">Total</div>
                        <div className="text-xs font-black text-slate-800">2,303</div>
                      </div>
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <div className="text-[9px] text-slate-400">Daily Avg</div>
                        <div className="text-xs font-black text-slate-800">327</div>
                      </div>
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <div className="text-[9px] text-slate-400">Streak</div>
                        <div className="text-xs font-black text-emerald-600">7 Days</div>
                      </div>
                    </div>

                    {/* Bar Chart Simulation */}
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 space-y-2">
                      <div className="text-[10px] font-bold text-slate-600">Daily Activity Breakdown</div>
                      <div className="flex items-end justify-between h-20 pt-2 gap-1 px-1">
                        {[
                          { day: 'M', val: 55 },
                          { day: 'T', val: 40 },
                          { day: 'W', val: 75 },
                          { day: 'T', val: 65 },
                          { day: 'F', val: 50 },
                          { day: 'S', val: 90 },
                          { day: 'S', val: 45 }
                        ].map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="w-full rounded-t-sm bg-gradient-to-t from-purple-600 to-indigo-400"
                              style={{ height: `${item.val}%` }}
                            />
                            <span className="text-[8px] text-slate-400">{item.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-50 text-[10px] text-purple-700">
                      💡 <strong>Insight:</strong> Your scrolling drops 30% after 9:00 PM when limits are engaged.
                    </div>
                  </div>
                )}

                {/* Bottom App Navigation */}
                <div className="border-t border-slate-200 bg-white p-3 flex justify-around text-center text-[10px]">
                  <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-purple-600 font-bold' : 'text-slate-400'}>
                    <Smartphone className="w-4 h-4 mx-auto mb-0.5" />
                    Home
                  </button>
                  <button onClick={() => setActiveTab('battle')} className={activeTab === 'battle' ? 'text-purple-600 font-bold' : 'text-slate-400'}>
                    <Swords className="w-4 h-4 mx-auto mb-0.5" />
                    Battle
                  </button>
                  <button onClick={() => setActiveTab('leaderboard')} className={activeTab === 'leaderboard' ? 'text-purple-600 font-bold' : 'text-slate-400'}>
                    <Trophy className="w-4 h-4 mx-auto mb-0.5" />
                    Ranks
                  </button>
                  <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-purple-600 font-bold' : 'text-slate-400'}>
                    <BarChart3 className="w-4 h-4 mx-auto mb-0.5" />
                    Insights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BATTLE MODE SHOWCASE */}
      <section id="battle" className={`py-24 border-t ${isDark ? 'border-slate-800/80 bg-gradient-to-b from-[#0A0D18] via-[#0E1222] to-[#0A0D18]' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-bold text-pink-400">
              <Swords className="w-3.5 h-3.5" />
              <span>Friendly Accountability</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Challenge Your Friends. <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Change Your Habits.
              </span>
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Turn mindless doomscrolling into a collaborative game. Challenge peers to see who scrolls less during study sessions, work hours, or weekends.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Visual duel card */}
            <div className="lg:col-span-7">
              <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="grid sm:grid-cols-2 gap-6 relative z-10 items-center">
                  {/* Player 1 */}
                  <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/40 mx-auto flex items-center justify-center text-3xl">
                      👦
                    </div>
                    <div>
                      <div className="font-extrabold text-base">You (Player 1)</div>
                      <div className="text-xs text-purple-400 font-semibold">253 Scrolls Today</div>
                    </div>
                    <div className="text-xs font-mono px-3 py-1 bg-purple-600/20 rounded-full inline-block text-purple-300">
                      Limit: 600
                    </div>
                  </div>

                  {/* Player 2 */}
                  <div className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/40 mx-auto flex items-center justify-center text-3xl">
                      👧
                    </div>
                    <div>
                      <div className="font-extrabold text-base">Vanshika</div>
                      <div className="text-xs text-pink-400 font-semibold">186 Scrolls Today</div>
                    </div>
                    <div className="text-xs font-mono px-3 py-1 bg-pink-600/20 rounded-full inline-block text-pink-300">
                      Limit: 500
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center space-y-3">
                  <div className="text-xs font-medium text-slate-400">Share your battle invite code:</div>
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <span className="font-mono text-xl font-extrabold tracking-widest text-purple-400">SC2025</span>
                    <button 
                      onClick={copyCode}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Steps */}
            <div className="lg:col-span-5 space-y-6">
              {[
                { step: '01', title: 'Create or Join a Battle', desc: 'Generate an instant invite code directly from the Battle tab.' },
                { step: '02', title: 'Share with a Friend', desc: 'Send your invite code over WhatsApp, Instagram, or direct message.' },
                { step: '03', title: 'Live Synchronization', desc: 'Track each other’s reel counts in real-time as you use supported apps.' },
                { step: '04', title: 'Crown the Winner', desc: 'Review who showed higher discipline and stayed furthest beneath their threshold.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="font-mono text-sm font-black text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-base mb-1">{item.title}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD SECTION */}
      <section id="leaderboard" className={`py-24 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Every Reel Counts. Every Rank Matters.
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              See how your discipline stacks up. Mindful digital habits rewarded daily.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2">
            {(['global', 'india', 'friends'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setLbFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  lbFilter === tab 
                    ? 'bg-purple-600 text-white' 
                    : isDark ? 'bg-slate-900 border border-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Leaderboard Table Card */}
          <div className={`rounded-3xl border overflow-hidden ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="p-4 sm:p-6 space-y-3">
              {[
                { rank: 1, name: 'Arjun K.', tag: 'Discipline Master', count: '98 reels', badge: '🥇' },
                { rank: 2, name: 'Rahul Sharma', tag: 'Streak Keeper', count: '142 reels', badge: '🥈' },
                { rank: 3, name: 'Priya Patel', tag: 'Weekend Champ', count: '189 reels', badge: '🥉' },
                { rank: 4, name: 'Aman Verma', tag: 'Focus Mode', count: '210 reels' },
                { rank: 5, name: 'Ritu Sen', tag: 'Balanced', count: '230 reels' },
              ].map(user => (
                <div key={user.rank} className={`flex items-center justify-between p-3.5 rounded-2xl transition-colors ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 text-center font-bold text-sm text-slate-400">
                      {user.badge || `#${user.rank}`}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{user.name}</div>
                      <div className="text-[11px] text-slate-400">{user.tag}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm text-purple-400">{user.count}</div>
                </div>
              ))}

              {/* Current user pinned */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 text-center font-bold text-sm text-purple-400">#14</span>
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      YOU
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Your Current Rank</div>
                      <div className="text-[11px] text-purple-300">Top 15% this week</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm text-purple-400">253 reels</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500">
            *Demo data shown for illustration. Real rankings sync dynamically upon logging into ReelCounter.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={`py-24 border-t ${isDark ? 'border-slate-800/80 bg-[#080B14]' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How ReelCounter Works</h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Simple setup in under 60 seconds with full user privacy and control.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Download ReelCounter', desc: 'Get the Android APK or install via Google Play.' },
              { num: '2', title: 'Grant Permissions', desc: 'Enable standard accessibility or overlay permissions so the app can count video scrolls.' },
              { num: '3', title: 'Set Your Daily Cap', desc: 'Choose a target scroll limit (e.g., 400 reels/day) and set alert options.' },
              { num: '4', title: 'Track & Compete', desc: 'Watch your meters progress in real-time or challenge your friends in 1-on-1 battles.' }
            ].map(step => (
              <div key={step.num} className={`p-6 rounded-3xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              } space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center">
                  {step.num}
                </div>
                <h3 className="font-bold text-base">{step.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className={`p-6 rounded-2xl border flex items-start gap-4 max-w-3xl mx-auto ${
            isDark ? 'bg-purple-950/20 border-purple-500/20 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-900'
          }`}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-400" />
            <div className="text-xs leading-relaxed">
              <strong>Transparent System Note:</strong> ReelCounter uses Android Accessibility and Display Overlay services solely to detect swipe gestures on supported short-video apps. It does not read private chat messages, passwords, or personal media.
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & USER CONTROL */}
      <section className={`py-24 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-10 sm:p-14 rounded-3xl border relative overflow-hidden ${
            isDark ? 'bg-gradient-to-tr from-slate-900 via-[#10162B] to-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy-First Architecture</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your Habits. Your Control.</h2>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  We believe digital wellbeing tools should never compromise privacy. Use core tracking locally without mandatory accounts. Only connect an account when you want to join multiplayer Battle Mode or sync across devices.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-4 h-4" /> Local-first counting
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-4 h-4" /> No mandatory account
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-4 h-4" /> Revocable permissions anytime
                  </span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center">
                <div className="w-32 h-32 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-5xl">
                  🛡️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={`py-24 border-t ${isDark ? 'border-slate-800/80 bg-[#080B14]' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Direct answers to common questions about permissions, platform support, and battle rules.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is ReelCounter?',
                a: 'ReelCounter is an Android digital-wellbeing app engineered to count your vertical reel/short swipes on supported platforms, giving you real metrics on mindless doomscrolling.'
              },
              {
                q: 'Which platforms does ReelCounter support?',
                a: 'Currently, ReelCounter tracks Instagram Reels, YouTube Shorts, and Facebook Reels. Additional short-form video apps are evaluated continuously.'
              },
              {
                q: 'How does scroll tracking work?',
                a: 'ReelCounter utilizes Android Accessibility Services to detect scroll gestures occurring exclusively within supported video feed packages.'
              },
              {
                q: 'Can I set my own daily scrolling limit?',
                a: 'Yes. You can configure any daily target (e.g. 200, 500, or 1000 reels) directly in the app settings at any time.'
              },
              {
                q: 'What happens when I cross my limit?',
                a: 'ReelCounter displays a friendly on-screen notification or non-intrusive overlay reminding you that your target is reached.'
              },
              {
                q: 'Can I use the app without creating an account?',
                a: 'Yes. Single-device tracking and daily limit meters work locally without requiring any registration.'
              },
              {
                q: 'How does Battle Mode work?',
                a: 'In Battle Mode, you create or enter a room code (like SC2025). The app matches you with a friend to compare reel counts head-to-head.'
              },
              {
                q: 'Is ReelCounter free to use?',
                a: 'Core features including tracking, daily limit meters, and personal stats are free.'
              },
              {
                q: 'Which Android permissions are required?',
                a: 'ReelCounter requires Accessibility Service permission (to detect feed swipes) and optional Display Over Other Apps permission (for limit reminder overlays).'
              },
              {
                q: 'How can I contact the team?',
                a: 'Reach our developer support team through the in-app feedback channel or via our official contact repository.'
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-purple-400' : 'text-slate-400'}`} />
                </button>
                {openFaq === idx && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                    isDark ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-slate-100'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL DOWNLOAD CTA */}
      <section id="download" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-indigo-900/20 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Less Mindless Scrolling. <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
              More Meaningful Living.
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Make every reel count. Start building better digital habits with ReelCounter today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://play.google.com/store/apps" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
            >
              Get ReelCounter for Android
            </a>
            <a 
              href="#preview"
              className={`px-8 py-4 rounded-2xl font-bold text-base border transition-all ${
                isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              View Screenshots
            </a>
          </div>
          <div className="text-xs text-slate-500">
            Requires Android 8.0 or later • Free to download
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t ${isDark ? 'border-slate-800/80 bg-[#060810]' : 'border-slate-200 bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
              src={isDark ? '/icon-dark.png' : '/icon-light.png'}
              alt="ReelCounter"
              className="w-8 h-8 rounded-xl"
            />
              <span className="font-extrabold text-lg tracking-tight">ReelCounter</span>
              <span className="text-xs text-slate-500 font-medium ml-2">Scroll smarter. Live better.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#preview" className="hover:text-purple-400 transition-colors">App Preview</a>
              <a href="#battle" className="hover:text-purple-400 transition-colors">Battle Mode</a>
              <a href="#leaderboard" className="hover:text-purple-400 transition-colors">Leaderboard</a>
              <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              &copy; {new Date().getFullYear()} ReelCounter. All rights reserved.
            </div>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:underline">Privacy Policy</span>
              <span className="cursor-pointer hover:underline">Terms & Conditions</span>
              <span className="cursor-pointer hover:underline">Contact Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
