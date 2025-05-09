
import { TutorialStep } from "../TutorialStep";
import { Progress } from "@/components/ui/progress";
import { securityCriteria } from "../data/securityCriteria";

interface AuditorSelectionContentProps {
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  progress: number;
}

export function AuditorSelectionContent({ showingDetails, toggleDetails, progress }: AuditorSelectionContentProps) {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h3 className="text-lg font-medium mb-1">How to Choose the Right Security Auditor</h3>
        <p className="text-sm text-muted-foreground">
          Selecting the right security auditor is crucial for the safety of your blockchain project. Here's what to look for:
        </p>
      </div>
      
      <div className="space-y-4">
        {securityCriteria.map((criteria, index) => (
          <div key={index}>
            <TutorialStep
              title={criteria.title}
              description={criteria.description}
              icon={criteria.icon}
              completed={progress >= (index + 1) * 25}
              onClick={() => toggleDetails(`choose-auditor-${index}`)}
            />
            {showingDetails === `choose-auditor-${index}` && criteria.details}
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
