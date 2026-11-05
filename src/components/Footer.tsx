import { useTheme } from '../ThemeContext';
import Link from './Link';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`py-12 border-t ${isDark ? 'border-slate-800/80 bg-[#060810]' : 'border-slate-200 bg-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl">
            <img
              src={isDark ? '/icon-dark.png' : '/icon-light.png'}
              alt="ReelCounter Logo"
              className="w-8 h-8 rounded-xl"
            />
            <span className="font-extrabold text-lg tracking-tight">ReelCounter</span>
            <span className="text-xs text-slate-500 font-medium ml-2">Scroll smarter. Live better.</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
            <Link to="/#features" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Features</Link>
            <Link to="/#preview" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">App Preview</Link>
            <Link to="/#battle" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Battle Mode</Link>
            <Link to="/#leaderboard" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Leaderboard</Link>
            <Link to="/#faq" className="hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">FAQ</Link>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ReelCounter. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy-policy" className="hover:underline hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Privacy Policy</Link>
            <Link to="/delete-account" className="hover:underline hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-400">Delete Account</Link>
            <span className="cursor-pointer hover:underline">Terms & Conditions</span>
            <span className="cursor-pointer hover:underline">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
