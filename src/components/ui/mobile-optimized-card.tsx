
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'compact' | 'feature';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const variantClasses = {
  default: 'border border-border',
  interactive: 'border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer',
  compact: 'border border-border/50 shadow-sm',
  feature: 'border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30'
};

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8'
};

export function MobileOptimizedCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick
}: MobileOptimizedCardProps) {
  return (
    <Card
      className={cn(
        'rounded-lg',
        variantClasses[variant],
        hover && !onClick && 'hover:shadow-md transition-shadow duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </Card>
  );
}

// Header component for mobile cards
interface MobileCardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function MobileCardHeader({
  title,
  subtitle,
  action,
  className
}: MobileCardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 mb-4', className)}>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-foreground truncate text-base sm:text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

// Content component for mobile cards
interface MobileCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileCardContent({
  children,
  className
}: MobileCardContentProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {children}
    </div>
  );
}

// Footer component for mobile cards  
interface MobileCardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export function MobileCardFooter({
  children,
  className,
  divider = true
}: MobileCardFooterProps) {
  return (
    <div className={cn(
      'mt-4 pt-4',
      divider && 'border-t border-border/50',
      className
    )}>
      {children}
    </div>
  );
}

// Stats display component for mobile
interface MobileStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
  }>;
  className?: string;
}

export function MobileStats({ stats, className }: MobileStatsProps) {
  return (
    <div className={cn(
      'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4',
      className
    )}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
          <div className="text-lg sm:text-xl font-bold text-foreground">
            {stat.value}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {stat.label}
          </div>
          {stat.trend && stat.trendValue && (
            <div className={cn(
              'text-xs mt-1',
              stat.trend === 'up' && 'text-green-600',
              stat.trend === 'down' && 'text-red-600',
              stat.trend === 'neutral' && 'text-muted-foreground'
            )}>
              {stat.trendValue}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
