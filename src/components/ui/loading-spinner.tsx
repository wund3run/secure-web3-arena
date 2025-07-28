
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  brand?: boolean;
}

export function LoadingSpinner({ size = 'md', className, brand = true }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  // Always show the Hawkly logo for brand consistency
  return (
    <div className="flex flex-col items-center space-y-4">
      <img 
        src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
        alt="Hawkly Logo"
        className={cn(sizeClasses[size], "object-contain bg-transparent animate-pulse", className)}
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
