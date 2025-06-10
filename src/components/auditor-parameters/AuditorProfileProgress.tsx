
import React from "react";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Award, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Step {
  title: string;
  icon: React.ReactNode;
}

interface AuditorProfileProgressProps {
  currentStep: number;
  progress: number;
  steps: Step[];
}

export function AuditorProfileProgress({ currentStep, progress, steps }: AuditorProfileProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">{steps[currentStep]?.title}</span>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mb-6">
              <Progress 
                value={progress} 
                className="h-2" 
                indicatorClassName="bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{progress}% Complete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="flex justify-between relative">
        <div className="absolute h-0.5 bg-border top-4 left-0 right-0 -z-10"></div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center z-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${index <= currentStep 
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"}`}
                  >
                    {step.icon || (
                      index === 0 ? <Shield className="h-4 w-4" /> :
                      index === steps.length - 1 ? <Award className="h-4 w-4" /> :
                      <BadgeCheck className="h-4 w-4" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{step.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {index < currentStep ? "Completed" : 
                     index === currentStep ? "In Progress" : "Not Started"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs mt-2 text-center max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
