
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-screen-2xl',
  full: 'max-w-none'
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-4 sm:px-6 lg:px-8 py-4',
  lg: 'px-4 sm:px-6 lg:px-8 py-6 lg:py-8'
};

export function ResponsiveContainer({
  children,
  variant = 'default',
  className,
  padding = 'md'
}: ResponsiveContainerProps) {
  return (
    <div className={cn(
      'mx-auto w-full',
      variantClasses[variant],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

// Grid system component
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
  };

  const gridClasses = cn(
    'grid',
    gapClasses[gap],
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  responsive?: boolean;
}

export function ResponsiveText({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  className,
  responsive = true
}: ResponsiveTextProps) {
  const baseClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  const responsiveClasses = responsive ? {
    xs: 'text-xs',
    sm: 'text-xs sm:text-sm',
    base: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
    '2xl': 'text-xl sm:text-2xl',
    '3xl': 'text-2xl sm:text-3xl',
    '4xl': 'text-3xl sm:text-4xl lg:text-5xl'
  } : baseClasses;

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <Component className={cn(
      responsiveClasses[size],
      weightClasses[weight],
      className
    )}>
      {children}
    </Component>
  );
}
