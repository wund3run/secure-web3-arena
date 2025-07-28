
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced Animation Utilities
export const animations = {
  // Button interactions
  buttonPress: 'transition-all duration-150 hover:scale-105 active:scale-95',
  buttonHover: 'transition-colors duration-200 hover:bg-opacity-90',
  
  // Card interactions
  cardHover: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
  cardPress: 'transition-transform duration-100 active:scale-98',
  
  // Form interactions
  inputFocus: 'transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary',
  inputError: 'animate-pulse border-destructive',
  
  // Loading states
  shimmer: 'animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
  spin: 'animate-spin',
  
  // Page transitions
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in-left',
  scaleIn: 'animate-scale-in',
  
  // Feedback animations
  success: 'animate-scale-in text-green-500',
  error: 'animate-pulse text-destructive',
  warning: 'animate-pulse text-yellow-500',
};

// Micro-interaction Components
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function AnimatedButton({ 
  variant = 'default', 
  size = 'md', 
  loading = false,
  children, 
  className, 
  disabled,
  ...props 
}: AnimatedButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    animations.buttonPress,
    !disabled && !loading && animations.buttonHover
  );

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/20',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent/20',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-accent/20',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/80 focus:ring-accent/20',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </button>
  );
}

// Animated Card Component
interface AnimatedCardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({ children, interactive = false, className, onClick }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg p-6 transition-all duration-300',
        interactive && 'cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary/20',
        onClick && animations.cardPress,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Progress Animation Component
interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
}

export function AnimatedProgress({ 
  value, 
  max = 100, 
  className, 
  showPercentage = false 
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-muted-foreground text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}

// Stagger Animation Hook
export function useStaggerAnimation(itemCount: number, delay: number = 100) {
  return Array.from({ length: itemCount }, (_, index) => ({
    animationDelay: `${index * delay}ms`,
  }));
}

// Reduced Motion Hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
