
import React from "react";
import { Shield, Bug, Award, Clock, Bell, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface AchievementBadgeProps {
  name: string;
  description: string;
  icon?: React.ElementType;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  size?: "sm" | "md" | "lg";
  earned?: boolean;
  progress?: number; // percentage from 0-100
  onClick?: () => void;
  className?: string;
}

export function AchievementBadge({
  name,
  description,
  icon: Icon = Shield,
  color = "text-indigo-500",
  bgColor = "bg-indigo-50",
  borderColor = "border-indigo-200",
  size = "md",
  earned = false,
  progress,
  onClick,
  className
}: AchievementBadgeProps) {
  
  // Size variants
  const sizeVariants = {
    sm: {
      badge: "p-2",
      icon: "h-4 w-4",
      name: "text-xs font-medium",
      description: "text-xs",
      iconContainer: "w-8 h-8"
    },
    md: {
      badge: "p-4",
      icon: "h-5 w-5",
      name: "text-sm font-medium",
      description: "text-xs",
      iconContainer: "w-10 h-10"
    },
    lg: {
      badge: "p-6",
      icon: "h-6 w-6",
      name: "text-base font-medium",
      description: "text-sm",
      iconContainer: "w-12 h-12"
    }
  };
  
  const variant = sizeVariants[size];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              `flex items-center rounded-lg border ${borderColor} ${bgColor} ${variant.badge}`,
              earned ? "opacity-100" : "opacity-70 grayscale",
              onClick && "cursor-pointer hover:shadow-md transition-all",
              className
            )}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
          >
            <div className={`flex items-center justify-center rounded-full bg-background/40 mr-4 ${variant.iconContainer}`}>
              <Icon className={`${color} ${variant.icon}`} />
            </div>
            <div>
              <div className={variant.name}>
                {name}
                {earned && <Check className="ml-1 h-3 w-3 inline text-green-500" />}
              </div>
              <div className={`text-muted-foreground ${variant.description}`}>{description}</div>
              
              {progress !== undefined && (
                <div className="mt-1.5 bg-gray-200 h-1 rounded-full w-full">
                  <div 
                    className="bg-primary h-1 rounded-full" 
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{earned ? "Earned" : "Not yet earned"}: {description}</p>
          {progress !== undefined && (
            <p className="text-xs mt-1">{progress}% complete</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Preset achievement badges
export const SmartContractProBadge = (props: Partial<AchievementBadgeProps>) => (
  <AchievementBadge
    name="Smart Contract Pro"
    description="Completed 50+ smart contract audits"
    icon={Shield}
    color="text-indigo-500"
    bgColor="bg-indigo-50"
    borderColor="border-indigo-200"
    {...props}
  />
);

export const BugHunterBadge = (props: Partial<AchievementBadgeProps>) => (
  <AchievementBadge
    name="Bug Hunter"
    description="Found 100+ critical vulnerabilities"
    icon={Bug}
    color="text-cyan-500"
    bgColor="bg-cyan-50"
    borderColor="border-cyan-200"
    {...props}
  />
);

export const FirstResponseBadge = (props: Partial<AchievementBadgeProps>) => (
  <AchievementBadge
    name="First Response"
    description="First to respond to critical security incidents"
    icon={Bell}
    color="text-rose-500"
    bgColor="bg-rose-50"
    borderColor="border-rose-200"
    {...props}
  />
);

export const FastResponderBadge = (props: Partial<AchievementBadgeProps>) => (
  <AchievementBadge
    name="Fast Responder"
    description="Average response time under 2 hours"
    icon={Clock}
    color="text-amber-500"
    bgColor="bg-amber-50"
    borderColor="border-amber-200"
    {...props}
  />
);

export const CommunityHelperBadge = (props: Partial<AchievementBadgeProps>) => (
  <AchievementBadge
    name="Community Helper"
    description="Answered 50+ questions in community forums"
    icon={Award}
    color="text-emerald-500"
    bgColor="bg-emerald-50"
    borderColor="border-emerald-200"
    {...props}
  />
);
