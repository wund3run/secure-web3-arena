
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { WalletConnect } from "@/components/auth/wallet-connect";
import { ProviderVerification } from "@/components/onboarding/provider-verification";
import { BuyerTutorial } from "@/components/onboarding/buyer-tutorial";
import { TrustBadge, TestimonialBadge } from "@/components/trust/trust-badges";
import { Shield, Code, Users, ArrowRight, X, ArrowLeft, Book, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-mobile";

interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface OnboardingStepProps {
  currentStep: number;
  totalSteps: number;
  step: StepProps;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  isLast: boolean;
}

const OnboardingStep = ({ currentStep, totalSteps, step, onNext, onPrevious, onSkip, isLast }: OnboardingStepProps) => {
  return (
    <div className="min-h-[300px] flex flex-col">
      <div className="flex-1">
        <div className="mb-6 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onSkip}>
              Skip
            </Button>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {step.icon}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">{step.title}</h2>
        <p className="text-center text-muted-foreground mb-6">
          {step.description}
        </p>
      </div>
      
      <div className="flex justify-between">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        ) : (
          <div></div> // Empty div for spacing
        )}
        
        <Button onClick={onNext}>
          {isLast ? "Get Started" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface UserTypeSelectionProps {
  onSelect: (type: "provider" | "buyer") => void;
  onSkip: () => void;
}

const UserTypeSelection = ({ onSelect, onSkip }: UserTypeSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to Hawkly</h2>
        <p className="text-muted-foreground">
          Tell us what brings you here today to personalize your experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all" onClick={() => onSelect("provider")}>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle>I'm a Security Provider</CardTitle>
            <CardDescription>
              I want to offer security services and audits to blockchain projects
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Continue as Provider
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:border-secondary/50 hover:bg-secondary/5 transition-all" onClick={() => onSelect("buyer")}>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-2">
              <Code className="h-6 w-6" />
            </div>
            <CardTitle>I'm Looking for Security</CardTitle>
            <CardDescription>
              I need security services for my blockchain project or smart contracts
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Continue as Buyer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="text-center">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          I'm just browsing
        </Button>
      </div>
    </div>
  );
};

interface OnboardingCompletionProps {
  userType: "provider" | "buyer";
  onFinish: () => void;
}

const OnboardingCompletion = ({ userType, onFinish }: OnboardingCompletionProps) => {
  const navigate = useNavigate();
  
  const handleCtaClick = () => {
    if (userType === "provider") {
      navigate("/requests"); // Assume this page exists for browsing audit requests
    } else {
      navigate("/marketplace"); // Direct buyers to browse security services
    }
    onFinish();
  };
  
  return (
    <div className="text-center space-y-6 py-6">
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-500">
          <Shield className="h-10 w-10" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">
        {userType === "provider" 
          ? "You're Ready to Provide Security Services!"
          : "You're Ready to Secure Your Projects!"}
      </h2>
      
      <p className="text-muted-foreground max-w-md mx-auto">
        {userType === "provider"
          ? "Your profile has been set up. Start browsing security requests and offering your expertise to blockchain projects."
          : "Your account has been set up. Start browsing security experts and services to protect your blockchain projects."}
      </p>
      
      <div className="pt-4">
        <Button className="px-8" onClick={handleCtaClick}>
          {userType === "provider" ? "Browse Audit Requests" : "Browse Security Services"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface EnhancedOnboardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnhancedOnboarding({ open, onOpenChange }: EnhancedOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"provider" | "buyer" | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const initialSteps: StepProps[] = [
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
  
  // Render component based on screen size
  const Component = isMobile ? Drawer : Dialog;
  const ComponentContent = isMobile ? DrawerContent : DialogContent;
  
  const renderContentWithTitle = (title: string, description: string | null, content: React.ReactNode) => {
    return (
      <>
        {isMobile ? (
          <DrawerHeader className="text-center">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        ) : null}
        <div className="px-4 pb-4">
          {content}
        </div>
      </>
    );
  };

  return (
    <Component open={open} onOpenChange={onOpenChange}>
      <ComponentContent className={isMobile ? "" : "max-w-lg sm:max-w-2xl p-6"}>
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        {!showUserTypeSelection && !showConnectWallet && !showVerification && !showTutorial && !showCompletion && (
          renderContentWithTitle(
            "Welcome to Hawkly",
            "Web3 Security Marketplace",
            <OnboardingStep 
              currentStep={currentStep}
              totalSteps={steps.length}
              step={steps[currentStep - 1]}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSkip={handleSkip}
              isLast={currentStep === steps.length}
            />
          )
        )}
        
        {showConnectWallet && (
          renderContentWithTitle(
            "Connect to Hawkly",
            "Choose your preferred authentication method",
            <WalletConnect 
              onConnect={handleConnect} 
              onClose={() => {
                setShowConnectWallet(false);
                setShowUserTypeSelection(true);
              }}
            />
          )
        )}
        
        {showUserTypeSelection && (
          renderContentWithTitle(
            "Choose Your Path",
            null,
            <UserTypeSelection 
              onSelect={handleUserTypeSelect} 
              onSkip={() => {
                toast.info("You can complete your profile later");
                onOpenChange(false);
              }}
            />
          )
        )}
        
        {showVerification && (
          renderContentWithTitle(
            "Security Provider Verification",
            null,
            <ProviderVerification 
              onComplete={handleVerificationComplete}
              onCancel={() => {
                setShowVerification(false);
                setShowUserTypeSelection(true);
              }}
            />
          )
        )}
        
        {showTutorial && (
          renderContentWithTitle(
            "Smart Contract Audit Guide",
            null,
            <BuyerTutorial 
              onComplete={handleTutorialComplete}
              onClose={() => {
                setShowTutorial(false);
                setShowCompletion(true);
              }}
            />
          )
        )}
        
        {showCompletion && (
          renderContentWithTitle(
            "Onboarding Complete",
            null,
            <OnboardingCompletion 
              userType={userType as "provider" | "buyer"}
              onFinish={handleFinish}
            />
          )
        )}
        
        {/* Trust indicators at the bottom */}
        {!showVerification && !showTutorial && (
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
        )}
      </ComponentContent>
    </Component>
  );
}
