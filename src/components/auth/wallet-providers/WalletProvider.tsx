
import React from "react";
import { Button } from "@/components/ui/button";

interface WalletProviderProps {
  name: string;
  icon: React.ReactNode;
  chainType: string;
  onClick: () => void;
  isDetected?: boolean;
}

export function WalletProvider({ name, icon, chainType, onClick, isDetected }: WalletProviderProps) {
  return (
    <Button 
      variant="outline" 
      className={`w-full flex items-center justify-start h-auto py-4 px-4 mb-3 ${
        isDetected ? "border-primary/30 bg-primary/5" : "hover:border-primary/50 hover:bg-primary/5"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className="text-left flex-1">
        <p className="font-medium">{name}</p>
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
