
import React, { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/performance/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  placeholder,
  priority = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { targetRef, isIntersecting, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: true
  });

  const shouldLoad = priority || isIntersecting || hasIntersected;

  return (
    <div 
      ref={targetRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'opacity-50'
          )}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      
      {!isLoaded && !hasError && (
        <div 
          className={cn(
            'absolute inset-0 bg-muted animate-pulse',
            placeholder && 'bg-cover bg-center'
          )}
          style={placeholder ? { backgroundImage: `url(${placeholder})` } : undefined}
        />
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
