
import React, { useState, useEffect } from "react";
import { EnhancedSkeleton } from "./enhanced-skeleton";

interface LoadingTriviaProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  showTrivia?: boolean;
  fullPage?: boolean;
}

const securityTrivia = [
  "🔐 Did you know? Web3 smart contracts are immutable once deployed, making security audits crucial before launch.",
  "🛡️ Fun fact: The first major smart contract hack (The DAO) led to the creation of Ethereum Classic.",
  "🔍 Security tip: Always verify contract addresses before interacting with DeFi protocols.",
  "⚡ Pro tip: Gas optimization not only saves money but can also improve security by reducing attack surfaces.",
  "🌐 Web3 fact: Decentralized doesn't mean trustless - proper auditing ensures code reliability.",
];

export default function LoadingTrivia({
  message = "Loading...",
  size = "md",
  showTrivia = true,
  fullPage = false,
}: LoadingTriviaProps) {
  const [currentTrivia, setCurrentTrivia] = useState(0);

  useEffect(() => {
    if (!showTrivia) return;
    
    const interval = setInterval(() => {
      setCurrentTrivia((prev) => (prev + 1) % securityTrivia.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showTrivia]);

  const containerClasses = fullPage
    ? "flex flex-col items-center justify-center min-h-screen p-8"
    : "flex flex-col items-center justify-center py-8 px-4";

  const logoSizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4 max-w-md">
        <img 
          src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
          alt="Hawkly Logo"
          className={`${logoSizes[size]} object-contain bg-transparent animate-security-float`}
          style={{ backgroundColor: 'transparent' }}
        />
        
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        
        {message && (
          <p className="text-muted-foreground text-center text-sm font-medium">{message}</p>
        )}
        
        {showTrivia && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border text-center">
            <p className="text-xs text-muted-foreground font-medium transition-all duration-500 ease-in-out">
              {securityTrivia[currentTrivia]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
