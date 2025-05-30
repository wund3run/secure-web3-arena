
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EnhancedHeroSection } from '@/components/home/enhanced-hero-section';
import { FeaturesShowcase } from '@/components/home/features-showcase';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CTASection } from '@/components/home/cta-section';
import { MetaTags } from '@/components/seo/MetaTags';
import { PerformanceMonitor } from '@/components/monitoring/PerformanceMonitor';

export default function Index() {
  return (
    <>
      <MetaTags 
        title="Hawkly - Web3 Security Audits Platform"
        description="Connect with verified security auditors for comprehensive smart contract audits. AI-powered matching, transparent pricing, and expert verification."
        keywords="web3, security, audit, smart contracts, blockchain, defi, cryptocurrency, smart contract audit, security audit"
        url="https://hawkly.com"
      />
      
      <StandardLayout
        title="Web3 Security Audits"
        description="Connect with verified security auditors for comprehensive smart contract audits. AI-powered matching, transparent pricing, and expert verification."
      >
        <EnhancedHeroSection />
        <FeaturesShowcase />
        <TestimonialsSection />
        <CTASection />
        <PerformanceMonitor />
      </StandardLayout>
    </>
  );
}
