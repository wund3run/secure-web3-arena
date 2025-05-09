
import { TutorialStep } from "../TutorialStep";
import { Progress } from "@/components/ui/progress";
import { preparationSteps } from "../data/preparationSteps";

interface AuditPreparationContentProps {
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  progress: number;
}

export function AuditPreparationContent({ showingDetails, toggleDetails, progress }: AuditPreparationContentProps) {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Preparing Your Project for Audit</h3>
        <p className="text-sm text-muted-foreground">
          Proper preparation ensures a more effective and efficient audit process. Follow these steps:
        </p>
      </div>
      
      <div className="space-y-4">
        {preparationSteps.map((step, index) => (
          <div key={index}>
            <TutorialStep
              title={step.title}
              description={step.description}
              icon={step.icon}
              completed={progress >= (index + 1) * 25}
              onClick={() => toggleDetails(`prepare-audit-${index}`)}
            />
            {showingDetails === `prepare-audit-${index}` && step.details}
          </div>
        ))}
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
