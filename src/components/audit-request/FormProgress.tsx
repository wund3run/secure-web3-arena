import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Bot } from 'lucide-react';

interface FormProgressProps {
  formStep: number;
  showAIMatching: boolean;
}

const steps = [
  { number: 1, title: 'Intro', description: 'Welcome' },
  { number: 2, title: 'Project Details', description: 'Basic information' },
  { number: 3, title: 'Technical Info', description: 'Scope & complexity' },
  { number: 4, title: 'Requirements', description: 'Timeline & budget' },
  { number: 5, title: 'Review', description: 'Final review' }
];

export const FormProgress: React.FC<FormProgressProps> = ({ formStep, showAIMatching }) => {
  const currentStep = showAIMatching ? 6 : formStep;
  const totalSteps = 6; // Including AI matching
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Request Security Audit</h1>
        <Badge variant="outline" className="text-sm">
          {showAIMatching ? 'AI Matching' : `Step ${formStep} of 5`}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">Progress: {Math.round(progress)}%</span>
          <span className="text-muted-foreground">
            {showAIMatching ? 'Finding perfect auditors...' : `${5 - formStep} steps remaining`}
          </span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <nav aria-label="Progress" className="flex flex-wrap overflow-x-auto justify-between items-center mt-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center flex-1 min-w-[80px] relative">
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-2
                  ${step.number === currentStep && !showAIMatching
                    ? 'bg-primary text-primary-foreground border-2 border-primary'
                    : step.number < currentStep
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-muted text-muted-foreground border border-border'
                  }
                `}
                aria-current={step.number === currentStep && !showAIMatching ? 'step' : undefined}
                tabIndex={0}
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                {step.number < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div className={`text-xs font-medium ${step.number === currentStep && !showAIMatching ? 'text-primary' : 'text-muted-foreground'}`}>{step.title}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{step.description}</div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-full absolute top-4 left-1/2 transform -translate-x-1/2 ${step.number < currentStep ? 'bg-green-200' : 'bg-muted'}`} style={{ width: '100%' }} />
              )}
            </div>
          ))}
          {/* AI Matching Step */}
          <div className="flex flex-col items-center text-center flex-1 min-w-[80px] relative">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-2 ${showAIMatching ? 'bg-blue-100 text-blue-700 border border-blue-200 animate-pulse' : 'bg-muted text-muted-foreground border border-border'}`}
              aria-current={showAIMatching ? 'step' : undefined}
              tabIndex={0}
              aria-label="AI Matching Step"
            >
              <Bot className="h-4 w-4" />
            </div>
            <div className={`text-xs font-medium ${showAIMatching ? 'text-blue-700' : 'text-muted-foreground'}`}>AI Matching</div>
            <div className="text-xs text-muted-foreground hidden sm:block">Finding auditors</div>
          </div>
        </nav>
      </div>
    </div>
  );
};
