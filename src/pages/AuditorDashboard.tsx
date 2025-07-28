
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HawklyCard } from '@/components/ui/hawkly-components';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Search,
  FilterX, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Calendar,
  Award,
  Star,
  Bell,
  CheckCircle,
  FileText,
  MessageSquare,
  AlertCircle,
  Users,
  ChevronDown,
  Clock4,
  List,
  Grid
} from 'lucide-react';
import { toast } from 'sonner';

// Define interfaces for type safety
interface Opportunity {
  id: string;
  projectName: string;
  clientName: string;
  contractType: string;
  budget: number;
  deadline: string;
  requirements: string[];
  applicants: number;
  postedDate: string;
  status: 'open' | 'closing_soon' | 'closed';
  complexity: 'low' | 'medium' | 'high';
  tags: string[];
}

interface ActiveAudit {
  id: string;
  projectName: string;
  clientName: string;
  contractType: string;
  progress: number;
  deadline: string;
  startDate: string;
  status: 'in_progress' | 'review' | 'paused';
  findings: number;
  criticalFindings: number;
}

interface CompletedAudit {
  id: string;
  projectName: string;
  clientName: string;
  contractType: string;
  completionDate: string;
  earnings: number;
  rating: number;
  findings: number;
  criticalFindings: number;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  skills: string[];
  image: string;
}

