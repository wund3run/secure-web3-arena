
import React, { Suspense } from "react";
import { LazySection } from "@/components/performance/LazySection";
import { EnhancedSkeleton } from "@/components/ui/enhanced-skeleton";
import { OptimizedRoute } from "@/components/performance/OptimizedRoute";
import { ProgressiveLoader } from "@/components/performance/ProgressiveLoader";
import { AdaptiveContentRenderer } from "@/components/home/adaptive-content-renderer";
import { SmartResourceManager } from "@/components/performance/SmartResourceManager";
import { IntelligentAnalytics } from "@/components/analytics/IntelligentAnalytics";

// Fallback to existing components if new ones fail
import { UnifiedHero } from "@/components/home/UnifiedHero";
import { TrustSection } from "@/components/home/TrustSection";
import { UserPaths } from "@/components/home/UserPaths";
import { ProcessVisualization } from "@/components/home/ProcessVisualization";
import { VisibleFAQ } from "@/components/home/VisibleFAQ";

// Import existing hero as fallback
import { EnhancedHero } from "@/components/home/EnhancedHero";

// Lazy-loaded sections
import { QuickStartSection } from "./index-page-sections";

// Enhanced loading fallback component
const SectionLoadingFallback = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} p-6`}>
    <EnhancedSkeleton variant="card" className="h-full w-full" />
  </div>
);

// Safe component wrapper to catch individual component errors
const SafeComponent = ({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Component error:", error);
    return fallback || <div className="p-6 text-center text-muted-foreground">Section temporarily unavailable</div>;
  }
};

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
            {/* Core content with error boundaries for each section */}
            <SafeComponent fallback={<EnhancedHero />}>
              <UnifiedHero />
            </SafeComponent>
            
            <SafeComponent>
              <TrustSection />
            </SafeComponent>
            
            <SafeComponent>
              <UserPaths />
            </SafeComponent>
            
            <SafeComponent>
              <ProcessVisualization />
            </SafeComponent>
            
            <SafeComponent>
              <VisibleFAQ />
            </SafeComponent>
            
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
