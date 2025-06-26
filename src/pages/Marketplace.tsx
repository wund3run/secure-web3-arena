
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MarketplaceProvider } from '@/contexts/marketplace/MarketplaceContext';
import { MarketplaceErrorBoundary } from '@/components/marketplace/error-handling/MarketplaceErrorBoundary';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { ProjectListings } from '@/components/marketplace/ProjectListings';
import { RecommendedAuditors } from '@/components/marketplace/RecommendedAuditors';
import { SERVICES } from '@/data/marketplace-data';

export default function Marketplace() {
  return (
    <>
      <Helmet>
        <title>Marketplace | Hawkly</title>
        <meta name="description" content="Find security auditors and audit projects in the Web3 marketplace" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <MarketplaceProvider services={SERVICES}>
            <MarketplaceErrorBoundary>
              <div className="container mx-auto px-4">
                <MarketplaceHeader />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-1">
                    <MarketplaceFilters />
                  </div>
                  <div className="lg:col-span-2">
                    <ProjectListings />
                  </div>
                  <div className="lg:col-span-1">
                    <RecommendedAuditors />
                  </div>
                </div>
              </div>
            </MarketplaceErrorBoundary>
          </MarketplaceProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}
