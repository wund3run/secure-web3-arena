
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
}

export class AdvancedThemeSystem {
  private static instance: AdvancedThemeSystem;
  private currentTheme: string = 'hawkly-security';
  private themes: Map<string, ThemeConfig> = new Map();

  static getInstance(): AdvancedThemeSystem {
    if (!AdvancedThemeSystem.instance) {
      AdvancedThemeSystem.instance = new AdvancedThemeSystem();
    }
    return AdvancedThemeSystem.instance;
  }

  constructor() {
    this.initializeHawklyThemes();
    this.loadUserPreferences();
  }

  private initializeHawklyThemes() {
    // Official Hawkly Security Professional theme
    this.themes.set('hawkly-security', {
      name: 'Hawkly Security Professional',
      colors: {
        light: {
          primary: '217 71% 58%',       // Hawkly Primary Blue
          secondary: '193 85% 56%',     // Hawkly Secondary Cyan
          background: '0 0% 100%',      // White background
          foreground: '217 32% 15%',    // Dark text
          muted: '217 30% 95%',         // Light muted
          accent: '254 85% 75%',        // Hawkly Purple
          destructive: '0 84% 60%',     // Error red
          border: '217 25% 88%',        // Light border
          input: '217 25% 95%',         // Light input
          ring: '217 71% 58%'           // Primary focus ring
        },
        dark: {
          primary: '217 71% 65%',       // Lighter primary for dark
          secondary: '193 85% 65%',     // Lighter secondary for dark
          background: '217 32% 6%',     // Deep navy background
          foreground: '217 30% 94%',    // Light text
          muted: '217 32% 15%',         // Dark muted
          accent: '254 85% 75%',        // Hawkly Purple
          destructive: '0 84% 65%',     // Lighter error for dark
          border: '217 32% 18%',        // Dark border
          input: '217 32% 18%',         // Dark input
          ring: '217 71% 65%'           // Primary focus ring
        }
      },
      fonts: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    });

    // Legacy security-professional theme (for backward compatibility)
    this.themes.set('security-professional', {
      name: 'Security Professional (Legacy)',
      colors: {
        light: {
          primary: '217 71% 58%',
          secondary: '193 85% 56%',
          background: '0 0% 100%',
          foreground: '217 32% 15%',
          muted: '217 30% 95%',
          accent: '254 85% 75%',
          destructive: '0 84% 60%',
          border: '217 25% 88%',
          input: '217 25% 95%',
          ring: '217 71% 58%'
        },
        dark: {
          primary: '217 71% 65%',
          secondary: '193 85% 65%',
          background: '217 32% 6%',
          foreground: '217 30% 94%',
          muted: '217 32% 15%',
          accent: '254 85% 75%',
          destructive: '0 84% 65%',
          border: '217 32% 18%',
          input: '217 32% 18%',
          ring: '217 71% 65%'
        }
      },
      fonts: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    });
  }

  applyTheme(themeName: string, mode: 'light' | 'dark' = 'dark') {
    const theme = this.themes.get(themeName) || this.themes.get('hawkly-security');
    if (!theme) return;

    this.currentTheme = themeName;
    const colors = theme.colors[mode];
    const root = document.documentElement;

    // Apply Hawkly brand colors
    root.style.setProperty('--hawkly-primary', '217 71% 58%');
    root.style.setProperty('--hawkly-secondary', '193 85% 56%');
    root.style.setProperty('--hawkly-accent', '254 85% 75%');
    root.style.setProperty('--hawkly-orange', '14 100% 60%');
    root.style.setProperty('--hawkly-success', '142 71% 45%');
    root.style.setProperty('--hawkly-warning', '43 96% 56%');
    root.style.setProperty('--hawkly-error', '0 84% 60%');
    root.style.setProperty('--hawkly-info', '217 71% 58%');

    // Apply theme colors
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply fonts
    root.style.setProperty('--font-sans', theme.fonts.sans.join(', '));
    root.style.setProperty('--font-mono', theme.fonts.mono.join(', '));

    // Ensure dark mode is always applied
    root.classList.remove("light");
    root.classList.add("dark");

    // Save preference
    localStorage.setItem('hawkly-theme', JSON.stringify({ name: themeName, mode: 'dark' }));
  }

  private loadUserPreferences() {
    try {
      const saved = localStorage.getItem('hawkly-theme');
      if (saved) {
        const { name } = JSON.parse(saved);
        this.applyTheme(name, 'dark');
      } else {
        this.applyTheme('hawkly-security', 'dark');
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
      this.applyTheme('hawkly-security', 'dark');
    }
  }

  getAvailableThemes(): string[] {
    return Array.from(this.themes.keys());
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}

export const themeSystem = AdvancedThemeSystem.getInstance();
