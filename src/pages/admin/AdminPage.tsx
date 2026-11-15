import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import UnauthorizedModal from './UnauthorizedModal';
import { RefreshCw } from 'lucide-react';

function AdminGate() {
  const { user, idToken, loading, isAuthorized, unauthorizedEmail, logout } = useAdminAuth();

  // Initial Auth Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex flex-col items-center justify-center text-[#687386] gap-4 font-sans select-none">
        <div className="w-14 h-14 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_8px_20px_rgba(37,51,74,0.06)] flex items-center justify-center">
          <RefreshCw className="w-7 h-7 animate-spin text-[#FF765E]" />
        </div>
        <p className="text-xs uppercase tracking-widest font-heading font-extrabold text-[#687386]">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  // Not signed in to Google / Firebase at all
  if (!user || !idToken) {
    return <AdminLogin />;
  }

  // If user signed in with an unauthorized account -> DO NOT open admin portal, show warning card with 10s auto-redirect
  if (isAuthorized === false) {
    return (
      <UnauthorizedModal 
        email={unauthorizedEmail || user.email} 
        onLogoutAndExit={logout}
      />
    );
  }

  // While backend permission check is actively verifying
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex flex-col items-center justify-center text-[#687386] gap-4 font-sans select-none">
        <div className="w-14 h-14 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_8px_20px_rgba(37,51,74,0.06)] flex items-center justify-center">
          <RefreshCw className="w-7 h-7 animate-spin text-[#FF765E]" />
        </div>
        <p className="text-xs uppercase tracking-widest font-heading font-extrabold text-[#687386]">
          Checking Security Credentials...
        </p>
      </div>
    );
  }

  // Verified admin owner only
  return <AdminLayout />;
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
