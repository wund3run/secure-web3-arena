
import React from 'react';
import { cn } from '@/lib/utils';
import { colorTokens, getBrandColor, getSemanticColor } from '@/utils/design-system/colors';

// Typography System
interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Typography({ 
  variant = 'body', 
  children, 
  className, 
  as 
}: TypographyProps) {
  const variantClasses = {
    h1: 'text-4xl md:text-5xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl font-semibold tracking-tight',
    h3: 'text-2xl md:text-3xl font-semibold tracking-tight',
    h4: 'text-xl md:text-2xl font-semibold tracking-tight',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
    body: 'text-sm md:text-base',
    caption: 'text-xs md:text-sm text-muted-foreground',
    overline: 'text-xs uppercase tracking-wider font-medium text-muted-foreground'
  };

  const defaultElements = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
    body: 'p', caption: 'span', overline: 'span'
  };

  const Component = as || defaultElements[variant];

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
}

// Spacing System
export const spacing = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12'
};

// Layout Components
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({ children, size = 'xl', className }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  );
}

// Grid System
interface GridProps {
  children: React.ReactNode;
  cols?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Grid({ children, cols = { xs: 1, md: 2, lg: 3 }, gap = 'md', className }: GridProps) {
  const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const gridClasses = cn(
    'grid',
    gapClasses[gap],
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    className
  );

  return <div className={gridClasses}>{children}</div>;
}

// Card System
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'security';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  children, 
  variant = 'default', 
  size = 'md', 
  interactive = false,
  className,
  onClick 
}: CardProps) {
  const variantClasses = {
    default: 'bg-card border border-border',
    elevated: 'bg-card shadow-md border-0',
    outlined: 'bg-background border-2 border-border',
    security: 'bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20'
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  const interactiveClasses = interactive || onClick
    ? 'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={cn(
        'rounded-lg transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        interactiveClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
