import React, { Suspense, lazy, ComponentType, useState, useEffect, ReactNode, useContext } from 'react';
import { LoadingState } from '@/components/ui/loading-states';

// Lazy loading with proper error boundaries and loading states
interface LazyComponentOptions {
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * Creates a lazy-loaded component with error boundary and loading state
 * @param importFn - Function that returns a promise resolving to the component
 * @param options - Configuration options for lazy loading
 * @returns A React component with proper error handling and loading states
 */
export function createLazyComponent<T extends ComponentType<React.ComponentProps<T>>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {}
) {
  const {
    fallback = <LoadingState type="skeleton" lines={3} />,
    errorFallback = <div className="p-4 text-red-600">Failed to load component</div>,
    priority = 'medium'
  } = options;

  const LazyComponent = lazy(importFn);
  return React.forwardRef<React.ComponentRef<T>, React.ComponentProps<T>>((props, ref) => (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} ref={ref} />
      </Suspense>
    </ErrorBoundary>
  ));
}

// Error boundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Error boundary component for catching and handling React component errors
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Intersection Observer hook for lazy loading
interface IntersectionObserverHookResult {
  isIntersecting: boolean;
  hasIntersected: boolean;
}

/**
 * Hook for observing element intersection with viewport
 * @param ref - React ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns Object with intersection state and history
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): IntersectionObserverHookResult {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasIntersected, setHasIntersected] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
}

// Lazy loading wrapper component
interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  once?: boolean;
}

/**
 * Component wrapper for lazy loading content when it comes into view
 * @param children - Content to render when visible
 * @param fallback - Loading state to show while not visible
 * @param className - Additional CSS classes
 * @param once - Whether to render only once or continuously
 */
export function LazyLoad({ 
  children, 
  fallback = <LoadingState type="skeleton" lines={2} />, 
  className,
  once = true 
}: LazyLoadProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { isIntersecting, hasIntersected } = useIntersectionObserver(ref);

  const shouldRender = once ? hasIntersected : isIntersecting;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

// Component preloader for critical components
/**
 * Preloads a component for faster subsequent loading
 * @param importFn - Function that returns a promise resolving to the component
 */
export function preloadComponent<T extends ComponentType<React.ComponentProps<T>>>(
  importFn: () => Promise<{ default: T }>
) {
  // Preload the component
  importFn().catch(console.error);
}

// Bundle splitting utilities
export const LazyDashboard = createLazyComponent(
  () => import('@/components/dashboard/enhanced/EnhancedAuditorDashboard'),
  { priority: 'high' }
);

export const LazyAIAssistant = createLazyComponent(
  () => import('@/components/automation/AIAuditAssistant'),
  { priority: 'medium' }
);
export const LazySkillDevelopment = createLazyComponent(
  () => import('@/components/auditor-learning/AuditorSkillDevelopment'),
  { priority: 'low' }
);

export const LazyWorkspace = createLazyComponent(
  () => import('@/components/dashboard/enhanced/AuditorWorkspaceV2'),
  { priority: 'medium' }
);

/**
 * Hook for monitoring component render performance
 * @param componentName - Name of the component being monitored
 */
export function usePerformanceMonitor(componentName: string) {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 100) {
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  }, [componentName]);
}

// Debounced state hook for performance
/**
 * Hook for debouncing state updates to improve performance
 * @param initialValue - Initial state value
 * @param delay - Debounce delay in milliseconds
 * @returns Array with current value, debounced value, and setter function
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 300
): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue];
}

// Memoized component wrapper
/**
 * Wraps a component with React.memo for performance optimization
 * @param Component - Component to memoize
 * @param areEqual - Custom comparison function
 * @returns Memoized component
 */
export function withMemo<T extends ComponentType<React.ComponentProps<T>>>(
  Component: T,
  areEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean
) {
  return React.memo(Component, areEqual);
}

// Virtual scrolling hook for large lists
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop
  };
}

// Resource preloading utilities
export function preloadCriticalResources() {
  // Preload critical components
  preloadComponent(() => import('@/components/dashboard/enhanced/EnhancedAuditorDashboard'));
  preloadComponent(() => import('@/components/automation/AIAuditAssistant'));
  
  // Preload critical images
  const criticalImages = [
    '/hawkly-logo.svg',
    '/dashboard-bg.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Code splitting by route
export const routeComponents = {
  Dashboard: createLazyComponent(
    () => import('@/pages/Dashboard'),
    { priority: 'high', fallback: <LoadingState type="card" title="Loading Dashboard" /> }
  ),
  
  AITools: createLazyComponent(
    () => import('@/pages/AITools'),
    { priority: 'medium', fallback: <LoadingState type="card" title="Loading AI Tools" /> }
  ),
  
  Settings: createLazyComponent(
    () => import('@/pages/Settings'),
    { priority: 'low', fallback: <LoadingState type="card" title="Loading Settings" /> }
  )
};

// Bundle analyzer helper (development only)
export function analyzeBundleSize() {
  if (import.meta.env.MODE === 'development') {
    console.log('Bundle analysis available in production build');
  }
}

// Memory leak prevention
export function useCleanup(cleanup: () => void) {
  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);
}

// Optimized image component
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  placeholder?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  priority = false, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
  className,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          Failed to load image
        </div>
      )}
    </div>
  );
}