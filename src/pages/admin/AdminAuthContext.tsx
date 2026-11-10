import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  isFirebaseConfigured, 
  type User 
} from '../../lib/firebaseClient';

interface AdminAuthContextType {
  user: User | null;
  idToken: string | null;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  fetchAdminApi: <T = any>(endpoint: string, options?: RequestInit) => Promise<T>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);
        } catch (err: any) {
          console.error('Failed to get user ID token:', err);
          setError(err?.message || 'Failed to authenticate session token.');
          setIdToken(null);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      setError('Firebase client credentials (VITE_FIREBASE_*) are not configured in your environment.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken(true);
      setUser(result.user);
      setIdToken(token);
    } catch (err: any) {
      console.error('Google sign-in failed:', err);
      setError(err?.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setUser(null);
      setIdToken(null);
      setError(null);
    } catch (err: any) {
      console.error('Sign-out failed:', err);
    }
  };

  const fetchAdminApi = useCallback(async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    let token = idToken;
    if (user && !token) {
      token = await user.getIdToken();
      setIdToken(token);
    }

    if (!token) {
      throw new Error('Authentication required: No active admin token.');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');

    const res = await fetch(endpoint, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';
    let data: any = null;

    if (contentType.includes('application/json')) {
      data = await res.json().catch(() => null);
    } else {
      const text = await res.text().catch(() => '');
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${text.slice(0, 150)}`);
      }
      throw new Error(`API endpoint ${endpoint} did not return JSON. If testing locally, ensure the local API dev server is active.`);
    }

    if (!res.ok) {
      const errorMsg = data?.error || `Request failed with status ${res.status}`;
      if (res.status === 403) {
        throw new Error(`Unauthorized Admin Access: ${errorMsg}`);
      }
      throw new Error(errorMsg);
    }

    if (!data) {
      throw new Error('Server returned an empty response.');
    }

    return data as T;
  }, [idToken, user]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        idToken,
        loading,
        error,
        isConfigured: isFirebaseConfigured,
        loginWithGoogle,
        logout,
        fetchAdminApi,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
