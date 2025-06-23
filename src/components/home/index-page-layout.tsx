
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { OptimizedRoute } from "@/components/performance/OptimizedRoute";
import { AdaptiveContentRenderer } from "@/components/home/adaptive-content-renderer";
import { SmartResourceManager } from "@/components/performance/SmartResourceManager";
import { IntelligentAnalytics } from "@/components/analytics/IntelligentAnalytics";
import { SimpleErrorBoundary } from "@/components/home/SimpleErrorBoundary";
import { ProgressiveLoader } from "@/components/home/ProgressiveLoader";

// Core components with fallbacks
import { UnifiedHero } from "@/components/home/UnifiedHero";
import { ProcessVisualization } from "@/components/home/ProcessVisualization";
import { VisibleFAQ } from "@/components/home/VisibleFAQ";
import { OptimizedTrustSection } from "@/components/home/OptimizedTrustSection";
import { UserPaths } from "@/components/home/UserPaths";

// Fallback components
import { HeroFallback, TrustFallback, ProcessFallback, ErrorFallback } from "@/components/home/FallbackComponents";

// Lazy-loaded sections
import { QuickStartSection } from "./index-page-sections";

const SectionLoadingFallback = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} p-6`}>
    <EnhancedSkeleton variant="card" className="h-full w-full" />
  </div>
);

export function IndexPageLayout() {
  return (
    <SmartResourceManager>
      <OptimizedRoute
        title="Hawkly | Secure Your Web3 Project in Days, Not Months"
        description="Connect with verified security experts for fast, comprehensive smart contract audits. AI-powered matching, transparent pricing, guaranteed results."
        preloadRoutes={['/marketplace', '/request-audit', '/auth']}
      >
        <AdaptiveContentRenderer>
          <div className="flex-grow">
            {/* Critical above-the-fold content - loads immediately */}
            <ProgressiveLoader priority="high" fallback={<HeroFallback />}>
              <SimpleErrorBoundary fallback={<HeroFallback />}>
                <UnifiedHero />
              </SimpleErrorBoundary>
            </ProgressiveLoader>
            
            {/* Secondary content - loads with short delay */}
            <ProgressiveLoader delay={100} fallback={<TrustFallback />}>
              <SimpleErrorBoundary fallback={<TrustFallback />}>
                <OptimizedTrustSection />
              </SimpleErrorBoundary>
            </ProgressiveLoader>
            
            {/* Tertiary content - loads progressively */}
            <ProgressiveLoader delay={300} priority="medium">
              <SimpleErrorBoundary fallback={<ErrorFallback />}>
                <UserPaths />
              </SimpleErrorBoundary>
            </ProgressiveLoader>
            
            <ProgressiveLoader delay={500} fallback={<ProcessFallback />}>
              <SimpleErrorBoundary fallback={<ProcessFallback />}>
                <ProcessVisualization />
              </SimpleErrorBoundary>
            </ProgressiveLoader>
            
            <ProgressiveLoader delay={700} priority="low">
              <SimpleErrorBoundary fallback={<ErrorFallback />}>
                <VisibleFAQ />
              </SimpleErrorBoundary>
            </ProgressiveLoader>
            
            {/* Below-the-fold content - lazy loaded with intersection observer */}
            <LazySection 
              fallback={<SectionLoadingFallback />}
              threshold={0.1}
              rootMargin="200px"
            >
              <SimpleErrorBoundary fallback={<ErrorFallback />}>
                <QuickStartSection />
              </SimpleErrorBoundary>
            </LazySection>
          </div>
        </AdaptiveContentRenderer>
        
        {/* Analytics - loads last and handles failures gracefully */}
        <ProgressiveLoader delay={1000} priority="low" fallback={null}>
          <SimpleErrorBoundary fallback={null}>
            <IntelligentAnalytics />
          </SimpleErrorBoundary>
        </ProgressiveLoader>
      </OptimizedRoute>
    </SmartResourceManager>
  );
}
