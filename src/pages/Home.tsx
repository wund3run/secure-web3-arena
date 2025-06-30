
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { SkipLink } from "@/components/ui/skip-link";
import { EnhancedErrorBoundary } from "@/components/error-handling/EnhancedErrorBoundary";

// Simple fallback component that doesn't use router context
const ComponentFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

const SimpleHero = () => (
  <section className="py-20 text-center">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Hawkly</h1>
      <p className="text-xl text-muted-foreground">Leading Web3 Security Platform</p>
    </div>
  </section>
);

export default function Home() {
  return (
    <StandardizedLayout
      title="Hawkly | Leading Web3 Security Marketplace"
      description="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions."
      keywords={['web3 security', 'smart contract audit', 'blockchain security']}
      showBreadcrumbs={false}
    >
      <SkipLink targetId="main-content" />
      
      <main id="main-content">
        <EnhancedErrorBoundary fallback={<ComponentFallback />}>
          <SimpleHero />
        </EnhancedErrorBoundary>
      </main>
    </StandardizedLayout>
  );
}
