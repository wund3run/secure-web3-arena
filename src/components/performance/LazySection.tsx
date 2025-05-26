
import React, { Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/performance/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  className?: string;
}

const DefaultFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse bg-muted rounded-lg w-full h-48"></div>
  </div>
);

export function LazySection({ 
  children, 
  fallback = <DefaultFallback />, 
  threshold = 0.1,
  className = ""
}: LazySectionProps) {
  const { targetRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: true,
    rootMargin: '100px'
  });

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
