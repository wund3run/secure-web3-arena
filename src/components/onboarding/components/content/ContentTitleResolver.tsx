
interface ContentTitleResolverProps {
  showConnectWallet: boolean;
  showUserTypeSelection: boolean;
  showVerification: boolean;
  showTutorial: boolean;
  showCompletion: boolean;
}

export function ContentTitleResolver({
  showConnectWallet,
  showUserTypeSelection,
  showVerification,
  showTutorial,
  showCompletion
}: ContentTitleResolverProps) {
  // Dynamically determine title based on current view
  if (showConnectWallet) return "Connect to Hawkly";
  if (showUserTypeSelection) return "Choose Your Path";
  if (showVerification) return "Security Provider Verification";
  if (showTutorial) return "Smart Contract Audit Guide";
  if (showCompletion) return "Onboarding Complete";
  return "Welcome to Hawkly";
}

export function ContentDescriptionResolver({
  showConnectWallet,
  showVerification,
  showTutorial,
  showCompletion,
  showUserTypeSelection
}: ContentTitleResolverProps) {
  // Dynamically determine description based on current view
  if (showConnectWallet) return "Choose your preferred authentication method";
  if (showVerification || showTutorial || showCompletion || showUserTypeSelection) return null;
  return "Web3 Security Marketplace";
}
