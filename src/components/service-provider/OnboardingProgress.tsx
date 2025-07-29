
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  progress: number;
  steps: string[];
}

export function OnboardingProgress({ currentStep, progress, steps }: OnboardingProgressProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm font-medium">{steps[currentStep]}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
