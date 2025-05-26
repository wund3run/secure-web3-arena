
import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SupportButton } from "@/components/ui/support-button";
import { LazySection } from "@/components/performance/LazySection";

// Core journey components (loaded immediately)
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";

// Lazy load heavy components
const InteractiveDemo = React.lazy(() => 
  import("@/components/home/interactive-demo").then(module => ({
    default: module.InteractiveDemo
  }))
);

const FaqSection = React.lazy(() => 
  import("@/components/home/faq-section").then(module => ({
    default: module.FaqSection
  }))
);

const UserJourneySection = React.lazy(() => 
  import("@/components/home/user-journey-section").then(module => ({
    default: module.UserJourneySection
  }))
);

const QuickStartSection = React.lazy(() => 
  import("@/components/home/quick-start-section").then(module => ({
    default: module.QuickStartSection
  }))
);

const PricingPreview = React.lazy(() => 
  import("@/components/home/pricing-preview").then(module => ({
    default: module.PricingPreview
  }))
);

const MarketPositioning = React.lazy(() => 
  import("@/components/home/market-positioning").then(module => ({
    default: module.MarketPositioning
  }))
);

const PlatformFeaturesShowcase = React.lazy(() => 
  import("@/components/home/platform-features-showcase").then(module => ({
    default: module.PlatformFeaturesShowcase
  }))
);

const CompetitiveAdvantages = React.lazy(() => 
  import("@/components/home/competitive-advantages").then(module => ({
    default: module.CompetitiveAdvantages
  }))
);

const NetworkEffectsSection = React.lazy(() => 
  import("@/components/home/network-effects-section").then(module => ({
    default: module.NetworkEffectsSection
  }))
);

const StrategicPartnershipsSection = React.lazy(() => 
  import("@/components/home/strategic-partnerships-section").then(module => ({
    default: module.StrategicPartnershipsSection
  }))
);

const GlobalExpansionSection = React.lazy(() => 
  import("@/components/home/global-expansion-section").then(module => ({
    default: module.GlobalExpansionSection
  }))
);

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
          {/* Above-the-fold content - loaded immediately */}
          <SimplifiedHero />
          <TrustIndicators />
          <ValuePropositionSection />
          
          {/* Below-the-fold content - lazy loaded */}
          <LazySection>
            <UserJourneySection />
          </LazySection>
          
          <LazySection>
            <QuickStartSection />
          </LazySection>
          
          <LazySection>
            <div id="demo">
              <InteractiveDemo />
            </div>
          </LazySection>
          
          <LazySection>
            <NetworkEffectsSection />
          </LazySection>
          
          <LazySection>
            <MarketPositioning />
          </LazySection>
          
          <LazySection>
            <PlatformFeaturesShowcase />
          </LazySection>
          
          <LazySection>
            <StrategicPartnershipsSection />
          </LazySection>
          
          <LazySection>
            <GlobalExpansionSection />
          </LazySection>
          
          <LazySection>
            <CompetitiveAdvantages />
          </LazySection>
          
          <LazySection>
            <PricingPreview />
          </LazySection>
          
          <LazySection>
            <FaqSection />
          </LazySection>
        </div>
        
        <EnhancedFooter />
        <SupportButton />
      </div>
    </>
  );
}
