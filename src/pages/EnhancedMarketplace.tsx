
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { ServiceMarketplace } from '@/components/marketplace/enhanced/ServiceMarketplace';

const EnhancedMarketplace = () => {
  return (
    <>
      <Helmet>
        <title>Enhanced Security Marketplace | Hawkly</title>
        <meta name="description" content="Discover and connect with top Web3 security experts and auditing services" />
      </Helmet>

      <ProductionLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Security Service Marketplace</h1>
            <p className="text-lg text-muted-foreground">
              Find verified security experts and auditing services for your Web3 project
            </p>
          </div>
          
          <ServiceMarketplace />
        </div>
      </ProductionLayout>
    </>
  );
};

export default EnhancedMarketplace;
