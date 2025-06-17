
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  reducedMotion: boolean;
  screenReaderFriendly: boolean;
  setHighContrast: (value: boolean) => void;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  setReducedMotion: (value: boolean) => void;
  setScreenReaderFriendly: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderFriendly, setScreenReaderFriendly] = useState(false);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      fontSize,
      reducedMotion,
      screenReaderFriendly,
      setHighContrast,
      setFontSize,
      setReducedMotion,
      setScreenReaderFriendly
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
