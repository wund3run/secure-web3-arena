
import React, { createContext, useContext, useEffect, useState } from "react";
import { themeSystem } from '@/utils/theme/advanced-theme-system';

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentThemeName: string;
  setCurrentThemeName: (name: string) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  currentThemeName: "default",
  setCurrentThemeName: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [currentThemeName, setCurrentThemeName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('hawkly-theme');
      return saved ? JSON.parse(saved).name : 'default';
    } catch {
      return 'default';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    let effectiveTheme: "light" | "dark";
    
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = theme;
    }
    
    root.classList.add(effectiveTheme);
    
    // Apply the current theme with the effective mode
    themeSystem.applyTheme(currentThemeName, effectiveTheme);
  }, [theme, currentThemeName]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    currentThemeName,
    setCurrentThemeName: (name: string) => {
      setCurrentThemeName(name);
      const effectiveTheme = theme === "system" 
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme === "dark" ? "dark" : "light";
      themeSystem.applyTheme(name, effectiveTheme);
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
