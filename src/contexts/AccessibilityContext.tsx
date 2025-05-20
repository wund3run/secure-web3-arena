
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  setHighContrast: (highContrast: boolean) => void;
  largeText: boolean;
  setLargeText: (largeText: boolean) => void;
  keyboardMode: boolean;
  setKeyboardMode: (keyboardMode: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (reducedMotion: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  // Load settings from localStorage or use defaults
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('hawkly_high_contrast') === 'true';
  });
  
  const [largeText, setLargeText] = useState<boolean>(() => {
    return localStorage.getItem('hawkly_large_text') === 'true';
  });
  
  const [keyboardMode, setKeyboardMode] = useState<boolean>(() => {
    return localStorage.getItem('hawkly_keyboard_mode') === 'true';
  });
  
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const savedSetting = localStorage.getItem('hawkly_reduced_motion');
    
    return savedSetting !== null 
      ? savedSetting === 'true'
      : prefersReducedMotion;
  });
  
  // Update body classes and localStorage when settings change
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    localStorage.setItem('hawkly_high_contrast', highContrast.toString());
  }, [highContrast]);
  
  useEffect(() => {
    if (largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
    
    localStorage.setItem('hawkly_large_text', largeText.toString());
  }, [largeText]);
  
  useEffect(() => {
    if (keyboardMode) {
      document.body.classList.add('keyboard-mode');
    } else {
      document.body.classList.remove('keyboard-mode');
    }
    
    localStorage.setItem('hawkly_keyboard_mode', keyboardMode.toString());
  }, [keyboardMode]);
  
  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    
    localStorage.setItem('hawkly_reduced_motion', reducedMotion.toString());
  }, [reducedMotion]);
  
  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        largeText,
        setLargeText,
        keyboardMode,
        setKeyboardMode,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
}
