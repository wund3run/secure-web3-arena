
import React from "react";

export interface SkipToContentProps {
  targetId: string;
}

export function SkipToContent({ targetId }: SkipToContentProps) {
  const handleSkip = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    
    // Get the target element
    const target = document.getElementById(targetId);
    
    if (target) {
      // Set focus to the element
      target.focus();
      // Scroll to the element
      target.scrollIntoView();
    }
  };
  
  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2 focus:bg-primary focus:text-primary-foreground focus:z-50 focus:rounded"
    >
      Skip to content
    </a>
  );
}
