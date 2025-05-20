
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  focusVisible: boolean;
  reducedMotion: boolean;
  screenReaderFriendly: boolean; // Added missing property
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleFocusVisible: () => void;
  toggleReducedMotion: () => void;
  toggleScreenReaderFriendly: () => void; // Added missing function
}

const defaultContext: AccessibilityContextType = {
  highContrast: false,
  largeText: false,
  focusVisible: false,
  reducedMotion: false,
  screenReaderFriendly: false, // Added default value
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleFocusVisible: () => {},
  toggleReducedMotion: () => {},
  toggleScreenReaderFriendly: () => {}, // Added empty function
};

export const AccessibilityContext = createContext<AccessibilityContextType>(defaultContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderFriendly, setScreenReaderFriendly] = useState(false); // Added state

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSetting = (key: string): boolean => {
      const value = localStorage.getItem(`accessibility_${key}`);
      return value === 'true';
    };

    setHighContrast(loadSetting('highContrast'));
    setLargeText(loadSetting('largeText'));
    setFocusVisible(loadSetting('focusVisible'));
    setReducedMotion(loadSetting('reducedMotion'));
    setScreenReaderFriendly(loadSetting('screenReaderFriendly')); // Load screenReaderFriendly
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('accessibility_highContrast', String(highContrast));
    localStorage.setItem('accessibility_largeText', String(largeText));
    localStorage.setItem('accessibility_focusVisible', String(focusVisible));
    localStorage.setItem('accessibility_reducedMotion', String(reducedMotion));
    localStorage.setItem('accessibility_screenReaderFriendly', String(screenReaderFriendly)); // Save screenReaderFriendly
    
    // Apply CSS classes to the document
    document.documentElement.classList.toggle('high-contrast-mode', highContrast);
    document.documentElement.classList.toggle('large-text-mode', largeText);
    document.documentElement.classList.toggle('focus-visible-mode', focusVisible);
    document.documentElement.classList.toggle('reduced-motion-mode', reducedMotion);
    document.documentElement.classList.toggle('screen-reader-friendly', screenReaderFriendly); // Apply screenReaderFriendly
  }, [highContrast, largeText, focusVisible, reducedMotion, screenReaderFriendly]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleFocusVisible = () => setFocusVisible(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);
  const toggleScreenReaderFriendly = () => setScreenReaderFriendly(prev => !prev); // Added toggle function

  const value = {
    highContrast,
    largeText,
    focusVisible,
    reducedMotion,
    screenReaderFriendly, // Added to value
    toggleHighContrast,
    toggleLargeText,
    toggleFocusVisible,
    toggleReducedMotion,
    toggleScreenReaderFriendly, // Added to value
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
