
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLinkProps {
  targetId: string;
  children?: React.ReactNode;
  className?: string;
}

export function SkipLink({ 
  targetId, 
  children = "Skip to main content", 
  className 
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium",
        "transition-all duration-200 focus:hawk-shadow-lg",
        className
      )}
    >
      {children}
    </a>
  );
}
