
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { SecuritySection } from '@/components/home/SecuritySection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { StatsSection } from '@/components/home/StatsSection';
import { Navbar } from '@/components/layout/navbar';
import { EnhancedFooter } from '@/components/home/enhanced-footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hawkly - Premier Web3 Security Marketplace</title>
        <meta name="description" content="Connect with top-tier Web3 security auditors. Request audits, manage projects, and secure your blockchain applications with confidence." />
        <meta name="keywords" content="web3 security, smart contract audit, blockchain security, defi audit, crypto security" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <SecuritySection />
          <TestimonialsSection />
          <CTASection />
        </main>
        
        <EnhancedFooter />
      </div>
    </>
  );
};

export default Index;
