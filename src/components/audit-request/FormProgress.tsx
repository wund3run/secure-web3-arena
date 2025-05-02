
import React from 'react';

interface FormProgressProps {
  formStep: number;
  showAIMatching?: boolean;
}

const FormProgress: React.FC<FormProgressProps> = ({ formStep, showAIMatching = false }) => {
  const getStepName = (step: number) => {
    switch (step) {
      case 1: return 'Project Details';
      case 2: return 'Technical Information';
      case 3: return 'Requirements';
      case 4: return 'Review & Submit';
      default: return '';
    }
  };

  const totalSteps = 4;
  
  // If currently showing AI matching, highlight the progress differently
  const progressWidth = showAIMatching 
    ? '75%' // Show 3/4 progress during AI matching (between step 3 and 4)
    : `${(formStep / totalSteps) * 100}%`;
    
  const stepText = showAIMatching ? 'AI Matching' : `Step ${formStep} of ${totalSteps}`;
  const stepName = showAIMatching ? 'Finding Perfect Auditors' : getStepName(formStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{stepText}</span>
        <span className="text-sm text-muted-foreground">
          {stepName}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
