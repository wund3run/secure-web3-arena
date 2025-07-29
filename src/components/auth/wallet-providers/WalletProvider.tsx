
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";

interface WalletProviderProps {
  name: string;
  icon: React.ReactNode;
  chainType: string;
  onClick: () => void;
  isDetected?: boolean;
  isBeta?: boolean;
}

export function WalletProvider({ 
  name, 
  icon, 
  chainType, 
  onClick, 
  isDetected,
  isBeta = true 
}: WalletProviderProps) {
  return (
    <Button 
      variant="outline" 
      className={`w-full flex items-center justify-start h-auto py-4 px-4 mb-3 transition-all duration-200 ${
        isDetected ? "border-primary/30 bg-primary/5" : "hover:border-primary/50 hover:bg-primary/5"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className="text-left flex-1">
        <div className="flex items-center">
          <p className="font-medium">{name}</p>
          {isBeta && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="ml-2 text-[0.6rem] px-1 py-0 h-4 border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100">
                    BETA
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50 max-w-[250px] bg-white shadow-lg">
                  <p className="text-xs">This integration is in beta. Some features may not work as expected.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{chainType}</p>
      </div>
      {isDetected && (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          Detected
        </span>
      )}
    </Button>
  );
}
