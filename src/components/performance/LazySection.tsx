
import React, { Suspense, lazy } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function LazySection({
  children,
  fallback = <EnhancedSkeleton variant="shimmer" className="h-64 w-full" />,
  threshold = 0.1,
  rootMargin = "100px",
  className = ""
}: LazySectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
