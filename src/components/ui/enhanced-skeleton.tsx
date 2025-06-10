
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'brand' | 'shimmer';
}

export function EnhancedSkeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const baseClasses = 'animate-pulse rounded-md';
  
  const variantClasses = {
    default: 'bg-muted',
    card: 'bg-gradient-to-r from-muted via-muted/50 to-muted',
    text: 'bg-muted h-4',
    avatar: 'bg-muted rounded-full',
    brand: 'bg-gradient-to-r from-brand-blue/10 via-brand-purple/10 to-brand-cyan/10',
    shimmer: 'bg-gradient-to-r from-muted via-muted/30 to-muted bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]'
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)} 
      {...props} 
    />
  );
}

export { EnhancedSkeleton as Skeleton };
