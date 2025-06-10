
import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  placeholder?: 'blur' | 'skeleton' | 'none';
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImageLoader = ({
  src,
  alt,
  className,
  fallbackSrc = '/placeholder-image.svg',
  lazy = true,
  quality = 75,
  width,
  height,
  placeholder = 'skeleton',
  onLoad,
  onError
}: OptimizedImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!lazy) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const optimizeSrc = (originalSrc: string) => {
    // Add optimization parameters for supported services
    if (originalSrc.includes('cloudinary.com')) {
      return `${originalSrc}?q_${quality}${width ? `,w_${width}` : ''}${height ? `,h_${height}` : ''},f_auto`;
    }
    
    // For other services, return original
    return originalSrc;
  };

  const currentSrc = hasError ? fallbackSrc : optimizeSrc(src);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      {isLoading && placeholder !== 'none' && (
        <div className="absolute inset-0">
          {placeholder === 'skeleton' ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <div className="w-full h-full bg-muted animate-pulse" />
          )}
        </div>
      )}

      {/* Image */}
      {isInView && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
        />
      )}

      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <div className="text-xs">Failed to load image</div>
          </div>
        </div>
      )}
    </div>
  );
};
