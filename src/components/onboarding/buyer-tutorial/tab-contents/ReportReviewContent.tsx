
import { TutorialStep } from "../TutorialStep";
import { Progress } from "@/components/ui/progress";
import { reviewGuidance } from "../data/reviewGuidance";

interface ReportReviewContentProps {
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  progress: number;
}

export function ReportReviewContent({ showingDetails, toggleDetails, progress }: ReportReviewContentProps) {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Understanding Audit Reports</h3>
        <p className="text-sm text-muted-foreground">
          Knowing how to interpret and act on audit findings is essential for improving your project's security:
        </p>
      </div>
      
      <div className="space-y-4">
        {reviewGuidance.map((guidance, index) => (
          <div key={index}>
            <TutorialStep
              title={guidance.title}
              description={guidance.description}
              icon={guidance.icon}
              completed={progress >= (index + 1) * 25}
              onClick={() => toggleDetails(`review-report-${index}`)}
            />
            {showingDetails === `review-report-${index}` && guidance.details}
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
