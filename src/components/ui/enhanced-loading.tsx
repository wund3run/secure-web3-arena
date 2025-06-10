
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface EnhancedLoadingProps {
  variant?: 'spinner' | 'skeleton' | 'pulse' | 'progress' | 'dots';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  progress?: number;
  className?: string;
  centered?: boolean;
  overlay?: boolean;
}

export const EnhancedLoading = ({
  variant = 'spinner',
  size = 'md',
  text,
  progress,
  className,
  centered = false,
  overlay = false
}: EnhancedLoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const renderSpinner = () => (
    <Loader2 className={cn('animate-spin', sizeClasses[size])} />
  );

  const renderSkeleton = () => (
    <div className="space-y-2 w-full max-w-sm">
      <div className="h-4 bg-muted rounded animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
    </div>
  );

  const renderPulse = () => (
    <div className={cn('bg-muted rounded-full animate-pulse', sizeClasses[size])} />
  );

  const renderProgress = () => (
    <div className="w-full max-w-sm space-y-2">
      <Progress value={progress || 0} className="h-2" />
      {text && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{text}</span>
          <span>{progress || 0}%</span>
        </div>
      )}
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-current rounded-full animate-pulse',
            size === 'sm' ? 'h-1 w-1' :
            size === 'md' ? 'h-2 w-2' :
            size === 'lg' ? 'h-3 w-3' : 'h-4 w-4'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'skeleton':
        return renderSkeleton();
      case 'pulse':
        return renderPulse();
      case 'progress':
        return renderProgress();
      case 'dots':
        return renderDots();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center space-y-2',
      centered && 'min-h-[200px]',
      className
    )}>
      {renderContent()}
      {text && variant !== 'progress' && (
        <p className={cn('text-muted-foreground', textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
