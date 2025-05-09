
import { useState } from "react";
import { UserTypeSelection } from "./UserTypeSelection";
import { OnboardingCompletion } from "./OnboardingCompletion";
import { ProviderVerification } from "@/components/onboarding/provider-verification";
import { BuyerTutorial } from "@/components/onboarding/buyer-tutorial";
import { toast } from "sonner";
import { OnboardingStepsManager } from "./steps/OnboardingStepsManager";
import { WalletConnectionHandler } from "./wallet/WalletConnectionHandler";
import { TrustIndicatorsSection } from "./trust/TrustIndicatorsSection";
import { ContentTitleResolver, ContentDescriptionResolver } from "./content/ContentTitleResolver";

interface OnboardingContentProps {
  isMobile: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingContentRefactored({ isMobile, onOpenChange }: OnboardingContentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"provider" | "buyer" | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
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
        <OnboardingStepsManager 
          onShowConnectWallet={() => setShowConnectWallet(true)}
          onShowUserTypeSelection={() => setShowUserTypeSelection(true)}
          onSkip={handleSkip}
        />
      );
    }
    
    if (showConnectWallet) {
      return (
        <WalletConnectionHandler 
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
    return (
      <TrustIndicatorsSection
        currentStep={currentStep}
        showVerification={showVerification}
        showTutorial={showTutorial}
        showUserTypeSelection={showUserTypeSelection}
        showConnectWallet={showConnectWallet}
        showCompletion={showCompletion}
      />
    );
  };

  // Get content title and description
  const contentTitle = ContentTitleResolver({
    showConnectWallet,
    showUserTypeSelection,
    showVerification,
    showTutorial,
    showCompletion
  });

  const contentDescription = ContentDescriptionResolver({
    showConnectWallet,
    showUserTypeSelection,
    showVerification,
    showTutorial,
    showCompletion
  });

  return {
    contentTitle,
    contentDescription,
    renderContent,
    renderTrustIndicators
  };
}
