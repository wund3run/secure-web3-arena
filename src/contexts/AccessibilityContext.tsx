import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the accessibility preferences
export interface AccessibilityPreferences {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusVisible: boolean;
  screenReaderMode: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleFocusVisible: () => void;
  toggleReducedMotion: () => void;
  toggleScreenReaderMode: () => void;
  resetPreferences: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusVisible: false,
  screenReaderMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-high-contrast') === 'true';
  });
  const [largeText, setLargeText] = useState(() => {
    return localStorage.getItem('accessibility-large-text') === 'true';
  });
  const [focusVisible, setFocusVisible] = useState(() => {
    return localStorage.getItem('accessibility-focus-visible') === 'true';
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('accessibility-reduced-motion') === 'true';
  });
  const [screenReaderMode, setScreenReaderMode] = useState(() => {
    return localStorage.getItem('accessibility-screen-reader') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
    document.documentElement.classList.toggle('high-contrast-mode', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('accessibility-large-text', largeText.toString());
    document.documentElement.classList.toggle('large-text-mode', largeText);
  }, [largeText]);

  useEffect(() => {
    localStorage.setItem('accessibility-focus-visible', focusVisible.toString());
    document.documentElement.classList.toggle('focus-visible-mode', focusVisible);
  }, [focusVisible]);

  useEffect(() => {
    localStorage.setItem('accessibility-reduced-motion', reducedMotion.toString());
    document.documentElement.classList.toggle('reduced-motion-mode', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('accessibility-screen-reader', screenReaderMode.toString());
    document.documentElement.classList.toggle('screen-reader-mode', screenReaderMode);
  }, [screenReaderMode]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleFocusVisible = () => setFocusVisible(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);
  const toggleScreenReaderMode = () => setScreenReaderMode(prev => !prev);

  const resetPreferences = () => {
    setHighContrast(false);
    setLargeText(false);
    setFocusVisible(false);
    setReducedMotion(false);
    setScreenReaderMode(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        preferences: {
          highContrast,
          largeText,
          reducedMotion,
          focusVisible,
          screenReaderMode,
        },
        toggleHighContrast,
        toggleLargeText,
        toggleFocusVisible,
        toggleReducedMotion,
        toggleScreenReaderMode,
        resetPreferences,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
