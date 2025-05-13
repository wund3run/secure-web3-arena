
import React, { useState, useEffect } from "react";
import { Loader, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingTriviaProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

// Web3 security trivia items to display during loading
const securityTrivia = [
  {
    title: "Smart Contract Reentrancy",
    fact: "Reentrancy attacks occur when external contract calls allow attackers to re-enter the calling contract before the first execution is complete, potentially leading to multiple withdrawals."
  },
  {
    title: "Hardware Wallets",
    fact: "Hardware wallets are considered one of the most secure ways to store cryptocurrency as they keep your private keys offline, away from potential online threats."
  },
  {
    title: "Oracle Manipulation",
    fact: "Oracle manipulation attacks target the data feeds that smart contracts rely on, potentially allowing attackers to profit from price discrepancies."
  },
  {
    title: "Multi-Signature Wallets",
    fact: "Multi-signature wallets require multiple private keys to authorize a transaction, adding an extra layer of security for high-value accounts and DAOs."
  },
  {
    title: "Zero-Knowledge Proofs",
    fact: "Zero-knowledge proofs allow one party to prove to another that they know a value without conveying any information apart from the fact that they know the value."
  },
  {
    title: "Gas Optimization",
    fact: "Proper gas optimization not only reduces transaction costs but also mitigates the risk of denial-of-service attacks by preventing excessive computational requirements."
  },
  {
    title: "Security Audits",
    fact: "Professional security audits can identify up to 80% of critical vulnerabilities in smart contract code before deployment."
  },
  {
    title: "Formal Verification",
    fact: "Formal verification mathematically proves the correctness of smart contracts against their specifications, offering stronger security guarantees than traditional testing."
  },
  {
    title: "MEV Protection",
    fact: "Maximal Extractable Value (MEV) protection helps prevent front-running and transaction reordering attacks in DeFi applications."
  },
  {
    title: "Cold Storage",
    fact: "Cold storage solutions keep private keys entirely offline and air-gapped, providing maximum protection against online hacking attempts."
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
            <Shield className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">Web3 Security Trivia</h3>
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
