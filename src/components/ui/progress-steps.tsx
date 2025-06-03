
import React from "react";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  current?: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStepId: string;
  onStepClick?: (stepId: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function ProgressSteps({ 
  steps, 
  currentStepId, 
  onStepClick,
  orientation = "horizontal",
  className 
}: ProgressStepsProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  const updatedSteps = steps.map((step, index) => ({
    ...step,
    completed: index < currentStepIndex,
    current: step.id === currentStepId
  }));

  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-4", className)}>
        {updatedSteps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  step.completed && "bg-primary border-primary text-primary-foreground",
                  step.current && "border-primary text-primary bg-background",
                  !step.completed && !step.current && "border-muted-foreground/30 text-muted-foreground",
                  onStepClick && "hover:border-primary cursor-pointer"
                )}
              >
                {step.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>
              {index < updatedSteps.length - 1 && (
                <div className="w-px h-8 bg-muted-foreground/30 mt-2" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "text-sm font-medium",
                step.current && "text-primary",
                step.completed && "text-foreground",
                !step.completed && !step.current && "text-muted-foreground"
              )}>
                {step.title}
              </h3>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2 overflow-x-auto pb-2", className)}>
      {updatedSteps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center space-x-2 min-w-0">
            <button
              onClick={() => onStepClick?.(step.id)}
              disabled={!onStepClick}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors shrink-0",
                step.completed && "bg-primary border-primary text-primary-foreground",
                step.current && "border-primary text-primary bg-background",
                !step.completed && !step.current && "border-muted-foreground/30 text-muted-foreground",
                onStepClick && "hover:border-primary cursor-pointer"
              )}
            >
              {step.completed ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </button>
            <div className="min-w-0">
              <h3 className={cn(
                "text-sm font-medium truncate",
                step.current && "text-primary",
                step.completed && "text-foreground",
                !step.completed && !step.current && "text-muted-foreground"
              )}>
                {step.title}
              </h3>
            </div>
          </div>
          
          {index < updatedSteps.length - 1 && (
            <ArrowRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
