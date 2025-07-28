import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressStep {
  value: number;
  label: string;
  completed: boolean;
}

interface EnhancedProgressBarProps {
  className?: string;
  value: number;
  max?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  milestones?: ProgressStep[];
  progress?: number;
  maxValue?: number;
  steps?: ProgressStep[];
  showLabels?: boolean;
  showPercentage?: boolean;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function EnhancedProgressBar({
  className,
  value,
  max = 100,
  label,
  variant = 'default',
  milestones = [],
  progress,
  maxValue = 100,
  steps = [],
  showLabels = true,
  showPercentage = true,
  animate = true,
  size = 'md'
}: EnhancedProgressBarProps) {
  // Handle both old and new prop naming
  const actualValue = value ?? progress ?? 0;
  const actualMax = max ?? maxValue ?? 100;
  const actualSteps = milestones?.length > 0 ? milestones : steps;
  const percentage = Math.min(100, Math.round((actualValue / actualMax) * 100));
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="relative mb-1">
        <Progress 
          value={percentage} 
          className={cn(
            sizeClasses[size], 
            "w-full rounded-full overflow-hidden"
          )}
        />
        
        {/* Step markers */}
        {actualSteps.length > 0 && (
          <div className="absolute top-1/2 left-0 w-full h-0 -translate-y-1/2">
            {actualSteps.map((step, index) => {
              const stepPosition = (step.value / actualMax) * 100;
              return (
                <div 
                  key={index}
                  className={cn(
                    "absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2",
                    step.completed ? "bg-primary" : "bg-muted-foreground"
                  )}
                  style={{ 
                    left: `${stepPosition}%`,
                    top: '50%'
                  }}
                >
                  {showLabels && (
                    <div className={cn(
                      "absolute whitespace-nowrap text-xs font-medium",
                      "transform -translate-x-1/2 mt-1",
                      step.completed ? "text-primary" : "text-muted-foreground"
                    )}
                    style={{ top: '100%' }}>
                      {step.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {showPercentage && (
        <div className="text-xs text-right text-muted-foreground">
          {percentage}% complete
        </div>
      )}
    </div>
  );
}
