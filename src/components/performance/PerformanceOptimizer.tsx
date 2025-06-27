
import React, { memo, useMemo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Memoized error fallback component
const ErrorFallback = memo(({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void; 
}) => (
  <div className="p-6 text-center">
    <h3 className="text-lg font-semibold text-destructive mb-2">
      Something went wrong
    </h3>
    <p className="text-sm text-muted-foreground mb-4">
      {error.message}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
    >
      Try again
    </button>
  </div>
));

ErrorFallback.displayName = 'ErrorFallback';

// Performance-optimized wrapper component
interface OptimizedWrapperProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

export const OptimizedWrapper = memo(({ 
  children, 
  fallback = ErrorFallback,
  onError 
}: OptimizedWrapperProps) => {
  const handleError = useCallback((error: Error, errorInfo: { componentStack: string }) => {
    console.error('Component error:', error, errorInfo);
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary
      FallbackComponent={fallback}
      onError={handleError}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
});

OptimizedWrapper.displayName = 'OptimizedWrapper';

// Virtualized list component for performance
interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 5
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index
    }));
  }, [items, scrollTop, itemHeight, containerHeight, overscan]);

  const totalHeight = items.length * itemHeight;
  const offsetY = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan) * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const startTime = useMemo(() => performance.now(), []);

  React.useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (renderTime > 16) { // > 1 frame at 60fps
      console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
    }
  });

  return {
    measureTask: useCallback((taskName: string, task: () => void) => {
      const taskStart = performance.now();
      task();
      const taskEnd = performance.now();
      console.log(`${componentName} - ${taskName}: ${(taskEnd - taskStart).toFixed(2)}ms`);
    }, [componentName])
  };
}

// Debounced value hook for performance
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