interface Performance {
  metric: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

const AuditorDashboard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [activeAudits, setActiveAudits] = useState<ActiveAudit[]>([]);
  const [completedAudits, setCompletedAudits] = useState<CompletedAudit[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [performance, setPerformance] = useState<Performance[]>([]);
  const [contractTypeFilter, setContractTypeFilter] = useState<string>('all');
  const [complexityFilter, setComplexityFilter] = useState<string>('all');

  // Fetch mock data on component mount
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchData = () => {
      // Generate mock opportunities
      const mockOpportunities: Opportunity[] = [
        {
          id: 'op-1',
          projectName: 'DeFi Lending Protocol',
          clientName: 'FinanceDAO',
          contractType: 'Smart Contract Audit',
          budget: 15000,
          deadline: '2025-08-30',
          requirements: ['Solidity', 'DeFi Experience', 'Formal Verification'],
          applicants: 8,
          postedDate: '2025-08-01',
          status: 'open',
          complexity: 'high',
          tags: ['DeFi', 'Lending', 'Solidity']
        },
        {
          id: 'op-2',
          projectName: 'NFT Marketplace',
          clientName: 'ArtChain Collective',
          contractType: 'Security Assessment',
          budget: 8500,
          deadline: '2025-08-25',
          requirements: ['ERC-721', 'ERC-1155', 'Frontend Security'],
          applicants: 5,
          postedDate: '2025-08-03',
          status: 'open',
          complexity: 'medium',
          tags: ['NFT', 'Marketplace', 'ERC-721']
        },
        {
          id: 'op-3',
          projectName: 'Cross-Chain Bridge',
          clientName: 'Bridge Networks',
          contractType: 'Penetration Testing',
          budget: 22000,
          deadline: '2025-09-15',
          requirements: ['Multi-chain Experience', 'Attack Vectors', 'Bridge Security'],
          applicants: 3,
          postedDate: '2025-08-04',
          status: 'open',
          complexity: 'high',
          tags: ['Bridge', 'Cross-chain', 'Security']
        },
        {
          id: 'op-4',
          projectName: 'DAO Governance Protocol',
          clientName: 'GovernanceX',
          contractType: 'Smart Contract Audit',
          budget: 12000,
          deadline: '2025-08-20',
          requirements: ['Governance', 'Voting Systems', 'Timelocks'],
          applicants: 7,
          postedDate: '2025-07-29',
          status: 'closing_soon',
          complexity: 'medium',
          tags: ['DAO', 'Governance', 'Voting']
        },
        {
          id: 'op-5',
          projectName: 'Stablecoin Protocol',
          clientName: 'StableFinance',
          contractType: 'Full Security Audit',
          budget: 30000,
          deadline: '2025-09-30',
          requirements: ['Stablecoin Experience', 'Economic Analysis', 'Formal Verification'],
          applicants: 12,
          postedDate: '2025-08-02',
          status: 'open',
          complexity: 'high',
          tags: ['Stablecoin', 'DeFi', 'Economic Security']
        },
        {
          id: 'op-6',
          projectName: 'Gaming Platform',
          clientName: 'MetaPlay',
          contractType: 'Smart Contract Audit',
          budget: 9500,
          deadline: '2025-09-10',
          requirements: ['Gaming', 'NFT Integration', 'Randomness'],
          applicants: 4,
          postedDate: '2025-08-05',
          status: 'open',
          complexity: 'medium',
          tags: ['Gaming', 'NFT', 'Randomness']
        }
      ];
      
      // Generate mock active audits
      const mockActiveAudits: ActiveAudit[] = [
        {
          id: 'aa-1',
          projectName: 'Yield Aggregator',
          clientName: 'YieldFi',
          contractType: 'Smart Contract Audit',
          progress: 75,
          deadline: '2025-08-20',
          startDate: '2025-08-01',
          status: 'in_progress',
          findings: 12,
          criticalFindings: 3
        },
        {
          id: 'aa-2',
          projectName: 'DEX Protocol',
          clientName: 'SwapX',
          contractType: 'Full Security Audit',
          progress: 90,
          deadline: '2025-08-15',
          startDate: '2025-07-20',
          status: 'review',
          findings: 8,
          criticalFindings: 1
        },
        {
          id: 'aa-3',
          projectName: 'Token Vault',
          clientName: 'SecureHoldings',
          contractType: 'Penetration Testing',
          progress: 45,
          deadline: '2025-09-01',
          startDate: '2025-08-05',
          status: 'in_progress',
          findings: 5,
          criticalFindings: 2
        }
      ];
      
      // Generate mock completed audits
      const mockCompletedAudits: CompletedAudit[] = [
        {
          id: 'ca-1',
          projectName: 'Flash Loan Protocol',
          clientName: 'LoanDex',
          contractType: 'Smart Contract Audit',
          completionDate: '2025-07-25',
          earnings: 13500,
          rating: 4.9,
          findings: 18,
          criticalFindings: 4
        },
        {
          id: 'ca-2',
          projectName: 'NFT Staking Platform',
          clientName: 'StakeDAO',
          contractType: 'Security Assessment',
          completionDate: '2025-07-15',
          earnings: 8200,
          rating: 5.0,
          findings: 9,
          criticalFindings: 2
        },
        {
          id: 'ca-3',
          projectName: 'Decentralized Insurance',
          clientName: 'CoverProtocol',
          contractType: 'Full Security Audit',
          completionDate: '2025-06-30',
          earnings: 21000,
          rating: 4.8,
          findings: 22,
          criticalFindings: 5
        },
        {
          id: 'ca-4',
          projectName: 'Synthetic Assets',
          clientName: 'SynthX',
          contractType: 'Smart Contract Audit',
          completionDate: '2025-06-15',
          earnings: 17500,
          rating: 4.7,
          findings: 15,
          criticalFindings: 3
        }
      ];
      
      // Generate mock certifications
      const mockCertifications: Certification[] = [
        {
          id: 'cert-1',
          name: 'Certified Blockchain Security Professional',
          issuer: 'Blockchain Security Alliance',
          issueDate: '2025-01-15',
          expiryDate: '2028-01-15',
          credentialId: 'CBSP-2025-78341',
          skills: ['Smart Contract Auditing', 'Attack Vectors', 'Security Best Practices'],
          image: '/images/certifications/blockchain-security.png'
        },
        {
          id: 'cert-2',
          name: 'Advanced Solidity Security Expert',
          issuer: 'EthSecurity Foundation',
          issueDate: '2024-11-05',
          expiryDate: '2027-11-05',
          credentialId: 'ASSE-24-9273',
          skills: ['Solidity', 'Gas Optimization', 'Reentrancy Protection'],
          image: '/images/certifications/solidity-expert.png'
        },
        {
          id: 'cert-3',
          name: 'Formal Verification Specialist',
          issuer: 'Consensus Security',
          issueDate: '2025-03-20',
          expiryDate: '2028-03-20',
          credentialId: 'FVS-25-2718',
          skills: ['Formal Methods', 'Mathematical Proofs', 'Model Checking'],
          image: '/images/certifications/formal-verification.png'
        }
      ];
      
      // Generate mock performance metrics
      const mockPerformance: Performance[] = [
        {
          metric: 'Audits Completed',
          value: 37,
          change: 15,
          trend: 'up'
        },
        {
          metric: 'Total Earnings',
          value: '$285,750',
          change: 22,
          trend: 'up'
        },
        {
          metric: 'Average Rating',
          value: 4.8,
          change: 0.3,
          trend: 'up'
        },
        {
          metric: 'Findings Identified',
          value: 412,
          change: 18,
          trend: 'up'
        },
        {
          metric: 'Response Time',
          value: '2.3h',
          change: -15,
          trend: 'down'
        },
        {
          metric: 'Client Retention',
          value: '87%',
          change: 7,
          trend: 'up'
        }
      ];

      setOpportunities(mockOpportunities);
      setActiveAudits(mockActiveAudits);
      setCompletedAudits(mockCompletedAudits);
      setCertifications(mockCertifications);
      setPerformance(mockPerformance);
    };

    fetchData();
  }, []);

  // Filter opportunities based on search query and filters
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          opp.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesContractType = contractTypeFilter === 'all' || opp.contractType === contractTypeFilter;
    const matchesComplexity = complexityFilter === 'all' || opp.complexity === complexityFilter;
    
    return matchesSearch && matchesContractType && matchesComplexity;
  });

  const handleApplyToProject = (id: string) => {
    toast.success('Application submitted successfully!');
    // In a real app, this would send an API request to apply to the project
  };

  const resetFilters = () => {
    setSearchQuery('');
    setContractTypeFilter('all');
    setComplexityFilter('all');
  };

  return (
    <ProductionLayout>
      <Helmet>
        <title>Auditor Dashboard | Hawkly</title>
      </Helmet>

      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Auditor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your audits, find new opportunities, and track your performance
          </p>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performance.map(metric => (
            <HawklyCard key={metric.metric} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.metric}</h3>
                  <Badge variant={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'destructive' : 'outline'}>
                    {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}{Math.abs(metric.change)}%
                  </Badge>
                </div>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <TrendingUp className={`ml-2 h-4 w-4 ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`} />
                </div>
              </div>
            </HawklyCard>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="opportunities" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" /> Opportunities
              </TabsTrigger>
              <TabsTrigger value="active" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" /> Active Audits
              </TabsTrigger>
              <TabsTrigger value="completed" className="px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" /> Completed
              </TabsTrigger>
              <TabsTrigger value="certifications" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" /> Certifications
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon" 
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search opportunities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Contract Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Smart Contract Audit">Smart Contract Audit</SelectItem>
                    <SelectItem value="Security Assessment">Security Assessment</SelectItem>
                    <SelectItem value="Penetration Testing">Penetration Testing</SelectItem>
                    <SelectItem value="Full Security Audit">Full Security Audit</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={resetFilters} className="gap-2">
                  <FilterX className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>

            {filteredOpportunities.length === 0 ? (
              <HawklyCard className="flex flex-col items-center justify-center p-10 text-center">
                <Search className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No opportunities found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>Clear filters</Button>
              </HawklyCard>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-2'}`}>
                {filteredOpportunities.map(opportunity => (
                  <HawklyCard key={opportunity.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{opportunity.projectName}</h3>
                        <Badge variant={
                          opportunity.status === 'open' ? 'outline' : 
                          opportunity.status === 'closing_soon' ? 'warning' : 'destructive'
                        }>
                          {opportunity.status === 'open' ? 'Open' : 
                           opportunity.status === 'closing_soon' ? 'Closing Soon' : 'Closed'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{opportunity.clientName}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="font-medium flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" /> {opportunity.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> {new Date(opportunity.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Contract Type</p>
                          <p className="font-medium">{opportunity.contractType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Complexity</p>
                          <p className="font-medium capitalize">{opportunity.complexity}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Requirements</p>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.requirements.map(req => (
                            <Badge variant="secondary" key={req}>{req}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-muted flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{opportunity.applicants} applicants</span>
                        </div>
                        <Button onClick={() => handleApplyToProject(opportunity.id)}>Apply</Button>
                      </div>
                    </div>
                  </HawklyCard>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Audits Tab */}
          <TabsContent value="active" className="space-y-4">
            {activeAudits.length === 0 ? (
              <HawklyCard className="flex flex-col items-center justify-center p-10 text-center">
                <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active audits</h3>
                <p className="text-muted-foreground mt-1">Apply to opportunities to start working on audits</p>
                <Button className="mt-4" onClick={() => setActiveTab('opportunities')}>View Opportunities</Button>
              </HawklyCard>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-2'}`}>
                {activeAudits.map(audit => (
                  <HawklyCard key={audit.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{audit.projectName}</h3>
                        <Badge variant={
                          audit.status === 'in_progress' ? 'success' : 
                          audit.status === 'review' ? 'warning' : 'outline'
                        }>
                          {audit.status === 'in_progress' ? 'In Progress' : 
                           audit.status === 'review' ? 'In Review' : 'Paused'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{audit.clientName}</p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{audit.progress}%</span>
                        </div>
                        <Progress value={audit.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> {new Date(audit.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Started</p>
                          <p className="font-medium flex items-center">
                            <Clock4 className="h-4 w-4 mr-1" /> {new Date(audit.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{audit.contractType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Findings</p>
                          <p className="font-medium flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1 text-red-500" /> {audit.criticalFindings} critical of {audit.findings} total
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-muted flex items-center justify-end gap-2">
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" /> Message
                        </Button>
                        <Button>Continue Audit</Button>
                      </div>
                    </div>
                  </HawklyCard>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed Audits Tab */}
          <TabsContent value="completed" className="space-y-4">
            {completedAudits.length === 0 ? (
              <HawklyCard className="flex flex-col items-center justify-center p-10 text-center">
                <CheckCircle className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No completed audits yet</h3>
                <p className="text-muted-foreground mt-1">Your completed audits will appear here</p>
              </HawklyCard>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-2'}`}>
                {completedAudits.map(audit => (
                  <HawklyCard key={audit.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{audit.projectName}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{audit.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{audit.clientName}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Earnings</p>
                          <p className="font-medium flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" /> {audit.earnings.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> {new Date(audit.completionDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{audit.contractType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Findings</p>
                          <p className="font-medium flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1 text-red-500" /> {audit.criticalFindings} critical of {audit.findings} total
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-muted flex items-center justify-end">
                        <Button variant="outline">View Report</Button>
                      </div>
                    </div>
                  </HawklyCard>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-4">
            {certifications.length === 0 ? (
              <HawklyCard className="flex flex-col items-center justify-center p-10 text-center">
                <Award className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No certifications yet</h3>
                <p className="text-muted-foreground mt-1">Add your security certifications to enhance your profile</p>
                <Button className="mt-4">Add Certification</Button>
              </HawklyCard>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-2'}`}>
                {certifications.map(cert => (
                  <HawklyCard key={cert.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6" />
                        </div>
                        <Badge variant="outline">Valid</Badge>
                      </div>

                      <h3 className="text-lg font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Issued</p>
                          <p className="font-medium">{new Date(cert.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expires</p>
                          <p className="font-medium">{new Date(cert.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map(skill => (
                            <Badge variant="secondary" key={skill}>{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-muted flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">ID: {cert.credentialId}</p>
                        <Button variant="outline" size="sm">Verify</Button>
                      </div>
                    </div>
                  </HawklyCard>
                ))}
                <HawklyCard className="flex flex-col items-center justify-center p-10 text-center h-full border-dashed">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Add New Certification</h3>
                  <p className="text-muted-foreground mt-1 mb-4">Showcase your security expertise and credentials</p>
                  <Button>Add Certification</Button>
                </HawklyCard>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProductionLayout>
  );
};

export default AuditorDashboard;
