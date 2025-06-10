
// Optimized Design tokens for consistent theming and performance
export const designTokens = {
  // Enhanced spacing tokens
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '5rem',    // 80px
  },

  // Enhanced typography tokens
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
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
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
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2',
    },
  },

  // Enhanced border radius tokens
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Enhanced shadow tokens with brand integration
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    // Brand shadows
    brand: {
      sm: '0 1px 3px rgba(138, 115, 226, 0.1)',
      md: '0 4px 12px rgba(138, 115, 226, 0.15)',
      lg: '0 8px 25px rgba(138, 115, 226, 0.2)',
      xl: '0 20px 40px rgba(138, 115, 226, 0.25)',
      glow: '0 0 20px rgba(138, 115, 226, 0.3)',
    }
  },

  // Enhanced animation tokens for performance
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Enhanced breakpoints for responsive design
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Enhanced brand color semantic tokens
  colors: {
    brand: {
      primary: {
        50: 'hsl(262 83% 97%)',
        100: 'hsl(262 83% 92%)',
        200: 'hsl(262 83% 82%)',
        300: 'hsl(262 83% 72%)',
        400: 'hsl(262 83% 62%)',
        500: 'hsl(262 83% 58%)', // Main brand primary
        600: 'hsl(262 83% 48%)',
        700: 'hsl(262 83% 38%)',
        800: 'hsl(262 83% 28%)',
        900: 'hsl(262 83% 18%)',
      },
      secondary: {
        50: 'hsl(187 85% 97%)',
        100: 'hsl(187 85% 92%)',
        200: 'hsl(187 85% 82%)',
        300: 'hsl(187 85% 72%)',
        400: 'hsl(187 85% 62%)',
        500: 'hsl(187 85% 53%)', // Main brand secondary
        600: 'hsl(187 85% 43%)',
        700: 'hsl(187 85% 33%)',
        800: 'hsl(187 85% 23%)',
        900: 'hsl(187 85% 13%)',
      },
      accent: {
        50: 'hsl(24 95% 97%)',
        100: 'hsl(24 95% 92%)',
        200: 'hsl(24 95% 82%)',
        300: 'hsl(24 95% 72%)',
        400: 'hsl(24 95% 62%)',
        500: 'hsl(24 95% 53%)', // Main brand accent
        600: 'hsl(24 95% 43%)',
        700: 'hsl(24 95% 33%)',
        800: 'hsl(24 95% 23%)',
        900: 'hsl(24 95% 13%)',
      },
    },
    // Semantic color mappings
    background: {
      primary: 'hsl(var(--background))',
      secondary: 'hsl(var(--card))',
      muted: 'hsl(var(--muted))',
      accent: 'hsl(var(--accent))',
    },
    text: {
      primary: 'hsl(var(--foreground))',
      secondary: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--primary))',
      inverse: 'hsl(var(--primary-foreground))',
    },
    border: {
      primary: 'hsl(var(--border))',
      muted: 'hsl(var(--border) / 0.5)',
      accent: 'hsl(var(--primary) / 0.2)',
    },
  },

  // Enhanced gradients for brand consistency
  gradients: {
    brand: {
      primary: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(187 85% 53%))',
      secondary: 'linear-gradient(135deg, hsl(187 85% 53%), hsl(262 83% 58%))',
      accent: 'linear-gradient(135deg, hsl(24 95% 53%), hsl(262 83% 58%))',
      hero: 'linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(187 85% 53%) 50%, hsl(24 95% 53%) 100%)',
      subtle: 'linear-gradient(135deg, hsl(262 83% 97%), hsl(187 85% 97%))',
    }
  },
} as const;

// Performance-optimized utility function
export const getToken = (path: string) => {
  const keys = path.split('.');
  let value: any = designTokens;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return null;
  }
  
  return value;
};

// Enhanced responsive breakpoint utilities
export const mediaQueries = {
  xs: `@media (min-width: ${designTokens.breakpoints.xs})`,
  sm: `@media (min-width: ${designTokens.breakpoints.sm})`,
  md: `@media (min-width: ${designTokens.breakpoints.md})`,
  lg: `@media (min-width: ${designTokens.breakpoints.lg})`,
  xl: `@media (min-width: ${designTokens.breakpoints.xl})`,
  '2xl': `@media (min-width: ${designTokens.breakpoints['2xl']})`,
  // Additional utility queries
  mobile: `@media (max-width: ${designTokens.breakpoints.md})`,
  tablet: `@media (min-width: ${designTokens.breakpoints.md}) and (max-width: ${designTokens.breakpoints.lg})`,
  desktop: `@media (min-width: ${designTokens.breakpoints.lg})`,
};

// Enhanced component style presets for consistency
export const componentPresets = {
  card: {
    default: {
      padding: designTokens.spacing.lg,
      borderRadius: designTokens.borderRadius.lg,
      boxShadow: designTokens.shadows.md,
      backgroundColor: designTokens.colors.background.secondary,
      border: `1px solid ${designTokens.colors.border.muted}`,
    },
    enhanced: {
      padding: designTokens.spacing.lg,
      borderRadius: designTokens.borderRadius.xl,
      boxShadow: designTokens.shadows.brand.sm,
      backgroundColor: designTokens.colors.background.primary,
      border: `1px solid ${designTokens.colors.border.accent}`,
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeOut}`,
    }
  },
  button: {
    base: {
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      borderRadius: designTokens.borderRadius.md,
      fontWeight: designTokens.typography.fontWeight.medium,
      fontSize: designTokens.typography.fontSize.sm,
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
    },
    brand: {
      background: designTokens.gradients.brand.primary,
      color: designTokens.colors.text.inverse,
      boxShadow: designTokens.shadows.brand.sm,
    }
  },
  input: {
    base: {
      padding: designTokens.spacing.sm,
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid ${designTokens.colors.border.primary}`,
      fontSize: designTokens.typography.fontSize.base,
      transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.easeOut}`,
    },
    focus: {
      borderColor: designTokens.colors.border.accent,
      boxShadow: `0 0 0 3px ${designTokens.colors.border.accent}`,
    }
  },
};

// Performance optimization utilities
export const optimizations = {
  // Preload critical CSS custom properties
  preloadCriticalTokens: () => {
    const root = document.documentElement;
    const criticalTokens = {
      '--brand-primary': designTokens.colors.brand.primary[500],
      '--brand-secondary': designTokens.colors.brand.secondary[500],
      '--brand-accent': designTokens.colors.brand.accent[500],
      '--shadow-brand-sm': designTokens.shadows.brand.sm,
      '--radius-md': designTokens.borderRadius.md,
      '--duration-normal': designTokens.animation.duration.normal,
    };
    
    Object.entries(criticalTokens).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  },
  
  // Lazy load non-critical design tokens
  lazyLoadTokens: (category: keyof typeof designTokens) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(designTokens[category]);
      }, 0);
    });
  }
};
