
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { EnhancedErrorBoundary } from "@/components/error/enhanced-error-boundary";

export default function Index() {
  return (
    <EnhancedErrorBoundary>
      <Helmet>
        <title>Hawkly | Next-Generation Web3 Security Platform</title>
        <meta
          name="description"
          content="The leading Web3 security marketplace. AI-powered auditor matching, smart contract escrow, and continuous monitoring."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <EnhancedErrorBoundary>
            <SimplifiedHero />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <ValuePropositionSection />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <TrustIndicators />
          </EnhancedErrorBoundary>
        </div>
        
        <EnhancedErrorBoundary>
          <EnhancedFooter />
        </EnhancedErrorBoundary>
      </div>
    </EnhancedErrorBoundary>
  );
}
