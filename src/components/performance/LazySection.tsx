
import React, { Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/performance/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  className?: string;
  eager?: boolean; // New prop for immediate loading
}

const MinimalFallback = () => (
  <div className="min-h-[100px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export function LazySection({ 
  children, 
  fallback = <MinimalFallback />, 
  threshold = 0.2, // Increased threshold for earlier loading
  className = "",
  eager = false
}: LazySectionProps) {
  const { targetRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: true,
    rootMargin: '200px' // Increased root margin for earlier loading
  });

  // If eager loading is enabled, load immediately
  if (eager) {
    return (
      <div className={className}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </div>
    );
  }

  return (
    <div ref={targetRef} className={className}>
      {hasIntersected ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
