
import React from "react";
import { Helmet } from "react-helmet-async";
import { SimplifiedNavbar } from "@/components/layout/simplified-navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { CompetitiveAdvantages } from "@/components/home/competitive-advantages";
import { PricingPreview } from "@/components/home/pricing-preview";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedErrorBoundary } from "@/components/error/enhanced-error-boundary";

export default function Index() {
  return (
    <EnhancedErrorBoundary>
      <Helmet>
        <title>Hawkly | Next-Generation Web3 Security Platform - Secure Your Projects in 2 Hours</title>
        <meta
          name="description"
          content="The world's fastest Web3 security marketplace. Get matched with expert auditors instantly, pay securely through smart contracts, and protect your project before launch. 500+ verified auditors, $350M+ assets protected."
        />
        <meta name="keywords" content="Web3 security, smart contract audit, blockchain security, crypto audit, DeFi security, NFT audit, security experts" />
        <meta property="og:title" content="Hawkly | Secure Your Web3 Project in Under 2 Hours" />
        <meta property="og:description" content="Connect with expert auditors to protect your blockchain applications from critical vulnerabilities. Trusted by 500+ Web3 projects worldwide." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hawkly | Next-Generation Web3 Security Platform" />
        <meta name="twitter:description" content="The world's fastest Web3 security marketplace. Get your project audited by expert security professionals." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <SimplifiedNavbar />
        <div className="flex-grow">
          <EnhancedErrorBoundary>
            <SimplifiedHero />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <TrustIndicators />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <ValuePropositionSection />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <InteractiveDemo />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <MarketplaceSection />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <CompetitiveAdvantages />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <PricingPreview />
          </EnhancedErrorBoundary>
          
          <EnhancedErrorBoundary>
            <FaqSection />
          </EnhancedErrorBoundary>
        </div>
        
        <EnhancedErrorBoundary>
          <EnhancedFooter />
        </EnhancedErrorBoundary>
      </div>
    </EnhancedErrorBoundary>
  );
}
