
import React from 'react';

interface SkipToContentProps {
  targetId: string;
}

export function SkipToContent({ targetId }: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:rounded shadow-md"
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
}
