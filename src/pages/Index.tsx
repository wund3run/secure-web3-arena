
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

// Minimal loading fallback for lazy components
const ComponentFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-neutral-300 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

export default function Index() {
  return (
    <StandardizedLayout
      title="Hawkly | Leading Web3 Security Marketplace"
      description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
      keywords="web3 security, smart contract audit, blockchain security"
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
