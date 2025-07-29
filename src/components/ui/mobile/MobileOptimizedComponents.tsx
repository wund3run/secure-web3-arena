
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Mobile-first Button with proper touch targets
interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'touch';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export function MobileButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: MobileButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/20',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary/20',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-primary/20'
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    touch: 'h-12 px-6 text-base min-w-[44px]' // WCAG AA touch target
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        loading && 'cursor-not-allowed',
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

// Mobile-optimized form input
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function MobileInput({ 
  label, 
  error, 
  helper, 
  className, 
  id,
  ...props 
}: MobileInputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full h-12 px-4 text-base bg-background border border-input rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'placeholder:text-muted-foreground',
          error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-sm text-muted-foreground">
          {helper}
        </p>
      )}
    </div>
  );
}

// Mobile-friendly accordion
interface MobileAccordionProps {
  items: Array<{
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }>;
  allowMultiple?: boolean;
}

export function MobileAccordion({ items, allowMultiple = false }: MobileAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(items.map((_, index) => items[index]?.defaultOpen ? index : -1).filter(i => i >= 0))
  );

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        return (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              className="w-full h-12 px-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-left">{item.title}</span>
              <ChevronDown 
                className={cn(
                  'h-4 w-4 transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div className="p-4 bg-background">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Mobile bottom sheet
interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function MobileBottomSheet({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: MobileBottomSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-[80vh] rounded-t-lg p-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
