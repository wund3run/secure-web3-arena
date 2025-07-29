
import { Shield, Award, Star, Users, UserCheck, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TrustBadgeProps {
  type: "verified" | "expert" | "top-rated" | "endorsed" | "certified" | "trusted";
  size?: "sm" | "md" | "lg";
}

export function TrustBadge({ type, size = "md" }: TrustBadgeProps) {
  const badgeClasses = {
    sm: "text-xs py-0 h-5",
    md: "text-sm py-0.5",
    lg: "text-base py-1"
  };

  const iconClasses = {
    sm: "h-3 w-3 mr-1",
    md: "h-4 w-4 mr-1",
    lg: "h-5 w-5 mr-1.5"
  };
  
  const badgeConfig: Record<TrustBadgeProps["type"], { 
    icon: React.ElementType; 
    label: string; 
    tooltip: string;
    variant: "default" | "secondary" | "error" | "outline";
    className?: string;
  }> = {
    "verified": {
      icon: Shield,
      label: "Verified",
      tooltip: "This provider has been verified through our authentication process",
      variant: "default",
      className: "bg-primary/80 hover:bg-primary"
    },
    "expert": {
      icon: Award,
      label: "Expert",
      tooltip: "Recognized expert with proven track record in security audits",
      variant: "default",
      className: "bg-secondary hover:bg-secondary/90"
    },
    "top-rated": {
      icon: Star,
      label: "Top Rated",
      tooltip: "Consistently receives high ratings from clients",
      variant: "outline",
      className: "border-amber-400 text-amber-500 hover:bg-amber-50"
    },
    "endorsed": {
      icon: Users,
      label: "Community Endorsed",
      tooltip: "Endorsed by the Web3 security community",
      variant: "outline",
      className: "border-blue-400 text-blue-500 hover:bg-blue-50"
    },
    "certified": {
      icon: CheckCircle,
      label: "Certified",
      tooltip: "Has obtained industry-recognized certifications",
      variant: "outline", 
      className: "border-green-400 text-green-500 hover:bg-green-50"
    },
    "trusted": {
      icon: UserCheck,
      label: "Trusted Provider",
      tooltip: "Long-standing member with consistent quality service",
      variant: "outline",
      className: "border-purple-400 text-purple-500 hover:bg-purple-50"
    }
  };

  const { icon: Icon, label, tooltip, variant, className } = badgeConfig[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className={`${badgeClasses[size]} ${className}`}>
            <Icon className={iconClasses[size]} />
            {label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface VerificationIndicatorProps {
  level: "unverified" | "basic" | "verified" | "expert" | "elite";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function VerificationIndicator({ level, showText = true, size = "md" }: VerificationIndicatorProps) {
  const levelConfig: Record<VerificationIndicatorProps["level"], {
    color: string;
    icon: React.ElementType;
    text: string;
    description: string;
  }> = {
    "unverified": {
      color: "text-gray-400 bg-gray-100",
      icon: Shield,
      text: "Unverified",
      description: "This provider has not completed the verification process"
    },
    "basic": {
      color: "text-blue-500 bg-blue-100",
      icon: Shield,
      text: "Basic Verification",
      description: "This provider has completed basic identity verification"
    },
    "verified": {
      color: "text-green-500 bg-green-100",
      icon: CheckCircle,
      text: "Verified Provider",
      description: "This provider's credentials and past work have been verified"
    },
    "expert": {
      color: "text-purple-500 bg-purple-100",
      icon: Award,
      text: "Expert Provider",
      description: "Recognized expert with validated security experience"
    },
    "elite": {
      color: "text-amber-500 bg-amber-100",
      icon: Award,
      text: "Elite Provider",
      description: "Top-tier security expert with exceptional track record"
    }
  };

  const sizeClasses = {
    sm: { icon: "h-5 w-5 p-1", text: "text-xs" },
    md: { icon: "h-7 w-7 p-1.5", text: "text-sm" },
    lg: { icon: "h-9 w-9 p-2", text: "text-base" }
  };

  const { color, icon: Icon, text, description } = levelConfig[level];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className={`rounded-full ${color} ${sizeClasses[size].icon}`}>
              <Icon className="h-full w-full" />
            </div>
            {showText && (
              <span className={`font-medium ${sizeClasses[size].text}`}>{text}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface TestimonialBadgeProps {
  clientName: string;
  projectName?: string;
  quote: string;
  rating: number; // 1-5
  avatarUrl?: string;
}

export function TestimonialBadge({ clientName, projectName, quote, rating, avatarUrl }: TestimonialBadgeProps) {
  return (
    <div className="relative bg-card border border-border/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 overflow-hidden flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={clientName} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-primary font-medium">
              {clientName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
              />
            ))}
          </div>
          
          <div className="text-sm font-medium">{clientName}</div>
          {projectName && <div className="text-xs text-muted-foreground">{projectName}</div>}
          
          <blockquote className="mt-2 text-sm italic">"{quote}"</blockquote>
        </div>
      </div>
    </div>
  );
}
