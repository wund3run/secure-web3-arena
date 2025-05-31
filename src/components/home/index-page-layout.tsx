
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";

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
    <EnhancedSkeleton variant="card" animation="shimmer" className="h-full w-full" />
  </div>
);

export function IndexPageLayout() {
  return (
    <div className="flex-grow">
      {/* Above-the-fold content - loaded immediately */}
      <SimplifiedHero />
      
      {/* Value proposition section */}
      <ValuePropositionSection />
      
      {/* How it works section */}
      <HowItWorksSection />
      
      {/* User journey section - Choose Your Path */}
      <UserJourneySection />
      
      {/* Below-the-fold content - lazy loaded with enhanced loading states */}
      <LazySection fallback={<SectionLoadingFallback />}>
        <QuickStartSection />
      </LazySection>
      
      <LazySection fallback={<SectionLoadingFallback height="h-80" />}>
        <Suspense fallback={<SectionLoadingFallback height="h-80" />}>
          <FaqSection />
        </Suspense>
      </LazySection>
      
      {/* Trust indicators moved to the end */}
      <TrustIndicators />
    </div>
  );
}
