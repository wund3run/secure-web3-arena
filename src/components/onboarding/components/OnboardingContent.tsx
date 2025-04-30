
import { useState } from "react";
import { OnboardingStep, StepProps } from "./OnboardingStep";
import { UserTypeSelection } from "./UserTypeSelection";
import { OnboardingCompletion } from "./OnboardingCompletion";
import { WalletConnect } from "@/components/auth/wallet-connect";
import { ProviderVerification } from "@/components/onboarding/provider-verification";
import { BuyerTutorial } from "@/components/onboarding/buyer-tutorial";
import { TrustBadge, TestimonialBadge } from "@/components/trust/trust-badges";
import { useOnboardingSteps } from "../hooks/useOnboardingSteps";
import { toast } from "sonner";

interface OnboardingContentProps {
  isMobile: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingContent({ isMobile, onOpenChange }: OnboardingContentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"provider" | "buyer" | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  // Import steps from custom hook
  const { steps } = useOnboardingSteps();
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowConnectWallet(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    setShowUserTypeSelection(true);
  };
  
  const handleConnect = (provider: string, address: string) => {
    console.log(`Connected with ${provider}: ${address}`);
    setIsConnected(true);
    setShowConnectWallet(false);
    setShowUserTypeSelection(true);
    
    // Show success message
    toast.success(`Connected successfully with ${provider}`, {
      description: provider === "Email" ? address : `Address: ${address.substring(0, 10)}...`
    });
  };
  
  const handleUserTypeSelect = (type: "provider" | "buyer") => {
    setUserType(type);
    setShowUserTypeSelection(false);
    
    if (type === "provider") {
      setShowVerification(true);
    } else {
      setShowTutorial(true);
    }
  };
  
  const handleVerificationComplete = () => {
    setShowVerification(false);
    setShowCompletion(true);
  };
  
  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setShowCompletion(true);
  };
  
  const handleFinish = () => {
    toast.success("Onboarding completed!", {
      description: userType === "provider" 
        ? "Your provider profile is now active." 
        : "You're ready to find security services."
    });
    
    // Save onboarding completion to local storage
    localStorage.setItem("hawkly_onboarding_completed", "true");
    localStorage.setItem("hawkly_user_type", userType || "");
    
    onOpenChange(false);
  };

  const renderContent = () => {
    if (!showUserTypeSelection && !showConnectWallet && !showVerification && !showTutorial && !showCompletion) {
      return (
        <OnboardingStep 
          currentStep={currentStep}
          totalSteps={steps.length}
          step={steps[currentStep - 1]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={handleSkip}
          isLast={currentStep === steps.length}
        />
      );
    }
    
    if (showConnectWallet) {
      return (
        <WalletConnect 
          onConnect={handleConnect} 
          onClose={() => {
            setShowConnectWallet(false);
            setShowUserTypeSelection(true);
          }}
        />
      );
    }
    
    if (showUserTypeSelection) {
      return (
        <UserTypeSelection 
          onSelect={handleUserTypeSelect} 
          onSkip={() => {
            toast.info("You can complete your profile later");
            onOpenChange(false);
          }}
        />
      );
    }
    
    if (showVerification) {
      return (
        <ProviderVerification 
          onComplete={handleVerificationComplete}
          onCancel={() => {
            setShowVerification(false);
            setShowUserTypeSelection(true);
          }}
        />
      );
    }
    
    if (showTutorial) {
      return (
        <BuyerTutorial 
          onComplete={handleTutorialComplete}
          onClose={() => {
            setShowTutorial(false);
            setShowCompletion(true);
          }}
        />
      );
    }
    
    if (showCompletion) {
      return (
        <OnboardingCompletion 
          userType={userType as "provider" | "buyer"}
          onFinish={handleFinish}
        />
      );
    }
    
    return null;
  };

  // Trust indicators section
  const renderTrustIndicators = () => {
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
  };

  // Dynamically determine title and description based on current view
  const getContentTitle = () => {
    if (showConnectWallet) return "Connect to Hawkly";
    if (showUserTypeSelection) return "Choose Your Path";
    if (showVerification) return "Security Provider Verification";
    if (showTutorial) return "Smart Contract Audit Guide";
    if (showCompletion) return "Onboarding Complete";
    return "Welcome to Hawkly";
  };

  const getContentDescription = () => {
    if (showConnectWallet) return "Choose your preferred authentication method";
    if (showVerification || showTutorial || showCompletion || showUserTypeSelection) return null;
    return "Web3 Security Marketplace";
  };

  return {
    contentTitle: getContentTitle(),
    contentDescription: getContentDescription(),
    renderContent,
    renderTrustIndicators
  };
}
