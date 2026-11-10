import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import { RefreshCw } from 'lucide-react';

function AdminGate() {
  const { user, idToken, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-slate-400 gap-4 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-[#FF765E]/10 border border-[#FF765E]/20 flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin text-[#FF765E]" />
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  if (!user || !idToken) {
    return <AdminLogin />;
  }

  return <AdminLayout />;
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
