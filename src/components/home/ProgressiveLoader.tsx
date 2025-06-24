
import React, { useState, useEffect, memo } from 'react';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';

interface ProgressiveLoaderProps {
  children: React.ReactNode;
  delay?: number;
  fallback?: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
}

const ProgressiveLoader = memo(({ 
  children, 
  delay = 0, 
  fallback,
  priority = 'medium'
}: ProgressiveLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(priority === 'high');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority === 'high') return;

    const timer = setTimeout(() => {
      try {
        setIsLoaded(true);
      } catch (err) {
        console.warn('Progressive loader error:', err);
        setError(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, priority]);

  if (error) {
    return fallback || (
      <div className="p-4 text-center text-gray-500">
        <p>Content temporarily unavailable</p>
      </div>
    );
  }

  if (!isLoaded) {
    return fallback || (
      <div className="animate-pulse">
        <EnhancedSkeleton variant="default" className="h-32 w-full rounded" />
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (err) {
    console.warn('Progressive loader render error:', err);
    setError(true);
    return fallback || (
      <div className="p-4 text-center text-gray-500">
        <p>Content temporarily unavailable</p>
      </div>
    );
  }
});

ProgressiveLoader.displayName = 'ProgressiveLoader';

export { ProgressiveLoader };
