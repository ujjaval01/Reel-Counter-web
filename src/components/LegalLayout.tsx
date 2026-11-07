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
    <div className="min-h-screen flex flex-col bg-[#FFF8EF] dark:bg-[#131B29] text-[#25334A] dark:text-[#F5F8FC] font-sans antialiased selection:bg-[#FF765E] selection:text-white transition-colors">
      {/* Sticky Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#FFF8EF]/90 dark:bg-[#131B29]/90 border-b border-[#F0E5DA] dark:border-[#2E3E56] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF765E] rounded-xl">
            <img
              src="/icon-dark.png"
              alt="Reel Counter"
              className="w-10 h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#25334A] dark:text-[#F5F8FC]">
                Reel<span className="text-[#FF765E]">Counter</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#687386] dark:text-[#94A3B8]">COMPLIANCE & LEGAL</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#687386] dark:text-[#94A3B8]">
            <Link to="/#features" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">Features</Link>
            <Link to="/#preview" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">Demo</Link>
            <Link to="/#battle" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">Battle Mode</Link>
            <Link to="/#leaderboard" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">Leaderboard</Link>
            <Link to="/#faq" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">FAQ</Link>
            <Link to="/privacy-policy" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">Privacy Policy</Link>
            {navExtraLink && (
              <a href={navExtraLink.href} className="text-[#FF765E] hover:underline font-bold">
                {navExtraLink.label}
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.uv.reelcounter"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-[#FF765E] hover:bg-[#F4654C] shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
            >
              Get App
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[#F0E5DA] dark:border-[#2E3E56] text-[#25334A] dark:text-[#F5F8FC] focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 border-b border-[#F0E5DA] dark:border-[#2E3E56] bg-white dark:bg-[#192334] space-y-4">
            <Link to="/#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#25334A] dark:text-[#F5F8FC]">Features</Link>
            <Link to="/#preview" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#25334A] dark:text-[#F5F8FC]">App Preview</Link>
            <Link to="/#battle" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#25334A] dark:text-[#F5F8FC]">Battle Mode</Link>
            <Link to="/#leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#25334A] dark:text-[#F5F8FC]">Leaderboard</Link>
            <Link to="/#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#25334A] dark:text-[#F5F8FC]">FAQ</Link>
            <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#25334A] dark:text-[#F5F8FC]">Privacy Policy</Link>
            {navExtraLink && (
              <a href={navExtraLink.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-base font-semibold text-[#FF765E]">
                {navExtraLink.label}
              </a>
            )}
            <a 
              href="https://play.google.com/store/apps/details?id=com.uv.reelcounter" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block w-full text-center py-3 rounded-full font-bold text-white bg-[#FF765E]"
            >
              Get App
            </a>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-medium text-[#687386] dark:text-[#94A3B8]">
              <li>
                <Link to="/" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-[#687386]" />
              </li>
              <li className="text-[#FF765E] font-semibold" aria-current="page">
                {displayBreadcrumb}
              </li>
            </ol>
          </nav>

          {/* Hero Header block */}
          <header className="p-8 sm:p-12 rounded-3xl border border-[#F0E5DA] dark:border-[#2E3E56] bg-white dark:bg-[#1F2C40] shadow-sm mb-12 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF765E]/30 bg-[#FFE2D5] dark:bg-[#3D2627] text-xs font-bold text-[#FF765E]">
                {badgeIcon || <Shield className="w-4 h-4 text-[#FF765E]" />}
                <span>{badgeText}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#25334A] dark:text-[#F5F8FC]">
                {title}
              </h1>
              <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-[#687386] dark:text-[#94A3B8]">
                {description}
              </p>
              <div className="pt-3 border-t border-[#F0E5DA] dark:border-[#2E3E56] flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-[#687386] dark:text-[#94A3B8]">
                {effectiveDate && (
                  <div>
                    <span>Effective Date: </span>
                    <strong className="text-[#25334A] dark:text-[#F5F8FC]">{effectiveDate}</strong>
                  </div>
                )}
                {effectiveDate && lastUpdated && <span>•</span>}
                {lastUpdated && (
                  <div>
                    <span>Last Updated: </span>
                    <strong className="text-[#25334A] dark:text-[#F5F8FC]">{lastUpdated}</strong>
                  </div>
                )}
                {(effectiveDate || lastUpdated) && <span>•</span>}
                <div>
                  <span>Package: </span>
                  <code className="text-[#FF765E] font-mono">com.uv.reelcounter</code>
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
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#FF765E] text-white shadow-lg hover:bg-[#F4654C] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
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
