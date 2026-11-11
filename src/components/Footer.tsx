import Link from './Link';

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-[#F0E5DA] bg-[#FFF8EF] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Main Footer Card */}
        <div className="p-8 sm:p-10 rounded-3xl border bg-white border-[#F0E5DA] shadow-[0_10px_25px_rgba(37,51,74,0.04)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            {/* Brand column */}
            <div className="space-y-3">
              <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF765E] rounded-xl">
                <img
                  src="/icon-light.png"
                  alt="ReelCounter Logo"
                  className="w-10 h-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col text-left">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-[#25334A]">
                    Reel<span className="text-[#FF765E]">Counter</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#687386]">
                    Scroll Smarter. Live Better.
                  </span>
                </div>
              </Link>
              <p className="text-xs max-w-sm text-[#687386]">
                The mindful digital-wellbeing companion for Android. Track short-video scrolling, set realistic caps, and battle friends.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-[#687386]">
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
              <Link to="/privacy-policy" className="hover:text-[#FF765E] transition-colors focus:outline-none focus:text-[#FF765E]">
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
