
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface EnhancedLoadingStateProps {
  message?: string;
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'card';
  className?: string;
}

export function EnhancedLoadingState({
  message = 'Loading...',
  progress,
  size = 'md',
  variant = 'default',
  className
}: EnhancedLoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const containerClasses = {
    default: 'flex flex-col items-center justify-center min-h-[200px] space-y-4',
    minimal: 'flex items-center space-x-2',
    card: 'flex flex-col items-center justify-center p-8 border rounded-lg bg-card space-y-4'
  };

  return (
    <div className={cn(containerClasses[variant], className)}>
      <Loader2 className={cn('animate-spin text-muted-foreground', sizeClasses[size])} />
      
      {variant !== 'minimal' && (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{message}</p>
          {progress !== undefined && (
            <div className="w-48">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}%</p>
            </div>
          )}
        </div>
      )}
      
      {variant === 'minimal' && (
        <span className="text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );
}
