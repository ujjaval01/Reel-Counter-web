import { useState, lazy, Suspense } from 'react';
import { 
  Menu, X, ArrowRight, ShieldCheck, 
  Swords, Sparkles, ChevronDown, Check, Smartphone, 
  BarChart3, AlertTriangle, Crown, Copy, Zap
} from 'lucide-react';

import { useCurrentPath } from './router';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';
import { useHiddenAdminTrigger } from './lib/useHiddenAdminTrigger';
import Footer from './components/Footer';

const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
import {
  ClayTrophy3D,
  ClayCompass3D,
  ClayTarget3D,
  ClayBell3D,
  ClaySwords3D,
  ClayChart3D,
  ClayShield3D,
} from './components/Clay3DIcons';

export default function App() {
  
  const currentPath = useCurrentPath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'battle' | 'leaderboard' | 'dashboard'>('home');
  const [lbFilter, setLbFilter] = useState<'global' | 'india' | 'friends'>('global');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.uv.reelcounter";

  const copyCode = () => {
    navigator.clipboard?.writeText('SC2025');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  
  const handleLogoClick = useHiddenAdminTrigger(5, 3000);

  // Check routes
  const normalizedPath = currentPath.replace(/\/+$/, '');
  if (normalizedPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }
  if (normalizedPath === '/delete-account') {
    return <DeleteAccount />;
  }
  if (normalizedPath === '/admin') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center text-[#687386]">
          <div className="w-8 h-8 border-2 border-[#FF765E] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans selection:bg-[#FF765E] selection:text-white ${
      'bg-[#FFF8EF] text-[#25334A]'
    }`}>
      
      {/* REFINED NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3.5 sm:pt-4 transition-all duration-200">
        <nav className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl px-5 sm:px-7 h-16 sm:h-18 flex items-center justify-between border backdrop-blur-xl transition-all duration-200 ${
          'bg-[#FFFDF9]/90 border-[#F0E5DA] shadow-[0_8px_24px_rgba(37,51,74,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)]'
        }`}>
          {/* Logo */}
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF765E] rounded-xl">
            <div className="relative">
              <img
                src={'/icon-light.png'}
                alt="ReelCounter Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#45BFA8] border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#25334A]">
                Reel<span className="text-[#FF765E]">Counter</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#687386]">
                MINDFUL SCROLL
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold ${
            'text-[#687386]'
          }`}>
            <a href="#features" className="hover:text-[#FF765E] transition-colors">Features</a>
            <a href="#preview" className="hover:text-[#FF765E] transition-colors">Interactive Demo</a>
            <a href="#battle" className="hover:text-[#FF765E] transition-colors">Battle Mode</a>
            <a href="#leaderboard" className="hover:text-[#FF765E] transition-colors">Leaderboard</a>
            <a href="#how-it-works" className="hover:text-[#FF765E] transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-[#FF765E] transition-colors">FAQ</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            

            {/* Coral CTA Button */}
            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-b from-[#FF7E67] to-[#FF6F56] shadow-[0_6px_16px_rgba(255,118,94,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
            >
              Get the App
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`md:hidden p-2 rounded-xl border transition-all ${
                'border-[#F0E5DA] bg-white text-[#25334A]'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-3 max-w-7xl mx-auto rounded-3xl p-6 border shadow-xl space-y-3 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200 ${
            'bg-white/95 border-[#F0E5DA] text-[#25334A]'
          }`}>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 transition-colors">Features</a>
            <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 transition-colors">Interactive Demo</a>
            <a href="#battle" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 transition-colors">Battle Mode</a>
            <a href="#leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 transition-colors">Leaderboard</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 transition-colors">How It Works</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 transition-colors">FAQ</a>
            <div className="pt-2">
              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)} 
                className="block w-full text-center py-3.5 rounded-full font-heading font-bold text-white bg-[#FF765E] shadow-md shadow-[#FF765E]/30"
              >
                Get ReelCounter Free
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION – CREAM + CORAL MINIMAL 3D */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Subtle Warm Ambient Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FFE2D5]/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO LEFT COLUMN: COPY & CTAS */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              {/* Product Eyebrow Badge */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                'border-[#F0E5DA] bg-white text-[#FF765E] shadow-sm'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#45BFA8]" />
                <span>Built for Mindful Scrolling • Android Wellbeing</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight leading-[1.08] text-[#25334A]">
                Your Scroll. <br />
                <span className="text-[#FF765E]">
                  Your Rules.
                </span>
              </h1>

              {/* Supporting Description */}
              <p className={`text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed ${
                'text-[#687386]'
              }`}>
                Track every scroll across Instagram Reels, YouTube Shorts and Facebook Reels. Set realistic limits, battle friends, and reclaim your attention.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <a 
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-bold text-base text-white bg-gradient-to-b from-[#FF7E67] to-[#FF6F56] shadow-[0_8px_20px_rgba(255,118,94,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2.5"
                >
                  <span>Get ReelCounter</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#preview" 
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-heading font-bold text-base border transition-all text-center ${
                    'border-[#F0E5DA] bg-white hover:bg-[#FFFDF9] text-[#25334A] shadow-sm'
                  } hover:-translate-y-0.5 active:translate-y-0.5`}
                >
                  Explore Features
                </a>
              </div>

              {/* 3 Compact Benefit Labels */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                  'border-[#F0E5DA] bg-white text-[#25334A] shadow-sm'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF765E]" />
                  <span>Daily Limit Tracking</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                  'border-[#F0E5DA] bg-white text-[#25334A] shadow-sm'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#45BFA8]" />
                  <span>Friend Battle Mode</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                  'border-[#F0E5DA] bg-white text-[#25334A] shadow-sm'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB36B]" />
                  <span>No Mandatory Sign-Up</span>
                </div>
              </div>
            </div>

            {/* HERO RIGHT COLUMN: REFINED SMARTPHONE MOCKUP AS FOCAL POINT */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              
              {/* Subtle Ambient Ring behind Phone */}
              <div className="absolute w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[#FFE2D5]/50 to-[#E4F5EE]/40 blur-2xl pointer-events-none" />

              {/* Minimalist Benefit Badge 1 (Teal) */}
              <div className="absolute -left-4 sm:-left-8 top-20 z-20">
                <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2.5 backdrop-blur-md transition-all shadow-md ${
                  'bg-white/95 border-[#F0E5DA] text-[#25334A]'
                }`}>
                  <div className="w-7 h-7 rounded-lg bg-[#E4F5EE] text-[#45BFA8] flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#687386]">Auto Track</div>
                    <div className="text-xs font-bold text-[#45BFA8]">3 Platforms Live</div>
                  </div>
                </div>
              </div>

              {/* Minimalist Benefit Badge 2 (Coral) */}
              <div className="absolute -right-2 sm:-right-6 bottom-16 z-20">
                <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2.5 backdrop-blur-md transition-all shadow-md ${
                  'bg-white/95 border-[#F0E5DA] text-[#25334A]'
                }`}>
                  <div className="w-7 h-7 rounded-lg bg-[#FFE2D5] text-[#FF765E] flex items-center justify-center font-bold text-xs">
                    ⚔️
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#687386]">Duel Active</div>
                    <div className="text-xs font-bold text-[#FF765E]">Leading by 67</div>
                  </div>
                </div>
              </div>

              {/* Realistic Smartphone Mockup */}
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] z-10">
                {/* Outer Phone Bezel */}
                <div className="relative rounded-[48px] p-3 border border-[#E2D2C3] bg-white shadow-[0_24px_50px_-12px_rgba(37,51,74,0.15)]">
                  
                  {/* Phone Screen Container */}
                  <div className="rounded-[38px] overflow-hidden bg-[#FFFDF9] text-[#25334A] p-4.5 space-y-3.5 border border-[#F0E5DA]">
                    
                    {/* Top Status Bar & App Identity */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-[#FF765E] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          ▶
                        </div>
                        <div>
                          <div className="text-xs font-heading font-bold leading-tight">ReelCounter</div>
                          <div className="text-[8px] font-semibold text-[#687386]">Daily Screen Wellbeing</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="w-2 h-2 rounded-full bg-[#45BFA8] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#45BFA8]">Active</span>
                      </div>
                    </div>

                    {/* Daily Limit Card */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#F0E5DA] space-y-2 shadow-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs font-heading font-bold">Daily Limit Meter</div>
                          <div className="text-[10px] text-[#687386]">253 / 600 Reels</div>
                        </div>
                        <span className="text-xs font-bold bg-[#FFE2D5] text-[#FF765E] px-2 py-0.5 rounded-full">
                          42%
                        </span>
                      </div>
                      
                      {/* Coral Progress Bar */}
                      <div className="w-full bg-[#FFF1E7] h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#FF765E] h-full w-[42%] rounded-full" />
                      </div>
                    </div>

                    {/* Positive Encouragement Pill */}
                    <div className="p-2.5 rounded-xl bg-[#E4F5EE] border border-[#45BFA8]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🎯</span>
                        <div className="text-[10px] font-bold text-[#2D8A78]">
                          347 reels remaining before alert threshold
                        </div>
                      </div>
                    </div>

                    {/* Today's Platform Breakdown */}
                    <div>
                      <div className="flex justify-between text-xs mb-2 font-bold">
                        <span>Platform Breakdown</span>
                        <span className="text-[#FF765E]">253 total</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 bg-white rounded-xl border border-[#F0E5DA]">
                          <div className="text-[#E1306C] font-bold text-[10px]">Instagram</div>
                          <div className="text-sm font-heading font-bold">126</div>
                          <div className="text-[8px] text-[#687386]">Reels</div>
                        </div>
                        <div className="p-2.5 bg-white rounded-xl border border-[#F0E5DA]">
                          <div className="text-[#FF0000] font-bold text-[10px]">YouTube</div>
                          <div className="text-sm font-heading font-bold">72</div>
                          <div className="text-[8px] text-[#687386]">Shorts</div>
                        </div>
                        <div className="p-2.5 bg-white rounded-xl border border-[#F0E5DA]">
                          <div className="text-[#1877F2] font-bold text-[10px]">Facebook</div>
                          <div className="text-sm font-heading font-bold">17</div>
                          <div className="text-[8px] text-[#687386]">Reels</div>
                        </div>
                        <div className="p-2.5 bg-white rounded-xl border border-[#F0E5DA]">
                          <div className="text-[#45BFA8] font-bold text-[10px]">Snapchat</div>
                          <div className="text-sm font-heading font-bold">38</div>
                          <div className="text-[8px] text-[#687386]">Spotlight</div>
                        </div>
                      </div>
                    </div>

                    {/* Battle Activity Row */}
                    <div className="p-2.5 rounded-xl bg-white border border-[#F0E5DA] text-[10px] flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-[#25334A]">
                        <span>⚔️</span>
                        <span>Duel with Vanshika</span>
                      </span>
                      <span className="text-[#45BFA8]">+67 Scrolls Ahead</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION – CLEAN BALANCED GRID */}
      <section id="features" className={`py-24 border-t transition-colors duration-200 ${
        'border-[#F0E5DA] bg-[#FFF1E7]/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
              'border-[#F0E5DA] bg-white text-[#FF765E] shadow-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#FF765E]" />
              <span>Digital Wellbeing Tools</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A]">
              Everything You Need to <br />
              <span className="text-[#FF765E]">
                Scroll Smarter
              </span>
            </h2>
            <p className={`text-base font-normal ${'text-[#687386]'}`}>
              Precision tracking, personalized boundary setting, and friendly accountability challenges designed to restore balance to your screen time.
            </p>
          </div>

          {/* 6 Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            
            {/* Feature 1 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              'bg-white border-[#F0E5DA] shadow-[0_10px_24px_rgba(37,51,74,0.04)]'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#E4F5EE] flex items-center justify-center mb-6">
                <ClayCompass3D className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#E4F5EE] text-[#2D8A78] font-bold text-[10px] uppercase tracking-wider mb-2">
                Automatic Tracking
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#25334A]">1. Smart Scroll Tracking</h3>
              <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                Accurately track your scrolling frequency across supported platforms including Instagram Reels, YouTube Shorts, and Facebook Reels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              'bg-white border-[#F0E5DA] shadow-[0_10px_24px_rgba(37,51,74,0.04)]'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#FFE2D5] flex items-center justify-center mb-6">
                <ClayTarget3D className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FFE2D5] text-[#FF765E] font-bold text-[10px] uppercase tracking-wider mb-2">
                Custom Targets
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#25334A]">2. Daily Scrolling Limits</h3>
              <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                Configure your custom daily scrolling thresholds. Follow your real-time consumption with dynamic circular and linear meters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              'bg-white border-[#F0E5DA] shadow-[0_10px_24px_rgba(37,51,74,0.04)]'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#FFF1E7] flex items-center justify-center mb-6">
                <ClayBell3D className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FFF1E7] text-[#D9631E] font-bold text-[10px] uppercase tracking-wider mb-2">
                Real-Time Alerts
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#25334A]">3. Usage Boundary Alerts</h3>
              <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                Receive timely system alerts and overlays whenever configured boundaries are reached, with clear choices to quit or wrap up.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              'bg-white border-[#F0E5DA] shadow-[0_10px_24px_rgba(37,51,74,0.04)]'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#FFE2D5] flex items-center justify-center mb-6">
                <ClaySwords3D className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FFE2D5] text-[#FF765E] font-bold text-[10px] uppercase tracking-wider mb-2">
                Social Duels
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#25334A]">4. Friend Battle Mode</h3>
              <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                Turn digital wellness into a friendly challenge. Share custom invite codes, pair up with peers, and see who keeps their reel count lowest.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              'bg-white border-[#F0E5DA] shadow-[0_10px_24px_rgba(37,51,74,0.04)]'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#FFF8EF] flex items-center justify-center mb-6">
                <ClayTrophy3D className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FFF8EF] text-[#D9631E] font-bold text-[10px] uppercase tracking-wider mb-2">
                Rankings
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#25334A]">5. Global Leaderboard</h3>
              <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                Compare your mindful scrolling discipline against your friend circle, regional peers, or global users on daily and weekly ranking tiers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              'bg-white border-[#F0E5DA] shadow-[0_10px_24px_rgba(37,51,74,0.04)]'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#E4F5EE] flex items-center justify-center mb-6">
                <ClayChart3D className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#E4F5EE] text-[#2D8A78] font-bold text-[10px] uppercase tracking-wider mb-2">
                Weekly Insights
              </div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#25334A]">6. Smart Screen Time Insights</h3>
              <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                Unpack detailed 7-day breakdowns, spot high-consumption peak hours, and set gradual goals to reduce doomscrolling week by week.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE APP PREVIEW */}
      <section id="preview" className={`py-24 border-t transition-colors duration-200 ${
        'border-[#F0E5DA] bg-[#FFF8EF]'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="text-xs uppercase font-bold tracking-widest text-[#FF765E]">
              Interactive Experience
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A]">
              Explore the Live App UI
            </h2>
            <p className={`font-normal ${'text-[#687386]'}`}>
              Select tabs below to preview actual Android app views with working sample data.
            </p>
          </div>

          {/* Tab Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'home', label: 'Home View', icon: '📱' },
              { id: 'battle', label: 'Battle Mode', icon: '⚔️' },
              { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
              { id: 'dashboard', label: 'Analytics Dashboard', icon: '📊' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full font-heading font-bold text-sm flex items-center gap-2 transition-all active:scale-95 ${
                  activeTab === tab.id
                    ? 'bg-[#FF765E] text-white shadow-md shadow-[#FF765E]/30 -translate-y-0.5'
                    : 'bg-white border border-[#F0E5DA] text-[#25334A] shadow-sm hover:bg-[#FFF1E7]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Mockup Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-[380px] rounded-[44px] p-3 border border-[#E2D2C3] bg-white shadow-[0_20px_45px_rgba(37,51,74,0.1)]">
              <div className="rounded-[34px] overflow-hidden bg-[#FFFDF9] text-[#25334A] min-h-[560px] flex flex-col justify-between border border-[#F0E5DA]">
                
                {/* PREVIEW TAB 1: HOME */}
                {activeTab === 'home' && (
                  <div className="p-5 space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-[#FF765E] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          ▶
                        </div>
                        <div>
                          <div className="text-xs font-heading font-bold">ReelCounter</div>
                          <div className="text-[8px] text-[#687386]">Scroll Less. Score More.</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 text-xs">
                        <span className="p-1 rounded-full bg-[#FFF1E7] text-[#FFB36B]">☀️</span>
                        <span className="p-1 rounded-full bg-[#E4F5EE] text-[#45BFA8]">🔔</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#F0E5DA] space-y-2.5 shadow-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs font-heading font-bold">Daily Limit</div>
                          <div className="text-[10px] text-[#687386]">600 reels threshold</div>
                        </div>
                        <span className="text-xs font-bold bg-[#FFE2D5] text-[#FF765E] px-2.5 py-0.5 rounded-full">42%</span>
                      </div>
                      <div className="w-full bg-[#FFF1E7] h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#FF765E] h-full w-[42%] rounded-full" />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#E4F5EE] border border-[#45BFA8]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🔥</span>
                        <div>
                          <div className="text-xs font-bold text-[#2D8A78]">7-Day Mindful Streak!</div>
                          <div className="text-[9px] text-[#687386]">347 reels away from limit</div>
                        </div>
                      </div>
                      <span className="text-xs text-[#45BFA8] font-bold">›</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2 font-bold">
                        <span>Today's Count</span>
                        <span className="text-[#FF765E]">253 reels</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="p-3 bg-white rounded-xl border border-[#F0E5DA]">
                          <div className="text-[#E1306C] font-bold text-[10px]">Instagram</div>
                          <div className="text-base font-heading font-bold">126</div>
                          <div className="text-[9px] text-[#687386]">Reels</div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-[#F0E5DA]">
                          <div className="text-[#FF0000] font-bold text-[10px]">YouTube</div>
                          <div className="text-base font-heading font-bold">72</div>
                          <div className="text-[9px] text-[#687386]">Shorts</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#F0E5DA] text-[10px] text-[#25334A] flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#45BFA8] fill-[#45BFA8]" />
                        Tracking Active & Standing By
                      </span>
                      <span className="text-[#FF765E]">Settings</span>
                    </div>
                  </div>
                )}

                {/* PREVIEW TAB 2: BATTLE */}
                {activeTab === 'battle' && (
                  <div className="p-5 space-y-3.5 animate-in fade-in duration-200">
                    <div className="text-center font-heading font-bold text-sm">⚔️ Battle Mode</div>
                    <div className="p-4 rounded-2xl bg-[#FF765E] text-white text-center space-y-1.5 shadow-sm">
                      <div className="text-[10px] uppercase font-bold text-white/80">Active Duel</div>
                      <div className="text-base font-heading font-bold">Challenge Your Friends</div>
                      <div className="text-xs text-white/90">Invite friends and see who scrolls less!</div>
                      <div className="pt-1">
                        <span className="inline-block px-3 py-1 rounded-full bg-white text-[#FF765E] font-bold text-xs shadow-sm">
                          Invite Code: SC2025
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#F0E5DA] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">You vs Vanshika</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#E4F5EE] text-[#2D8A78] text-[10px] font-bold">● Live</span>
                      </div>
                      
                      <div className="flex items-center justify-around py-2">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFE2D5] text-[#FF765E] flex items-center justify-center text-xl font-bold">👦</div>
                          <div className="text-xs font-semibold mt-1">You</div>
                          <div className="text-base font-heading font-bold text-[#FF765E]">253</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#25334A] text-white font-bold text-[10px]">VS</div>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto rounded-full bg-[#E4F5EE] text-[#45BFA8] flex items-center justify-center text-xl font-bold">👧</div>
                          <div className="text-xs font-semibold mt-1">Vanshika</div>
                          <div className="text-base font-heading font-bold text-[#45BFA8]">186</div>
                        </div>
                      </div>

                      <div className="w-full bg-[#FFF1E7] h-2 rounded-full overflow-hidden flex">
                        <div className="bg-[#FF765E] h-full w-[58%]" />
                        <div className="bg-[#45BFA8] h-full w-[42%]" />
                      </div>
                      <div className="text-[10px] text-center text-[#687386]">Cap: 500 Reels each</div>
                    </div>
                  </div>
                )}

                {/* PREVIEW TAB 3: LEADERBOARD */}
                {activeTab === 'leaderboard' && (
                  <div className="p-5 space-y-3.5 animate-in fade-in duration-200">
                    <div className="text-center font-heading font-bold text-sm">🏆 Top Scorers Today</div>
                    
                    {/* Podium */}
                    <div className="grid grid-cols-3 gap-2 items-end pt-1 pb-1 text-center">
                      <div className="p-2.5 rounded-xl bg-white border border-[#F0E5DA]">
                        <div className="text-xl">🥈</div>
                        <div className="text-[11px] font-bold truncate mt-1">Rahul</div>
                        <div className="text-xs text-[#25334A] font-bold">142</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FFF8EF] border-2 border-[#FFB36B] shadow-sm transform -translate-y-1.5">
                        <div className="text-2xl">🥇</div>
                        <div className="text-xs font-heading font-bold truncate mt-1">Arjun</div>
                        <div className="text-xs text-[#FF765E] font-bold">98</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#F0E5DA]">
                        <div className="text-xl">🥉</div>
                        <div className="text-[11px] font-bold truncate mt-1">Priya</div>
                        <div className="text-xs text-[#25334A] font-bold">189</div>
                      </div>
                    </div>

                    {/* Ranked List */}
                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-xl bg-white border border-[#F0E5DA] flex items-center justify-between text-xs">
                        <span className="text-[#687386]">#4 Aman V.</span>
                        <span className="font-bold">210 reels</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#F0E5DA] flex items-center justify-between text-xs">
                        <span className="text-[#687386]">#5 Ritu S.</span>
                        <span className="font-bold">230 reels</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FFE2D5] border border-[#FF765E]/40 flex items-center justify-between text-xs font-bold text-[#FF765E]">
                        <span>#14 You</span>
                        <span>253 reels</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PREVIEW TAB 4: DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="p-5 space-y-3 animate-in fade-in duration-200">
                    <div className="flex justify-between items-center">
                      <span className="font-heading font-bold text-xs">📊 Weekly Summary</span>
                      <span className="text-[10px] font-bold bg-[#E4F5EE] text-[#2D8A78] px-2.5 py-0.5 rounded-full">This Week</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-white rounded-xl border border-[#F0E5DA]">
                        <div className="text-[8px] text-[#687386]">Total</div>
                        <div className="text-xs font-heading font-bold">2,303</div>
                      </div>
                      <div className="p-2 bg-white rounded-xl border border-[#F0E5DA]">
                        <div className="text-[8px] text-[#687386]">Daily Avg</div>
                        <div className="text-xs font-heading font-bold">327</div>
                      </div>
                      <div className="p-2 bg-white rounded-xl border border-[#F0E5DA]">
                        <div className="text-[8px] text-[#687386]">Streak</div>
                        <div className="text-xs font-heading font-bold text-[#45BFA8]">7 Days</div>
                      </div>
                    </div>

                    {/* Minimal Bar Chart */}
                    <div className="p-3 bg-white rounded-xl border border-[#F0E5DA] space-y-1.5">
                      <div className="text-[10px] font-bold">Daily Activity Breakdown</div>
                      <div className="flex items-end justify-between h-20 pt-1 gap-1.5 px-1">
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
                              className={`w-full rounded-t-sm ${idx === 5 ? 'bg-[#FF765E]' : 'bg-[#FFB36B]'}`}
                              style={{ height: `${item.val}%` }}
                            />
                            <span className="text-[8px] font-semibold text-[#687386]">{item.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#E4F5EE] text-[10px] text-[#2D8A78] font-semibold">
                      💡 <strong>Insight:</strong> Scrolling dropped 30% after 9:00 PM with daily limits active.
                    </div>
                  </div>
                )}

                {/* Bottom App Navigation */}
                <div className="border-t border-[#F0E5DA] bg-white p-3 flex justify-around text-center text-[10px]">
                  <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-[#FF765E] font-bold' : 'text-[#687386]'}>
                    <Smartphone className="w-4 h-4 mx-auto mb-0.5" />
                    Home
                  </button>
                  <button onClick={() => setActiveTab('battle')} className={activeTab === 'battle' ? 'text-[#FF765E] font-bold' : 'text-[#687386]'}>
                    <Swords className="w-4 h-4 mx-auto mb-0.5" />
                    Battle
                  </button>
                  <button onClick={() => setActiveTab('leaderboard')} className={activeTab === 'leaderboard' ? 'text-[#FF765E] font-bold' : 'text-[#687386]'}>
                    <Crown className="w-4 h-4 mx-auto mb-0.5" />
                    Ranks
                  </button>
                  <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-[#FF765E] font-bold' : 'text-[#687386]'}>
                    <BarChart3 className="w-4 h-4 mx-auto mb-0.5" />
                    Insights
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BATTLE MODE SECTION – REFINED GAMING PRESENTATION */}
      <section id="battle" className={`py-24 border-t transition-colors duration-200 relative overflow-hidden ${
        'border-[#F0E5DA] bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
              'border-[#F0E5DA] bg-[#FFE2D5] text-[#FF765E] shadow-sm'
            }`}>
              <Swords className="w-3.5 h-3.5 text-[#FF765E]" />
              <span>Friendly Accountability</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A]">
              Challenge Your Friends. <br />
              <span className="text-[#FF765E]">
                Change Your Habits.
              </span>
            </h2>
            <p className={`text-base font-normal ${'text-[#687386]'}`}>
              Turn mindless doomscrolling into a collaborative game. Challenge peers to see who scrolls less during study sessions, work hours, or weekends.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Duel Card */}
            <div className="lg:col-span-7">
              <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden ${
                'bg-[#FFF8EF] border-[#F0E5DA] shadow-[0_12px_30px_rgba(37,51,74,0.05)]'
              }`}>
                
                <div className="grid sm:grid-cols-2 gap-6 relative z-10 items-center">
                  
                  {/* Player 1 Card (Coral) */}
                  <div className="p-6 rounded-2xl bg-white border border-[#F0E5DA] text-center space-y-2.5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#FFE2D5] text-[#FF765E] mx-auto flex items-center justify-center text-3xl font-bold">
                      👦
                    </div>
                    <div>
                      <div className="font-heading font-bold text-base text-[#25334A]">You (Player 1)</div>
                      <div className="text-xs text-[#FF765E] font-bold">253 Scrolls Today</div>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1 bg-[#FFF1E7] rounded-full inline-block text-[#D9631E]">
                      Cap: 600 Reels
                    </div>
                  </div>

                  {/* Player 2 Card (Teal) */}
                  <div className="p-6 rounded-2xl bg-white border border-[#F0E5DA] text-center space-y-2.5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#E4F5EE] text-[#45BFA8] mx-auto flex items-center justify-center text-3xl font-bold">
                      👧
                    </div>
                    <div>
                      <div className="font-heading font-bold text-base text-[#25334A]">Vanshika</div>
                      <div className="text-xs text-[#45BFA8] font-bold">186 Scrolls Today</div>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1 bg-[#E4F5EE] rounded-full inline-block text-[#2D8A78]">
                      Cap: 500 Reels
                    </div>
                  </div>

                </div>

                {/* Score Ratio Bar */}
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#FF765E]">You (58%)</span>
                    <span className="text-[#45BFA8]">Vanshika (42%) • Leading</span>
                  </div>
                  <div className="w-full bg-[#F0E5DA] h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-[#FF765E] h-full w-[58%]" />
                    <div className="bg-[#45BFA8] h-full w-[42%]" />
                  </div>
                </div>

                {/* Invite Code Box */}
                <div className="mt-8 text-center space-y-2.5">
                  <div className={`text-xs font-semibold ${'text-[#687386]'}`}>
                    Share your battle invite code:
                  </div>
                  <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border shadow-sm ${
                    'bg-white border-[#F0E5DA]'
                  }`}>
                    <span className="font-mono text-lg font-bold tracking-wider text-[#25334A]">
                      SC2025
                    </span>
                    <button 
                      onClick={copyCode}
                      className="px-3.5 py-1 rounded-full bg-[#FF765E] hover:bg-[#F4654C] text-xs font-bold text-white transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Battle Steps */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { step: '01', title: 'Create or Join a Battle', desc: 'Generate an instant room invite code directly from the Battle tab.' },
                { step: '02', title: 'Share with a Friend', desc: 'Send your code over WhatsApp, Instagram, or direct message.' },
                { step: '03', title: 'Live Synchronization', desc: 'Track each other’s reel counts in real-time as you use supported apps.' },
                { step: '04', title: 'Crown the Winner', desc: 'Review who showed higher discipline and stayed furthest beneath their threshold.' }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border flex gap-4 items-center transition-all hover:translate-x-1 ${
                  'bg-white border-[#F0E5DA] shadow-sm'
                }`}>
                  <span className="font-mono text-xs font-bold text-white bg-[#FF765E] w-9 h-9 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-sm mb-0.5 text-[#25334A]">{item.title}</h4>
                    <p className={`text-xs ${'text-[#687386]'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* LEADERBOARD SECTION */}
      <section id="leaderboard" className={`py-24 border-t transition-colors duration-200 ${
        'border-[#F0E5DA] bg-[#FFF8EF]'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3.5">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
              'border-[#F0E5DA] bg-white text-[#D9631E] shadow-sm'
            }`}>
              <Crown className="w-3.5 h-3.5 text-[#FFB36B]" />
              <span>Rankings & Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A]">
              Every Reel Counts. Every Rank Matters.
            </h2>
            <p className={`font-normal ${'text-[#687386]'}`}>
              See how your discipline stacks up. Mindful digital habits rewarded daily.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2">
            {(['global', 'india', 'friends'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setLbFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all active:scale-95 ${
                  lbFilter === tab 
                    ? 'bg-[#FF765E] text-white shadow-sm' 
                    : 'bg-white border border-[#F0E5DA] text-[#687386]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Podium Visual Layout */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-6 pb-2 text-center max-w-xl mx-auto">
            
            {/* 2nd Place: Silver */}
            <div className={`p-4 rounded-2xl border transition-all ${
              'bg-white border-[#F0E5DA] shadow-sm'
            }`}>
              <div className="text-2xl mb-1">🥈</div>
              <div className="font-heading font-bold text-sm truncate text-[#25334A]">Rahul S.</div>
              <div className="text-xs text-[#FF765E] font-bold">142 reels</div>
              <div className="mt-2 py-0.5 rounded-lg bg-[#FFF1E7] text-[10px] font-bold text-[#D9631E]">
                #2 Rank
              </div>
            </div>

            {/* 1st Place: Gold Podium */}
            <div className="p-5 rounded-3xl border-2 border-[#FFB36B] bg-white shadow-md transform -translate-y-3">
              <div className="w-10 h-10 mx-auto mb-1">
                <ClayTrophy3D className="w-full h-full" />
              </div>
              <div className="font-heading font-extrabold text-base truncate mt-1 text-[#25334A]">Arjun K.</div>
              <div className="text-sm text-[#FF765E] font-bold">98 reels</div>
              <div className="mt-2 py-1 px-3 rounded-full bg-[#FF765E] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                🥇 Champion
              </div>
            </div>

            {/* 3rd Place: Bronze */}
            <div className={`p-4 rounded-2xl border transition-all ${
              'bg-white border-[#F0E5DA] shadow-sm'
            }`}>
              <div className="text-2xl mb-1">🥉</div>
              <div className="font-heading font-bold text-sm truncate text-[#25334A]">Priya P.</div>
              <div className="text-xs text-[#FF765E] font-bold">189 reels</div>
              <div className="mt-2 py-0.5 rounded-lg bg-[#FFF1E7] text-[10px] font-bold text-[#D9631E]">
                #3 Rank
              </div>
            </div>

          </div>

          {/* Ranked List & Current User Card */}
          <div className={`rounded-3xl border overflow-hidden ${
            'bg-white border-[#F0E5DA] shadow-sm'
          }`}>
            <div className="p-5 sm:p-6 space-y-2">
              {[
                { rank: 4, name: 'Aman Verma', tag: 'Focus Mode', count: '210 reels' },
                { rank: 5, name: 'Ritu Sen', tag: 'Balanced Habit', count: '230 reels' },
              ].map(user => (
                <div key={user.rank} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  'hover:bg-[#FFF8EF]'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center font-bold text-sm text-[#687386]">
                      #{user.rank}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#FFE2D5] text-[#FF765E] flex items-center justify-center font-bold text-xs">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-[#25334A]">{user.name}</div>
                      <div className={`text-[10px] ${'text-[#687386]'}`}>{user.tag}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm text-[#FF765E]">{user.count}</div>
                </div>
              ))}

              {/* Current User Pinned Card */}
              <div className="mt-3 pt-3 border-t border-[#F0E5DA]">
                <div className="p-3.5 rounded-xl bg-[#FFE2D5]/70 border border-[#FF765E]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center font-bold text-sm text-[#FF765E]">#14</span>
                    <div className="w-9 h-9 rounded-full bg-[#FF765E] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      YOU
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-[#25334A]">Your Current Rank</div>
                      <div className="text-[10px] font-bold text-[#FF765E]">Top 15% mindful scrollers this week</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm text-[#FF765E]">253 reels</div>
                </div>
              </div>

            </div>
          </div>

          <p className="text-center text-xs text-[#687386]">
            *Demo data shown for illustration. Real rankings sync dynamically upon logging into ReelCounter.
          </p>

        </div>
      </section>

      {/* HOW IT WORKS – CLEAN STEPS */}
      <section id="how-it-works" className={`py-24 border-t transition-colors duration-200 ${
        'border-[#F0E5DA] bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A]">
              How ReelCounter Works
            </h2>
            <p className={`font-normal ${'text-[#687386]'}`}>
              Simple setup in under 60 seconds with full user privacy and control.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Install ReelCounter', desc: 'Install ReelCounter directly from the Google Play Store on your Android device.' },
              { num: '2', title: 'Enable Permissions', desc: 'Enable standard accessibility or overlay permissions so the app can count video scrolls.' },
              { num: '3', title: 'Set Daily Limits', desc: 'Choose a target scroll limit (e.g., 400 reels/day) and set alert options.' },
              { num: '4', title: 'Track & Compete', desc: 'Watch your meters progress in real-time or challenge your friends in 1-on-1 battles.' }
            ].map(step => (
              <div key={step.num} className={`p-7 rounded-3xl border transition-all hover:-translate-y-1 ${
                'bg-[#FFF8EF] border-[#F0E5DA] shadow-sm'
              } space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-[#FF765E] text-white font-heading font-bold text-base flex items-center justify-center shadow-sm">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-base text-[#25334A]">{step.title}</h3>
                <p className={`text-xs leading-relaxed ${'text-[#687386]'}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Android Permission Transparency Note Card */}
          <div className={`p-5 rounded-2xl border flex items-start gap-3.5 max-w-3xl mx-auto ${
            'bg-[#FFF1E7] border-[#F0E5DA] text-[#687386]'
          }`}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FF765E]" />
            <div className="text-xs leading-relaxed">
              <strong className="text-[#25334A]">Transparent System Note:</strong> ReelCounter uses Android Accessibility and Display Overlay services solely to detect swipe gestures on supported short-video apps. It does not read private chat messages, passwords, or personal media.
            </div>
          </div>

        </div>
      </section>

      {/* PRIVACY & USER CONTROL */}
      <section className={`py-24 border-t transition-colors duration-200 ${
        'border-[#F0E5DA] bg-[#FFF8EF]'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden ${
            'bg-white border-[#F0E5DA] shadow-[0_10px_25px_rgba(37,51,74,0.04)]'
          }`}>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#45BFA8] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy-First Architecture</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#25334A]">
                  Your Habits. Your Control.
                </h2>
                <p className={`text-sm leading-relaxed ${'text-[#687386]'}`}>
                  We believe digital wellbeing tools should never compromise privacy. Use core tracking locally without mandatory accounts. Only connect an account when you want to join multiplayer Battle Mode or sync across devices.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-[#45BFA8]">
                    <Check className="w-4 h-4" /> Local-first counting
                  </span>
                  <span className="flex items-center gap-1.5 text-[#45BFA8]">
                    <Check className="w-4 h-4" /> No mandatory account
                  </span>
                  <span className="flex items-center gap-1.5 text-[#45BFA8]">
                    <Check className="w-4 h-4" /> Revocable permissions anytime
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex justify-center">
                <div className="w-28 h-28 rounded-3xl bg-[#E4F5EE] flex items-center justify-center p-4">
                  <ClayShield3D className="w-20 h-20" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={`py-24 border-t transition-colors duration-200 ${
        'border-[#F0E5DA] bg-white'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A]">
              Frequently Asked Questions
            </h2>
            <p className={`font-normal ${'text-[#687386]'}`}>
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
                a: 'Reach our developer support team through the in-app feedback channel or via our official contact email at sainiujvl@gmail.com.'
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-all overflow-hidden ${
                  'bg-[#FFF8EF] border-[#F0E5DA]'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-heading font-bold text-sm sm:text-base focus:outline-none text-[#25334A]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#FF765E]' : 'text-[#687386]'}`} />
                </button>
                {openFaq === idx && (
                  <div className={`px-5 sm:px-6 pb-6 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                    'text-[#687386] border-[#F0E5DA]'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CONVERSION CTA */}
      <section id="download" className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 relative z-10">
          
          <div className="w-14 h-14 mx-auto mb-2">
            <ClayTrophy3D className="w-full h-full" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-tight text-[#25334A]">
            Take Back Control of <br />
            <span className="text-[#FF765E]">
              Your Scroll.
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-xl mx-auto font-normal ${'text-[#687386]'}`}>
            Track smarter. Scroll mindfully. Challenge your friends. Start building better digital habits with ReelCounter today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={PLAY_STORE_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-full font-heading font-bold text-base text-white bg-gradient-to-b from-[#FF7E67] to-[#FF6F56] shadow-[0_8px_20px_rgba(255,118,94,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Get ReelCounter on Google Play</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#preview"
              className={`px-8 py-4 rounded-full font-heading font-bold text-base border transition-all ${
                'border-[#F0E5DA] bg-white hover:bg-[#FFFDF9] text-[#25334A] shadow-sm'
              }`}
            >
              Explore App Demo
            </a>
          </div>

          <div className="text-xs text-[#687386] font-medium">
            Requires Android 8.0 or later • 100% Free to use
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
