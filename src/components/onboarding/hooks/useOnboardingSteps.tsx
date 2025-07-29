
import { Shield, Code, Users, Wallet } from "lucide-react";
import { useState } from "react";

export interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function useOnboardingSteps() {
  const initialSteps: OnboardingStep[] = [
    {
      title: "Welcome to Hawkly Security",
      description: "The Web3 security marketplace connecting project owners with verified security experts",
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: "Security for Blockchain Projects",
      description: "Find experienced security professionals to protect your smart contracts, DApps, and protocols",
      icon: <Code className="h-8 w-8" />
    },
    {
      title: "Verified Security Experts",
      description: "All security providers undergo a thorough verification process to ensure quality service",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Secure Authentication",
      description: "Connect your wallet or social accounts to get started with our platform",
      icon: <Wallet className="h-8 w-8" />
    }
  ];

  const [steps, setSteps] = useState(initialSteps);

  return { steps, setSteps };
}
