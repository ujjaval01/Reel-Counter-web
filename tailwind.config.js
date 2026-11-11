/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cream + Coral Premium Design System
        cream: {
          bg: '#FFF8EF',         // Warm Cream
          bgPeach: '#FFF1E7',    // Soft Warm Peach
          surface: '#FFFFFF',    // Clean White
          surfaceMint: '#E4F5EE',// Soft Mint Surface
          surfaceCoral: '#FFE2D5',// Soft Coral Surface
          border: '#F0E5DA',     // Refined Warm Border
          coral: '#FF765E',      // Primary Accent Coral
          coralHover: '#F4654C',
          orange: '#FFB36B',     // Secondary Accent Soft Orange
          teal: '#45BFA8',       // Supporting Accent Teal
          tealDark: '#35A28D',
          navy: '#25334A',       // Deep Navy (Primary Text)
          slate: '#687386',      // Muted Slate (Secondary Text)
          // Dark Theme Counterparts (Deep Navy + Slate Surfaces)
          darkBg: '#131B29',     // Deepest Navy
          darkBgSecondary: '#192334', // Secondary Dark Navy
          darkSurface: '#1F2C40',     // Dark Slate Card
          darkSurfaceElevated: '#283750',
          darkBorder: '#2E3E56',
          darkText: '#F5F8FC',
          darkTextMuted: '#94A3B8',
        },
        brand: {
          coral: '#FF765E',
          orange: '#FFB36B',
          teal: '#45BFA8',
          navy: '#25334A',
          cream: '#FFF8EF',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        heading: ['Fredoka', 'sans-serif'],
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      boxShadow: {
        // Minimal 3D / Subtle Depth
        'subtle-sm': '0 2px 6px rgba(37, 51, 74, 0.04), 0 1px 2px rgba(37, 51, 74, 0.02)',
        'subtle-card': '0 12px 30px -4px rgba(37, 51, 74, 0.06), 0 4px 12px -2px rgba(37, 51, 74, 0.03)',
        'subtle-card-hover': '0 20px 40px -4px rgba(37, 51, 74, 0.1), 0 6px 16px -2px rgba(37, 51, 74, 0.04)',
        'coral-btn': '0 8px 20px -2px rgba(255, 118, 94, 0.38), 0 2px 6px rgba(255, 118, 94, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
        'coral-btn-hover': '0 12px 24px -2px rgba(255, 118, 94, 0.45), 0 4px 8px rgba(255, 118, 94, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        'teal-btn': '0 8px 20px -2px rgba(69, 191, 168, 0.38), 0 2px 6px rgba(69, 191, 168, 0.2)',
        'dark-card': '0 16px 36px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
