
import { Shield, BadgeCheck, Users } from "lucide-react";

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
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "gap-1.5",
          icon: "h-3 w-3",
          text: "text-xs"
        };
      case "lg":
        return {
          container: "gap-2.5",
          icon: "h-5 w-5",
          text: "text-base"
        };
      default: // medium
        return {
          container: "gap-2",
          icon: "h-4 w-4",
          text: "text-sm"
        };
    }
  };
  
  const sizeClasses = getSizeClasses();
  
  return (
    <div className={`flex items-center ${sizeClasses.container}`}>
      <div className="flex items-center">
        <Shield className={`${sizeClasses.icon} text-primary mr-0.5`} />
        <span className={`${sizeClasses.text} font-medium`}>{securityScore}%</span>
      </div>
      
      <div className="flex items-center">
        <BadgeCheck className={`${sizeClasses.icon} ${getVerificationColor()} mr-0.5`} />
        <span className={`${sizeClasses.text} font-medium capitalize`}>{verificationLevel}</span>
      </div>
      
      <div className="flex items-center">
        <Users className={`${sizeClasses.icon} text-muted-foreground mr-0.5`} />
        <span className={`${sizeClasses.text}`}>{completedProjects}</span>
      </div>
    </div>
  );
}
