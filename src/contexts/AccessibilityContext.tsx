
import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityContextState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReaderFriendly: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleScreenReaderFriendly: () => void;
}

const defaultState: AccessibilityContextState = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReaderFriendly: false,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleReducedMotion: () => {},
  toggleScreenReaderFriendly: () => {},
};

const AccessibilityContext = createContext<AccessibilityContextState>(defaultState);

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderFriendly, setScreenReaderFriendly] = useState(false);

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
      } catch (e) {
        console.error("Failed to parse accessibility preferences:", e);
      }
    }
  }, []);

  // Apply preferences to document
  useEffect(() => {
    // Store preferences
    localStorage.setItem(
      "accessibility-preferences",
      JSON.stringify({ highContrast, largeText, reducedMotion, screenReaderFriendly })
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
  }, [highContrast, largeText, reducedMotion, screenReaderFriendly]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleLargeText = () => setLargeText((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);
  const toggleScreenReaderFriendly = () => setScreenReaderFriendly((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        reducedMotion,
        screenReaderFriendly,
        toggleHighContrast,
        toggleLargeText,
        toggleReducedMotion,
        toggleScreenReaderFriendly,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
