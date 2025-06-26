
import React from 'react';
import { Check, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WorkflowStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
  optional?: boolean;
}

export interface WorkflowProgressProps {
  steps: WorkflowStep[];
  onStepClick?: (stepId: string) => void;
  variant?: 'horizontal' | 'vertical';
  showDescriptions?: boolean;
  className?: string;
}

export function WorkflowProgress({
  steps,
  onStepClick,
  variant = 'horizontal',
  showDescriptions = false,
  className
}: WorkflowProgressProps) {
  const getStepStyles = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getConnectorStyles = (prevStatus: WorkflowStep['status']) => {
    return prevStatus === 'completed' ? 'bg-green-500' : 'bg-muted';
  };

  if (variant === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick}
                className={cn(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all',
                  getStepStyles(step.status),
                  onStepClick && 'hover:scale-105 cursor-pointer'
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              {index < steps.length - 1 && (
                <div className={cn(
                  'w-0.5 h-8 mt-2',
                  getConnectorStyles(step.status)
                )} />
              )}
            </div>
            <div className="flex-1 pb-8">
              <h4 className={cn(
                'font-medium',
                step.status === 'current' && 'text-primary'
              )}>
                {step.title}
                {step.optional && (
                  <span className="text-sm text-muted-foreground ml-2">(Optional)</span>
                )}
              </h4>
              {showDescriptions && step.description && (
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center min-w-0">
            <button
              onClick={() => onStepClick?.(step.id)}
              disabled={!onStepClick}
              className={cn(
                'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all mb-2',
                getStepStyles(step.status),
                onStepClick && 'hover:scale-105 cursor-pointer'
              )}
            >
              {step.status === 'completed' ? (
                <Check className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="max-w-24">
              <p className={cn(
                'text-sm font-medium truncate',
                step.status === 'current' && 'text-primary'
              )}>
                {step.title}
              </p>
              {showDescriptions && step.description && (
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {step.description}
                </p>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              'flex-1 h-0.5 mx-4',
              getConnectorStyles(step.status)
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
