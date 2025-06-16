
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { SkipLink } from "@/components/ui/skip-link";
import { EnhancedErrorBoundary } from "@/components/error-handling/EnhancedErrorBoundary";
import { NavigationOptimizer } from "@/components/layout/navigation/NavigationOptimizer";
import { TrustBuildingHero } from "@/components/home/TrustBuildingHero";

// Lazy load heavy components
const SupportButtonEnhanced = React.lazy(() => 
  import("@/components/ui/support-button-enhanced").then(m => ({ default: m.SupportButtonEnhanced }))
);

const ComponentFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <NavigationOptimizer>
      <StandardizedLayout
        title="Hawkly | Leading Web3 Security Marketplace"
        description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
        keywords="web3 security, smart contract audit, blockchain security"
        showBreadcrumbs={false}
      >
        <SkipLink targetId="main-content" />
        
        <main id="main-content">
          <EnhancedErrorBoundary>
            <TrustBuildingHero />
          </EnhancedErrorBoundary>
        </main>
        
        <EnhancedErrorBoundary>
          <React.Suspense fallback={null}>
            <SupportButtonEnhanced />
          </React.Suspense>
        </EnhancedErrorBoundary>
      </StandardizedLayout>
    </NavigationOptimizer>
  );
}
