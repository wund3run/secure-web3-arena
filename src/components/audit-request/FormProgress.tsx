
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface FormProgressProps {
  formStep: number;
  showAIMatching: boolean;
}

const steps = [
  { number: 1, title: 'Project Details', description: 'Basic project information' },
  { number: 2, title: 'Technical Info', description: 'Scope and complexity' },
  { number: 3, title: 'Requirements', description: 'Timeline and budget' },
  { number: 4, title: 'Review', description: 'Final review and submit' }
];

const FormProgress: React.FC<FormProgressProps> = ({ formStep, showAIMatching }) => {
  if (showAIMatching) {
    return (
      <div className="mb-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary">AI Matching in Progress</h2>
          <p className="text-muted-foreground">Finding the perfect auditors for your project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                formStep >= step.number 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground text-muted-foreground'
              }`}>
                {formStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  formStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`w-12 sm:w-24 h-0.5 mx-2 ${
                formStep > step.number ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;
