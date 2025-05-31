import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SimplifiedNavbar } from '@/components/layout/simplified-navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { Testimonials } from '@/components/home/testimonials';
import { CallToAction } from '@/components/home/call-to-action';
import { EnhancedFooter } from '@/components/home/enhanced-footer';
import { PersonalizedWelcome } from '@/components/user-profiling/PersonalizedWelcome';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Hawkly | Premier Web3 Security Marketplace</title>
        <meta name="description" content="Connect with top Web3 security experts. Get your smart contracts audited by verified professionals or offer your security services to leading blockchain projects." />
      </Helmet>
      <div className="min-h-screen">
        <SimplifiedNavbar />
        <main>
          <div className="container mx-auto px-4 py-6">
            <PersonalizedWelcome />
          </div>
          <Hero />
          <Features />
          <Testimonials />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
