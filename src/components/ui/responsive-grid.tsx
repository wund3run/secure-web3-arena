import React from 'react';
import { cn } from '@/lib/utils';

// Responsive grid container with proper breakpoints
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { default: 1, md: 2, lg: 3 }, 
  gap = 'md',
  className 
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const getColClasses = () => {
    const classes = ['grid'];
    
    if (cols.default) classes.push(`grid-cols-${cols.default}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    
    return classes.join(' ');
  };

  return (
    <div className={cn(getColClasses(), gapClasses[gap], className)}>
      {children}
    </div>
  );
}

// Responsive card grid specifically for dashboard layouts
interface DashboardGridProps {
  children: React.ReactNode;
  variant?: 'stats' | 'cards' | 'mixed';
  className?: string;
}

export function DashboardGrid({ children, variant = 'cards', className }: DashboardGridProps) {
  const variantClasses = {
    stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
    cards: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6',
    mixed: 'grid grid-cols-1 lg:grid-cols-3 gap-6'
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}

// Auto-fit grid that adjusts based on content
interface AutoFitGridProps {
  children: React.ReactNode;
  minWidth?: string;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AutoFitGrid({ 
  children, 
  minWidth = '280px', 
  gap = 'md',
  className 
}: AutoFitGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  return (
    <div 
      className={cn('grid', gapClasses[gap], className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
      }}
    >
      {children}
    </div>
  );
}

// Responsive flex container with proper wrapping
interface ResponsiveFlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  wrap?: boolean;
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
}

export function ResponsiveFlex({ 
  children, 
  direction = 'row',
  wrap = true,
  gap = 'md',
  align = 'start',
  justify = 'start',
  className 
}: ResponsiveFlexProps) {
  const baseClasses = 'flex';
  
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  return (
    <div className={cn(
      baseClasses,
      directionClasses[direction],
      wrap && 'flex-wrap',
      gapClasses[gap],
      alignClasses[align],
      justifyClasses[justify],
      className
    )}>
      {children}
    </div>
  );
}

// Responsive container with proper max-widths
interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveContainer({ 
  children, 
  size = 'lg',
  padding = 'md',
  className 
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    sm: 'px-4',
    md: 'px-4 sm:px-6',
    lg: 'px-4 sm:px-6 lg:px-8'
  };

  return (
    <div className={cn(
      'mx-auto w-full',
      sizeClasses[size],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

// Responsive sidebar layout
interface ResponsiveSidebarLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: 'sm' | 'md' | 'lg';
  collapsible?: boolean;
  className?: string;
}

export function ResponsiveSidebarLayout({ 
  sidebar, 
  main, 
  sidebarPosition = 'left',
  sidebarWidth = 'md',
  collapsible = true,
  className 
}: ResponsiveSidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const sidebarWidthClasses = {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96'
  };

  const sidebarOrder = sidebarPosition === 'left' ? 'order-1' : 'order-2';
  const mainOrder = sidebarPosition === 'left' ? 'order-2' : 'order-1';

  return (
    <div className={cn('flex flex-col lg:flex-row gap-6', className)}>
      <aside className={cn(
        'flex-shrink-0',
        sidebarOrder,
        isCollapsed ? 'hidden lg:block' : 'block',
        sidebarWidthClasses[sidebarWidth]
      )}>
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden mb-4 p-2 bg-hawkly-primary text-white rounded-md"
            aria-label={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
          >
            {isCollapsed ? '☰' : '✕'}
          </button>
        )}
        {sidebar}
      </aside>
      
      <main className={cn('flex-1 min-w-0', mainOrder)}>
        {main}
      </main>
    </div>
  );
}

// Responsive masonry layout for cards
interface ResponsiveMasonryProps {
  children: React.ReactNode;
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveMasonry({ 
  children, 
  columns = { default: 1, sm: 2, lg: 3 },
  gap = 'md',
  className 
}: ResponsiveMasonryProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const getColumnClasses = () => {
    const classes = ['columns-1'];
    
    if (columns.sm) classes.push(`sm:columns-${columns.sm}`);
    if (columns.md) classes.push(`md:columns-${columns.md}`);
    if (columns.lg) classes.push(`lg:columns-${columns.lg}`);
    
    return classes.join(' ');
  };

  return (
    <div className={cn(
      getColumnClasses(),
      gapClasses[gap],
      'space-y-4',
      className
    )}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          {child}
        </div>
      ))}
    </div>
  );
}
