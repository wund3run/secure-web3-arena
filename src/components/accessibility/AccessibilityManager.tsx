import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';

// Accessibility preference types
interface AccessibilityPreferences {
  // Visual accessibility
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  customTextSize: number; // 100% to 200%
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  
  // Motor accessibility
  stickyFocus: boolean;
  largeClickTargets: boolean;
  gestureAlternatives: boolean;
  keyboardOnlyMode: boolean;
  
  // Cognitive accessibility
  simplifiedLanguage: boolean;
  extendedTimeouts: boolean;
  autoSave: boolean;
  progressIndicators: boolean;
  
  // Audio/Visual
  captionsEnabled: boolean;
  audioDescriptions: boolean;
  textToSpeech: boolean;
  
  // Navigation
  skipLinks: boolean;
  breadcrumbNavigation: boolean;
  focusIndicator: 'default' | 'enhanced' | 'high-contrast';
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K, 
    value: AccessibilityPreferences[K]
  ) => void;
  resetPreferences: () => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  checkAccessibility: () => AccessibilityReport;
  applyAccessibilityFixes: () => void;
  getAccessibilityScore: () => number;
}

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  element: string;
  issue: string;
  fix: string;
  wcagGuideline: string;
}

interface AccessibilityReport {
  score: number;
  issues: AccessibilityIssue[];
  totalElements: number;
  accessibleElements: number;
}

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  customTextSize: 100,
  colorBlindMode: 'none',
  stickyFocus: false,
  largeClickTargets: false,
  gestureAlternatives: true,
  keyboardOnlyMode: false,
  simplifiedLanguage: false,
  extendedTimeouts: false,
  autoSave: true,
  progressIndicators: true,
  captionsEnabled: false,
  audioDescriptions: false,
  textToSpeech: false,
  skipLinks: true,
  breadcrumbNavigation: true,
  focusIndicator: 'default'
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityManagerProps {
  children: ReactNode;
}

