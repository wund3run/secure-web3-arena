// Hawkly Brand Colors - Centralized Color System
export const hawklyColors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#4a90e2', // Main hawkly-primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  
  // Secondary Brand Colors
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#33c3f0', // Main hawkly-secondary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  },

  // Accent Colors
  accent: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#9b87f5', // Main hawkly-accent
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764'
  },

  // Status Colors
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
    900: '#14532d'
  },

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
    900: '#78350f'
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  },

  // Neutral Colors
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
    950: '#030712'
  }
} as const;

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  Object.entries(hawklyColors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      cssVars[`--hawkly-${colorName}-${shade}`] = value;
    });
  });

  // Main brand colors for easy access
  cssVars['--hawkly-primary'] = hawklyColors.primary[500];
  cssVars['--hawkly-secondary'] = hawklyColors.secondary[500];
  cssVars['--hawkly-accent'] = hawklyColors.accent[500];

  return cssVars;
};

// Utility functions for color manipulation
export const getHawklyColor = (color: keyof typeof hawklyColors, shade: number = 500) => {
  return hawklyColors[color][shade as keyof typeof hawklyColors[typeof color]];
};

export const getColorWithOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Tailwind CSS class generators
export const hawklyClasses = {
  // Background classes
  bg: {
    primary: 'bg-hawkly-primary',
    'primary-light': 'bg-hawkly-primary/10',
    'primary-hover': 'hover:bg-hawkly-primary/90',
    secondary: 'bg-hawkly-secondary',
    'secondary-light': 'bg-hawkly-secondary/10',
    accent: 'bg-hawkly-accent',
    'accent-light': 'bg-hawkly-accent/10'
  },
  
  // Text classes
  text: {
    primary: 'text-hawkly-primary',
    secondary: 'text-hawkly-secondary',
    accent: 'text-hawkly-accent',
    'primary-hover': 'hover:text-hawkly-primary'
  },
  
  // Border classes
  border: {
    primary: 'border-hawkly-primary',
    'primary-light': 'border-hawkly-primary/20',
    secondary: 'border-hawkly-secondary',
    accent: 'border-hawkly-accent'
  },

  // Gradient classes
  gradient: {
    'primary-secondary': 'bg-gradient-to-r from-hawkly-primary to-hawkly-secondary',
    'primary-accent': 'bg-gradient-to-r from-hawkly-primary to-hawkly-accent',
    'secondary-accent': 'bg-gradient-to-r from-hawkly-secondary to-hawkly-accent'
  }
};

// Component-specific color schemes
export const componentColors = {
  button: {
    primary: {
      bg: 'bg-hawkly-primary',
      hover: 'hover:bg-hawkly-primary/90',
      text: 'text-white',
      border: 'border-hawkly-primary'
    },
    secondary: {
      bg: 'bg-transparent',
      hover: 'hover:bg-hawkly-primary/10',
      text: 'text-hawkly-primary',
      border: 'border-hawkly-primary'
    }
  },
  
  card: {
    default: {
      bg: 'bg-white',
      border: 'border-gray-200',
      shadow: 'shadow-sm'
    },
    highlighted: {
      bg: 'bg-hawkly-primary/5',
      border: 'border-hawkly-primary/20',
      shadow: 'shadow-md'
    }
  },

  badge: {
    primary: {
      bg: 'bg-hawkly-primary',
      text: 'text-white'
    },
    secondary: {
      bg: 'bg-hawkly-primary/10',
      text: 'text-hawkly-primary'
    }
  }
};

export default hawklyColors; 