
import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SupportButton } from "@/components/ui/support-button";
import { LazySection } from "@/components/performance/LazySection";
import { analyticsTracker } from "@/utils/analytics-tracker";
import { bundleOptimizer } from "@/utils/bundle-optimizer";

// Core journey components (loaded immediately)
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";

// Lazy load components with minimal loading states
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

const PricingPreview2025 = React.lazy(() => 
  import("@/components/home/pricing-preview-2025").then(module => ({
    default: module.PricingPreview2025
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

// Minimal loading fallback
const QuickLoader = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import { PersonalizationEngine } from "@/components/personalization/PersonalizationEngine";

export default function Index() {
  useEffect(() => {
    // Minimal analytics tracking
    analyticsTracker.track('home_page_visit', 'navigation', 'page_view');
    
    // Aggressive route preloading for instant navigation
    bundleOptimizer.intelligentPreload('/');
    
    // Preload likely next routes immediately
    setTimeout(() => {
      bundleOptimizer.preloadRoute('/marketplace');
      bundleOptimizer.preloadRoute('/dashboard');
    }, 100);
    
  }, []);

  return (
    <>
      <Helmet>
        <title>Hawkly | Revolutionary Web3 Security Platform 2025</title>
        <meta
          name="description"
          content="The next-generation Web3 security marketplace. AI-enhanced auditor matching, smart contract escrow, and continuous monitoring. 70% more affordable, 80% faster than traditional audit firms."
        />
        <meta name="keywords" content="web3 security 2025, smart contract audit, AI security, blockchain audit, DeFi security, NFT audit, crypto security" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {/* Above-the-fold content - loaded immediately */}
          <SimplifiedHero />
          <TrustIndicators />
          <ValuePropositionSection />
          
          {/* Personalization Engine - loaded eagerly */}
          <LazySection fallback={<QuickLoader />} eager>
            <div className="container mx-auto px-4 py-8">
              <PersonalizationEngine />
            </div>
          </LazySection>
          
          {/* Below-the-fold content - lazy loaded with faster thresholds */}
          <LazySection fallback={<QuickLoader />}>
            <UserJourneySection />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <QuickStartSection />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <div id="demo">
              <InteractiveDemo />
            </div>
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <NetworkEffectsSection />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <MarketPositioning />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <PlatformFeaturesShowcase />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <StrategicPartnershipsSection />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <GlobalExpansionSection />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <CompetitiveAdvantages />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <PricingPreview2025 />
          </LazySection>
          
          <LazySection fallback={<QuickLoader />}>
            <FaqSection />
          </LazySection>
        </div>
        
        <EnhancedFooter />
        <SupportButton />
      </div>
    </>
  );
}
