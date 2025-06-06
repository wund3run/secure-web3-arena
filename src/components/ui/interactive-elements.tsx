
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2, Check, AlertCircle } from 'lucide-react';

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function InteractiveButton({ 
  loading = false, 
  success = false, 
  error = false,
  variant = 'default',
  size = 'default',
  children, 
  className,
  ...props 
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'interactive-element transition-all duration-200',
        'hover:scale-105 active:scale-95',
        success && 'bg-green-600 hover:bg-green-700',
        error && 'bg-red-600 hover:bg-red-700',
        isPressed && 'scale-95',
        className
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={loading || success}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {success && <Check className="mr-2 h-4 w-4" />}
      {error && <AlertCircle className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  clickable?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export function InteractiveCard({ 
  hover = true, 
  clickable = false, 
  selected = false,
  children, 
  className,
  ...props 
}: InteractiveCardProps) {
  return (
    <Card
      className={cn(
        'transition-all duration-200',
        hover && 'hover:shadow-lg hover:-translate-y-1',
        clickable && 'cursor-pointer interactive-element',
        selected && 'ring-2 ring-primary ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  position?: 'bottom-right' | 'bottom-left';
}

export function FloatingActionButton({ 
  icon, 
  label, 
  onClick, 
  variant = 'primary',
  position = 'bottom-right' 
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        'fixed z-50 transition-all duration-300',
        position === 'bottom-right' && 'bottom-6 right-6',
        position === 'bottom-left' && 'bottom-6 left-6'
      )}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300',
          'hover:shadow-xl hover:scale-105 active:scale-95',
          variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-primary/90',
          variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
        )}
        aria-label={label}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span 
          className={cn(
            'whitespace-nowrap transition-all duration-300 overflow-hidden',
            isExpanded ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
          )}
        >
          {label}
        </span>
      </button>
    </div>
  );
}

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  completedSteps?: number[];
}

export function ProgressIndicator({ steps, currentStep, completedSteps = [] }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300',
              index === currentStep && 'border-primary bg-primary text-primary-foreground scale-110',
              completedSteps.includes(index) && 'border-green-500 bg-green-500 text-white',
              index < currentStep && !completedSteps.includes(index) && 'border-primary bg-primary text-primary-foreground',
              index > currentStep && 'border-muted-foreground text-muted-foreground'
            )}
          >
            {completedSteps.includes(index) ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={cn(
                'h-0.5 w-16 mx-2 transition-all duration-300',
                index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
