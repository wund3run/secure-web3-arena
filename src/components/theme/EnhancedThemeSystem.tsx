
import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeSystem } from '@/utils/theme/advanced-theme-system';
import { useFeedback } from '@/components/feedback/UnifiedFeedbackSystem';

interface ThemeContextType {
  currentTheme: string;
  availableThemes: string[];
  setTheme: (themeName: string) => void;
  resetToDefault: () => void;
  preferences: ThemePreferences;
  updatePreferences: (preferences: Partial<ThemePreferences>) => void;
}

interface ThemePreferences {
  autoSwitch: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function EnhancedThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('hawkly-security');
  const [preferences, setPreferences] = useState<ThemePreferences>({
    autoSwitch: false,
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
  });
  const { showSuccessToast } = useFeedback();

  // Load preferences on mount
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('hawkly-theme-preferences');
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        applyPreferences(parsed);
      }

      const savedTheme = localStorage.getItem('hawkly-theme');
      if (savedTheme) {
        const { name } = JSON.parse(savedTheme);
        setCurrentTheme(name);
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
    }
  }, []);

  const applyPreferences = (prefs: ThemePreferences) => {
    const root = document.documentElement;

    // Apply high contrast
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (prefs.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // Apply font size
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.setProperty('--base-font-size', fontSizes[prefs.fontSize]);
  };

  const setTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    themeSystem.applyTheme(themeName, 'dark');
    showSuccessToast(`Theme changed to ${themeName}`);
  };

  const resetToDefault = () => {
    setCurrentTheme('hawkly-security');
    setPreferences({
      autoSwitch: false,
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
    });
    themeSystem.applyTheme('hawkly-security', 'dark');
    localStorage.removeItem('hawkly-theme-preferences');
    showSuccessToast('Theme settings reset to default');
  };

  const updatePreferences = (newPreferences: Partial<ThemePreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    applyPreferences(updated);
    
    try {
      localStorage.setItem('hawkly-theme-preferences', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save theme preferences:', error);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    availableThemes: themeSystem.getAvailableThemes(),
    setTheme,
    resetToDefault,
    preferences,
    updatePreferences,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useEnhancedTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useEnhancedTheme must be used within EnhancedThemeProvider');
  }
  return context;
}

// Theme Customization Panel Component
export function ThemeCustomizationPanel() {
  const { 
    currentTheme, 
    availableThemes, 
    setTheme, 
    resetToDefault, 
    preferences, 
    updatePreferences 
  } = useEnhancedTheme();

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
        
        {/* Theme Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Theme</label>
          <select
            value={currentTheme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border border-input rounded-lg bg-background"
          >
            {availableThemes.map(theme => (
              <option key={theme} value={theme}>
                {theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {/* Accessibility Preferences */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Accessibility</h4>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.highContrast}
              onChange={(e) => updatePreferences({ highContrast: e.target.checked })}
              className="rounded border-input"
            />
            <span className="text-sm">High contrast mode</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
              className="rounded border-input"
            />
            <span className="text-sm">Reduce motion</span>
          </label>

          <div className="space-y-2">
            <label className="text-sm font-medium">Font size</label>
            <select
              value={preferences.fontSize}
              onChange={(e) => updatePreferences({ fontSize: e.target.value as 'small' | 'medium' | 'large' })}
              className="w-full p-2 border border-input rounded-lg bg-background"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetToDefault}
          className="mt-6 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
