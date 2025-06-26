
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Shield, 
  Code, 
  Filter,
  Users,
  Briefcase
} from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [viewType, setViewType] = useState('auditors');

  // Mock data for auditors
  const auditors = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      title: 'Senior Smart Contract Auditor',
      avatar: '/api/placeholder/64/64',
      rating: 4.9,
      completedAudits: 47,
      hourlyRate: 150,
      location: 'San Francisco, CA',
      skills: ['Solidity', 'DeFi', 'Gas Optimization', 'Formal Verification'],
      bio: 'Specialized in DeFi protocols with 5+ years of experience in smart contract security.',
      availability: 'Available',
      certifications: ['Certified Ethereum Developer', 'ConsenSys Academy Graduate']
    },
    {
      id: '2',
      name: 'Sarah Chen',
      title: 'Blockchain Security Expert',
      avatar: '/api/placeholder/64/64',
      rating: 4.8,
      completedAudits: 32,
      hourlyRate: 120,
      location: 'New York, NY',
      skills: ['Rust', 'Solana', 'Security Analysis', 'Vulnerability Assessment'],
      bio: 'Expert in multi-chain security with focus on Solana and Ethereum ecosystems.',
      availability: 'Busy until Dec 15',
      certifications: ['CISSP', 'CEH']
    },
    {
      id: '3',
      name: 'David Kim',
      title: 'DeFi Security Specialist',
      avatar: '/api/placeholder/64/64',
      rating: 4.7,
      completedAudits: 28,
      hourlyRate: 130,
      location: 'Austin, TX',
      skills: ['Solidity', 'DeFi', 'MEV', 'Flash Loans'],
      bio: 'Focused on DeFi protocol security and MEV-resistant smart contract design.',
      availability: 'Available',
      certifications: ['DeFi Security Specialist']
    }
  ];

  // Mock data for audit requests
  const auditRequests = [
    {
      id: '1',
      title: 'DEX Protocol Security Audit',
      description: 'Looking for comprehensive security audit of our new DEX protocol',
      budget: '$15,000 - $25,000',
      timeline: '3 weeks',
      blockchain: 'Ethereum',
      postedBy: 'DeFiCorp',
      skills: ['Solidity', 'DeFi', 'AMM'],
      urgency: 'High',
      applicants: 12
    },
    {
      id: '2',
      title: 'NFT Marketplace Smart Contract Review',
      description: 'Security review needed for NFT marketplace smart contracts',
      budget: '$8,000 - $12,000',
      timeline: '2 weeks',
      blockchain: 'Polygon',
      postedBy: 'NFT Studio',
      skills: ['Solidity', 'NFT', 'ERC-721'],
      urgency: 'Medium',
      applicants: 8
    },
    {
      id: '3',
      title: 'Token Bridge Security Assessment',
      description: 'Cross-chain bridge security audit and vulnerability assessment',
      budget: '$20,000 - $30,000',
      timeline: '4 weeks',
      blockchain: 'Multi-chain',
      postedBy: 'Bridge Protocol',
      skills: ['Solidity', 'Bridge Security', 'Multi-chain'],
      urgency: 'Low',
      applicants: 5
    }
  ];

  const filteredAuditors = auditors.filter(auditor =>
    auditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auditor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRequests = auditRequests.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <>
      <Helmet>
        <title>Marketplace | Hawkly</title>
        <meta name="description" content="Find security auditors or browse audit opportunities" />
      </Helmet>

      <StandardLayout title="Security Marketplace" description="Connect with auditors and discover opportunities">
        <div className="container py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Security Marketplace</h1>
              <p className="text-muted-foreground mt-2">
                Connect with verified security experts or find your next audit opportunity
              </p>
            </div>
            <Button asChild>
              <a href="/submit-project">Post New Project</a>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search auditors, skills, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Lowest Price</SelectItem>
                <SelectItem value="price-high">Highest Price</SelectItem>
                <SelectItem value="experience">Most Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs value={viewType} onValueChange={setViewType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="auditors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Find Auditors
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Audit Requests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="auditors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuditors.map((auditor) => (
                  <Card key={auditor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={auditor.avatar} alt={auditor.name} />
                          <AvatarFallback>{auditor.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{auditor.name}</h3>
                          <p className="text-sm text-muted-foreground">{auditor.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{auditor.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({auditor.completedAudits} audits)
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4" />
                          ${auditor.hourlyRate}/hr
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {auditor.location}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className={auditor.availability === 'Available' ? 'text-green-600' : 'text-orange-600'}>
                          {auditor.availability}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {auditor.bio}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {auditor.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {auditor.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{auditor.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Profile
                        </Button>
                        <Button size="sm" className="flex-1">
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            by {request.postedBy}
                          </p>
                        </div>
                        <Badge variant={getUrgencyColor(request.urgency) as any}>
                          {request.urgency}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {request.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span>{request.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>{request.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-purple-600" />
                          <span>{request.blockchain}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span>{request.applicants} applicants</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {request.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </StandardLayout>
    </>
  );
};

export default Marketplace;
