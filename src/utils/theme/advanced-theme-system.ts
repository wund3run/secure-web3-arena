
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
  private currentTheme: string = 'default';
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
    // AI-generated palette based on base color
    // This is a simplified version - in production, use a proper color theory library
    const hsl = this.hexToHsl(baseColor);
    
    return {
      primary: `${hsl.h} ${hsl.s}% ${hsl.l}%`,
      secondary: `${(hsl.h + 30) % 360} ${hsl.s * 0.8}% ${Math.min(hsl.l + 10, 95)}%`,
      background: '0 0% 100%',
      foreground: '0 0% 5%',
      muted: `${hsl.h} ${hsl.s * 0.3}% 95%`,
      accent: `${(hsl.h + 60) % 360} ${hsl.s * 0.9}% ${hsl.l}%`,
      destructive: '0 84% 60%',
      border: `${hsl.h} ${hsl.s * 0.3}% 90%`,
      input: `${hsl.h} ${hsl.s * 0.3}% 95%`,
      ring: `${hsl.h} ${hsl.s}% ${hsl.l}%`
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

    // Apply CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

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
