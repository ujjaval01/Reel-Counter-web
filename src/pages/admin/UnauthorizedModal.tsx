import { useState, useEffect } from 'react';
import { ShieldAlert, ArrowLeft, Lock, AlertTriangle } from 'lucide-react';
import { navigate } from '../../router';

interface UnauthorizedModalProps {
  email: string | null;
  onLogoutAndExit?: () => void;
}

export default function UnauthorizedModal({ email, onLogoutAndExit }: UnauthorizedModalProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onLogoutAndExit) {
            onLogoutAndExit();
          }
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogoutAndExit]);

  const handleImmediateExit = () => {
    if (onLogoutAndExit) {
      onLogoutAndExit();
    }
    navigate('/');
  };

  const progressPercent = (secondsLeft / 10) * 100;

  return (
    <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center p-4 antialiased font-sans select-none">
      <div className="w-full max-w-md bg-white border border-[#F0E5DA] shadow-[0_20px_60px_-15px_rgba(225,29,72,0.15)] rounded-3xl p-7 sm:p-9 text-center space-y-6 relative overflow-hidden">
        {/* Top Warning Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

        {/* Pulsing Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-3xl bg-rose-500/20 animate-ping opacity-30" />
          <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm relative z-10">
            <ShieldAlert className="w-10 h-10" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-heading font-extrabold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Access Restricted</span>
          </div>

          <h2 className="text-2xl font-heading font-extrabold text-[#25334A] tracking-tight">
            Unauthorized Account
          </h2>

          <p className="text-xs text-[#687386] font-medium leading-relaxed">
            This administrative control dashboard is reserved strictly for the verified owner of ReelCounter.
          </p>
        </div>

        {/* Identity Details Box */}
        <div className="p-4 rounded-2xl bg-[#FFF8EF] border border-[#F0E5DA] text-left space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] text-[#687386] font-medium">
            <span>Signed-in Account:</span>
            <span className="text-rose-600 font-bold font-mono">DENIED</span>
          </div>
          <p className="font-heading font-extrabold text-[#25334A] truncate text-sm">
            {email || 'Unknown User Account'}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#8B95A5] pt-1 border-t border-[#F0E5DA]">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>This attempt has been logged for security.</span>
          </div>
        </div>

        {/* 10-Second Auto Redirect Progress */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-heading font-bold">
            <span className="text-[#687386]">Auto Redirecting:</span>
            <span className="text-[#FF765E] font-mono text-sm">{secondsLeft}s remaining</span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#FFF1E7] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF765E] to-rose-500 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Exit Action Button */}
        <button
          onClick={handleImmediateExit}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#FF7E67] to-[#FF6F56] text-white text-xs font-heading font-bold shadow-[0_8px_20px_rgba(255,118,94,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage Now</span>
        </button>
      </div>
    </div>
  );
}
