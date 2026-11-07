import { useTheme } from '../ThemeContext';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import Link from './Link';

interface HeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function Header({ mobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3.5 sm:pt-4 transition-all duration-200">
      <nav className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl px-5 sm:px-7 h-16 sm:h-18 flex items-center justify-between border backdrop-blur-xl transition-all duration-200 ${
        isDark 
          ? 'bg-[#192334]/90 border-[#2E3E56] shadow-[0_8px_24px_rgba(0,0,0,0.35)]' 
          : 'bg-[#FFFDF9]/90 border-[#F0E5DA] shadow-[0_8px_24px_rgba(37,51,74,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)]'
      }`}>
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF765E] rounded-xl">
          <div className="relative">
            <img
              src={isDark ? '/icon-dark.png' : '/icon-light.png'}
              alt="ReelCounter Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#45BFA8] border-2 border-white dark:border-[#192334]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#25334A] dark:text-[#F5F8FC]">
              Reel<span className="text-[#FF765E]">Counter</span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#687386] dark:text-[#94A3B8]">
              MINDFUL SCROLL
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className={`hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold ${
          isDark ? 'text-[#94A3B8]' : 'text-[#687386]'
        }`}>
          <Link to="/#features" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
            Features
          </Link>
          <Link to="/#preview" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
            Interactive Demo
          </Link>
          <Link to="/#battle" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
            Battle Mode
          </Link>
          <Link to="/#leaderboard" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
            Leaderboard
          </Link>
          <Link to="/#how-it-works" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
            How It Works
          </Link>
          <Link to="/#faq" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
            FAQ
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF765E] ${
              isDark 
                ? 'border-[#2E3E56] bg-[#1F2C40] hover:bg-[#283750] text-[#FFB36B]' 
                : 'border-[#F0E5DA] bg-[#FFF8EF] hover:bg-[#FFF1E7] text-[#25334A] shadow-sm'
            }`}
            title="Toggle dark/light theme"
            aria-label="Toggle dark/light theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CORAL CTA */}
          <a
            href="https://play.google.com/store/apps/details?id=com.uv.reelcounter"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-b from-[#FF7E67] to-[#FF6F56] shadow-[0_6px_16px_rgba(255,118,94,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF765E]"
          >
            Get the App
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={onToggleMobileMenu}
            className={`md:hidden p-2 rounded-xl border transition-all ${
              isDark ? 'border-[#2E3E56] bg-[#1F2C40] text-[#F5F8FC]' : 'border-[#F0E5DA] bg-white text-[#25334A]'
            } focus:outline-none focus:ring-2 focus:ring-[#FF765E]`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN DRAWER */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-3 max-w-7xl mx-auto rounded-3xl p-6 border shadow-xl space-y-3 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200 ${
          isDark 
            ? 'bg-[#192334]/95 border-[#2E3E56] text-[#F5F8FC]' 
            : 'bg-white/95 border-[#F0E5DA] text-[#25334A]'
        }`}>
          <Link to="/#features" onClick={onToggleMobileMenu} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Features</Link>
          <Link to="/#preview" onClick={onToggleMobileMenu} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Interactive Demo</Link>
          <Link to="/#battle" onClick={onToggleMobileMenu} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Battle Mode</Link>
          <Link to="/#leaderboard" onClick={onToggleMobileMenu} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Leaderboard</Link>
          <Link to="/#how-it-works" onClick={onToggleMobileMenu} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">How It Works</Link>
          <Link to="/#faq" onClick={onToggleMobileMenu} className="block py-2.5 px-3 rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">FAQ</Link>
          <div className="pt-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.uv.reelcounter"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onToggleMobileMenu}
              className="block w-full text-center py-3.5 rounded-full font-heading font-bold text-white bg-[#FF765E] shadow-md shadow-[#FF765E]/30"
            >
              Get ReelCounter Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
