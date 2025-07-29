
import { TestimonialBadge, TrustBadge } from "@/components/trust/trust-badges";

interface TrustIndicatorsSectionProps {
  currentStep: number;
  showVerification: boolean;
  showTutorial: boolean;
  showUserTypeSelection: boolean;
  showConnectWallet: boolean;
  showCompletion: boolean;
}

export function TrustIndicatorsSection({
  currentStep,
  showVerification,
  showTutorial,
  showUserTypeSelection,
  showConnectWallet,
  showCompletion
}: TrustIndicatorsSectionProps) {
  if (showVerification || showTutorial) return null;
  
  return (
    <div className="mx-4 mt-4 pt-4 border-t border-border">
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        <TrustBadge type="verified" />
        <TrustBadge type="expert" />
        <TrustBadge type="top-rated" />
        <TrustBadge type="trusted" />
      </div>
      
      {currentStep === 3 && !showUserTypeSelection && !showConnectWallet && !showCompletion && (
        <div className="mt-4">
          <div className="text-center text-sm font-medium mb-2">Client Testimonials</div>
          <div className="grid grid-cols-1 gap-2">
            <TestimonialBadge 
              clientName="Alex Wang"
              projectName="DeFi Protocol"
              quote="Comprehensive audit that found critical vulnerabilities before launch"
              rating={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}
