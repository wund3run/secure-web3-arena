
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Bot } from 'lucide-react';

interface FormProgressProps {
  formStep: number;
  showAIMatching: boolean;
}

const steps = [
  { number: 1, title: 'Project Details', description: 'Basic information' },
  { number: 2, title: 'Technical Info', description: 'Scope & complexity' },
  { number: 3, title: 'Requirements', description: 'Timeline & budget' },
  { number: 4, title: 'Review', description: 'Final review' }
];

export const FormProgress: React.FC<FormProgressProps> = ({ formStep, showAIMatching }) => {
  const currentStep = showAIMatching ? 5 : formStep;
  const totalSteps = 5; // Including AI matching
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Request Security Audit</h1>
        <Badge variant="outline" className="text-sm">
          {showAIMatching ? 'AI Matching' : `Step ${formStep} of 4`}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">Progress: {Math.round(progress)}%</span>
          <span className="text-muted-foreground">
            {showAIMatching ? 'Finding perfect auditors...' : `${4 - formStep} steps remaining`}
          </span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center flex-1">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-2
                ${step.number < formStep 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : step.number === formStep && !showAIMatching
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {step.number < formStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              
              <div className="space-y-1">
                <div className={`
                  text-xs font-medium
                  ${step.number <= formStep && !showAIMatching ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  h-0.5 w-full mt-4 absolute top-4 left-1/2 transform translate-x-4
                  ${step.number < formStep ? 'bg-green-200' : 'bg-muted'}
                `} style={{ width: `${100 / steps.length}%` }} />
              )}
            </div>
          ))}
          
          {/* AI Matching Step */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-2
              ${showAIMatching 
                ? 'bg-blue-100 text-blue-700 border border-blue-200 animate-pulse' 
                : 'bg-muted text-muted-foreground'
              }
            `}>
              <Bot className="h-4 w-4" />
            </div>
            
            <div className="space-y-1">
              <div className={`
                text-xs font-medium
                ${showAIMatching ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                AI Matching
              </div>
              <div className="text-xs text-muted-foreground hidden sm:block">
                Finding auditors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
