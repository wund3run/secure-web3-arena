
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
  fallback = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <img 
        src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
        alt="Hawkly Logo"
        className="h-16 w-16 object-contain bg-transparent animate-pulse"
        style={{ backgroundColor: 'transparent' }}
      />
      <EnhancedSkeleton variant="default" className="h-64 w-full" />
    </div>
  ),
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
