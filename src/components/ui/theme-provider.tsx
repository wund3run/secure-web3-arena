
import React, { createContext, useContext, useEffect, useState } from "react";
import { themeSystem } from '@/utils/theme/advanced-theme-system';

interface ThemeProviderProps {
  children: React.ReactNode;
  storageKey?: string;
}

interface ThemeProviderState {
  currentThemeName: string;
  setCurrentThemeName: (name: string) => void;
}

const initialState: ThemeProviderState = {
  currentThemeName: "hawkly-security",
  setCurrentThemeName: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  storageKey = "hawkly-theme",
  ...props
}: ThemeProviderProps) {
  const [currentThemeName, setCurrentThemeName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('hawkly-theme');
      return saved ? JSON.parse(saved).name : 'hawkly-security';
    } catch {
      return 'hawkly-security';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Always apply dark mode for Hawkly
    root.classList.remove("light");
    root.classList.add("dark");
    
    // Apply the Hawkly Security theme
    themeSystem.applyTheme(currentThemeName, 'dark');
  }, [currentThemeName]);

  const value = {
    currentThemeName,
    setCurrentThemeName: (name: string) => {
      setCurrentThemeName(name);
      themeSystem.applyTheme(name, 'dark');
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  
  return context;
};
