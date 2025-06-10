
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface EnhancedProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  milestones?: Array<{ value: number; label: string; completed?: boolean }>;
  className?: string;
}

export const EnhancedProgressBar: React.FC<EnhancedProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
  animated = false,
  milestones = [],
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const getStatusIcon = () => {
    if (percentage === 100) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (percentage > 75) return <Clock className="h-4 w-4 text-blue-500" />;
    if (percentage < 25) return <AlertCircle className="h-4 w-4 text-orange-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">{label}</span>
          </div>
          {showPercentage && (
            <span className="text-muted-foreground">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(
            sizeClasses[size],
            animated && "transition-all duration-500 ease-out"
          )}
        />
        
        {/* Milestones */}
        {milestones.length > 0 && (
          <div className="absolute top-0 left-0 w-full h-full">
            {milestones.map((milestone, index) => {
              const milestonePosition = (milestone.value / max) * 100;
              return (
                <div
                  key={index}
                  className="absolute top-0 transform -translate-x-1/2"
                  style={{ left: `${milestonePosition}%` }}
                >
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full border-2 bg-background",
                      milestone.completed 
                        ? "border-green-500 bg-green-500" 
                        : "border-gray-300"
                    )}
                  />
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-center whitespace-nowrap">
                    {milestone.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
