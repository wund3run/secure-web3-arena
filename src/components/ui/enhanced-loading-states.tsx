
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { designTokens } from "@/utils/design/tokens";

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'pulse' | 'dots' | 'progress';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullScreen?: boolean;
  error?: boolean;
  onRetry?: () => void;
  progress?: number; // 0-100 for progress variant
}

export function EnhancedLoadingState({
  variant = 'spinner',
  size = 'md',
  message,
  className,
  fullScreen = false,
  error = false,
  onRetry,
  progress = 0
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const logoSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-3",
    fullScreen ? "min-h-screen" : "p-8",
    className
  );

  if (error) {
    return (
      <div className={containerClasses}>
        <WifiOff className={cn("text-destructive", sizeClasses[size])} />
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-destructive">
            Connection failed
          </p>
          {message && (
            <p className="text-xs text-muted-foreground">{message}</p>
          )}
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Try again
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse rounded bg-muted",
              size === 'sm' ? 'h-3' : size === 'md' ? 'h-4' : 'h-5'
            )}
            style={{ 
              width: `${100 - (i * 15)}%`,
              animationDelay: `${i * 150}ms`
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={containerClasses}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full bg-primary animate-bounce",
                size === 'sm' ? 'h-1 w-1' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3'
              )}
              style={{
                animationDelay: `${i * 160}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
        {message && (
          <p className="text-sm text-muted-foreground mt-2">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'progress') {
    return (
      <div className={containerClasses}>
        <img 
          src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
          alt="Hawkly Logo"
          className={cn("object-contain bg-transparent animate-pulse mb-4", logoSizes[size])}
          style={{ backgroundColor: 'transparent' }}
        />
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{message || 'Loading...'}</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={containerClasses}>
        <img 
          src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
          alt="Hawkly Logo"
          className={cn("object-contain bg-transparent animate-pulse", logoSizes[size])}
          style={{ backgroundColor: 'transparent' }}
        />
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    );
  }

  // Default spinner variant with Hawkly logo
  return (
    <div className={containerClasses}>
      <img 
        src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
        alt="Hawkly Logo"
        className={cn("object-contain bg-transparent animate-pulse", logoSizes[size])}
        style={{ backgroundColor: 'transparent' }}
      />
      {message && (
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {message}
        </p>
      )}
    </div>
  );
}

// Specialized loading components for common use cases
export function CardLoadingState({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  );
}

export function TableLoadingState({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="animate-pulse h-4 bg-muted rounded flex-1"
              style={{ animationDelay: `${(i * columns + j) * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ListLoadingState({ items = 6 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div
            className="animate-pulse h-10 w-10 bg-muted rounded-full"
            style={{ animationDelay: `${i * 100}ms` }}
          />
          <div className="space-y-2 flex-1">
            <div
              className="animate-pulse h-3 bg-muted rounded w-1/3"
              style={{ animationDelay: `${i * 100 + 50}ms` }}
            />
            <div
              className="animate-pulse h-2 bg-muted rounded w-1/2"
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
