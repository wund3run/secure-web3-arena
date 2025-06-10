interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
}

interface ThemeConfig {
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  fonts: {
    sans: string[];
    mono: string[];
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

export class AdvancedThemeSystem {
  private static instance: AdvancedThemeSystem;
  private currentTheme: string = 'security-professional';
  private themes: Map<string, ThemeConfig> = new Map();

  static getInstance(): AdvancedThemeSystem {
    if (!AdvancedThemeSystem.instance) {
      AdvancedThemeSystem.instance = new AdvancedThemeSystem();
    }
    return AdvancedThemeSystem.instance;
  }

  constructor() {
    this.initializeDefaultThemes();
    this.loadUserPreferences();
  }

  private initializeDefaultThemes() {
    // Enhanced Security Professional theme
    this.themes.set('security-professional', {
      name: 'Security Professional',
      colors: {
        light: {
          primary: '217 91% 60%',
          secondary: '187 85% 55%',
          background: '217 32% 98%',
          foreground: '217 40% 12%',
          muted: '217 30% 92%',
          accent: '262 83% 62%',
          destructive: '0 84% 57%',
          border: '217 25% 88%',
          input: '217 25% 90%',
          ring: '217 91% 60%'
        },
        dark: {
          primary: '217 91% 65%',
          secondary: '187 85% 65%',
          background: '217 40% 6%',
          foreground: '217 30% 94%',
          muted: '217 40% 15%',
          accent: '262 83% 67%',
          destructive: '0 84% 65%',
          border: '217 40% 18%',
          input: '217 40% 18%',
          ring: '217 91% 65%'
        }
      },
      fonts: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      }
    });

    // Default theme
    this.themes.set('default', {
      name: 'Default',
      colors: {
        light: {
          primary: '222.2 84% 4.9%',
          secondary: '210 40% 96%',
          background: '0 0% 100%',
          foreground: '222.2 84% 4.9%',
          muted: '210 40% 96%',
          accent: '210 40% 96%',
          destructive: '0 84.2% 60.2%',
          border: '214.3 31.8% 91.4%',
          input: '214.3 31.8% 91.4%',
          ring: '222.2 84% 4.9%'
        },
        dark: {
          primary: '210 40% 98%',
          secondary: '222.2 84% 4.9%',
          background: '222.2 84% 4.9%',
          foreground: '210 40% 98%',
          muted: '217.2 32.6% 17.5%',
          accent: '217.2 32.6% 17.5%',
          destructive: '0 62.8% 30.6%',
          border: '217.2 32.6% 17.5%',
          input: '217.2 32.6% 17.5%',
          ring: '212.7 26.8% 83.9%'
        }
      },
      fonts: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      }
    });

    // High contrast theme for accessibility
    this.themes.set('high-contrast', {
      name: 'High Contrast',
      colors: {
        light: {
          primary: '0 0% 0%',
          secondary: '0 0% 20%',
          background: '0 0% 100%',
          foreground: '0 0% 0%',
          muted: '0 0% 90%',
          accent: '0 0% 10%',
          destructive: '0 100% 40%',
          border: '0 0% 0%',
          input: '0 0% 95%',
          ring: '0 0% 0%'
        },
        dark: {
          primary: '0 0% 100%',
          secondary: '0 0% 80%',
          background: '0 0% 0%',
          foreground: '0 0% 100%',
          muted: '0 0% 15%',
          accent: '0 0% 90%',
          destructive: '0 100% 60%',
          border: '0 0% 100%',
          input: '0 0% 10%',
          ring: '0 0% 100%'
        }
      },
      fonts: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      }
    });
  }

  generatePaletteFromColor(baseColor: string): ThemeColors {
    // Enhanced palette generation for security context
    const hsl = this.hexToHsl(baseColor);
    
    return {
      primary: `${hsl.h} ${Math.min(hsl.s + 10, 100)}% ${Math.min(hsl.l + 5, 70)}%`,
      secondary: `${(hsl.h + 30) % 360} ${hsl.s * 0.9}% ${Math.min(hsl.l + 8, 65)}%`,
      background: '217 32% 98%',
      foreground: '217 40% 12%',
      muted: `${hsl.h} ${hsl.s * 0.25}% 92%`,
      accent: `${(hsl.h + 60) % 360} ${hsl.s * 0.95}% ${hsl.l}%`,
      destructive: '0 84% 57%',
      border: `${hsl.h} ${hsl.s * 0.25}% 88%`,
      input: `${hsl.h} ${hsl.s * 0.25}% 90%`,
      ring: `${hsl.h} ${Math.min(hsl.s + 10, 100)}% ${Math.min(hsl.l + 5, 70)}%`
    };
  }

  createCustomTheme(name: string, baseColor: string): ThemeConfig {
    const lightColors = this.generatePaletteFromColor(baseColor);
    const darkColors = this.generateDarkVariant(lightColors);

    const theme: ThemeConfig = {
      name,
      colors: { light: lightColors, dark: darkColors },
      fonts: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      }
    };

    this.themes.set(name, theme);
    return theme;
  }

  private generateDarkVariant(lightColors: ThemeColors): ThemeColors {
    return {
      primary: lightColors.background,
      secondary: lightColors.foreground,
      background: lightColors.foreground,
      foreground: lightColors.background,
      muted: '217.2 32.6% 17.5%',
      accent: '217.2 32.6% 17.5%',
      destructive: '0 62.8% 30.6%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: lightColors.primary
    };
  }

  applyTheme(themeName: string, mode: 'light' | 'dark' = 'light') {
    const theme = this.themes.get(themeName);
    if (!theme) return;

    this.currentTheme = themeName;
    const colors = theme.colors[mode];
    const root = document.documentElement;

    // Apply CSS custom properties with enhanced security theme variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply security-specific theme variables
    if (themeName === 'security-professional') {
      root.style.setProperty('--security-critical', mode === 'dark' ? '0 84% 65%' : '0 84% 57%');
      root.style.setProperty('--security-high', mode === 'dark' ? '24 95% 62%' : '24 95% 55%');
      root.style.setProperty('--security-medium', mode === 'dark' ? '43 96% 60%' : '43 96% 53%');
      root.style.setProperty('--security-low', mode === 'dark' ? '142 76% 52%' : '142 76% 45%');
      root.style.setProperty('--security-info', mode === 'dark' ? '217 91% 65%' : '217 91% 60%');
    }

    // Apply fonts
    root.style.setProperty('--font-sans', theme.fonts.sans.join(', '));
    root.style.setProperty('--font-mono', theme.fonts.mono.join(', '));

    // Apply spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Save preference
    localStorage.setItem('hawkly-theme', JSON.stringify({ name: themeName, mode }));
  }

  private loadUserPreferences() {
    try {
      const saved = localStorage.getItem('hawkly-theme');
      if (saved) {
        const { name, mode } = JSON.parse(saved);
        this.applyTheme(name, mode);
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
    }
  }

  getAvailableThemes(): string[] {
    return Array.from(this.themes.keys());
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  exportTheme(themeName: string): string {
    const theme = this.themes.get(themeName);
    return theme ? JSON.stringify(theme, null, 2) : '';
  }

  importTheme(themeJson: string): boolean {
    try {
      const theme: ThemeConfig = JSON.parse(themeJson);
      this.themes.set(theme.name, theme);
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }

  private hexToHsl(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
}

export const themeSystem = AdvancedThemeSystem.getInstance();
