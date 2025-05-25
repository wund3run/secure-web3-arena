
import React from 'react';
import { Loader2, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedLoadingStateProps {
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  isOffline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'pulse';
}

export function EnhancedLoadingState({
  message = 'Loading...',
  showRetry = false,
  onRetry,
  isOffline = false,
  size = 'md',
  variant = 'spinner'
}: EnhancedLoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
  };

  if (isOffline) {
    return (
      <div className={`flex flex-col items-center justify-center ${containerClasses[size]} text-center space-y-4`}>
        <WifiOff className={`${sizeClasses[size]} text-muted-foreground`} />
        <div className="space-y-2">
          <p className="text-sm font-medium">You're offline</p>
          <p className="text-xs text-muted-foreground">
            Check your internet connection and try again
          </p>
        </div>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <Wifi className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={`${containerClasses[size]} space-y-4`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex items-center justify-center ${containerClasses[size]}`}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]} text-center space-y-4`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <div className="space-y-2">
        <p className="text-sm font-medium">{message}</p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
