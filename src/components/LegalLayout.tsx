import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import Header from './Header';
import Footer from './Footer';
import Link from './Link';
import { ShieldCheck, ChevronRight, ArrowUp } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  badge?: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  description,
  lastUpdated,
  badge = 'Official Document',
  children,
}: LegalLayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Set the document title and meta description for SEO
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const previousDesc = meta ? meta.getAttribute('content') : null;

    document.title = title;
    if (meta) {
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousDesc !== null) {
        meta.setAttribute('content', previousDesc);
      }
    };
  }, [title, description]);

  // Monitor scroll for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans antialiased ${
      isDark ? 'bg-[#0A0D18] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </li>
              <li className="text-purple-400 font-semibold" aria-current="page">
                Privacy Policy
              </li>
            </ol>
          </nav>

          {/* Hero / Header block */}
          <header className={`p-8 sm:p-12 rounded-3xl border mb-12 relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-tr from-slate-900 via-[#10162B] to-slate-900 border-slate-800/80 shadow-2xl shadow-purple-950/20'
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-400">
                <ShieldCheck className="w-4 h-4" />
                <span>{badge}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                <span>Effective Date / Last Updated: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{lastUpdated}</strong></span>
                <span>•</span>
                <span>Platform: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Android (com.uv.reelcounter)</strong></span>
                <span>•</span>
                <span>Developer: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Ujjaval Saini</strong></span>
              </div>
            </div>
          </header>

          {/* Policy Body */}
          <article className="space-y-12">
            {children}
          </article>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-purple-600 text-white shadow-xl shadow-purple-500/30 hover:bg-purple-500 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
