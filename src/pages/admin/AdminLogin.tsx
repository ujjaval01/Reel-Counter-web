import { ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { navigate } from '../../router';

export default function AdminLogin() {
  const { isConfigured, loading, error, loginWithGoogle, clearError } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#25334A] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Subtle Ambient Warm Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFE2D5]/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-[#E4F5EE]/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Return to Website Link */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-heading font-bold text-[#687386] hover:text-[#25334A] transition-colors px-3.5 py-2.5 rounded-2xl bg-white hover:bg-[#FFFDF9] border border-[#F0E5DA] shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 text-[#FF765E]" />
        Return to Website
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-[#F0E5DA] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(37,51,74,0.08)] relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF765E] to-[#FFB36B] p-0.5 shadow-lg shadow-[#FF765E]/20 mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-[#FFF8EF] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#FF765E]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#25334A] tracking-tight">
            Reel<span className="text-[#FF765E]">Counter</span> Admin
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-[#2D8A78] font-heading font-extrabold mt-1.5 px-3 py-1 rounded-full bg-[#E4F5EE] border border-[#45BFA8]/20 inline-block">
            Private Owner Portal
          </p>
          <p className="text-sm font-sans font-medium text-[#687386] mt-3 leading-relaxed">
            Sign in with the verified owner Google account to monitor live metrics, battles, and user analytics.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <div className="flex-1">
              <p className="font-heading font-bold mb-0.5 text-rose-900">Authentication Alert</p>
              <p className="leading-relaxed font-sans">{error}</p>
              <button
                onClick={clearError}
                className="mt-2 text-[11px] underline font-bold text-rose-700 hover:text-rose-900"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Environment Configuration Warning */}
        {!isConfigured ? (
          <div className="p-5 rounded-2xl bg-[#FFF1E7] border border-[#FFB36B]/40 text-[#D9631E] text-xs mb-6 space-y-2">
            <div className="flex items-center gap-2 font-heading font-extrabold text-sm text-[#D9631E]">
              <KeyRound className="w-4 h-4" />
              Firebase Client Configuration Needed
            </div>
            <p className="leading-relaxed font-sans text-[#25334A]">
              Please define the following client environment variables in your Vercel project or <code className="text-[#25334A] bg-white border border-[#F0E5DA] px-1 py-0.5 rounded font-mono">.env.local</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#687386] font-mono text-[11px]">
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
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-[#FFFDF9] border border-[#F0E5DA] text-[#25334A] font-heading font-bold text-sm shadow-[0_4px_16px_rgba(37,51,74,0.06)] hover:shadow-[0_8px_20px_rgba(37,51,74,0.1)] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#FF765E] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
        <div className="mt-8 pt-6 border-t border-[#F0E5DA] space-y-2.5 text-xs text-[#687386] font-sans font-medium">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#45BFA8] shrink-0" />
            <span>Strictly READ-ONLY &mdash; zero mutations or write operations.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF765E] shrink-0" />
            <span>Tokens verified against server-side <code className="text-[#25334A] font-mono font-bold bg-[#FFF1E7] px-1 py-0.5 rounded">ADMIN_UID</code>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
