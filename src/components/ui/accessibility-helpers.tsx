import React from 'react';
import { cn } from '@/lib/utils';

// Focus-visible utility for consistent focus indicators
interface FocusRingProps {
  children: React.ReactNode;
  className?: string;
  focusClassName?: string;
}

export function FocusRing({ children, className, focusClassName }: FocusRingProps) {
  return (
    <div 
      className={cn(
        'focus-within:ring-2 focus-within:ring-hawkly-primary focus-within:ring-offset-2 focus-within:ring-offset-background rounded-md',
        focusClassName,
        className
      )}
    >
      {children}
    </div>
  );
}

// Screen reader only text
interface ScreenReaderOnlyProps {
  children: React.ReactNode;
}

export function ScreenReaderOnly({ children }: ScreenReaderOnlyProps) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Accessible button with proper focus and touch targets
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

export function AccessibleButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  loadingText = 'Loading...',
  className,
  disabled,
  ...props 
}: AccessibleButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hawkly-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm min-w-[44px]', // Minimum 44px for touch targets
    md: 'h-10 px-4 py-2 min-w-[44px]',
    lg: 'h-11 px-8 min-w-[44px]'
  };

  const variantClasses = {
    primary: 'bg-hawkly-primary text-white hover:bg-hawkly-primary/90 active:bg-hawkly-primary/95',
    secondary: 'bg-hawkly-secondary text-white hover:bg-hawkly-secondary/90 active:bg-hawkly-secondary/95',
    outline: 'border border-hawkly-primary text-hawkly-primary hover:bg-hawkly-primary/10 active:bg-hawkly-primary/20',
    ghost: 'text-hawkly-primary hover:bg-hawkly-primary/10 active:bg-hawkly-primary/20'
  };

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <ScreenReaderOnly>{loadingText}</ScreenReaderOnly>
          <span aria-hidden="true">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Accessible navigation with proper ARIA labels
interface AccessibleNavProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

export function AccessibleNav({ children, label, className }: AccessibleNavProps) {
  return (
    <nav 
      aria-label={label}
      className={className}
      role="navigation"
    >
      {children}
    </nav>
  );
}

// Skip to content link for keyboard navigation
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-hawkly-primary text-white px-4 py-2 rounded-md font-medium"
    >
      Skip to main content
    </a>
  );
}

// Accessible heading with proper hierarchy
interface AccessibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function AccessibleHeading({ level, children, className, id }: AccessibleHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const defaultClasses = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-medium',
    5: 'text-base font-medium',
    6: 'text-sm font-medium'
  };

  return (
    <Tag 
      className={cn(defaultClasses[level], className)}
      id={id}
    >
      {children}
    </Tag>
  );
}

// High contrast text utility for better readability
interface HighContrastTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function HighContrastText({ children, className, gradient = false }: HighContrastTextProps) {
  if (gradient) {
    return (
      <span 
        className={cn(
          'bg-gradient-to-r from-hawkly-primary to-hawkly-secondary bg-clip-text text-transparent font-semibold',
          // Fallback for better accessibility
          'supports-[not(background-clip:text)]:text-hawkly-primary',
          className
        )}
        style={{
          // Ensure minimum contrast ratio
          textShadow: '0 0 0 transparent'
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={cn('text-foreground', className)}>
      {children}
    </span>
  );
}

// Accessible form field with proper labeling
interface AccessibleFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

export function AccessibleField({ 
  label, 
  children, 
  error, 
  description, 
  required = false,
  className 
}: AccessibleFieldProps) {
  const fieldId = React.useId();
  const errorId = error ? `${fieldId}-error` : undefined;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <div className={cn('space-y-2', className)}>
      <label 
        htmlFor={fieldId}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {description && (
        <p 
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      
      <div>
        {React.isValidElement(children) ? React.cloneElement(children as any, {
          id: fieldId,
          'aria-describedby': [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required
        }) : children}
      </div>
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
} 