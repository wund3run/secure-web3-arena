
import React, { useState, useEffect } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Star, 
  Clock, 
  DollarSign, 
  Shield, 
  Users, 
  Filter,
  ChevronRight,
  Verified
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for the marketplace
const mockServices = [
  {
    id: '1',
    title: 'Smart Contract Security Audit',
    description: 'Comprehensive security audit for DeFi protocols and smart contracts. Expert analysis of vulnerabilities, gas optimization, and best practices.',
    provider: {
      name: 'Alex Chen',
      avatar: '',
      verified: true,
      rating: 4.9,
      completedAudits: 47
    },
    category: 'Smart Contract Audit',
    blockchain: ['Ethereum', 'Polygon', 'BSC'],
    price: '$5,000 - $15,000',
    deliveryTime: '5-10 days',
    tags: ['DeFi', 'Security', 'Gas Optimization'],
    featured: true
  },
  {
    id: '2',
    title: 'Full-Stack Web3 Security Review',
    description: 'End-to-end security assessment covering smart contracts, frontend, and backend infrastructure for comprehensive protection.',
    provider: {
      name: 'Maria Rodriguez',
      avatar: '',
      verified: true,
      rating: 4.8,
      completedAudits: 32
    },
    category: 'Full-Stack Audit',
    blockchain: ['Ethereum', 'Solana', 'Avalanche'],
    price: '$10,000 - $25,000',
    deliveryTime: '10-15 days',
    tags: ['Full-Stack', 'Infrastructure', 'Security'],
    featured: true
  },
  {
    id: '3',
    title: 'Penetration Testing for DApps',
    description: 'Professional penetration testing service focusing on decentralized applications and identifying attack vectors.',
    provider: {
      name: 'David Kim',
      avatar: '',
      verified: true,
      rating: 4.7,
      completedAudits: 28
    },
    category: 'Penetration Testing',
    blockchain: ['Ethereum', 'Arbitrum', 'Optimism'],
    price: '$3,000 - $8,000',
    deliveryTime: '3-7 days',
    tags: ['Pentesting', 'Vulnerability Assessment', 'DApps'],
    featured: false
  },
  {
    id: '4',
    title: 'NFT Marketplace Security Audit',
    description: 'Specialized security audit for NFT marketplaces, covering smart contracts, metadata security, and marketplace mechanics.',
    provider: {
      name: 'Sarah Johnson',
      avatar: '',
      verified: true,
      rating: 4.9,
      completedAudits: 19
    },
    category: 'NFT Audit',
    blockchain: ['Ethereum', 'Polygon'],
    price: '$7,500 - $20,000',
    deliveryTime: '7-14 days',
    tags: ['NFT', 'Marketplace', 'Metadata Security'],
    featured: false
  },
  {
    id: '5',
    title: 'GameFi Security Assessment',
    description: 'Expert security review for gaming and metaverse projects, including tokenomics, in-game economies, and smart contract logic.',
    provider: {
      name: 'Michael Wang',
      avatar: '',
      verified: true,
      rating: 4.6,
      completedAudits: 15
    },
    category: 'GameFi Audit',
    blockchain: ['Ethereum', 'Polygon', 'Solana'],
    price: '$8,000 - $18,000',
    deliveryTime: '10-20 days',
    tags: ['GameFi', 'Tokenomics', 'Gaming'],
    featured: false
  }
];

const categories = [
  'All Categories',
  'Smart Contract Audit',
  'Full-Stack Audit',
  'Penetration Testing',
  'NFT Audit',
  'GameFi Audit',
  'Code Review'
];

const blockchains = [
  'All Blockchains',
  'Ethereum',
  'Polygon',
  'BSC',
  'Solana',
  'Avalanche',
  'Arbitrum',
  'Optimism'
];

const Marketplace = () => {
  const [services, setServices] = useState(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBlockchain, setSelectedBlockchain] = useState('All Blockchains');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort services
  useEffect(() => {
    let filtered = mockServices.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
      const matchesBlockchain = selectedBlockchain === 'All Blockchains' || 
                               service.blockchain.includes(selectedBlockchain);

      return matchesSearch && matchesCategory && matchesBlockchain;
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.provider.rating - a.provider.rating;
        case 'rating':
          return b.provider.rating - a.provider.rating;
        case 'price-low':
          const aPriceLow = parseInt(a.price.match(/\$(\d+)/)?.[1] || '0');
          const bPriceLow = parseInt(b.price.match(/\$(\d+)/)?.[1] || '0');
          return aPriceLow - bPriceLow;
        case 'delivery':
          const aDelivery = parseInt(a.deliveryTime.match(/(\d+)/)?.[1] || '0');
          const bDelivery = parseInt(b.deliveryTime.match(/(\d+)/)?.[1] || '0');
          return aDelivery - bDelivery;
        default:
          return 0;
      }
    });

    setServices(filtered);
  }, [searchQuery, selectedCategory, selectedBlockchain, sortBy]);

  return (
    <StandardLayout title="Security Marketplace" description="Find expert Web3 security auditors and services">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with verified security experts and find the perfect audit service for your Web3 project
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search services, skills, or providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                <SelectTrigger>
                  <SelectValue placeholder="Blockchain" />
                </SelectTrigger>
                <SelectContent>
                  {blockchains.map(blockchain => (
                    <SelectItem key={blockchain} value={blockchain}>{blockchain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="delivery">Fastest Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            Showing {services.length} of {mockServices.length} services
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Service Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className={`hover:shadow-lg transition-shadow ${service.featured ? 'border-primary/50 bg-primary/5' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      {service.featured && (
                        <Badge variant="default" className="text-xs">Featured</Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Provider Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback>{service.provider.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{service.provider.name}</span>
                      {service.provider.verified && (
                        <Verified className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{service.provider.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        <span>{service.provider.completedAudits} audits</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>Price Range</span>
                    </div>
                    <span className="font-medium">{service.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Delivery Time</span>
                    </div>
                    <span className="font-medium">{service.deliveryTime}</span>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Supported Blockchains:</div>
                    <div className="flex flex-wrap gap-1">
                      {service.blockchain.map(chain => (
                        <Badge key={chain} variant="outline" className="text-xs">
                          {chain}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Tags:</div>
                    <div className="flex flex-wrap gap-1">
                      {service.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  <Button asChild className="flex-1">
                    <Link to={`/service/${service.id}`}>
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/contact-provider?serviceId=${service.id}`}>
                      Contact
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Security Solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Submit a custom audit request and let our AI match you with the perfect security experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/request-audit">
                <Shield className="mr-2 h-5 w-5" />
                Request Custom Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/service-provider-onboarding">
                <Users className="mr-2 h-5 w-5" />
                Join as Provider
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Marketplace;
