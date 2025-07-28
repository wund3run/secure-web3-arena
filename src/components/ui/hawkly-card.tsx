import React from 'react';
import { cn } from '@/lib/utils';

export interface HawklyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'highlighted' | 'interactive';
  size?: 'sm' | 'md' | 'lg';
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  bordered?: boolean;
}

export const HawklyCard = React.forwardRef<HTMLDivElement, HawklyCardProps>(
  ({ className, variant = 'default', size = 'md', elevation = 'medium', bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          // Base styles
          'bg-gray-900/70 text-white',
          
          // Size variants
          size === 'sm' && 'p-3',
          size === 'md' && 'p-4',
          size === 'lg' && 'p-6',
          
          // Card variants
          variant === 'glass' && 'backdrop-blur-md bg-opacity-40 bg-gray-900/60',
          variant === 'highlighted' && 'border-l-4 border-l-blue-500',
          variant === 'interactive' && 'hover:bg-gray-800/90 cursor-pointer transition-all duration-300',
          
          // Elevation variants
          elevation === 'flat' && 'shadow-none',
          elevation === 'low' && 'shadow-sm',
          elevation === 'medium' && 'shadow-md',
          elevation === 'high' && 'shadow-lg',
          
          // Border option
          bordered && 'border border-gray-700',
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HawklyCard.displayName = 'HawklyCard';
