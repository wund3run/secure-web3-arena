
import React, { useCallback, memo } from 'react';

interface SkipToContentProps {
  targetId: string;
}

export const SkipToContent = memo(function SkipToContent({ targetId }: SkipToContentProps) {
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
      });
    }
  }, [targetId]);
  
  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:rounded shadow-md"
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
});
