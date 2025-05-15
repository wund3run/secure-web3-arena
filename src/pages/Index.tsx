
import React from "react";
import { Helmet } from "react-helmet-async";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { GamificationSection } from "@/components/home/gamification-section";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SkipLink } from "@/components/ui/skip-link";
import { MarketplaceHero } from "@/components/marketplace/sections/MarketplaceHero";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Connect with top security auditors and protect your blockchain project. Smart contract audits, bug bounties, and continuous security services."
        />
      </Helmet>
      <SkipLink targetId="main-content" />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-grow">
          {/* Featured Hero Section for the homepage */}
          <MarketplaceHero onShowOnboarding={() => {
            localStorage.setItem('hawkly_onboarding_completed', 'true');
            localStorage.setItem('marketplace-onboarding-completed', 'true');
          }} />
          
          <MarketplaceSection />
          
          <GamificationSection />
          <FaqSection />
        </main>
        <EnhancedFooter />
      </div>
    </>
  );
}
