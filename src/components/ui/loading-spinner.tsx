
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  brand?: boolean;
}

export function LoadingSpinner({ size = 'md', className, brand = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (brand) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
          alt="Hawkly Logo"
          className="h-16 w-16 object-contain bg-transparent animate-pulse"
          style={{ backgroundColor: 'transparent' }}
        />
        <div className={cn('relative', sizeClasses[size], className)}>
          <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan animate-spin">
            <div className="absolute inset-1 rounded-full bg-background" />
          </div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan opacity-50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-border border-t-primary',
      sizeClasses[size],
      className
    )} />
  );
}
