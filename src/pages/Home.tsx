
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/home/hero-section';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Hawkly - Web3 Security Marketplace</title>
        <meta name="description" content="Connect with top-tier security providers, streamline your audit process, and secure your blockchain projects." />
      </Helmet>
      
      <div className="container mx-auto">
        <HeroSection />
        {/* Add more home page sections here */}
      </div>
    </>
  );
}
