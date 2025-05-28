
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, Shield, Clock, DollarSign, Filter, Users, Award, Zap } from 'lucide-react';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const auditors = [
    {
      id: 1,
      name: "CyberGuard Security",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.9,
      reviews: 47,
      expertise: ["Smart Contracts", "DeFi", "NFT"],
      blockchain: ["Ethereum", "Polygon", "Arbitrum"],
      price: "$5,000 - $15,000",
      turnaround: "5-7 days",
      verified: true,
      premium: true,
      description: "Expert security auditing firm with 3+ years in Web3. Specialized in DeFi protocols and smart contract security.",
      completedAudits: 127
    },
    {
      id: 2,
      name: "BlockSafe Auditors",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.8,
      reviews: 32,
      expertise: ["Smart Contracts", "Cross-chain", "Gaming"],
      blockchain: ["Ethereum", "BSC", "Solana"],
      price: "$3,000 - $10,000",
      turnaround: "3-5 days",
      verified: true,
      premium: false,
      description: "Rapid security assessments with comprehensive reporting. Trusted by leading GameFi projects.",
      completedAudits: 89
    },
    {
      id: 3,
      name: "SecureChain Labs",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.7,
      reviews: 28,
      expertise: ["Smart Contracts", "Infrastructure", "Layer 2"],
      blockchain: ["Ethereum", "Optimism", "Arbitrum"],
      price: "$7,000 - $20,000",
      turnaround: "7-10 days",
      verified: true,
      premium: true,
      description: "Deep technical expertise in Layer 2 solutions and complex DeFi protocols.",
      completedAudits: 76
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'smart-contracts', label: 'Smart Contracts' },
    { value: 'defi', label: 'DeFi Protocols' },
    { value: 'nft', label: 'NFT Projects' },
    { value: 'gaming', label: 'GameFi' },
    { value: 'infrastructure', label: 'Infrastructure' }
  ];

  const filteredAuditors = auditors.filter(auditor => {
    const matchesSearch = auditor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auditor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           auditor.expertise.some(skill => 
                             skill.toLowerCase().includes(selectedCategory.replace('-', ' '))
                           );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Security Marketplace | Hawkly</title>
        <meta name="description" content="Connect with verified Web3 security auditors and experts" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Security Marketplace
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with verified security auditors and experts for your Web3 projects. 
                Get professional audits with transparent pricing and quality guarantees.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search auditors, skills, or blockchain..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="auditors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="auditors">Auditors</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>

            <TabsContent value="auditors" className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredAuditors.length} verified auditors found
                </p>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuditors.map(auditor => (
                  <Card key={auditor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {auditor.name}
                              {auditor.verified && <Award className="h-4 w-4 text-blue-500" />}
                              {auditor.premium && <Zap className="h-4 w-4 text-yellow-500" />}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1 text-sm font-medium">{auditor.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({auditor.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{auditor.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{auditor.completedAudits} audits completed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{auditor.turnaround} turnaround</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>{auditor.price}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Expertise:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {auditor.expertise.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Blockchains:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {auditor.blockchain.map(chain => (
                              <Badge key={chain} variant="outline" className="text-xs">
                                {chain}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button asChild className="flex-1">
                          <Link to={`/service/${auditor.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/service/${auditor.id}/request`}>
                            Request Quote
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Services</h3>
                <p className="text-gray-600 mb-8">Browse specialized security services and packages</p>
                <Button asChild>
                  <Link to="/request-audit">Request Custom Service</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="teams" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Teams</h3>
                <p className="text-gray-600 mb-8">Connect with full-service security teams for complex projects</p>
                <Button asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
