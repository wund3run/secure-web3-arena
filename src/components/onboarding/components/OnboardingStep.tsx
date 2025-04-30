
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface OnboardingStepProps {
  currentStep: number;
  totalSteps: number;
  step: StepProps;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  isLast: boolean;
}

export function OnboardingStep({ 
  currentStep, 
  totalSteps, 
  step, 
  onNext, 
  onPrevious, 
  onSkip, 
  isLast 
}: OnboardingStepProps) {
  return (
    <div className="min-h-[300px] flex flex-col">
      <div className="flex-1">
        <div className="mb-6 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onSkip}>
              Skip
            </Button>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {step.icon}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">{step.title}</h2>
        <p className="text-center text-muted-foreground mb-6">
          {step.description}
        </p>
      </div>
      
      <div className="flex justify-between">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        ) : (
          <div></div> // Empty div for spacing
        )}
        
        <Button onClick={onNext}>
          {isLast ? "Get Started" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