export function AccessibilityManager({ children }: AccessibilityManagerProps) {
  const [preferences, setPreferences] = useLocalStorage<AccessibilityPreferences>(
    'accessibility-preferences',
    defaultPreferences
  );
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const { toast } = useToast();

  // Apply accessibility preferences to the DOM
  useEffect(() => {
    applyVisualPreferences();
    applyMotorPreferences();
    applyCognitivePreferences();
    applyNavigationPreferences();
  }, [preferences]);

  // Initialize accessibility features
  useEffect(() => {
    initializeAccessibilityFeatures();
    setupKeyboardNavigation();
    setupFocusManagement();
    return cleanup;
  }, []);

  const applyVisualPreferences = () => {
    const root = document.documentElement;
    
    // High contrast mode
    document.body.classList.toggle('high-contrast', preferences.highContrast);
    
    // Large text
    document.body.classList.toggle('large-text', preferences.largeText);
    
    // Custom text size
    root.style.setProperty('--accessibility-text-scale', `${preferences.customTextSize}%`);
    
    // Reduced motion
    root.style.setProperty(
      '--accessibility-motion',
      preferences.reducedMotion ? 'reduce' : 'no-preference'
    );
    
    // Color blind mode
    document.body.className = document.body.className.replace(
      /colorblind-\w+/g, 
      preferences.colorBlindMode !== 'none' ? `colorblind-${preferences.colorBlindMode}` : ''
    );
  };

  const applyMotorPreferences = () => {
    // Large click targets
    document.body.classList.toggle('large-click-targets', preferences.largeClickTargets);
    
    // Sticky focus for motor impairments
    document.body.classList.toggle('sticky-focus', preferences.stickyFocus);
    
    // Keyboard-only mode
    document.body.classList.toggle('keyboard-only', preferences.keyboardOnlyMode);
    
    // Focus indicator style
    document.body.className = document.body.className.replace(
      /focus-\w+/g,
      `focus-${preferences.focusIndicator}`
    );
  };

  const applyCognitivePreferences = () => {
    // Simplified language mode
    document.body.classList.toggle('simplified-language', preferences.simplifiedLanguage);
    
    // Extended timeouts
    if (preferences.extendedTimeouts) {
      document.documentElement.style.setProperty('--accessibility-timeout-multiplier', '2');
    } else {
      document.documentElement.style.removeProperty('--accessibility-timeout-multiplier');
    }
    
    // Progress indicators
    document.body.classList.toggle('show-progress', preferences.progressIndicators);
  };

  const applyNavigationPreferences = () => {
    // Skip links
    document.body.classList.toggle('show-skip-links', preferences.skipLinks);
    
    // Breadcrumb navigation
    document.body.classList.toggle('enhanced-breadcrumbs', preferences.breadcrumbNavigation);
  };

  const initializeAccessibilityFeatures = () => {
    // Add accessibility CSS if not present
    if (!document.getElementById('accessibility-styles')) {
      const style = document.createElement('style');
      style.id = 'accessibility-styles';
      style.textContent = getAccessibilityCSS();
      document.head.appendChild(style);
    }

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              enhanceElementAccessibility(node as Element);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  const setupKeyboardNavigation = () => {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (event) => {
      // Skip to main content (Alt + 1)
      if (event.altKey && event.key === '1') {
        const main = document.querySelector('main, [role="main"], #main-content');
        if (main && main instanceof HTMLElement) {
          main.focus();
          announceToScreenReader('Navigated to main content');
        }
      }
      
      // Skip to navigation (Alt + 2)
      if (event.altKey && event.key === '2') {
        const nav = document.querySelector('nav, [role="navigation"]');
        if (nav && nav instanceof HTMLElement) {
          nav.focus();
          announceToScreenReader('Navigated to main navigation');
        }
      }
      
      // Escape key to close modals/dropdowns
      if (event.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"][open]');
        const activeDropdown = document.querySelector('[aria-expanded="true"]');
        
        if (activeModal) {
          (activeModal as HTMLElement).click();
          announceToScreenReader('Dialog closed');
        } else if (activeDropdown) {
          (activeDropdown as HTMLElement).click();
        }
      }
    });
  };

  const setupFocusManagement = () => {
    // Enhanced focus management
    let lastFocusedElement: HTMLElement | null = null;
    
    document.addEventListener('focusin', (event) => {
      lastFocusedElement = event.target as HTMLElement;
      
      // Announce focus changes for screen readers
      if (preferences.textToSpeech && event.target instanceof HTMLElement) {
        const label = getElementLabel(event.target);
        if (label) {
          announceToScreenReader(`Focused: ${label}`, 'polite');
        }
      }
    });
    
    // Restore focus when modals close
    document.addEventListener('focusout', (event) => {
      // Store last focused element for restoration
      if (event.target instanceof HTMLElement) {
        sessionStorage.setItem('lastFocusedElement', getElementSelector(event.target));
      }
    });
  };

  const enhanceElementAccessibility = (element: Element) => {
    // Add missing ARIA labels
    if (element.tagName === 'BUTTON' && !element.hasAttribute('aria-label')) {
      const text = element.textContent?.trim();
      if (!text) {
        element.setAttribute('aria-label', 'Button');
      }
    }
    
    // Ensure interactive elements are keyboard accessible
    const interactiveElements = element.querySelectorAll('div[onclick], span[onclick]');
    interactiveElements.forEach((el) => {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
      }
    });
    
    // Add heading structure if missing
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0 && element.textContent && element.textContent.length > 50) {
      // This might be content that needs a heading
      console.warn('Content section without heading detected:', element);
    }
  };

  const getElementLabel = (element: HTMLElement): string => {
    // Get accessible name for element
    return element.getAttribute('aria-label') ||
           element.getAttribute('title') ||
           element.textContent?.trim() ||
           element.tagName.toLowerCase();
  };

  const getElementSelector = (element: HTMLElement): string => {
    // Generate a selector to find the element later
    if (element.id) return `#${element.id}`;
    if (element.className) return `${element.tagName.toLowerCase()}.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  };

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    
    // Announce preference changes
    announceToScreenReader(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`);
    
    // Show toast for important changes
    if (['highContrast', 'largeText', 'reducedMotion'].includes(key)) {
      toast({
        title: "Accessibility Setting Updated",
        description: `${key.replace(/([A-Z])/g, ' $1')} has been ${value ? 'enabled' : 'disabled'}`,
      });
    }
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    announceToScreenReader('Accessibility preferences reset to defaults');
    toast({
      title: "Preferences Reset",
      description: "All accessibility preferences have been reset to defaults",
    });
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Create or update announcement region
    let announcer = document.getElementById('accessibility-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'accessibility-announcer';
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    
    // Update announcer
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      if (announcer) announcer.textContent = '';
    }, 1000);
    
    // Store for history
    setAnnouncements(prev => [...prev.slice(-9), message]);
  };

  const checkAccessibility = (): AccessibilityReport => {
    const issues: AccessibilityIssue[] = [];
    let totalElements = 0;
    let accessibleElements = 0;

    // Check for missing alt text
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      totalElements++;
      if (!img.getAttribute('alt')) {
        issues.push({
          type: 'error',
          element: 'img',
          issue: 'Missing alt attribute',
          fix: 'Add descriptive alt text',
          wcagGuideline: 'WCAG 1.1.1'
        });
      } else {
        accessibleElements++;
      }
    });

    // Check for proper heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach((heading) => {
      totalElements++;
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) {
        issues.push({
          type: 'warning',
          element: heading.tagName.toLowerCase(),
          issue: 'Heading level skipped',
          fix: 'Use proper heading hierarchy',
          wcagGuideline: 'WCAG 1.3.1'
        });
      } else {
        accessibleElements++;
      }
      lastLevel = level;
    });

    // Check for keyboard accessibility
    const interactiveElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    interactiveElements.forEach((element) => {
      totalElements++;
      if (element.getAttribute('tabindex') === '-1' && !element.hasAttribute('aria-hidden')) {
        issues.push({
          type: 'error',
          element: element.tagName.toLowerCase(),
          issue: 'Interactive element not keyboard accessible',
          fix: 'Remove tabindex="-1" or add aria-hidden="true"',
          wcagGuideline: 'WCAG 2.1.1'
        });
      } else {
        accessibleElements++;
      }
    });

    const score = totalElements > 0 ? Math.round((accessibleElements / totalElements) * 100) : 100;

    return {
      score,
      issues,
      totalElements,
      accessibleElements
    };
  };

  const applyAccessibilityFixes = () => {
    const report = checkAccessibility();
    let fixesApplied = 0;

    // Auto-fix missing button labels
    const unlabeledButtons = document.querySelectorAll('button:not([aria-label]):not(:has(text))');
    unlabeledButtons.forEach((button) => {
      button.setAttribute('aria-label', 'Button');
      fixesApplied++;
    });

    // Auto-fix missing form labels
    const unlabeledInputs = document.querySelectorAll('input:not([aria-label]):not([id])');
    unlabeledInputs.forEach((input) => {
      const placeholder = input.getAttribute('placeholder');
      if (placeholder) {
        input.setAttribute('aria-label', placeholder);
        fixesApplied++;
      }
    });

    announceToScreenReader(`Applied ${fixesApplied} accessibility fixes`);
    toast({
      title: "Accessibility Fixes Applied",
      description: `${fixesApplied} accessibility issues have been automatically fixed`,
    });
  };

  const getAccessibilityScore = (): number => {
    return checkAccessibility().score;
  };

  const getAccessibilityCSS = (): string => {
    return `
      /* High Contrast Mode */
      .high-contrast {
        filter: contrast(150%);
      }
      
      .high-contrast * {
        border-color: currentColor !important;
      }
      
      /* Large Text Mode */
      .large-text {
        font-size: 120% !important;
        line-height: 1.6 !important;
      }
      
      /* Color Blind Support */
      .colorblind-protanopia {
        filter: url('#protanopia-filter');
      }
      
      .colorblind-deuteranopia {
        filter: url('#deuteranopia-filter');
      }
      
      .colorblind-tritanopia {
        filter: url('#tritanopia-filter');
      }
      
      /* Large Click Targets */
      .large-click-targets button,
      .large-click-targets a,
      .large-click-targets [role="button"] {
        min-height: 44px;
        min-width: 44px;
        padding: 12px 16px;
      }
      
      /* Enhanced Focus Indicators */
      .focus-enhanced *:focus {
        outline: 3px solid #005fcc;
        outline-offset: 2px;
      }
      
      .focus-high-contrast *:focus {
        outline: 4px solid #ffffff;
        outline-offset: 3px;
        box-shadow: 0 0 0 7px #000000;
      }
      
      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Skip Links */
      .show-skip-links .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 100000;
      }
      
      .show-skip-links .skip-link:focus {
        top: 6px;
      }
      
      /* Screen Reader Only */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
  };

  const cleanup = () => {
    const announcer = document.getElementById('accessibility-announcer');
    if (announcer) {
      announcer.remove();
    }
  };

  const contextValue: AccessibilityContextType = {
    preferences,
    updatePreference,
    resetPreferences,
    announceToScreenReader,
    checkAccessibility,
    applyAccessibilityFixes,
    getAccessibilityScore
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      {/* Accessibility announcer for screen readers */}
      <div
        id="accessibility-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityManager');
  }
  return context;
};

export default AccessibilityManager; 