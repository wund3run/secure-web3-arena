
import React from "react";
import { Progress } from "@/components/ui/progress";

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
      
      <Progress value={progress} className="h-2 mb-6" />
      
      <div className="flex justify-between relative">
        <div className="absolute h-0.5 bg-border top-4 left-0 right-0 -z-10"></div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center z-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
              ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {step.icon}
            </div>
            <span className="text-xs mt-2 text-center max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
