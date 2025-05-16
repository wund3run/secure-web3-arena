
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SkipToContentProps {
  targetId?: string;
  className?: string;
}

export function SkipToContent({ 
  targetId = "main-content", 
  className 
}: SkipToContentProps) {
  const [focused, setFocused] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Make element focusable if it isn't already
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      
      // Focus the element and scroll into view
      targetElement.focus();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <a 
      href={`#${targetId}`}
      className={cn(
        "fixed top-4 left-4 z-[100] bg-background p-3 rounded-md border shadow-md transition-transform",
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
