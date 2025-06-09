
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Wifi, WifiOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EnhancedLoadingStateProps {
  message?: string;
  variant?: 'spinner' | 'skeleton' | 'pulse' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  isError?: boolean;
  retry?: () => void;
}

export function EnhancedLoadingState({
  message = "Loading...",
  variant = 'spinner',
  size = 'md',
  className,
  showIcon = true,
  isError = false,
  retry
}: EnhancedLoadingStateProps) {
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

  const containerSizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  if (isError) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center text-center",
        containerSizeClasses[size],
        className
      )}>
        <WifiOff className={cn("text-muted-foreground mb-2", sizeClasses[size])} />
        <p className="text-sm text-muted-foreground mb-2">Connection failed</p>
        {retry && (
          <button 
            onClick={retry}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn("space-y-3", containerSizeClasses[size], className)}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn(
        "flex items-center justify-center",
        containerSizeClasses[size],
        className
      )}>
        <img 
          src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
          alt="Hawkly Logo"
          className={cn("object-contain bg-transparent animate-pulse", logoSizes[size])}
          style={{ backgroundColor: 'transparent' }}
        />
        {message && (
          <span className="ml-2 text-sm text-muted-foreground animate-pulse">
            {message}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn(
        "flex items-center justify-center space-x-1",
        containerSizeClasses[size],
        className
      )}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-primary animate-bounce",
              size === 'sm' ? 'h-1 w-1' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3'
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
        {message && (
          <span className="ml-3 text-sm text-muted-foreground">
            {message}
          </span>
        )}
      </div>
    );
  }

  // Default spinner variant with Hawkly logo
  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      containerSizeClasses[size],
      className
    )}>
      <img 
        src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
        alt="Hawkly Logo"
        className={cn("object-contain bg-transparent animate-pulse mb-2", logoSizes[size])}
        style={{ backgroundColor: 'transparent' }}
      />
      {message && (
        <span className="text-sm text-muted-foreground text-center">
          {message}
        </span>
      )}
    </div>
  );
}
