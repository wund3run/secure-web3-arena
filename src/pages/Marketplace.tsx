
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MarketplaceLayout } from '@/components/marketplace/layout/MarketplaceLayout';
import { EnhancedMarketplace } from '@/components/marketplace/EnhancedMarketplace';

const Marketplace = () => {
  return (
    <>
      <Helmet>
        <title>Security Auditor Marketplace | Hawkly</title>
        <meta name="description" content="Browse and connect with top Web3 security auditors. Find the perfect match for your smart contract audit needs." />
      </Helmet>
      
      <MarketplaceLayout>
        <EnhancedMarketplace />
      </MarketplaceLayout>
    </>
  );
};

export default Marketplace;
