
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SmartCTAProps {
  primary: {
    text: string;
    onClick: () => void;
    icon?: React.ElementType;
    variant?: 'default' | 'outline' | 'ghost';
  };
  secondary?: {
    text: string;
    onClick: () => void;
    variant?: 'outline' | 'ghost';
  };
  context?: 'success' | 'warning' | 'info' | 'urgent';
  message?: string;
  badge?: string;
  className?: string;
}

export function SmartCTA({ 
  primary, 
  secondary, 
  context = 'info', 
  message, 
  badge,
  className 
}: SmartCTAProps) {
  const getContextStyles = () => {
    switch (context) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'urgent':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getContextIcon = () => {
    switch (context) {
      case 'success':
        return CheckCircle;
      case 'warning':
      case 'urgent':
        return AlertCircle;
      default:
        return null;
    }
  };

  const ContextIcon = getContextIcon();
  const PrimaryIcon = primary.icon || ArrowRight;

  return (
    <div className={cn(
      'p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md',
      getContextStyles(),
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {ContextIcon && <ContextIcon className="h-5 w-5" />}
          <div>
            {message && (
              <p className="text-sm font-medium mb-1">{message}</p>
            )}
            <div className="flex items-center gap-2">
              <Button
                onClick={primary.onClick}
                variant={primary.variant || 'default'}
                className="flex items-center gap-2"
              >
                <PrimaryIcon className="h-4 w-4" />
                {primary.text}
              </Button>
              {secondary && (
                <Button
                  onClick={secondary.onClick}
                  variant={secondary.variant || 'outline'}
                  size="sm"
                >
                  {secondary.text}
                </Button>
              )}
            </div>
          </div>
        </div>
        {badge && (
          <Badge variant="secondary" className="ml-4">
            {badge}
          </Badge>
        )}
      </div>
    </div>
  );
}
