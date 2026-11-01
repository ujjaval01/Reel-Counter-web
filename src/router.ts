import { useState, useEffect } from 'react';

/**
 * Programmatic client-side navigation.
 * Pushes state to the browser history and dispatches a popstate event
 * so all listening components re-render immediately.
 */
export function navigate(to: string) {
  if (typeof window !== 'undefined') {
    window.history.pushState(null, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

/**
 * Hook that returns the current window pathname and keeps it reactive.
 */
export function useCurrentPath(): string {
  const [path, setPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return path;
}

