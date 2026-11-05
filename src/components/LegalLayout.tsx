import React, { useEffect, useState } from 'react';
import Link from './Link';
import Footer from './Footer';
import { ChevronRight, ArrowUp, Menu, X, ArrowRight, Shield } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  description: string;
  breadcrumb?: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  navExtraLink?: { label: string; href: string };
  effectiveDate?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  description,
  breadcrumb,
  badgeText = 'Reel Counter Compliance & Privacy',
  badgeIcon,
  navExtraLink,
  effectiveDate,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const displayBreadcrumb = breadcrumb || title;

  // Set the document title and meta description for SEO
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const previousDesc = meta ? meta.getAttribute('content') : null;

    document.title = `${title} | Reel Counter`;
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
    <div className="min-h-screen flex flex-col bg-[#1E1B2E] text-white font-sans antialiased selection:bg-[#7C3AED] selection:text-white">
      {/* Sticky Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#1E1B2E]/90 border-b border-[#312B4A] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded-xl">
            <img
              src="/icon-dark.png"
              alt="Reel Counter"
              className="w-10 h-10 rounded-xl shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                ReelCounter
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C3AED]">TRACK & BATTLE</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <Link to="/#features" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Features</Link>
            <Link to="/#preview" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Demo</Link>
            <Link to="/#battle" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Battle Mode</Link>
            <Link to="/#leaderboard" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Leaderboard</Link>
            <Link to="/#faq" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">FAQ</Link>
            <Link to="/privacy-policy" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Privacy Policy</Link>
            {navExtraLink && (
              <a href={navExtraLink.href} className="text-[#7C3AED] hover:underline font-bold">
                {navExtraLink.label}
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/#download"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:opacity-95 shadow-lg shadow-purple-900/40 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            >
              Get App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[#3B3456] text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 border-b border-[#312B4A] bg-[#241F36] space-y-4">
            <Link to="/#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-200">Features</Link>
            <Link to="/#preview" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-200">App Preview</Link>
            <Link to="/#battle" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-200">Battle Mode</Link>
            <Link to="/#leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-200">Leaderboard</Link>
            <Link to="/#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-200">FAQ</Link>
            <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-slate-200">Privacy Policy</Link>
            {navExtraLink && (
              <a href={navExtraLink.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-purple-400">
                {navExtraLink.label}
              </a>
            )}
            <Link to="/#download" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl font-bold text-white bg-[#7C3AED]">
              Get App
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {displayBreadcrumb}
              </li>
            </ol>
          </nav>

          {/* Hero Header block */}
          <header className="p-8 sm:p-12 rounded-3xl border border-[#3B3456] bg-[#262238] shadow-2xl shadow-purple-950/30 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-300">
                {badgeIcon || <Shield className="w-4 h-4 text-purple-400" />}
                <span>{badgeText}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {title}
              </h1>
              <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-slate-300">
                {description}
              </p>
              <div className="pt-3 border-t border-[#3B3456] flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-slate-400">
                {effectiveDate && (
                  <div>
                    <span>Effective Date: </span>
                    <strong className="text-slate-200">{effectiveDate}</strong>
                  </div>
                )}
                {effectiveDate && lastUpdated && <span>•</span>}
                {lastUpdated && (
                  <div>
                    <span>Last Updated: </span>
                    <strong className="text-slate-200">{lastUpdated}</strong>
                  </div>
                )}
                {(effectiveDate || lastUpdated) && <span>•</span>}
                <div>
                  <span>Package: </span>
                  <code className="text-purple-300 font-mono">com.uv.reelcounter</code>
                </div>
              </div>
            </div>
          </header>

          {/* Policy / Page Body */}
          <article className="space-y-12">
            {children}
          </article>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-[#7C3AED] text-white shadow-xl shadow-purple-950/50 hover:bg-purple-600 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
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
