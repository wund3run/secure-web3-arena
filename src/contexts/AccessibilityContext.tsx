
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  focusVisible: boolean;
  reducedMotion: boolean;
  screenReaderFriendly: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleFocusVisible: () => void;
  toggleReducedMotion: () => void;
  toggleScreenReaderFriendly: () => void;
}

const defaultValues: AccessibilityContextType = {
  highContrast: false,
  largeText: false,
  focusVisible: false,
  reducedMotion: false,
  screenReaderFriendly: false,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleFocusVisible: () => {},
  toggleReducedMotion: () => {},
  toggleScreenReaderFriendly: () => {},
};

const AccessibilityContext = createContext<AccessibilityContextType>(defaultValues);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
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

  const [screenReaderFriendly, setScreenReaderFriendly] = useState(() => {
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
    localStorage.setItem('accessibility-screen-reader', screenReaderFriendly.toString());
    document.documentElement.classList.toggle('screen-reader-mode', screenReaderFriendly);
  }, [screenReaderFriendly]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleFocusVisible = () => setFocusVisible(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);
  const toggleScreenReaderFriendly = () => setScreenReaderFriendly(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      largeText,
      focusVisible,
      reducedMotion,
      screenReaderFriendly,
      toggleHighContrast,
      toggleLargeText,
      toggleFocusVisible,
      toggleReducedMotion,
      toggleScreenReaderFriendly
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);
