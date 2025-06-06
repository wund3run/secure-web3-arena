
import React from "react";
import { Helmet } from "react-helmet-async";
import { SimplifiedNavbar } from "@/components/layout/simplified-navbar";
import { SkipLink } from "@/components/ui/skip-link";
import { BrowserRouter } from "react-router-dom";

// Lazy load heavy components
const EnhancedFooter = React.lazy(() => 
  import("@/components/home/enhanced-footer").then(m => ({ default: m.EnhancedFooter }))
);

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

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Leading Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
        />
        <meta name="keywords" content="web3 security, smart contract audit, blockchain security" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <SkipLink targetId="main-content" />
        <SimplifiedNavbar />
        
        <main id="main-content">
          <React.Suspense fallback={<ComponentFallback />}>
            <IndexPageLayout />
          </React.Suspense>
        </main>
        
        <React.Suspense fallback={<div className="h-20" />}>
          <EnhancedFooter />
        </React.Suspense>
        
        <React.Suspense fallback={null}>
          <SupportButtonEnhanced />
        </React.Suspense>
      </div>
    </>
  );
}
