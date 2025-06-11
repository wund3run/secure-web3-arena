
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStepId: string;
  completedSteps?: string[];
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStepId,
  completedSteps = [],
  className
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = step.id === currentStepId;
        const isPast = index < currentIndex;

        return (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  {
                    "bg-primary text-primary-foreground": isCurrent,
                    "bg-green-500 text-white": isCompleted || isPast,
                    "bg-muted text-muted-foreground": !isCurrent && !isCompleted && !isPast
                  }
                )}
              >
                {isCompleted || isPast ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-px h-8 mt-1",
                    isCompleted || isPast ? "bg-green-500" : "bg-muted"
                  )}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
