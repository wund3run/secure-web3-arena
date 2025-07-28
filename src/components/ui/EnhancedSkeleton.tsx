import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface EnhancedSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'table' | 'text' | 'avatar';
  count?: number;
  animate?: boolean;
}

export function EnhancedSkeleton({ 
  className, 
  variant = 'default', 
  count = 1,
  animate = true
}: EnhancedSkeletonProps) {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'rounded-lg';
      case 'table':
        return 'h-10 rounded';
      case 'text':
        return 'h-4 w-[250px] rounded';
      case 'avatar':
        return 'h-12 w-12 rounded-full';
      default:
        return 'rounded';
    }
  };

  const baseClasses = cn(
    getVariantClasses(),
    animate && 'animate-pulse',
    'bg-muted',
    className
  );

  if (count === 1) {
    return <Skeleton className={baseClasses} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={baseClasses} />
      ))}
    </div>
  );
}
