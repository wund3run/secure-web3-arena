
import React, { useState, useEffect } from "react";
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
      
      // For screen readers, announce that focus has moved
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.textContent = `Navigated to ${targetElement.tagName}`;
      document.body.appendChild(announcer);
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
      
      // If there's a hash link in the URL format, update browser history
      if (targetId) {
        window.location.hash = targetId;
      }
    }
  };
  
  return (
    <a 
      href={`#${targetId}`}
      className={cn(
        "skip-link",
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
