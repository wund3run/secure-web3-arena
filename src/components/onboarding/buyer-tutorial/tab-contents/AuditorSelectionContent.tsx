
import { TutorialStep } from "../TutorialStep";
import { Progress } from "@/components/ui/progress";
import { securityCriteria } from "../data/securityCriteria";
import { 
  VerificationStatusDetail,
  PastExperienceDetail,
  ReviewsRatingsDetail,
  ResponseTimeDetail,
  TransparentPricingDetail
} from "../detail-views";

interface AuditorSelectionContentProps {
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  progress: number;
}

export function AuditorSelectionContent({ showingDetails, toggleDetails, progress }: AuditorSelectionContentProps) {
  const renderDetailComponent = (detailId: string | null) => {
    if (!detailId) return null;
    
    switch (detailId) {
      case "choose-auditor-0":
        return <VerificationStatusDetail />;
      case "choose-auditor-1":
        return <PastExperienceDetail />;
      case "choose-auditor-2":
        return <ReviewsRatingsDetail />;
      case "choose-auditor-3":
        return <ResponseTimeDetail />;
      case "choose-auditor-4":
        return <TransparentPricingDetail />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 p-6">
      <div>
        <h3 className="text-lg font-medium mb-1">How to Choose the Right Security Auditor</h3>
        <p className="text-sm text-muted-foreground mb-4">
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
              completed={progress >= (index + 1) * 20}
              onClick={() => toggleDetails(`choose-auditor-${index}`)}
            />
            {showingDetails === `choose-auditor-${index}` && renderDetailComponent(showingDetails)}
          </div>
        ))}
      </div>
      
      <div className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
