
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  badge?: string;
  featured?: boolean;
  className?: string;
  variant?: 'default' | 'interactive' | 'elevated';
}

export function EnhancedCard({
  title,
  description,
  children,
  footer,
  badge,
  featured,
  className,
  variant = 'default'
}: EnhancedCardProps) {
  const variants = {
    default: 'border-border/30',
    interactive: 'border-border/30 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer',
    elevated: 'shadow-lg border-border/50'
  };

  return (
    <Card className={cn(
      'relative overflow-hidden',
      variants[variant],
      featured && 'ring-2 ring-primary/20',
      className
    )}>
      {badge && (
        <Badge className="absolute top-4 right-4 z-10">
          {badge}
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}

      {footer && (
        <CardFooter className="pt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
