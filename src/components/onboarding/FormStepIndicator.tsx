import React from 'react';
import { cn } from '@/lib/utils';

interface FormStepIndicatorProps {
  steps: {
    title: string;
    description: string;
    auditorOnly?: boolean;
    projectOwnerOnly?: boolean;
  }[];
  currentStep: number;
  userType: 'auditor' | 'project-owner';
}

export function FormStepIndicator({ 
  steps, 
  currentStep, 
  userType 
}: FormStepIndicatorProps) {
  // Filter steps based on user type
  const filteredSteps = steps.filter(step => {
    if (step.auditorOnly && userType !== 'auditor') return false;
    if (step.projectOwnerOnly && userType !== 'project-owner') return false;
    return true;
  });

  return (
    <div className="mt-4">
      {/* Mobile Progress Indicator */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        {filteredSteps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 rounded-full flex-1",
              index === 0 ? "rounded-l-full" : "",
              index === filteredSteps.length - 1 ? "rounded-r-full" : "",
              index < currentStep + 1 ? "bg-hawkly-primary" : "bg-gray-200"
            )}
          />
        ))}
      </div>
      
      {/* Desktop Step Indicator */}
      <div className="hidden md:flex justify-between mb-6">
        {filteredSteps.map((step, index) => (
          <div 
            key={index} 
            className={cn(
              "flex flex-col items-center",
              index < filteredSteps.length - 1 ? "relative flex-1" : ""
            )}
          >
            {/* Connector Line */}
            {index < filteredSteps.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 w-full h-0.5 left-0",
                  index < currentStep ? "bg-hawkly-primary" : "bg-gray-200"
                )}
                style={{ width: "calc(100% - 2rem)", left: "1rem" }}
              />
            )}
            
            {/* Step Circle */}
            <div 
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2",
                index < currentStep 
                  ? "bg-hawkly-primary border-hawkly-primary text-white" 
                  : index === currentStep
                    ? "border-hawkly-primary text-hawkly-primary"
                    : "border-gray-300 text-gray-400 bg-white"
              )}
            >
              {index < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            
            {/* Step Text */}
            <div className="mt-2 text-center">
              <p className={cn(
                "text-sm font-medium",
                index === currentStep ? "text-hawkly-primary" : "text-gray-500"
              )}>
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormStepIndicator;
