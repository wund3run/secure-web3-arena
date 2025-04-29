
import { Shield, BadgeCheck, Star, Users, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TrustIndicatorProps {
  securityScore?: number;
  verificationLevel?: "verified" | "expert" | "elite";
  completedProjects?: number;
  responseTime?: string;
  size?: "sm" | "md" | "lg";
}

export function TrustIndicators({ 
  securityScore = 85, 
  verificationLevel = "verified",
  completedProjects = 0,
  responseTime = "< 24 hrs",
  size = "md" 
}: TrustIndicatorProps) {
  
  const iconClassName = size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5";
  const textClassName = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
  
  const getVerificationColor = () => {
    switch (verificationLevel) {
      case "verified": return "text-web3-teal";
      case "expert": return "text-primary";
      case "elite": return "text-web3-orange";
      default: return "text-muted-foreground";
    }
  };
  
  const getScoreColor = () => {
    if (securityScore >= 90) return "text-green-500";
    if (securityScore >= 70) return "text-web3-orange";
    return "text-red-500";
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        {/* Security Score */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <div className={`p-1 rounded-full bg-primary/10 flex items-center justify-center`}>
                <Shield className={`${iconClassName} text-primary`} />
              </div>
              <span className={`font-medium ${textClassName} ${getScoreColor()}`}>{securityScore}%</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Security Score: Measures overall security trustworthiness</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Verification Level */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <div className={`p-1 rounded-full bg-secondary/10 flex items-center justify-center`}>
                <BadgeCheck className={`${iconClassName} ${getVerificationColor()}`} />
              </div>
              <span className={`font-medium ${textClassName} capitalize`}>{verificationLevel}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Verification Level: Based on expertise and track record</p>
          </TooltipContent>
        </Tooltip>
        
        {completedProjects > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <div className={`p-1 rounded-full bg-accent/10 flex items-center justify-center`}>
                  <Users className={`${iconClassName} text-accent`} />
                </div>
                <span className={`${textClassName}`}>{completedProjects}+ projects</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Successfully completed audit projects</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <div className={`p-1 rounded-full bg-web3-orange/10 flex items-center justify-center`}>
                <Clock className={`${iconClassName} text-web3-orange`} />
              </div>
              <span className={`${textClassName}`}>{responseTime}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Average response time to inquiries</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
