import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { SkipLink } from "@/components/ui/skip-link";
import { SEOOptimization } from "@/components/seo/SEOOptimization";

// Lazy load heavy components to improve initial page load
const IndexPageLayout = React.lazy(() => 
  import("@/components/home/index-page-layout").then(m => ({ default: m.IndexPageLayout }))
);

const SupportButtonEnhanced = React.lazy(() => 
  import("@/components/ui/support-button-enhanced").then(m => ({ default: m.SupportButtonEnhanced }))
);

// Enhanced loading fallback for better UX
const ComponentFallback = () => (
  <div className="min-h-screen p-6 space-y-4">
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-muted rounded-lg w-64 mx-auto" />
      <div className="h-4 bg-muted rounded w-full max-w-2xl mx-auto" />
      <div className="h-4 bg-muted rounded w-3/4 max-w-xl mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default function Index() {
  return (
    <StandardizedLayout
      title="Hawkly | Leading Web3 Security Marketplace"
      description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
      keywords="web3 security, smart contract audit, blockchain security, defi security, nft audit"
      showBreadcrumbs={false}
    >
      <SEOOptimization 
        type="website"
        title="Hawkly | Leading Web3 Security Marketplace"
        description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
        imageUrl="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
      />
      
      <SkipLink targetId="main-content" />
      
      <main id="main-content" className="flex-grow">
        <React.Suspense fallback={<ComponentFallback />}>
          <IndexPageLayout />
        </React.Suspense>
      </main>
      
      <React.Suspense fallback={null}>
        <SupportButtonEnhanced />
      </React.Suspense>
    </StandardizedLayout>
  );
}
