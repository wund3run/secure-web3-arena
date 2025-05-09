
import { useState } from "react";
import { toast } from "sonner";

export type UserType = "provider" | "buyer" | null;

export function useOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // View state management
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  // Handler functions
  const handleSkip = () => {
    setShowUserTypeSelection(true);
  };
  
  const handleConnect = (provider: string, address: string) => {
    console.log(`Connected with ${provider}: ${address}`);
    setIsConnected(true);
    setShowConnectWallet(false);
    setShowUserTypeSelection(true);
    
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
    
    return true;
  };
  
  const handleShowConnectWallet = () => setShowConnectWallet(true);
  const handleShowUserTypeSelection = () => setShowUserTypeSelection(true);
  const handleCloseWalletConnection = () => {
    setShowConnectWallet(false);
    setShowUserTypeSelection(true);
  };
  const handleCancelVerification = () => {
    setShowVerification(false);
    setShowUserTypeSelection(true);
  };
  const handleCloseTutorial = () => {
    setShowTutorial(false);
    setShowCompletion(true);
  };

  return {
    // State
    currentStep,
    userType,
    isConnected,
    showUserTypeSelection,
    showConnectWallet,
    showVerification,
    showTutorial,
    showCompletion,
    
    // Actions
    handleSkip,
    handleConnect,
    handleUserTypeSelect,
    handleVerificationComplete,
    handleTutorialComplete,
    handleFinish,
    handleShowConnectWallet,
    handleShowUserTypeSelection,
    handleCloseWalletConnection,
    handleCancelVerification,
    handleCloseTutorial
  };
}
