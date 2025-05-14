
import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityContextState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReaderFriendly: boolean;
  keyboardMode: boolean;
  focusVisible: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleScreenReaderFriendly: () => void;
  toggleKeyboardMode: () => void;
  toggleFocusVisible: () => void;
}

const defaultState: AccessibilityContextState = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReaderFriendly: false,
  keyboardMode: false,
  focusVisible: true,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleReducedMotion: () => {},
  toggleScreenReaderFriendly: () => {},
  toggleKeyboardMode: () => {},
  toggleFocusVisible: () => {},
};

const AccessibilityContext = createContext<AccessibilityContextState>(defaultState);

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderFriendly, setScreenReaderFriendly] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState(false);
  const [focusVisible, setFocusVisible] = useState(true);

  // Check for user preferences from system
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
    }
    
    // Check for stored preferences
    const storedPreferences = localStorage.getItem("accessibility-preferences");
    if (storedPreferences) {
      try {
        const preferences = JSON.parse(storedPreferences);
        setHighContrast(preferences.highContrast ?? false);
        setLargeText(preferences.largeText ?? false);
        setReducedMotion(preferences.reducedMotion ?? prefersReducedMotion);
        setScreenReaderFriendly(preferences.screenReaderFriendly ?? false);
        setKeyboardMode(preferences.keyboardMode ?? false);
        setFocusVisible(preferences.focusVisible ?? true);
      } catch (e) {
        console.error("Failed to parse accessibility preferences:", e);
      }
    }
    
    // Setup keyboard detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setKeyboardMode(true);
        document.body.classList.add('keyboard-mode');
      }
    };
    
    const handleMouseDown = () => {
      setKeyboardMode(false);
      document.body.classList.remove('keyboard-mode');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply preferences to document
  useEffect(() => {
    // Store preferences
    localStorage.setItem(
      "accessibility-preferences",
      JSON.stringify({ 
        highContrast, 
        largeText, 
        reducedMotion, 
        screenReaderFriendly,
        keyboardMode,
        focusVisible
      })
    );

    // Apply classes to body
    const body = document.body;
    
    if (highContrast) {
      body.classList.add("high-contrast");
    } else {
      body.classList.remove("high-contrast");
    }

    if (largeText) {
      body.classList.add("large-text");
    } else {
      body.classList.remove("large-text");
    }

    if (reducedMotion) {
      body.classList.add("reduced-motion");
    } else {
      body.classList.remove("reduced-motion");
    }

    if (screenReaderFriendly) {
      body.classList.add("screen-reader-friendly");
    } else {
      body.classList.remove("screen-reader-friendly");
    }
    
    if (keyboardMode) {
      body.classList.add("keyboard-mode");
    } else {
      body.classList.remove("keyboard-mode");
    }
    
    if (focusVisible) {
      body.classList.add("focus-visible-mode");
    } else {
      body.classList.remove("focus-visible-mode");
    }
    
    // Add some global CSS for accessibility
    const styleId = "accessibility-styles";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = `
      .keyboard-mode :focus {
        outline: 2px solid hsl(var(--primary));
        outline-offset: 2px;
      }
      
      .high-contrast {
        --primary: 240 100% 50%;
        --contrast-ratio: 7;
      }
      
      .large-text {
        font-size: 1.2rem;
      }
      
      .reduced-motion *,
      .reduced-motion *::before,
      .reduced-motion *::after {
        animation-duration: 0.0001s !important;
        transition-duration: 0.0001s !important;
      }
    `;
    
  }, [highContrast, largeText, reducedMotion, screenReaderFriendly, keyboardMode, focusVisible]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleLargeText = () => setLargeText((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);
  const toggleScreenReaderFriendly = () => setScreenReaderFriendly((prev) => !prev);
  const toggleKeyboardMode = () => setKeyboardMode((prev) => !prev);
  const toggleFocusVisible = () => setFocusVisible((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        reducedMotion,
        screenReaderFriendly,
        keyboardMode,
        focusVisible,
        toggleHighContrast,
        toggleLargeText,
        toggleReducedMotion,
        toggleScreenReaderFriendly,
        toggleKeyboardMode,
        toggleFocusVisible
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
