
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SupportButton } from "@/components/ui/support-button";

// Core journey components
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { PricingPreview } from "@/components/home/pricing-preview";

// Strategic positioning components
import { MarketPositioning } from "@/components/home/market-positioning";
import { PlatformFeaturesShowcase } from "@/components/home/platform-features-showcase";
import { CompetitiveAdvantages } from "@/components/home/competitive-advantages";

// Enhanced user journey components
import { UserJourneySection } from "@/components/home/user-journey-section";
import { QuickStartSection } from "@/components/home/quick-start-section";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";

// Distribution scale strategy components
import { NetworkEffectsSection } from "@/components/home/network-effects-section";
import { StrategicPartnershipsSection } from "@/components/home/strategic-partnerships-section";
import { GlobalExpansionSection } from "@/components/home/global-expansion-section";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Next-Generation Web3 Security Platform</title>
        <meta
          name="description"
          content="The leading Web3 security marketplace. AI-powered auditor matching, smart contract escrow, and continuous monitoring. Faster, more secure, more affordable than traditional audit firms."
        />
        <meta name="keywords" content="web3 security, smart contract audit, blockchain security, DeFi audit, NFT security, crypto audit" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {/* Hero Section - Clear value prop with dual CTAs */}
          <SimplifiedHero />
          
          {/* Trust Building - Social proof early in the journey */}
          <TrustIndicators />
          
          {/* Value Proposition - What makes us different */}
          <ValuePropositionSection />
          
          {/* User Journey Paths - Clear separation for different user types */}
          <UserJourneySection />
          
          {/* Quick Start - Immediate action paths */}
          <QuickStartSection />
          
          {/* Interactive Demo - Show how it works */}
          <div id="demo">
            <InteractiveDemo />
          </div>
          
          {/* Distribution Scale Strategy - Network effects and growth */}
          <NetworkEffectsSection />
          
          {/* Market Positioning - Why choose us over competitors */}
          <MarketPositioning />
          
          {/* Platform Features - Technical differentiators */}
          <PlatformFeaturesShowcase />
          
          {/* Strategic Partnerships - Distribution channels */}
          <StrategicPartnershipsSection />
          
          {/* Global Expansion - Worldwide scale */}
          <GlobalExpansionSection />
          
          {/* Competitive Advantages - Detailed comparison */}
          <CompetitiveAdvantages />
          
          {/* Pricing Preview - Transparent cost structure */}
          <PricingPreview />
          
          {/* FAQ Section - Address common concerns */}
          <FaqSection />
        </div>
        <EnhancedFooter />
        
        {/* Live Chat/Support Widget */}
        <SupportButton />
      </div>
    </>
  );
}
