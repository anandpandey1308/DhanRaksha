// theme.ts
export const theme = {
    colors: {
      // Brand colors
      primary: '#16A34A', // Green 600 - trust, growth
      primaryLight: '#4ADE80', // Green 400
      primaryDark: '#166534', // Green 800
  
      secondary: '#2563EB', // Blue 600 - stability
      secondaryLight: '#60A5FA', // Blue 400
      secondaryDark: '#1E3A8A', // Blue 900
  
      // Finance signals
      profit: '#22C55E', // Green 500
      loss: '#EF4444', // Red 500
      warning: '#F59E0B', // Amber 500
      neutral: '#9CA3AF', // Gray 400
  
      // Backgrounds & surfaces
      background: '#F9FAFB', // Gray 50
      surface: '#FFFFFF', // Card backgrounds
      surfaceAlt: '#F3F4F6', // Light gray surface
  
      // Text
      textPrimary: '#111827', // Gray 900
      textSecondary: '#4B5563', // Gray 600
      textTertiary: '#6B7280', // Gray 500
      textInverse: '#FFFFFF',
  
      // Borders & dividers
      border: '#E5E7EB', // Gray 200
  
      // Charts
      chart1: '#22C55E', // Green
      chart2: '#3B82F6', // Blue
      chart3: '#F59E0B', // Amber
      chart4: '#EF4444', // Red
      chart5: '#8B5CF6', // Violet
    },
  
    typography: {
      fontFamily: `'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif`,
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  
    radii: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
  
    shadows: {
      xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    },
  
    spacing: (factor: number) => `${factor * 0.25}rem`, // 1 = 4px
  };
  
  export type ThemeType = typeof theme;
  