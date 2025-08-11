// theme.ts
// Enhanced Theme with Aceternity UI inspiration
export const theme = {
  colors: {
    // Primary gradient colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Success/Profit colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Danger/Loss colors
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    // Warning colors
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Purple/Violet for premium features
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    
    // Background gradients
    background: {
      light: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      dark: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
      card: 'rgba(255, 255, 255, 0.1)',
      cardDark: 'rgba(0, 0, 0, 0.3)',
    },
    
    // Glass morphism
    glass: {
      light: 'rgba(255, 255, 255, 0.25)',
      dark: 'rgba(0, 0, 0, 0.25)',
      border: 'rgba(255, 255, 255, 0.18)',
      borderDark: 'rgba(255, 255, 255, 0.1)',
    },
    
    // Neutral grays
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600',
    success: 'bg-gradient-to-r from-green-400 to-emerald-600',
    danger: 'bg-gradient-to-r from-red-400 to-rose-600',
    warning: 'bg-gradient-to-r from-amber-400 to-orange-600',
    purple: 'bg-gradient-to-r from-purple-400 to-violet-600',
    ocean: 'bg-gradient-to-r from-cyan-400 to-blue-600',
    sunset: 'bg-gradient-to-r from-orange-400 to-pink-600',
    aurora: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
    cosmic: 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900',
  },

  animations: {
    float: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    ping: 'animate-ping',
    fade: 'animate-fadeIn',
    slide: 'animate-slideUp',
    glow: 'animate-glow',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(59, 130, 246, 0.5)',
    glowGreen: '0 0 20px rgba(34, 197, 94, 0.5)',
    glowRed: '0 0 20px rgba(239, 68, 68, 0.5)',
    glowPurple: '0 0 20px rgba(168, 85, 247, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      display: ['Cal Sans', 'Inter', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
  },

  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },

  borderRadius: {
    sm: '0.25rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem', 
    full: '9999px',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export type ThemeType = typeof theme;

export const chartPalette: string[] = [
  '#3b82f6', // blue-500
  '#22c55e', // green-500
  '#f59e0b', // amber-500
  '#a855f7', // purple-500
  '#ef4444', // red-500
  '#14b8a6', // teal-500
  '#f97316', // orange-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
  '#eab308', // yellow-500
];

export const getChartColor = (index: number) => chartPalette[index % chartPalette.length];
