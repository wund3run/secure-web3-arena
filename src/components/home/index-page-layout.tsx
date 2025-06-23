
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { OptimizedRoute } from "@/components/performance/OptimizedRoute";
import { AdaptiveContentRenderer } from "@/components/home/adaptive-content-renderer";
import { SmartResourceManager } from "@/components/performance/SmartResourceManager";
import { IntelligentAnalytics } from "@/components/analytics/IntelligentAnalytics";
import { SimpleErrorBoundary } from "@/components/home/SimpleErrorBoundary";

// Core components
import { UnifiedHero } from "@/components/home/UnifiedHero";
import { TrustSection } from "@/components/home/TrustSection";
import { UserPaths } from "@/components/home/UserPaths";
import { ProcessVisualization } from "@/components/home/ProcessVisualization";
import { VisibleFAQ } from "@/components/home/VisibleFAQ";

// Fallback hero
import { EnhancedHero } from "@/components/home/EnhancedHero";

// Lazy-loaded sections
import { QuickStartSection } from "./index-page-sections";

// Enhanced loading fallback component
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
            {/* Core content with simple error boundaries */}
            <SimpleErrorBoundary fallback={<EnhancedHero />}>
              <UnifiedHero />
            </SimpleErrorBoundary>
            
            <SimpleErrorBoundary>
              <TrustSection />
            </SimpleErrorBoundary>
            
            <SimpleErrorBoundary>
              <UserPaths />
            </SimpleErrorBoundary>
            
            <SimpleErrorBoundary>
              <ProcessVisualization />
            </SimpleErrorBoundary>
            
            <SimpleErrorBoundary>
              <VisibleFAQ />
            </SimpleErrorBoundary>
            
            {/* Below-the-fold content - lazy loaded */}
            <LazySection 
              fallback={<SectionLoadingFallback />}
              threshold={0.1}
              rootMargin="200px"
            >
              <SimpleErrorBoundary>
                <QuickStartSection />
              </SimpleErrorBoundary>
            </LazySection>
          </div>
        </AdaptiveContentRenderer>
        
        {/* Development Analytics Dashboard */}
        <SimpleErrorBoundary>
          <IntelligentAnalytics />
        </SimpleErrorBoundary>
      </OptimizedRoute>
    </SmartResourceManager>
  );
}
