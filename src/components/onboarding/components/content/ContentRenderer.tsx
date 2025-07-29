
import { UserTypeSelection } from "../UserTypeSelection";
import { OnboardingCompletion } from "../OnboardingCompletion";
import { ProviderVerification } from "@/components/onboarding/provider-verification";
import { BuyerTutorial } from "@/components/onboarding/buyer-tutorial";
import { OnboardingStepsManager } from "../steps/OnboardingStepsManager";
import { WalletConnectionHandler } from "../wallet/WalletConnectionHandler";
import { UserType } from "../../hooks/useOnboardingFlow";

interface ContentRendererProps {
  showUserTypeSelection: boolean;
  showConnectWallet: boolean;
  showVerification: boolean;
  showTutorial: boolean;
  showCompletion: boolean;
  userType: UserType;
  onConnect: (provider: string, address: string) => void;
  onUserTypeSelect: (type: "provider" | "buyer") => void;
  onSkip: () => void;
  onVerificationComplete: () => void;
  onTutorialComplete: () => void;
  onFinish: () => void;
  onShowConnectWallet: () => void;
  onShowUserTypeSelection: () => void;
  onCloseWalletConnection: () => void;
  onCancelVerification: () => void;
  onCloseTutorial: () => void;
}

export function ContentRenderer({
  showUserTypeSelection,
  showConnectWallet,
  showVerification,
  showTutorial,
  showCompletion,
  userType,
  onConnect,
  onUserTypeSelect,
  onSkip,
  onVerificationComplete,
  onTutorialComplete,
  onFinish,
  onShowConnectWallet,
  onShowUserTypeSelection,
  onCloseWalletConnection,
  onCancelVerification,
  onCloseTutorial
}: ContentRendererProps) {
  if (!showUserTypeSelection && !showConnectWallet && !showVerification && !showTutorial && !showCompletion) {
    return (
      <OnboardingStepsManager 
        onShowConnectWallet={onShowConnectWallet}
        onShowUserTypeSelection={onShowUserTypeSelection}
        onSkip={onSkip}
      />
    );
  }
  
  if (showConnectWallet) {
    return (
      <WalletConnectionHandler 
        onConnect={onConnect}
        onClose={onCloseWalletConnection}
      />
    );
  }
  
  if (showUserTypeSelection) {
    return (
      <UserTypeSelection 
        onSelect={onUserTypeSelect} 
        onSkip={() => {
          onFinish();
        }}
      />
    );
  }
  
  if (showVerification) {
    return (
      <ProviderVerification 
        onComplete={onVerificationComplete}
        onCancel={onCancelVerification}
      />
    );
  }
  
  if (showTutorial) {
    return (
      <BuyerTutorial 
        onComplete={onTutorialComplete}
        onClose={onCloseTutorial}
      />
    );
  }
  
  if (showCompletion) {
    return (
      <OnboardingCompletion 
        userType={userType as "provider" | "buyer"}
        onFinish={onFinish}
      />
    );
  }
  
  return null;
}
