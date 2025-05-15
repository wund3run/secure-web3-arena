
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  targetId: string;
  className?: string;
}

export function SkipLink({ targetId, className }: SkipLinkProps) {
  const [focused, setFocused] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // If the element isn't normally focusable, we need to make it so
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      
      // Focus the element
      targetElement.focus();
      
      // Scroll into view if needed
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      // For screen readers, announce that focus has moved
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.textContent = `Navigated to ${targetElement.tagName.toLowerCase()}`;
      document.body.appendChild(announcer);
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
    }
  };
  
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
}
