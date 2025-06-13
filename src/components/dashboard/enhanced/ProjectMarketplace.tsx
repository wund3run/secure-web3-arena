
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Code, 
  Shield, 
  Star,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';

interface ProjectOpportunity {
  id: string;
  title: string;
  client: {
    name: string;
    rating: number;
    previousAudits: number;
    location: string;
  };
  description: string;
  blockchain: string;
  budget: {
    min: number;
    max: number;
  };
  deadline: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Critical';
  contractCount: number;
  linesOfCode: number;
  requirements: string[];
  tags: string[];
  postedDate: string;
  applicants: number;
  matchScore: number;
}

// Mock data
const mockOpportunities: ProjectOpportunity[] = [
  {
    id: '1',
    title: 'DeFi Lending Protocol Security Audit',
    client: {
      name: 'LendingDAO',
      rating: 4.8,
      previousAudits: 12,
      location: 'San Francisco, CA'
    },
    description: 'Comprehensive security audit for a new DeFi lending protocol with innovative liquidation mechanisms and cross-collateral features.',
    blockchain: 'Ethereum',
    budget: { min: 15000, max: 25000 },
    deadline: '2025-02-15',
    complexity: 'High',
    contractCount: 8,
    linesOfCode: 3500,
    requirements: ['DeFi Experience', 'Liquidation Mechanisms', 'Flash Loan Security'],
    tags: ['DeFi', 'Lending', 'Liquidation', 'Ethereum'],
    postedDate: '2025-01-10',
    applicants: 5,
    matchScore: 94
  },
  {
    id: '2',
    title: 'NFT Marketplace Smart Contract Review',
    client: {
      name: 'ArtChain',
      rating: 4.2,
      previousAudits: 3,
      location: 'New York, NY'
    },
    description: 'Security review of NFT marketplace contracts including royalty mechanisms, batch operations, and marketplace fees.',
    blockchain: 'Polygon',
    budget: { min: 8000, max: 12000 },
    deadline: '2025-01-28',
    complexity: 'Medium',
    contractCount: 4,
    linesOfCode: 1800,
    requirements: ['NFT Standards', 'Marketplace Experience', 'EIP-2981 Royalties'],
    tags: ['NFT', 'Marketplace', 'Polygon', 'Royalties'],
    postedDate: '2025-01-08',
    applicants: 8,
    matchScore: 87
  },
  {
    id: '3',
    title: 'Cross-Chain Bridge Security Assessment',
    client: {
      name: 'BridgeSecure',
      rating: 4.9,
      previousAudits: 25,
      location: 'Remote'
    },
    description: 'Critical security audit for a new cross-chain bridge supporting Ethereum, BSC, and Polygon with novel consensus mechanisms.',
    blockchain: 'Multi-Chain',
    budget: { min: 30000, max: 50000 },
    deadline: '2025-03-01',
    complexity: 'Critical',
    contractCount: 12,
    linesOfCode: 5200,
    requirements: ['Bridge Protocols', 'Multi-Chain Experience', 'Consensus Mechanisms'],
    tags: ['Bridge', 'Cross-Chain', 'Multi-Chain', 'Critical'],
    postedDate: '2025-01-05',
    applicants: 3,
    matchScore: 76
  }
];

export function ProjectMarketplace() {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [complexityFilter, setComplexityFilter] = useState<string>('all');
  const [blockchainFilter, setBlockchainFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('match');

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComplexity = complexityFilter === 'all' || opp.complexity === complexityFilter;
    const matchesBlockchain = blockchainFilter === 'all' || opp.blockchain === blockchainFilter;
    
    return matchesSearch && matchesComplexity && matchesBlockchain;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Marketplace</h2>
          <p className="text-muted-foreground">
            Discover audit opportunities matched to your expertise
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {filteredOpportunities.length} Opportunities Available
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={complexityFilter} onValueChange={setComplexityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Complexity</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={blockchainFilter} onValueChange={setBlockchainFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blockchains</SelectItem>
                <SelectItem value="Ethereum">Ethereum</SelectItem>
                <SelectItem value="Polygon">Polygon</SelectItem>
                <SelectItem value="BSC">BSC</SelectItem>
                <SelectItem value="Multi-Chain">Multi-Chain</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="budget">Highest Budget</SelectItem>
                <SelectItem value="deadline">Earliest Deadline</SelectItem>
                <SelectItem value="posted">Recently Posted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <Badge className={getComplexityColor(opportunity.complexity)}>
                      {opportunity.complexity}
                    </Badge>
                    <Badge variant="outline">{opportunity.blockchain}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {opportunity.client.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {opportunity.client.rating} ({opportunity.client.previousAudits} audits)
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {opportunity.client.location}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getMatchScoreColor(opportunity.matchScore)}`}>
                    {opportunity.matchScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Match Score</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {opportunity.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    ${opportunity.budget.min.toLocaleString()} - ${opportunity.budget.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    Due {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">
                    {opportunity.contractCount} contracts, {opportunity.linesOfCode} LOC
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">
                    {opportunity.applicants} applicants
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.requirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Posted {new Date(opportunity.postedDate).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Opportunities Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find more opportunities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
