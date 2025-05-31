
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SupportButtonEnhanced } from "@/components/ui/support-button-enhanced";
import { SkipLink } from "@/components/ui/skip-link";
import { IndexPageLayout } from "@/components/home/index-page-layout";
import { useIndexPageAnalytics } from "@/components/home/index-page-analytics";
import { AdaptiveInterface } from "@/components/adaptive-interface";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

export default function Home() {
  useIndexPageAnalytics();

  return (
    <AccessibilityProvider>
      <Helmet>
        <title>Hawkly | Next-Generation Web3 Security Platform</title>
        <meta
          name="description"
          content="The leading Web3 security marketplace. AI-powered auditor matching, smart contract escrow, and continuous monitoring. Faster, more secure, more affordable than traditional audit firms."
        />
        <meta name="keywords" content="web3 security, smart contract audit, blockchain security, DeFi audit, NFT security, crypto audit" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <SkipLink targetId="main-content" />
        <Navbar />
        <main id="main-content">
          <AdaptiveInterface variant="full">
            <IndexPageLayout />
          </AdaptiveInterface>
        </main>
        <EnhancedFooter />
        <SupportButtonEnhanced />
      </div>
    </AccessibilityProvider>
  );
}
