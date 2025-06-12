
import React from "react";
import { Helmet } from 'react-helmet-async';
import { SkipLink } from "@/components/ui/skip-link";
import { EnhancedErrorBoundary } from "@/components/error-handling/EnhancedErrorBoundary";

// Lazy load heavy components
const IndexPageLayout = React.lazy(() => 
  import("@/components/home/index-page-layout").then(m => ({ default: m.IndexPageLayout }))
);

const SupportButtonEnhanced = React.lazy(() => 
  import("@/components/ui/support-button-enhanced").then(m => ({ default: m.SupportButtonEnhanced }))
);

const ComponentFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Leading Web3 Security Marketplace</title>
        <meta 
          name="description" 
          content="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions." 
        />
        <meta 
          name="keywords" 
          content="web3 security, smart contract audit, blockchain security" 
        />
      </Helmet>

      <SkipLink targetId="main-content" />
      
      <main id="main-content">
        <EnhancedErrorBoundary>
          <React.Suspense fallback={<ComponentFallback />}>
            <IndexPageLayout />
          </React.Suspense>
        </EnhancedErrorBoundary>
      </main>
      
      <EnhancedErrorBoundary>
        <React.Suspense fallback={null}>
          <SupportButtonEnhanced />
        </React.Suspense>
      </EnhancedErrorBoundary>
    </>
  );
}
