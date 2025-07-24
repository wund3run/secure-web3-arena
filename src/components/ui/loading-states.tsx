import React from 'react';
import { Loader2, Shield, Brain, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-hawkly-primary',
        sizeClasses[size],
        className
      )} 
    />
  );
}

interface LoadingCardProps {
  title?: string;
  description?: string;
  icon?: 'shield' | 'brain' | 'target';
  className?: string;
}

export function LoadingCard({ title, description, icon, className }: LoadingCardProps) {
  const IconComponent = {
    shield: Shield,
    brain: Brain,
    target: Target
  }[icon || 'shield'];

  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200',
      className
    )}>
      <div className="relative mb-4">
        <IconComponent className="h-12 w-12 text-hawkly-primary/20" />
        <LoadingSpinner size="lg" className="absolute inset-0 m-auto" />
      </div>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-600 text-center">{description}</p>
      )}
    </div>
  );
}

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ lines = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-gray-200 rounded animate-pulse',
            i === 0 && 'w-3/4',
            i === 1 && 'w-full',
            i === 2 && 'w-1/2'
          )}
        />
      ))}
    </div>
  );
}

interface LoadingStateProps {
  type: 'spinner' | 'card' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  description?: string;
  icon?: 'shield' | 'brain' | 'target';
  lines?: number;
  className?: string;
}

export function LoadingState({ 
  type, 
  size = 'md', 
  title, 
  description, 
  icon, 
  lines, 
  className 
}: LoadingStateProps) {
  switch (type) {
    case 'spinner':
      return <LoadingSpinner size={size} className={className} />;
    case 'card':
      return (
        <LoadingCard 
          title={title} 
          description={description} 
          icon={icon} 
          className={className} 
        />
      );
    case 'skeleton':
      return <LoadingSkeleton lines={lines} className={className} />;
    default:
      return <LoadingSpinner size={size} className={className} />;
  }
} 