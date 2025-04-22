export const theme = {
  colors: {
    // Primary colors
    primary: {
      main: '#007AFF',
      light: '#5AC8FA',
      dark: '#004DE3',
    },
    secondary: {
      main: '#5856D6',
      light: '#7876FF',
      dark: '#3A38B3',
    },
    
    // Background colors
    background: {
      primary: '#F2F2F7',
      secondary: '#FFFFFF',
      tertiary: '#E5E5EA',
    },
    
    // Text colors
    text: {
      primary: '#000000',
      secondary: '#3C3C43',
      tertiary: '#8E8E93',
      inverse: '#FFFFFF',
    },
    
    // Weather-specific colors
    weather: {
      sunny: '#FF9500',
      cloudy: '#8E8E93',
      rainy: '#007AFF',
      snowy: '#5AC8FA',
      stormy: '#5856D6',
      foggy: '#C7C7CC',
    },
    
    // System colors
    system: {
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#007AFF',
    },
  },
  
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      secondary: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },
  
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}; 