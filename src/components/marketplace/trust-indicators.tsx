
import { Shield, BadgeCheck, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface TrustIndicatorsProps {
  securityScore: number;
  verificationLevel: "verified" | "expert" | "elite";
  completedProjects: number;
  size: "sm" | "md" | "lg";
}

export function TrustIndicators({
  securityScore,
  verificationLevel,
  completedProjects,
  size = "md"
}: TrustIndicatorsProps) {
  const getVerificationColor = () => {
    if (verificationLevel === "elite") return "text-blue-500";
    if (verificationLevel === "expert") return "text-violet-500"; 
    return "text-green-500";
  };
  
  const getScoreColor = () => {
    if (securityScore >= 90) return "from-green-500 to-green-600";
    if (securityScore >= 70) return "from-amber-500 to-amber-600";
    return "from-primary to-primary/80";
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "gap-1.5",
          icon: "h-3 w-3",
          text: "text-xs",
          progress: "h-1"
        };
      case "lg":
        return {
          container: "gap-2.5",
          icon: "h-5 w-5",
          text: "text-base",
          progress: "h-1.5"
        };
      default: // medium
        return {
          container: "gap-2",
          icon: "h-4 w-4",
          text: "text-sm",
          progress: "h-1.5"
        };
    }
  };
  
  const sizeClasses = getSizeClasses();
  
  return (
    <div className="space-y-1.5">
      <div className={`flex items-center ${sizeClasses.container}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Shield className={`${sizeClasses.icon} text-primary mr-0.5`} />
                <span className={`${sizeClasses.text} font-medium`}>{securityScore}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Security Score: Based on audit history and security practices</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <BadgeCheck className={`${sizeClasses.icon} ${getVerificationColor()} mr-0.5`} />
                <span className={`${sizeClasses.text} font-medium capitalize`}>{verificationLevel}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Verification Level: {verificationLevel.charAt(0).toUpperCase() + verificationLevel.slice(1)} provider with validated credentials</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Users className={`${sizeClasses.icon} text-muted-foreground mr-0.5`} />
                <span className={`${sizeClasses.text}`}>{completedProjects}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{completedProjects} Completed Projects</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Progress 
                value={securityScore} 
                className={`${sizeClasses.progress} bg-muted [&>div]:bg-gradient-to-r [&>div]:${getScoreColor()}`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              Security Score: {securityScore}% - {
                securityScore >= 90 ? "Excellent" : 
                securityScore >= 70 ? "Good" : 
                securityScore >= 50 ? "Average" : "Needs improvement"
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
