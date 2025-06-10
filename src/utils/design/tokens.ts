
// Design tokens for consistent theming
export const designTokens = {
  // Spacing tokens
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  // Typography tokens
  typography: {
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Border radius tokens
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
  },

  // Shadow tokens
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Animation tokens
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Color semantic tokens (these map to CSS variables)
  colors: {
    primary: {
      50: 'hsl(var(--primary) / 0.05)',
      100: 'hsl(var(--primary) / 0.1)',
      500: 'hsl(var(--primary))',
      600: 'hsl(var(--primary) / 0.9)',
      900: 'hsl(var(--primary) / 0.8)',
    },
    secondary: {
      50: 'hsl(var(--secondary) / 0.05)',
      100: 'hsl(var(--secondary) / 0.1)',
      500: 'hsl(var(--secondary))',
      600: 'hsl(var(--secondary) / 0.9)',
    },
    background: {
      primary: 'hsl(var(--background))',
      secondary: 'hsl(var(--card))',
      muted: 'hsl(var(--muted))',
    },
    text: {
      primary: 'hsl(var(--foreground))',
      secondary: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--primary))',
    },
    border: {
      primary: 'hsl(var(--border))',
      muted: 'hsl(var(--border) / 0.5)',
    },
  },
} as const;

// Utility function to get design tokens
export const getToken = (path: string) => {
  const keys = path.split('.');
  let value: any = designTokens;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) break;
  }
  
  return value;
};

// Responsive breakpoint utilities
export const mediaQueries = {
  sm: `@media (min-width: ${designTokens.breakpoints.sm})`,
  md: `@media (min-width: ${designTokens.breakpoints.md})`,
  lg: `@media (min-width: ${designTokens.breakpoints.lg})`,
  xl: `@media (min-width: ${designTokens.breakpoints.xl})`,
  '2xl': `@media (min-width: ${designTokens.breakpoints['2xl']})`,
};

// Component style presets
export const componentPresets = {
  card: {
    padding: designTokens.spacing.lg,
    borderRadius: designTokens.borderRadius.lg,
    boxShadow: designTokens.shadows.md,
    backgroundColor: designTokens.colors.background.secondary,
  },
  button: {
    padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
    borderRadius: designTokens.borderRadius.md,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
  },
  input: {
    padding: designTokens.spacing.sm,
    borderRadius: designTokens.borderRadius.md,
    border: `1px solid ${designTokens.colors.border.primary}`,
    fontSize: designTokens.typography.fontSize.base,
  },
};
