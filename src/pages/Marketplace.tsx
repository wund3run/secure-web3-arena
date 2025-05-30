
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { AuditorCard } from '@/components/marketplace/AuditorCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Mock data for auditors
const mockAuditors = [
  {
    id: '1',
    name: 'Alice Security',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: { min: 150, max: 300 },
    experience: 8,
    specializations: ['Smart Contract Auditing', 'DeFi Protocols', 'NFT Security'],
    availability: 'available' as const,
    completedAudits: 89,
    verified: true,
    responseTime: 2,
    bio: 'Expert smart contract auditor with 8+ years in blockchain security. Specialized in DeFi protocols and complex multi-signature systems.'
  },
  {
    id: '2',
    name: 'CryptoSecure Labs',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto',
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: { min: 200, max: 450 },
    experience: 12,
    specializations: ['Layer 2 Solutions', 'Cross-chain Security', 'Governance'],
    availability: 'busy' as const,
    completedAudits: 156,
    verified: true,
    responseTime: 4,
    bio: 'Leading blockchain security firm with expertise in complex protocol audits and security architecture reviews.'
  },
  {
    id: '3',
    name: 'Bob Auditor',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: { min: 100, max: 200 },
    experience: 5,
    specializations: ['Smart Contracts', 'Solidity', 'Gas Optimization'],
    availability: 'available' as const,
    completedAudits: 67,
    verified: true,
    responseTime: 6,
    bio: 'Experienced Solidity developer turned security auditor. Focus on gas optimization and smart contract best practices.'
  },
  {
    id: '4',
    name: 'Elena Blockchain',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    rating: 4.9,
    reviewCount: 167,
    hourlyRate: { min: 180, max: 350 },
    experience: 10,
    specializations: ['Multi-chain', 'Bridge Security', 'Tokenomics'],
    availability: 'available' as const,
    completedAudits: 134,
    verified: true,
    responseTime: 3,
    bio: 'Multi-chain security specialist with deep expertise in cross-chain bridge security and tokenomics analysis.'
  },
  {
    id: '5',
    name: 'SecureChain Co',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=secure',
    rating: 4.6,
    reviewCount: 145,
    hourlyRate: { min: 120, max: 280 },
    experience: 7,
    specializations: ['DApp Security', 'Frontend Security', 'API Security'],
    availability: 'unavailable' as const,
    completedAudits: 98,
    verified: false,
    responseTime: 8,
    bio: 'Full-stack blockchain security team specializing in end-to-end DApp security including frontend and API vulnerabilities.'
  },
  {
    id: '6',
    name: 'Marcus Web3',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    rating: 4.8,
    reviewCount: 76,
    hourlyRate: { min: 160, max: 320 },
    experience: 6,
    specializations: ['MEV Protection', 'Flash Loan Security', 'Arbitrage'],
    availability: 'available' as const,
    completedAudits: 54,
    verified: true,
    responseTime: 5,
    bio: 'MEV and flash loan security expert with deep understanding of DeFi exploit vectors and protection mechanisms.'
  }
];

const Marketplace = () => {
  const [auditors, setAuditors] = useState(mockAuditors);
  const [filteredAuditors, setFilteredAuditors] = useState(mockAuditors);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');

  const auditorsPerPage = 12;

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, searchTerm, sortBy, auditors]);

  const applyFiltersAndSort = () => {
    let filtered = [...auditors];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(auditor =>
        auditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auditor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auditor.specializations.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(auditor =>
        auditor.hourlyRate.min >= filters.priceRange[0] &&
        auditor.hourlyRate.max <= filters.priceRange[1]
      );
    }

    // Apply blockchain filter
    if (filters.blockchains && filters.blockchains.length > 0) {
      filtered = filtered.filter(auditor =>
        filters.blockchains.some((blockchain: string) =>
          auditor.specializations.some(spec =>
            spec.toLowerCase().includes(blockchain.toLowerCase())
          )
        )
      );
    }

    // Apply experience filter
    if (filters.experience) {
      const expMap: { [key: string]: [number, number] } = {
        'entry': [1, 3],
        'mid': [3, 7],
        'senior': [7, 10],
        'expert': [10, 100]
      };
      const [minExp, maxExp] = expMap[filters.experience] || [0, 100];
      filtered = filtered.filter(auditor =>
        auditor.experience >= minExp && auditor.experience <= maxExp
      );
    }

    // Apply availability filter
    if (filters.availability && filters.availability !== 'any') {
      filtered = filtered.filter(auditor =>
        auditor.availability === filters.availability
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(auditor =>
        auditor.rating >= parseFloat(filters.rating)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.hourlyRate.min - b.hourlyRate.min;
        case 'price-high':
          return b.hourlyRate.max - a.hourlyRate.max;
        case 'experience':
          return b.experience - a.experience;
        case 'available':
          const availabilityOrder = { 'available': 3, 'busy': 2, 'unavailable': 1 };
          return availabilityOrder[b.availability] - availabilityOrder[a.availability];
        default:
          return 0;
      }
    });

    setFilteredAuditors(filtered);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const paginatedAuditors = filteredAuditors.slice(
    (currentPage - 1) * auditorsPerPage,
    currentPage * auditorsPerPage
  );

  const totalPages = Math.ceil(filteredAuditors.length / auditorsPerPage);

  return (
    <>
      <Helmet>
        <title>Marketplace | Hawkly</title>
        <meta name="description" content="Connect with verified Web3 security auditors" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-8">
            <MarketplaceHeader
              totalAuditors={filteredAuditors.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <MarketplaceFilters
                  onFiltersChange={handleFiltersChange}
                  onSearchChange={handleSearchChange}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <>
                    {/* Auditors Grid/List */}
                    <div className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }>
                      {paginatedAuditors.map((auditor) => (
                        <AuditorCard key={auditor.id} auditor={auditor} />
                      ))}
                    </div>

                    {/* Empty State */}
                    {filteredAuditors.length === 0 && (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">No auditors found</h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your filters or search terms
                        </p>
                        <Button onClick={() => {
                          setFilters({});
                          setSearchTerm('');
                        }}>
                          Clear Filters
                        </Button>
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-muted-foreground px-4">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Marketplace;
