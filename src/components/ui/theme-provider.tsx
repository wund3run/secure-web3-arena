
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
  currentThemeName: "security-professional",
  setCurrentThemeName: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [currentThemeName, setCurrentThemeName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('hawkly-theme');
      return saved ? JSON.parse(saved).name : 'security-professional';
    } catch {
      return 'security-professional';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Always apply dark mode
    root.classList.remove("light");
    root.classList.add("dark");
    
    // Apply the Security Professional theme in dark mode
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
