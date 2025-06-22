
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { OptimizedRoute } from "@/components/performance/OptimizedRoute";
import { ProgressiveLoader } from "@/components/performance/ProgressiveLoader";
import { AdaptiveContentRenderer } from "@/components/home/adaptive-content-renderer";
import { SmartResourceManager } from "@/components/performance/SmartResourceManager";
import { IntelligentAnalytics } from "@/components/analytics/IntelligentAnalytics";

// New redesigned components
import { UnifiedHero } from "@/components/home/UnifiedHero";
import { TrustSection } from "@/components/home/TrustSection";
import { UserPaths } from "@/components/home/UserPaths";
import { ProcessVisualization } from "@/components/home/ProcessVisualization";
import { VisibleFAQ } from "@/components/home/VisibleFAQ";

// Lazy-loaded sections
import { QuickStartSection } from "./index-page-sections";

// Enhanced loading fallback component
const SectionLoadingFallback = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} p-6`}>
    <EnhancedSkeleton variant="card" className="h-full w-full" />
  </div>
);

// Progressive loading stages for the redesigned homepage
const homePageStages = [
  {
    name: "Unified Hero Section",
    component: UnifiedHero,
    loadTime: 50
  },
  {
    name: "Trust & Certifications", 
    component: TrustSection,
    loadTime: 100
  },
  {
    name: "User Path Selection",
    component: UserPaths,
    loadTime: 150
  },
  {
    name: "Process Visualization",
    component: ProcessVisualization,
    loadTime: 100
  },
  {
    name: "Visible FAQ",
    component: VisibleFAQ,
    loadTime: 100
  }
];

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
            {/* Core content with progressive loading */}
            <ProgressiveLoader 
              stages={homePageStages}
              className="space-y-0"
            />
            
            {/* Below-the-fold content - lazy loaded */}
            <LazySection 
              fallback={<SectionLoadingFallback />}
              threshold={0.1}
              rootMargin="200px"
            >
              <QuickStartSection />
            </LazySection>
          </div>
        </AdaptiveContentRenderer>
        
        {/* Development Analytics Dashboard */}
        <IntelligentAnalytics />
      </OptimizedRoute>
    </SmartResourceManager>
  );
}
