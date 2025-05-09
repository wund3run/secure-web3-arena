
import { useState } from "react";
import { OnboardingStep } from "../OnboardingStep";
import { toast } from "sonner";
import { useOnboardingSteps } from "../../hooks/useOnboardingSteps";

interface OnboardingStepsManagerProps {
  onShowConnectWallet: () => void;
  onShowUserTypeSelection: () => void;
  onSkip: () => void;
}

export function OnboardingStepsManager({ 
  onShowConnectWallet, 
  onShowUserTypeSelection,
  onSkip
}: OnboardingStepsManagerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { steps } = useOnboardingSteps();
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onShowConnectWallet();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <OnboardingStep 
      currentStep={currentStep}
      totalSteps={steps.length}
      step={steps[currentStep - 1]}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSkip={onSkip}
      isLast={currentStep === steps.length}
    />
  );
}
