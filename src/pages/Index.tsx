

import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SupportButton } from "@/components/ui/support-button";
import { LazySection } from "@/components/performance/LazySection";
import { analyticsTracker } from "@/utils/analytics-tracker";
import { performanceOptimizer } from "@/utils/performance-optimizer";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { bundleOptimizer } from "@/utils/bundle-optimizer";

// Core journey components (loaded immediately)
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";

// Lazy load heavy components with enhanced loading states
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

// Enhanced loading fallback component
const SectionLoadingFallback = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} p-6`}>
    <EnhancedSkeleton variant="card" animation="shimmer" className="h-full w-full" />
  </div>
);

export default function Index() {
  useEffect(() => {
    // Track page visit and initialize analytics
    analyticsTracker.track('home_page_visit', 'navigation', 'page_view');
    
    // Preload critical resources
    performanceOptimizer.preloadCriticalResources([
      '/src/assets/hawkly-logo.svg'
    ]);
    
    // Optimize images for lazy loading
    performanceOptimizer.optimizeImages();
    
    // Track user engagement
    const handleUserEngagement = () => {
      analyticsTracker.track('user_engagement', 'interaction', 'page_interaction');
    };
    
    // Track scroll engagement
    const handleScroll = () => {
      if (window.scrollY > 100) {
        analyticsTracker.track('scroll_engagement', 'engagement', 'deep_scroll');
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    document.addEventListener('click', handleUserEngagement, { once: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize intelligent route preloading based on user behavior
    bundleOptimizer.intelligentPreload('/');
    
    return () => {
      document.removeEventListener('click', handleUserEngagement);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Hawkly | Next-Generation Web3 Security Platform</title>
        <meta
          name="description"
          content="The leading Web3 security marketplace. AI-powered auditor matching, smart contract escrow, and continuous monitoring. Faster, more secure, more affordable than traditional audit firms."
        />
        <meta name="keywords" content="web3 security, smart contract audit, blockchain security, DeFi audit, NFT security, crypto audit" />
        
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
          <ValuePropositionSection />
          
          {/* Below-the-fold content - lazy loaded with enhanced loading states */}
          <LazySection fallback={<SectionLoadingFallback />}>
            <UserJourneySection />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback />}>
            <QuickStartSection />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback height="h-96" />}>
            <div id="demo">
              <InteractiveDemo />
            </div>
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback />}>
            <NetworkEffectsSection />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback />}>
            <MarketPositioning />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback height="h-80" />}>
            <PlatformFeaturesShowcase />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback />}>
            <StrategicPartnershipsSection />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback />}>
            <GlobalExpansionSection />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback />}>
            <CompetitiveAdvantages />
          </LazySection>
          
          <LazySection fallback={<SectionLoadingFallback height="h-80" />}>
            <FaqSection />
          </LazySection>
          
          {/* Trust indicators moved to the end */}
          <TrustIndicators />
        </div>
        
        <EnhancedFooter />
        <SupportButton />
      </div>
    </>
  );
}

