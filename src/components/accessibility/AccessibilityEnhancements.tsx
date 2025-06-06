
import React from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusVisible: boolean;
  screenReaderMode: boolean;
};

type AccessibilityContextType = {
  preferences: AccessibilityPreferences;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleFocusVisible: () => void;
  toggleScreenReaderMode: () => void;
  resetPreferences: () => void;
};

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusVisible: true,
  screenReaderMode: false,
};

const AccessibilityContext = React.createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useLocalStorage<AccessibilityPreferences>(
    'accessibility-preferences',
    defaultPreferences
  );
  
  React.useEffect(() => {
    // Apply preferences to document
    document.body.classList.toggle('high-contrast', preferences.highContrast);
    document.body.classList.toggle('large-text', preferences.largeText);
    document.body.classList.toggle('reduced-motion', preferences.reducedMotion);
    document.body.classList.toggle('focus-visible-mode', preferences.focusVisible);
    document.body.classList.toggle('screen-reader-friendly', preferences.screenReaderMode);
    
    // Set reduced motion at the OS level if needed
    if (preferences.reducedMotion) {
      document.documentElement.style.setProperty('--app-reduced-motion', 'reduce');
    } else {
      document.documentElement.style.removeProperty('--app-reduced-motion');
    }
  }, [preferences]);
  
  // Toggle functions
  const toggleHighContrast = () => {
    setPreferences(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };
  
  const toggleLargeText = () => {
    setPreferences(prev => ({ ...prev, largeText: !prev.largeText }));
  };
  
  const toggleReducedMotion = () => {
    setPreferences(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };
  
  const toggleFocusVisible = () => {
    setPreferences(prev => ({ ...prev, focusVisible: !prev.focusVisible }));
  };
  
  const toggleScreenReaderMode = () => {
    setPreferences(prev => ({ ...prev, screenReaderMode: !prev.screenReaderMode }));
  };
  
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };
  
  const value = {
    preferences,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleFocusVisible,
    toggleScreenReaderMode,
    resetPreferences,
  };
  
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <AccessibilityAnnouncer />
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = React.useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// Component to announce dynamic content changes to screen readers
function AccessibilityAnnouncer() {
  const [announcement, setAnnouncement] = React.useState('');
  const announcerRef = React.useRef<HTMLDivElement>(null);
  
  // Expose the announcement method globally
  React.useEffect(() => {
    window.announceToScreenReader = (message: string) => {
      setAnnouncement(message);
      
      // Clear the announcer after a delay
      setTimeout(() => {
        setAnnouncement('');
      }, 3000);
    };
    
    return () => {
      // @ts-ignore - Remove global method on unmount
      window.announceToScreenReader = undefined;
    };
  }, []);
  
  return (
    <div
      ref={announcerRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

// Add the global announcer function
declare global {
  interface Window {
    announceToScreenReader?: (message: string) => void;
  }
}

export function SkipToContent({ contentId = 'main-content' }: { contentId?: string }) {
  return (
    <a 
      href={`#${contentId}`}
      className="skip-link focus:not-sr-only"
    >
      Skip to main content
    </a>
  );
}

export function AccessibilityControls() {
  const { 
    preferences, 
    toggleHighContrast, 
    toggleLargeText,
    toggleReducedMotion,
    toggleFocusVisible,
    toggleScreenReaderMode,
    resetPreferences
  } = useAccessibility();
  
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-semibold mb-4">Accessibility Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="high-contrast" className="text-sm font-medium">
            High contrast
          </label>
          <button
            id="high-contrast"
            className={`w-10 h-5 rounded-full ${preferences.highContrast ? 'bg-primary' : 'bg-gray-300'} relative`}
            onClick={toggleHighContrast}
            aria-checked={preferences.highContrast}
            role="switch"
          >
            <span 
              className={`block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                preferences.highContrast ? 'transform translate-x-5' : 'translate-x-0.5'
              }`} 
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="large-text" className="text-sm font-medium">
            Large text
          </label>
          <button
            id="large-text"
            className={`w-10 h-5 rounded-full ${preferences.largeText ? 'bg-primary' : 'bg-gray-300'} relative`}
            onClick={toggleLargeText}
            aria-checked={preferences.largeText}
            role="switch"
          >
            <span 
              className={`block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                preferences.largeText ? 'transform translate-x-5' : 'translate-x-0.5'
              }`} 
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="reduced-motion" className="text-sm font-medium">
            Reduced motion
          </label>
          <button
            id="reduced-motion"
            className={`w-10 h-5 rounded-full ${preferences.reducedMotion ? 'bg-primary' : 'bg-gray-300'} relative`}
            onClick={toggleReducedMotion}
            aria-checked={preferences.reducedMotion}
            role="switch"
          >
            <span 
              className={`block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                preferences.reducedMotion ? 'transform translate-x-5' : 'translate-x-0.5'
              }`} 
            />
          </button>
        </div>
        
        <button
          className="w-full mt-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm"
          onClick={resetPreferences}
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
