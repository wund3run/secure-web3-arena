
import React from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { EnhancedMarketplaceGrid } from '@/components/marketplace/enhanced-marketplace-grid';

// Mock data - replace with real API data
const mockServices = [
  {
    id: '1',
    title: 'Smart Contract Security Audit',
    description: 'Comprehensive security analysis for DeFi protocols with detailed vulnerability assessment and recommendations.',
    provider: {
      name: 'John Smith',
      rating: 4.9,
      reviewCount: 127,
      verified: true,
      location: 'San Francisco, CA'
    },
    priceRange: {
      min: 5000,
      max: 15000,
      currency: 'USD'
    },
    deliveryTime: 7,
    category: 'Smart Contract Audit',
    tags: ['DeFi', 'Solidity', 'Security'],
    featured: true,
    blockchainEcosystems: ['Ethereum', 'Polygon']
  },
  {
    id: '2',
    title: 'Full Stack Web3 Security Review',
    description: 'End-to-end security assessment covering smart contracts, frontend, and backend infrastructure.',
    provider: {
      name: 'Alice Johnson',
      rating: 4.8,
      reviewCount: 89,
      verified: true,
      location: 'New York, NY'
    },
    priceRange: {
      min: 8000,
      max: 25000,
      currency: 'USD'
    },
    deliveryTime: 14,
    category: 'Full Stack Audit',
    tags: ['Web3', 'Frontend', 'Backend'],
    featured: false,
    blockchainEcosystems: ['Ethereum', 'BSC', 'Arbitrum']
  },
  {
    id: '3',
    title: 'NFT Collection Security Audit',
    description: 'Specialized security audit for NFT smart contracts with focus on minting, trading, and royalty mechanisms.',
    provider: {
      name: 'Mike Chen',
      rating: 4.7,
      reviewCount: 56,
      verified: true,
      location: 'Singapore'
    },
    priceRange: {
      min: 3000,
      max: 10000,
      currency: 'USD'
    },
    deliveryTime: 5,
    category: 'NFT Audit',
    tags: ['NFT', 'ERC-721', 'ERC-1155'],
    featured: false,
    blockchainEcosystems: ['Ethereum', 'Polygon', 'Solana']
  }
];

const Marketplace = () => {
  return (
    <StandardizedLayout
      title="Web3 Security Marketplace - Find Expert Auditors"
      description="Connect with verified security experts for comprehensive smart contract audits and Web3 security services."
    >
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Security Marketplace
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find expert auditors and security specialists for your Web3 projects. 
              Get comprehensive security audits from verified professionals.
            </p>
          </div>

          <EnhancedMarketplaceGrid services={mockServices} />
        </div>
      </div>
    </StandardizedLayout>
  );
};

export default Marketplace;
