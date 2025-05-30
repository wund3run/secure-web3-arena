
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EnhancedHeroSection } from '@/components/home/enhanced-hero-section';
import { FeaturesShowcase } from '@/components/home/features-showcase';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CTASection } from '@/components/home/cta-section';

export default function Index() {
  return (
    <StandardLayout
      title="Web3 Security Audits"
      description="Connect with verified security auditors for comprehensive smart contract audits. AI-powered matching, transparent pricing, and expert verification."
    >
      <EnhancedHeroSection />
      <FeaturesShowcase />
      <TestimonialsSection />
      <CTASection />
    </StandardLayout>
  );
}
