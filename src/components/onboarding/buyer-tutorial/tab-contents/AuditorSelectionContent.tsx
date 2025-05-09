
import { Shield, Star, Clock, CheckCircle, Coins } from "lucide-react";
import { TutorialStep } from "../TutorialStep";
import { VerificationStatusDetail } from "../detail-views/VerificationStatusDetail";
import { PastExperienceDetail } from "../detail-views/PastExperienceDetail";
import { ReviewsRatingsDetail } from "../detail-views/ReviewsRatingsDetail";
import { ResponseTimeDetail } from "../detail-views/ResponseTimeDetail";
import { TransparentPricingDetail } from "../detail-views/TransparentPricingDetail";

interface AuditorSelectionContentProps {
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  progress: number;
  incrementProgress: (detailId?: string) => void;
}

export function AuditorSelectionContent({ 
  showingDetails, 
  toggleDetails,
  progress,
  incrementProgress 
}: AuditorSelectionContentProps) {
  // Calculate step completion based on progress
  const stepsCompleted = Math.min(5, Math.floor((progress / 20)));
  
  const checkStepCompleted = (index: number) => index < stepsCompleted;
  
  return (
    <div className="px-6 py-4">
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Selecting a Security Auditor</h3>
        <p className="text-sm text-muted-foreground">
          Learn how to evaluate and choose the right security professional for your smart contract audit.
          Click on each criterion to learn more.
        </p>
      </div>
      
      <TutorialStep 
        id="verification-status"
        title="Verification Status" 
        description="Verify the auditor's identity, credentials, and platform status"
        icon={<Shield className="h-4 w-4" />}
        completed={checkStepCompleted(0)}
        onClick={() => toggleDetails("verification-status")}
        active={showingDetails === "verification-status"}
      />
      {showingDetails === "verification-status" && <VerificationStatusDetail />}
      
      <TutorialStep 
        id="past-experience"
        title="Relevant Experience" 
        description="Evaluate their experience with similar projects and technologies"
        icon={<CheckCircle className="h-4 w-4" />}
        completed={checkStepCompleted(1)}
        onClick={() => toggleDetails("past-experience")}
        active={showingDetails === "past-experience"}
      />
      {showingDetails === "past-experience" && <PastExperienceDetail />}
      
      <TutorialStep 
        id="reviews-ratings"
        title="Reviews and Ratings" 
        description="Check feedback from previous clients and projects"
        icon={<Star className="h-4 w-4" />}
        completed={checkStepCompleted(2)}
        onClick={() => toggleDetails("reviews-ratings")}
        active={showingDetails === "reviews-ratings"}
      />
      {showingDetails === "reviews-ratings" && <ReviewsRatingsDetail />}
      
      <TutorialStep 
        id="response-time"
        title="Communication Style" 
        description="Assess responsiveness and communication quality"
        icon={<Clock className="h-4 w-4" />}
        completed={checkStepCompleted(3)}
        onClick={() => toggleDetails("response-time")}
        active={showingDetails === "response-time"}
      />
      {showingDetails === "response-time" && <ResponseTimeDetail />}
      
      <TutorialStep 
        id="pricing-transparency"
        title="Pricing Transparency" 
        description="Understand pricing structure and value for money"
        icon={<Coins className="h-4 w-4" />}
        completed={checkStepCompleted(4)}
        onClick={() => toggleDetails("pricing-transparency")}
        active={showingDetails === "pricing-transparency"}
      />
      {showingDetails === "pricing-transparency" && <TransparentPricingDetail />}
    </div>
  );
}
