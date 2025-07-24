import { createContext } from 'react';

export type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusVisible: boolean;
  screenReaderMode: boolean;
};

export type AccessibilityContextType = {
  preferences: AccessibilityPreferences;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleFocusVisible: () => void;
  toggleScreenReaderMode: () => void;
  resetPreferences: () => void;
};

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined); 