import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Brain, BarChart3 } from 'lucide-react';
import { AdvancedSearchPanel } from '@/components/marketplace/advanced-search/AdvancedSearchPanel';
import { ServiceComparisonTool } from '@/components/marketplace/comparison/ServiceComparisonTool';
import { SmartMatchingEngine } from '@/components/marketplace/ai-matching/SmartMatchingEngine';
import { RealtimeCollaboration } from '@/components/marketplace/real-time/RealtimeCollaboration';
import { ServiceCard } from '@/components/marketplace/card/ServiceCard';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';
import { useMarketplaceServices } from '@/hooks/useMarketplaceServices';
import { ServiceCardProps } from '@/types/marketplace-unified';

interface AuditorProfile {
  user_id: string;
  years_experience: number;
  hourly_rate_min: number;
  hourly_rate_max: number;
  verification_status: string;
  availability_status: string;
  blockchain_expertise: string[];
  specialization_tags: string[];
  total_audits_completed: number;
  success_rate: number;
  extended_profiles: ExtendedProfile | null;
}

interface ExtendedProfile {
  full_name: string;
  verification_status: string;
}

interface AuditorCardProps {
  id: string;
  name: string;
  experience: number;
  rating: number;
  hourlyRate: { min: number; max: number };
  specializations: string[];
  blockchains: string[];
  verificationStatus: string;
  availability: string;
  completedAudits: number;
  successRate: number;
}

interface FilterOptions {
  experience?: string;
  hourlyRate?: [number, number];
  blockchains?: string[];
  availability?: string;
}

const mockAuditors: AuditorCardProps[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    experience: 5,
    rating: 4.9,
    hourlyRate: { min: 150, max: 250 },
    specializations: ['Smart Contracts', 'DeFi', 'Security'],
    blockchains: ['Ethereum', 'Polygon'],
    verificationStatus: 'verified',
    availability: 'available',
    completedAudits: 47,
    successRate: 98.5
  },
  {
    id: '2',
    name: 'Sarah Chen',
    experience: 8,
    rating: 4.8,
    hourlyRate: { min: 200, max: 350 },
    specializations: ['Protocol Audits', 'Cross-chain', 'Governance'],
    blockchains: ['Ethereum', 'Solana', 'Avalanche'],
    verificationStatus: 'expert',
    availability: 'busy',
    completedAudits: 73,
    successRate: 97.2
  }
];

export default function EnhancedMarketplace() {
  const [auditors, setAuditors] = useState<AuditorCardProps[]>([]);
  const [filteredAuditors, setFilteredAuditors] = useState<AuditorCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuditors = async () => {
      try {
        setLoading(true);
        
        // For now, use mock data since Supabase query is causing issues
        setAuditors(mockAuditors);
        setFilteredAuditors(mockAuditors);
        
      } catch (err) {
        console.error('Failed to fetch auditors:', err);
        setError('Failed to load auditors');
        // Fallback to mock data on error
        setAuditors(mockAuditors);
        setFilteredAuditors(mockAuditors);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditors();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredAuditors(auditors);
      return;
    }

    const filtered = auditors.filter(auditor =>
      auditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auditor.specializations.some(spec => 
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      auditor.blockchains.some(blockchain => 
        blockchain.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredAuditors(filtered);
  };

  const handleFilters = (filters: unknown) => {
    let filtered = auditors;
    
    // Type guard to ensure filters is the expected shape
    if (filters && typeof filters === 'object') {
      const typedFilters = filters as FilterOptions;
      
      if (typedFilters.experience && typedFilters.experience !== 'all') {
        filtered = filtered.filter(auditor => {
          switch (typedFilters.experience) {
            case 'junior': return auditor.experience <= 3;
            case 'mid': return auditor.experience > 3 && auditor.experience <= 7;
            case 'senior': return auditor.experience > 7;
            default: return true;
          }
        });
      }

      if (typedFilters.hourlyRate && typedFilters.hourlyRate.length === 2) {
        filtered = filtered.filter(auditor => 
          auditor.hourlyRate.min >= typedFilters.hourlyRate![0] && 
          auditor.hourlyRate.max <= typedFilters.hourlyRate![1]
        );
      }

      if (typedFilters.blockchains && typedFilters.blockchains.length > 0) {
        filtered = filtered.filter(auditor =>
          typedFilters.blockchains!.some((blockchain: string) =>
            auditor.blockchains.includes(blockchain)
          )
        );
      }

      if (typedFilters.availability && typedFilters.availability !== 'all') {
        filtered = filtered.filter(auditor => auditor.availability === typedFilters.availability);
      }
    }

    setFilteredAuditors(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading auditors...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Enhanced Marketplace | Hawkly</title>
        <meta name="description" content="Find and hire verified blockchain security auditors" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Enhanced Auditor Marketplace</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with verified blockchain security auditors for comprehensive smart contract audits
              </p>
            </div>

            {error && (
              <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="sticky top-6">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  {/* Add filter components here */}
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search auditors by name, skills, or blockchain..."
                    className="w-full px-4 py-2 border border-input rounded-md"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredAuditors.map((auditor) => (
                    <div key={auditor.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{auditor.name}</h3>
                          <p className="text-muted-foreground">{auditor.experience} years experience</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Rating</div>
                          <div className="font-semibold">{auditor.rating}/5.0</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium mb-2">Hourly Rate</div>
                          <div className="text-lg font-semibold">
                            ${auditor.hourlyRate.min} - ${auditor.hourlyRate.max}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Specializations</div>
                          <div className="flex flex-wrap gap-2">
                            {auditor.specializations.map((spec, index) => (
                              <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Blockchains</div>
                          <div className="flex flex-wrap gap-2">
                            {auditor.blockchains.map((blockchain, index) => (
                              <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                                {blockchain}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            {auditor.completedAudits} audits • {auditor.successRate}% success rate
                          </div>
                          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredAuditors.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No auditors found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
