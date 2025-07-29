
import React, { useEffect, useCallback } from 'react';

interface KeyboardNavigationManagerProps {
  children: React.ReactNode;
  onEscape?: () => void;
  onEnter?: () => void;
  trapFocus?: boolean;
}

export function KeyboardNavigationManager({ 
  children, 
  onEscape, 
  onEnter,
  trapFocus = false 
}: KeyboardNavigationManagerProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
      case 'Enter':
        if (onEnter && event.target === document.body) {
          event.preventDefault();
          onEnter();
        }
        break;
      case 'Tab':
        if (trapFocus) {
          // Focus trapping logic handled by individual components
        }
        break;
    }
  }, [onEscape, onEnter, trapFocus]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return <>{children}</>;
}
