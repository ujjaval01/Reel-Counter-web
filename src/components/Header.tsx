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
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${
      isDark ? 'bg-[#0A0D18]/80 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl">
          <img
            src={isDark ? '/icon-dark.png' : '/icon-light.png'}
            alt="ReelCounter Logo"
            className="w-10 h-10 rounded-xl shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
              ReelCounter
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400/80">TRACK & BATTLE</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link to="/#features" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Features</Link>
          <Link to="/#preview" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Interactive Demo</Link>
          <Link to="/#battle" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Battle Mode</Link>
          <Link to="/#leaderboard" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Leaderboard</Link>
          <Link to="/#how-it-works" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">How It Works</Link>
          <Link to="/#faq" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-yellow-400' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Toggle theme"
            aria-label="Toggle dark/light theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/#download"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Get the App
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-6 py-6 border-b space-y-4 ${isDark ? 'bg-[#0E1326] border-slate-800' : 'bg-white border-slate-200'}`}>
          <Link to="/#features" onClick={onToggleMobileMenu} className="block py-2 text-base font-semibold">Features</Link>
          <Link to="/#preview" onClick={onToggleMobileMenu} className="block py-2 text-base font-semibold">App Preview</Link>
          <Link to="/#battle" onClick={onToggleMobileMenu} className="block py-2 text-base font-semibold">Battle Mode</Link>
          <Link to="/#leaderboard" onClick={onToggleMobileMenu} className="block py-2 text-base font-semibold">Leaderboard</Link>
          <Link to="/#how-it-works" onClick={onToggleMobileMenu} className="block py-2 text-base font-semibold">How It Works</Link>
          <Link to="/#faq" onClick={onToggleMobileMenu} className="block py-2 text-base font-semibold">FAQ</Link>
          <Link to="/#download" onClick={onToggleMobileMenu} className="block w-full text-center py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600">
            Get the App
          </Link>
        </div>
      )}
    </nav>
  );
}
