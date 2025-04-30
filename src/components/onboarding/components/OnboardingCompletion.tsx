
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

export interface OnboardingCompletionProps {
  userType: "provider" | "buyer";
  onFinish: () => void;
}

export function OnboardingCompletion({ userType, onFinish }: OnboardingCompletionProps) {
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
}
