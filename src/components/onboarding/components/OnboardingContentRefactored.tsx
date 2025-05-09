
import { ContentTitleResolver, ContentDescriptionResolver } from "./content/ContentTitleResolver";
import { useOnboardingFlow } from "../hooks/useOnboardingFlow";
import { ContentRenderer } from "./content/ContentRenderer";
import { TrustIndicatorsSection } from "./trust/TrustIndicatorsSection";

interface OnboardingContentProps {
  isMobile: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingContentRefactored({ isMobile, onOpenChange }: OnboardingContentProps) {
  const {
    currentStep,
    userType,
    showUserTypeSelection,
    showConnectWallet,
    showVerification,
    showTutorial,
    showCompletion,
    handleSkip,
    handleConnect,
    handleUserTypeSelect,
    handleVerificationComplete,
    handleTutorialComplete,
    handleFinish: onboardingFinish,
    handleShowConnectWallet,
    handleShowUserTypeSelection,
    handleCloseWalletConnection,
    handleCancelVerification,
    handleCloseTutorial
  } = useOnboardingFlow();
  
  const handleFinish = () => {
    const success = onboardingFinish();
    if (success) {
      onOpenChange(false);
    }
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

  // Render the main content
  const renderContent = () => {
    return (
      <ContentRenderer
        showUserTypeSelection={showUserTypeSelection}
        showConnectWallet={showConnectWallet}
        showVerification={showVerification}
        showTutorial={showTutorial}
        showCompletion={showCompletion}
        userType={userType}
        onConnect={handleConnect}
        onUserTypeSelect={handleUserTypeSelect}
        onSkip={handleSkip}
        onVerificationComplete={handleVerificationComplete}
        onTutorialComplete={handleTutorialComplete}
        onFinish={handleFinish}
        onShowConnectWallet={handleShowConnectWallet}
        onShowUserTypeSelection={handleShowUserTypeSelection}
        onCloseWalletConnection={handleCloseWalletConnection}
        onCancelVerification={handleCancelVerification}
        onCloseTutorial={handleCloseTutorial}
      />
    );
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

  return {
    contentTitle,
    contentDescription,
    renderContent,
    renderTrustIndicators
  };
}
