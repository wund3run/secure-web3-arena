
import React, { useCallback, memo } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface SkipToContentProps {
  targetId: string;
}

export const SkipToContent = memo(function SkipToContent({ targetId }: SkipToContentProps) {
  const { screenReaderFriendly } = useAccessibility();
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Make the element focusable but don't change tabIndex if it already has one
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.tabIndex = -1;
      }
      
      // Focus and scroll in one operation for better performance
      requestAnimationFrame(() => {
        targetElement.focus();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Announce for screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'assertive');
        announcer.className = 'sr-only';
        announcer.textContent = `Navigated to main content`;
        document.body.appendChild(announcer);
        
        // Remove after announcement
        setTimeout(() => document.body.removeChild(announcer), 1000);
      });
    }
  }, [targetId]);
  
  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`fixed z-50 left-4 top-4 transition-transform ${screenReaderFriendly ? 'bg-primary text-primary-foreground p-3 rounded-md shadow-md' : 'sr-only focus:not-sr-only focus:bg-primary focus:text-primary-foreground focus:p-3 focus:rounded-md focus:shadow-md'} focus:outline-none`}
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
});
