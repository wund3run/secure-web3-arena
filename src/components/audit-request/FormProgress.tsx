
import React from 'react';

interface FormProgressProps {
  formStep: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ formStep }) => {
  const getStepName = (step: number) => {
    switch (step) {
      case 1: return 'Project Details';
      case 2: return 'Technical Information';
      case 3: return 'Requirements';
      case 4: return 'Review & Submit';
      default: return '';
    }
  };

  const totalSteps = 5; // Including AI Matching

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Step {formStep} of 4</span>
        <span className="text-sm text-muted-foreground">
          {getStepName(formStep)}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(formStep / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
