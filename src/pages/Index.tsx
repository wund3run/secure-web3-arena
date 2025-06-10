
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { SkipLink } from "@/components/ui/skip-link";
import { SEOOptimization } from "@/components/seo/SEOOptimization";
import { EnhancedHeroSection } from "@/components/home/enhanced-hero-section";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";

// Enhanced loading fallback
const ComponentFallback = () => (
  <div className="min-h-screen p-6 space-y-8">
    <div className="ui-animate-fadeInUp space-y-6">
      <div className="h-16 bg-gray-200 rounded-lg w-64 mx-auto ui-loading" />
      <div className="h-4 bg-gray-200 rounded w-full max-w-2xl mx-auto ui-loading" />
      <div className="h-4 bg-gray-200 rounded w-3/4 max-w-xl mx-auto ui-loading" />
      <div className="ui-grid ui-grid-3 mt-12 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg ui-loading" />
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
          {/* Enhanced Hero Section */}
          <EnhancedHeroSection />
          
          {/* Trust Indicators */}
          <section className="ui-section-compact bg-gray-50">
            <TrustIndicators />
          </section>
          
          {/* Value Proposition */}
          <section className="ui-section">
            <ValuePropositionSection />
          </section>
          
          {/* How It Works */}
          <section className="ui-section-compact bg-gray-50">
            <HowItWorksSection />
          </section>
        </React.Suspense>
      </main>
    </StandardizedLayout>
  );
}
