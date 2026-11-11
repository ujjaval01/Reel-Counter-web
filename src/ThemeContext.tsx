import React, { createContext, useContext, useEffect } from 'react';

export type Theme = 'light';

interface ThemeContextValue {
  theme: 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure dark class is removed permanently
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('reelcounter-theme');
      const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
      if (link) {
        link.href = '/icon-light.png';
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
