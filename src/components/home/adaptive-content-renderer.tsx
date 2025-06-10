
import React, { ReactNode } from 'react';

interface AdaptiveContentRendererProps {
  children: ReactNode;
  className?: string;
}

export function AdaptiveContentRenderer({ 
  children, 
  className = '' 
}: AdaptiveContentRendererProps) {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
}
