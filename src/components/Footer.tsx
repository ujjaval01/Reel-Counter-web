import { useTheme } from '../ThemeContext';
import Link from './Link';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`relative py-16 border-t transition-colors duration-200 ${
      isDark 
        ? 'border-[#2E3E56] bg-[#131B29]' 
        : 'border-[#F0E5DA] bg-[#FFF8EF]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Main Footer Card */}
        <div className={`p-8 sm:p-10 rounded-3xl border transition-all ${
          isDark 
            ? 'bg-[#192334] border-[#2E3E56] shadow-[0_12px_30px_rgba(0,0,0,0.35)]' 
            : 'bg-white border-[#F0E5DA] shadow-[0_10px_25px_rgba(37,51,74,0.04)]'
        }`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            {/* Brand column */}
            <div className="space-y-3">
              <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF765E] rounded-xl">
                <img
                  src={isDark ? '/icon-dark.png' : '/icon-light.png'}
                  alt="ReelCounter Logo"
                  className="w-10 h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col text-left">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-[#25334A] dark:text-[#F5F8FC]">
                    Reel<span className="text-[#FF765E]">Counter</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#687386] dark:text-[#94A3B8]">
                    Scroll Smarter. Live Better.
                  </span>
                </div>
              </Link>
              <p className={`text-xs max-w-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#687386]'}`}>
                The mindful digital-wellbeing companion for Android. Track short-video scrolling, set realistic caps, and battle friends.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold">
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
          </div>

          {/* Sub Footer Border */}
          <div className="mt-8 pt-6 border-t border-[#F0E5DA] dark:border-[#2E3E56] flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
            <div className={`flex items-center gap-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#687386]'}`}>
              <span>&copy; {new Date().getFullYear()} ReelCounter. Built with care for healthier digital habits.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
              <Link to="/privacy-policy" className="hover:text-[#FF765E] hover:underline transition-colors focus:outline-none">
                Privacy Policy
              </Link>
              <Link to="/delete-account" className="hover:text-[#FF765E] hover:underline transition-colors focus:outline-none">
                Delete Account
              </Link>
              <a 
                href="https://play.google.com/store/apps/details?id=com.uv.reelcounter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#FF765E] hover:underline transition-colors focus:outline-none"
              >
                Google Play Store
              </a>
              <a 
                href="mailto:sainiujvl@gmail.com" 
                className="hover:text-[#FF765E] hover:underline transition-colors focus:outline-none"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
