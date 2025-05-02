
import React from 'react';

interface FormProgressProps {
  formStep: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ formStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Step {formStep} of 3</span>
        <span className="text-sm text-muted-foreground">
          {formStep === 1 ? 'Project Details' : formStep === 2 ? 'Technical Information' : 'Requirements & Submission'}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(formStep / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
