
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/hero-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { FeaturesSection } from "@/components/home/features-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { EnhancedFooter } from "@/components/layout/enhanced-footer";
import { UserOnboardingFlow } from "@/components/onboarding/user-onboarding-flow";
import { useAuth } from "@/contexts/auth";

const Index = () => {
  const { user, getUserType } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding for new users
  useEffect(() => {
    if (user) {
      const hasSeenOnboarding = localStorage.getItem(`onboarding-seen-${user.id}`);
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [user]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    if (user) {
      localStorage.setItem(`onboarding-seen-${user.id}`, 'true');
    }
  };

  const userType = user ? getUserType() : null;

  return (
    <>
      <Helmet>
        <title>Hawkly - Web3 Security Audit Platform</title>
        <meta 
          name="description" 
          content="Connect with top security experts for comprehensive Web3 audits. Secure your smart contracts with professional auditing services on the leading blockchain security platform." 
        />
        <meta name="keywords" content="Web3 security, smart contract audit, blockchain security, DeFi audit, crypto security" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Hawkly - Web3 Security Audit Platform" />
        <meta property="og:description" content="Connect with top security experts for comprehensive Web3 audits." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hawkly.com" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hawkly - Web3 Security Audit Platform" />
        <meta name="twitter:description" content="Connect with top security experts for comprehensive Web3 audits." />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hawkly",
            "description": "Web3 Security Audit Platform",
            "url": "https://hawkly.com",
            "logo": "https://hawkly.com/logo.png",
            "sameAs": [
              "https://twitter.com/hawkly",
              "https://github.com/hawkly"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <HeroSection />
        <MarketplaceSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <EnhancedFooter />
        
        {/* User Onboarding Flow */}
        <UserOnboardingFlow
          isOpen={showOnboarding}
          onClose={handleOnboardingClose}
          userType={userType === 'auditor' ? 'auditor' : userType === 'project_owner' ? 'project_owner' : null}
        />
      </div>
    </>
  );
};

export default Index;
