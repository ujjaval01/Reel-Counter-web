import { ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { navigate } from '../../router';

export default function AdminLogin() {
  const { isConfigured, loading, error, loginWithGoogle, clearError } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF765E]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#45BFA8]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Home Link */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Website
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#192334]/95 border border-slate-700/80 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF765E] to-[#FFB36B] p-0.5 shadow-lg shadow-[#FF765E]/20 mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-[#192334] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#FF765E]" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Reel<span className="text-[#FF765E]">Counter</span> Admin
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#45BFA8] font-bold mt-1">
            Private Owner Portal
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Sign in with the verified owner Google account to monitor metrics, battles, and user analytics.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <div className="flex-1">
              <p className="font-semibold mb-0.5">Authentication Alert</p>
              <p className="leading-relaxed">{error}</p>
              <button
                onClick={clearError}
                className="mt-2 text-[11px] underline hover:text-rose-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Environment Configuration Warning */}
        {!isConfigured ? (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-6 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <KeyRound className="w-4 h-4" />
              Firebase Client Configuration Needed
            </div>
            <p className="leading-relaxed text-slate-300">
              Please define the following client environment variables in your Vercel project or <code className="text-white bg-slate-900 px-1 py-0.5 rounded">.env.local</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-[11px]">
              <li>VITE_FIREBASE_API_KEY</li>
              <li>VITE_FIREBASE_AUTH_DOMAIN</li>
              <li>VITE_FIREBASE_PROJECT_ID</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-[0_4px_16px_rgba(255,255,255,0.15)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Security Disclaimers */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 space-y-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#45BFA8]" />
            <span>Strictly READ-ONLY &mdash; zero mutations or write operations.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB36B]" />
            <span>Tokens verified against server-side <code className="text-white">ADMIN_UID</code>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
