import React from 'react';
import { cn } from '@/lib/utils';

type ColConfig = {
  default: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols: ColConfig;
  gap?: number | string;
  className?: string;
}

export function ResponsiveGrid({ children, cols, gap = 4, className }: ResponsiveGridProps) {
  // Convert cols configuration to tailwind grid classes
  const getColsClass = () => {
    const classes = [];
    
    // Default columns (mobile first)
    classes.push(`grid-cols-${cols.default}`);
    
    // Responsive breakpoints
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    
    return classes.join(' ');
  };

  // Handle gap
  const gapClass = typeof gap === 'number' ? `gap-${gap}` : `gap-${gap}`;

  return (
    <div className={cn(
      'grid',
      getColsClass(),
      gapClass,
      className
    )}>
      {children}
    </div>
  );
}
