
import React from 'react';
import { AuditorCard } from './AuditorCard';
import { LoadingState } from '@/components/ui/loading-state';

interface AuditorGridProps {
  filters: any;
}

// Mock data for demonstration
const mockAuditors = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviewCount: 127,
    expertise: ['DeFi', 'Smart Contracts', 'Solidity'],
    blockchain: ['Ethereum', 'Polygon'],
    hourlyRate: 150,
    availability: 'Available',
    completedAudits: 89,
    experience: 5,
    location: 'San Francisco, CA',
    responseTime: '2 hours',
    bio: 'Senior blockchain security researcher with extensive experience in DeFi protocols and smart contract auditing.',
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: '/api/placeholder/100/100',
    rating: 4.8,
    reviewCount: 94,
    expertise: ['NFT', 'Gaming', 'Cross-chain'],
    blockchain: ['Ethereum', 'Solana'],
    hourlyRate: 125,
    availability: 'Available',
    completedAudits: 67,
    experience: 4,
    location: 'Toronto, Canada',
    responseTime: '1 hour',
    bio: 'Specialized in NFT marketplaces and gaming protocols. Former security engineer at major DeFi protocol.',
    verified: true
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviewCount: 156,
    expertise: ['DeFi', 'Yield Farming', 'AMM'],
    blockchain: ['Ethereum', 'Arbitrum', 'Optimism'],
    hourlyRate: 200,
    availability: 'Busy',
    completedAudits: 134,
    experience: 7,
    location: 'London, UK',
    responseTime: '4 hours',
    bio: 'Lead security auditor with deep expertise in automated market makers and yield farming protocols.',
    verified: true
  }
];

export function AuditorGrid({ filters }: AuditorGridProps) {
  const [loading, setLoading] = React.useState(false);
  const [auditors] = React.useState(mockAuditors);

  // Filter auditors based on the filters
  const filteredAuditors = auditors.filter(auditor => {
    if (filters.blockchain && !auditor.blockchain.some(b => b.toLowerCase().includes(filters.blockchain.toLowerCase()))) {
      return false;
    }
    if (filters.expertise && !auditor.expertise.some(e => e.toLowerCase().includes(filters.expertise.toLowerCase()))) {
      return false;
    }
    if (filters.rating && auditor.rating < filters.rating) {
      return false;
    }
    if (filters.priceRange && (auditor.hourlyRate < filters.priceRange[0] || auditor.hourlyRate > filters.priceRange[1])) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <LoadingState message="Loading auditors..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {filteredAuditors.length} Auditor{filteredAuditors.length !== 1 ? 's' : ''} Found
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAuditors.map((auditor) => (
          <AuditorCard key={auditor.id} auditor={auditor} />
        ))}
      </div>

      {filteredAuditors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No auditors match your current filters. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
