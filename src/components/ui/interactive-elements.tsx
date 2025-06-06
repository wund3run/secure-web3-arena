
import React from 'react';
import { cn } from "@/lib/utils";

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  pulseColor?: string;
  children: React.ReactNode;
}

export function PulseButton({
  variant = 'primary',
  size = 'md',
  pulseColor,
  children,
  className,
  ...props
}: PulseButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-2.5 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/50',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10 focus:ring-primary/50',
  };
  
  // Default pulse color based on variant if not specified
  const defaultPulseColors = {
    primary: 'rgba(var(--primary-rgb), 0.5)',
    secondary: 'rgba(var(--secondary-rgb), 0.5)',
    outline: 'rgba(var(--primary-rgb), 0.3)',
  };
  
  const actualPulseColor = pulseColor || defaultPulseColors[variant];
  
  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-md font-medium transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
      <span 
        className="absolute inset-0 rounded-md pulse-animation"
        style={{ 
          '--pulse-color': actualPulseColor
        } as React.CSSProperties}
      />
    </button>
  );
}

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: 'lift' | 'glow' | 'border' | 'scale';
  children: React.ReactNode;
}

export function HoverCard({
  hoverEffect = 'lift',
  children,
  className,
  ...props
}: HoverCardProps) {
  // Hover effect classes
  const hoverEffectClasses = {
    lift: 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-md',
    glow: 'transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]',
    border: 'transition-all duration-300 border-2 border-transparent hover:border-primary/30 rounded-lg',
    scale: 'transition-transform duration-300 hover:scale-[1.02]',
  };
  
  return (
    <div
      className={cn(
        'bg-card rounded-lg',
        hoverEffectClasses[hoverEffect],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Focus visible indicator for improved accessibility and visual feedback
export function FocusVisibleProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Add a class to the body when using keyboard navigation
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-mode');
        window.removeEventListener('keydown', handleFirstTab);
      }
    };
    
    window.addEventListener('keydown', handleFirstTab);
    
    // Reset when clicking with mouse
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-mode');
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  return <>{children}</>;
}
