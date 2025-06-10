
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { OptimizedRoute } from "@/components/performance/OptimizedRoute";
import { ProgressiveLoader } from "@/components/performance/ProgressiveLoader";
import { AdaptiveContentRenderer } from "@/components/home/adaptive-content-renderer";
import { SmartResourceManager } from "@/components/performance/SmartResourceManager";
import { IntelligentAnalytics } from "@/components/analytics/IntelligentAnalytics";

// Core journey components (loaded immediately)
import { EnhancedHero } from "@/components/home/EnhancedHero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { UserJourneySection } from "@/components/home/user-journey-section";

// Lazy-loaded sections
import {
  FaqSection,
  QuickStartSection
} from "./index-page-sections";

// Enhanced loading fallback component with brand styling
const SectionLoadingFallback = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} p-6 animate-fade-in-up`}>
    <div className="card-enhanced h-full w-full">
      <div className="animate-brand-shimmer h-full rounded-lg bg-gradient-to-r from-brand-primary/5 via-brand-secondary/10 to-brand-primary/5" />
    </div>
  </div>
);

// Progressive loading stages for the homepage with brand enhancement
const homePageStages = [
  {
    name: "Enhanced Hero Section",
    component: EnhancedHero,
    loadTime: 50
  },
  {
    name: "Trust Indicators", 
    component: TrustIndicators,
    loadTime: 100
  },
  {
    name: "Value Proposition",
    component: ValuePropositionSection,
    loadTime: 150
  },
  {
    name: "How It Works",
    component: HowItWorksSection,
    loadTime: 100
  },
  {
    name: "User Journey",
    component: UserJourneySection,
    loadTime: 100
  }
];

export function IndexPageLayout() {
  return (
    <SmartResourceManager>
      <OptimizedRoute
        title="Hawkly | Leading Web3 Security Marketplace"
        description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
        preloadRoutes={['/marketplace', '/request-audit', '/auth']}
      >
        <AdaptiveContentRenderer>
          <div className="flex-grow bg-gradient-to-br from-background via-brand-primary/2 to-brand-secondary/2">
            {/* Core content with progressive loading */}
            <ProgressiveLoader 
              stages={homePageStages}
              className="space-y-0"
            />
            
            {/* Below-the-fold content - lazy loaded with enhanced loading states */}
            <LazySection 
              fallback={<SectionLoadingFallback />}
              threshold={0.1}
              rootMargin="200px"
            >
              <div className="section-brand-subtle">
                <QuickStartSection />
              </div>
            </LazySection>
            
            <LazySection 
              fallback={<SectionLoadingFallback height="h-80" />}
              threshold={0.1}
              rootMargin="100px"
            >
              <Suspense fallback={<SectionLoadingFallback height="h-80" />}>
                <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
                  <FaqSection />
                </div>
              </Suspense>
            </LazySection>
          </div>
        </AdaptiveContentRenderer>
        
        {/* Development Analytics Dashboard */}
        <IntelligentAnalytics />
      </OptimizedRoute>
    </SmartResourceManager>
  );
}
