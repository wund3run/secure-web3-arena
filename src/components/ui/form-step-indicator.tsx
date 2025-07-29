import React from 'react';

interface Step {
  title: string;
  description: string;
  auditorOnly?: boolean;
  projectOwnerOnly?: boolean;
}

interface FormStepIndicatorProps {
  steps: Step[];
  currentStep: number;
  userType: 'auditor' | 'project-owner';
}

export function FormStepIndicator({ steps, currentStep, userType }: FormStepIndicatorProps) {
  // Filter steps based on user type
  const filteredSteps = steps.filter(step => {
    if (step.auditorOnly && userType !== 'auditor') return false;
    if (step.projectOwnerOnly && userType !== 'project-owner') return false;
    return true;
  });
  
  return (
    <div className="my-6">
      <div className="relative flex items-center justify-between">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted">
          <div
            className="h-full bg-hawkly-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (filteredSteps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Step indicators */}
        {filteredSteps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;
          
          return (
            <div 
              key={index} 
              className="relative flex flex-col items-center"
            >
              <div 
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all
                  ${isCompleted ? 'border-hawkly-primary bg-hawkly-primary text-background' : ''}
                  ${isActive ? 'border-hawkly-primary bg-background text-hawkly-primary' : ''}
                  ${!isCompleted && !isActive ? 'border-muted bg-muted/30 text-muted-foreground' : ''}
                `}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div className="absolute top-10 w-max -translate-x-1/2 text-center">
                <p className={`text-xs font-medium ${isActive || isCompleted ? 'text-hawkly-primary' : 'text-muted-foreground'}`}>
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
