
/**
 * Unified Color System - Single Source of Truth
 * All color values should reference this file to ensure consistency
 */

export const colorTokens = {
  // Brand Colors
  brand: {
    primary: 'hsl(221, 83%, 53%)',
    secondary: 'hsl(142, 76%, 36%)',
    accent: 'hsl(271, 76%, 53%)',
    orange: 'hsl(25, 95%, 53%)',
  },

  // Semantic Colors
  semantic: {
    success: 'hsl(142, 76%, 36%)',
    warning: 'hsl(45, 93%, 47%)',
    error: 'hsl(0, 84%, 60%)',
    info: 'hsl(199, 89%, 48%)',
  },

  // Neutral Colors (Dark Theme)
  neutral: {
    background: 'hsl(220, 26%, 14%)',
    foreground: 'hsl(220, 9%, 95%)',
    card: 'hsl(220, 26%, 17%)',
    cardForeground: 'hsl(220, 9%, 95%)',
    muted: 'hsl(220, 14%, 20%)',
    mutedForeground: 'hsl(220, 4%, 65%)',
    accent: 'hsl(220, 14%, 24%)',
    accentForeground: 'hsl(220, 9%, 95%)',
    border: 'hsl(220, 13%, 25%)',
    input: 'hsl(220, 13%, 25%)',
    ring: 'hsl(221, 83%, 53%)',
  },

  // Status Colors
  status: {
    online: 'hsl(142, 76%, 36%)',
    offline: 'hsl(220, 4%, 65%)',
    busy: 'hsl(45, 93%, 47%)',
    away: 'hsl(25, 95%, 53%)',
  }
} as const;

export const gradients = {
  primary: `linear-gradient(135deg, ${colorTokens.brand.primary}, ${colorTokens.brand.secondary})`,
  accent: `linear-gradient(135deg, ${colorTokens.brand.accent}, ${colorTokens.brand.orange})`,
  hero: `linear-gradient(135deg, ${colorTokens.neutral.background}, ${colorTokens.brand.primary.replace(')', ' / 0.1)')})`,
} as const;

export const shadows = {
  brand: `0 4px 20px ${colorTokens.brand.primary.replace(')', ' / 0.15)')}`,
  brandLg: `0 8px 32px ${colorTokens.brand.primary.replace(')', ' / 0.2)')}`,
  brandXl: `0 12px 40px ${colorTokens.brand.primary.replace(')', ' / 0.25)')}`,
} as const;

// Utility functions
export const withOpacity = (color: string, opacity: number): string => {
  return color.replace(')', ` / ${opacity})`);
};

export const getSemanticColor = (type: 'success' | 'warning' | 'error' | 'info'): string => {
  return colorTokens.semantic[type];
};

export const getBrandColor = (type: 'primary' | 'secondary' | 'accent' | 'orange'): string => {
  return colorTokens.brand[type];
};
