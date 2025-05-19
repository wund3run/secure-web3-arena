
import React, { useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  targetId: string;
  className?: string;
}

export const SkipLink = memo(function SkipLink({ targetId, className }: SkipLinkProps) {
  const [focused, setFocused] = useState(false);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Make element focusable if needed
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        // Focus the element
        targetElement.focus();
        
        // Smooth scroll
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
      
      // For screen readers, announce that focus has moved
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.textContent = `Navigated to ${targetElement.getAttribute('aria-label') || targetElement.tagName.toLowerCase()}`;
      document.body.appendChild(announcer);
      
      // Clean up announcer after announcement is likely complete
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 1000);
    }
  }, [targetId]);
  
  return (
    <a 
      href={`#${targetId}`}
      className={cn(
        "skip-link fixed z-50 left-4 top-4 bg-background p-2 border border-border rounded-md shadow-md transition-transform",
        focused ? "translate-y-0" : "-translate-y-full",
        className
      )}
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      Skip to main content
    </a>
  );
});
