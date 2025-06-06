
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { LandingPageSEO } from "@/components/seo/SEOOptimization";
import { AccessibilityEnhancements } from "@/components/accessibility/AccessibilityEnhancements";
import { IndexPageLayout } from "@/components/home/index-page-layout";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useIndexPageAnalytics } from "@/components/home/index-page-analytics";

const Index = () => {
  useServiceWorker();
  useIndexPageAnalytics();

  const helpItems = [
    {
      title: "Getting Started",
      description: "Learn how to use Hawkly's security marketplace",
      type: "guide" as const,
      content: "Start by browsing our verified security auditors or request an audit for your project.",
      links: [
        { text: "Browse Auditors", url: "/marketplace" },
        { text: "Request Audit", url: "/request-audit" }
      ]
    },
    {
      title: "Security Best Practices",
      description: "Essential security tips for Web3 projects",
      type: "tip" as const,
      content: "Always conduct security audits before launching smart contracts in production.",
      links: [
        { text: "Learn More", url: "/resources" }
      ]
    }
  ];

  return (
    <>
      <LandingPageSEO 
        title="Web3 Security Marketplace - Find Verified Auditors"
        description="Connect with verified security experts for smart contract audits, code reviews, and blockchain security services. Secure your Web3 project with trusted professionals."
      />
      
      <StandardizedLayout
        title="Web3 Security Marketplace"
        description="Connect with verified security experts for comprehensive smart contract audits and blockchain security services"
        keywords={['web3 security', 'smart contract audit', 'blockchain security', 'cryptocurrency security', 'defi audit']}
        showBreadcrumbs={false}
        helpItems={helpItems}
        pageType="landing"
        className="relative overflow-hidden"
      >
        <IndexPageLayout />
        <AccessibilityEnhancements />
      </StandardizedLayout>
    </>
  );
};

export default Index;
