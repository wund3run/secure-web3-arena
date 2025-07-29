
import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocusOnDeactivate?: boolean;
  onEscape?: () => void;
}

export function FocusTrap({ 
  children, 
  active = true, 
  initialFocus,
  returnFocusOnDeactivate = true,
  onEscape
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;
    
    // Get all focusable elements
    const getFocusableElements = () => {
      if (!containerRef.current) return [];
      
      const selector = 
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      return Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(selector)
      ).filter(el => !el.hasAttribute('disabled') && 
                    !el.hasAttribute('hidden') &&
                    el.getAttribute('aria-hidden') !== 'true');
    };
    
    // Set initial focus
    const setInitialFocus = () => {
      if (initialFocus && initialFocus.current) {
        initialFocus.current.focus();
      } else {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else if (containerRef.current) {
          // If no focusable elements, make container focusable
          containerRef.current.tabIndex = -1;
          containerRef.current.focus();
        }
      }
    };
    
    // Handle key events
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Escape key
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }
      
      if (event.key !== 'Tab') return;
      
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // Shift + Tab
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };
    
    // Set up trap
    setInitialFocus();
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevents scrolling and focusing outside the trap
    const preventFocus = (e: FocusEvent) => {
      if (containerRef.current && 
          e.target instanceof Node && 
          !containerRef.current.contains(e.target)) {
        e.preventDefault();
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };
    
    document.addEventListener('focusin', preventFocus);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', preventFocus);
      
      // Return focus when unmounted if needed
      if (returnFocusOnDeactivate && previousFocusRef.current) {
        setTimeout(() => {
          previousFocusRef.current?.focus();
        }, 0);
      }
    };
  }, [active, initialFocus, onEscape, returnFocusOnDeactivate]);
  
  return (
    <div 
      ref={containerRef} 
      aria-modal={active} 
      role="dialog"
      className="outline-none"
    >
      {children}
    </div>
  );
}
