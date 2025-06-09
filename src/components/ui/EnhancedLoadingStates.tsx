
import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'text' | 'avatar' | 'button';
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ variant = 'card', className = '', count = 1 }: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="h-48 bg-muted-foreground/10" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                <div className="h-3 bg-muted-foreground/15 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-2 bg-muted-foreground/10 rounded" />
                  <div className="h-2 bg-muted-foreground/10 rounded w-5/6" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-muted-foreground/15 rounded w-20" />
                  <div className="h-8 bg-muted-foreground/20 rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`animate-pulse flex items-center space-x-4 p-4 ${className}`}>
            <div className="h-12 w-12 bg-muted-foreground/20 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
              <div className="h-3 bg-muted-foreground/15 rounded w-1/2" />
            </div>
            <div className="h-8 bg-muted-foreground/20 rounded w-20" />
          </div>
        );

      case 'text':
        return (
          <div className={`animate-pulse space-y-2 ${className}`}>
            <div className="h-4 bg-muted-foreground/20 rounded w-full" />
            <div className="h-4 bg-muted-foreground/15 rounded w-5/6" />
            <div className="h-4 bg-muted-foreground/10 rounded w-4/6" />
          </div>
        );

      case 'avatar':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-10 w-10 bg-muted-foreground/20 rounded-full" />
          </div>
        );

      case 'button':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-10 bg-muted-foreground/20 rounded-lg w-24" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}

interface ProgressiveLoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
  fallback?: React.ReactNode;
}

export function ProgressiveLoading({ children, isLoading, fallback }: ProgressiveLoadingProps) {
  if (isLoading) {
    return fallback || <LoadingSkeleton variant="card" />;
  }
  
  return <>{children}</>;
}

interface PulseAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export function PulseAnimation({ children, className = '' }: PulseAnimationProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
}
