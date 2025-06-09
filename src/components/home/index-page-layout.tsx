
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { OptimizedRoute } from "@/components/performance/OptimizedRoute";
import { ProgressiveLoader } from "@/components/performance/ProgressiveLoader";

// Core journey components (loaded immediately)
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { UserJourneySection } from "@/components/home/user-journey-section";

// Lazy-loaded sections
import {
  FaqSection,
  QuickStartSection
} from "./index-page-sections";

// Enhanced loading fallback component
const SectionLoadingFallback = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} p-6`}>
    <EnhancedSkeleton variant="card" className="h-full w-full" />
  </div>
);

// Progressive loading stages for the homepage
const homePageStages = [
  {
    name: "Hero Section",
    component: SimplifiedHero,
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
    loadTime: 150
  },
  {
    name: "User Journey",
    component: UserJourneySection,
    loadTime: 100
  }
];

export function IndexPageLayout() {
  return (
    <OptimizedRoute
      title="Hawkly | Leading Web3 Security Marketplace"
      description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
      preloadRoutes={['/marketplace', '/request-audit', '/auth']}
    >
      <div className="flex-grow">
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
          <QuickStartSection />
        </LazySection>
        
        <LazySection 
          fallback={<SectionLoadingFallback height="h-80" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<SectionLoadingFallback height="h-80" />}>
            <FaqSection />
          </Suspense>
        </LazySection>
        
        {/* Trust indicators moved to the end with intelligent loading */}
        <LazySection 
          fallback={<SectionLoadingFallback height="h-32" />}
          threshold={0.2}
        >
          <TrustIndicators />
        </LazySection>
      </div>
    </OptimizedRoute>
  );
}
