
import React, { useState, useEffect } from "react";
import { Loader, Shield, Lock, ShieldCheck, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingTriviaProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

// Concise security trivia items with decorative elements
const securityTrivia = [
  {
    title: "🔐 Reentrancy Protection",
    fact: "Always check-effects-interact to prevent reentrancy attacks.",
    icon: <Shield className="h-5 w-5 text-primary" />
  },
  {
    title: "🛡️ Hardware Security",
    fact: "Cold storage keeps crypto assets safe from online threats.",
    icon: <Lock className="h-5 w-5 text-primary" />
  },
  {
    title: "⚠️ Oracle Security",
    fact: "Multiple oracles prevent price manipulation vulnerabilities.",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />
  },
  {
    title: "🔑 Key Management",
    fact: "Multi-sig requires multiple approvals for enhanced security.",
    icon: <Key className="h-5 w-5 text-primary" />
  },
  {
    title: "🧩 Zero-Knowledge",
    fact: "ZK proofs verify without revealing sensitive information.",
    icon: <Shield className="h-5 w-5 text-primary" />
  },
  {
    title: "⛽ Gas Optimization",
    fact: "Efficient code reduces costs and prevents DOS attacks.",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />
  },
  {
    title: "🔍 Audit Essentials",
    fact: "Professional audits find 80% of critical vulnerabilities.",
    icon: <Lock className="h-5 w-5 text-primary" />
  },
  {
    title: "✅ Formal Verification",
    fact: "Mathematical proofs guarantee smart contract correctness.",
    icon: <Key className="h-5 w-5 text-primary" />
  },
  {
    title: "🚫 MEV Defense",
    fact: "Protection prevents front-running and transaction manipulation.",
    icon: <Shield className="h-5 w-5 text-primary" />
  },
  {
    title: "❄️ Cold Storage",
    fact: "Air-gapped solutions maximize protection against hackers.",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />
  }
];

const LoadingTrivia: React.FC<LoadingTriviaProps> = ({
  message = "Loading...",
  size = "md",
  fullPage = false,
}) => {
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0);

  // Rotate through trivia items every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTriviaIndex((prevIndex) => (prevIndex + 1) % securityTrivia.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);
  
  const currentTrivia = securityTrivia[currentTriviaIndex];
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  const containerClasses = fullPage
    ? "flex flex-col items-center justify-center min-h-screen p-4"
    : "flex flex-col items-center justify-center py-8 px-4";

  return (
    <div className={containerClasses}>
      <Loader className={`${sizeClasses[size]} animate-spin text-primary mb-4`} />
      <p className="text-muted-foreground mb-6 text-center">
        {message}
      </p>
      
      <Card className="max-w-md w-full bg-background/50 border-primary/20 mb-4 animate-pulse">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            {currentTrivia.icon}
            <h3 className="font-medium ml-2">Web3 Security Tip</h3>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{currentTrivia.title}</h4>
            <p className="text-sm text-muted-foreground">{currentTrivia.fact}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-1 mt-2">
        {securityTrivia.map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              index === currentTriviaIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingTrivia;
