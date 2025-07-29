
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  onCancel
}: StepNavigationProps) {
  return (
    <div className="flex justify-between mt-6 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={currentStep === 0 ? onCancel : onPrevious}
      >
        {currentStep === 0 ? "Cancel" : "Back"}
      </Button>
      
      {currentStep < totalSteps - 1 ? (
        <Button 
          type="button" 
          onClick={onNext} 
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          onClick={onSubmit}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Complete Profile
          <CheckCircle className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
