
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download,
  Star,
  Users,
  Clock,
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  Shield,
  Zap,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const templates = [
    {
      id: 1,
      title: "AI-Enhanced Smart Contract Audit Template",
      description: "Advanced template incorporating GPT-4 powered vulnerability detection patterns, automated security checks, and machine learning risk assessment - Updated March 2025",
      category: "AI Security",
      downloadCount: "4.2k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true,
      icon: Zap,
      tags: ["AI", "ML", "Automation", "GPT-4"],
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "DeFi Protocol Security Framework 2025",
      description: "Comprehensive security checklist for DeFi applications including flash loan protection, MEV protection, oracle security, and cross-protocol risks",
      category: "DeFi",
      downloadCount: "3.8k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true,
      icon: Shield,
      tags: ["DeFi", "Flash Loans", "Oracles", "MEV"],
      difficulty: "Expert"
    },
    {
      id: 3,
      title: "Layer 2 & Rollup Security Checklist",
      description: "Specialized template for L2 solutions including optimistic rollups, zk-rollups, state channels, and cross-layer communication security",
      category: "Layer 2",
      downloadCount: "2.9k",
      rating: 4.8,
      lastUpdated: "March 2025",
      new: true,
      icon: Code,
      tags: ["L2", "Rollups", "ZK", "Scaling"],
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Cross-Chain Bridge Security Assessment",
      description: "Multi-chain security template covering bridge architecture, consensus mechanisms, validator networks, and cross-chain attack vectors",
      category: "Cross-Chain",
      downloadCount: "2.1k",
      rating: 4.7,
      lastUpdated: "February 2025",
      icon: BookOpen,
      tags: ["Bridges", "Multi-chain", "Consensus"],
      difficulty: "Expert"
    },
    {
      id: 5,
      title: "NFT & Token Contract Security Guide",
      description: "Security guidelines for NFT marketplaces, token contracts, royalty systems, and metadata security considerations",
      category: "NFT",
      downloadCount: "3.2k",
      rating: 4.6,
      lastUpdated: "March 2025",
      icon: Shield,
      tags: ["NFT", "ERC-721", "Royalties", "Metadata"],
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "DAO Governance Security Framework",
      description: "Security patterns for decentralized governance including voting mechanisms, proposal systems, treasury management, and governance attacks",
      category: "DAO",
      downloadCount: "1.9k",
      rating: 4.8,
      lastUpdated: "February 2025",
      icon: Users,
      tags: ["DAO", "Governance", "Voting", "Treasury"],
      difficulty: "Advanced"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'AI Security', label: 'AI Security' },
    { value: 'DeFi', label: 'DeFi' },
    { value: 'Layer 2', label: 'Layer 2' },
    { value: 'Cross-Chain', label: 'Cross-Chain' },
    { value: 'NFT', label: 'NFT' },
    { value: 'DAO', label: 'DAO' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular': return parseInt(b.downloadCount.replace('k', '')) - parseInt(a.downloadCount.replace('k', ''));
      case 'rating': return b.rating - a.rating;
      case 'recent': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default: return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StandardLayout
      title="Security Audit Templates"
      description="Professional audit templates and frameworks updated for March 2025"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Security Audit Templates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional templates and frameworks used by top security experts. 
            Enhanced with AI-powered analysis and updated for the latest Web3 security landscape.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Security Templates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">18.2k</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8</div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates, categories, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {template.new && (
                        <Badge variant="default" className="text-xs">New 2025</Badge>
                      )}
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {template.downloadCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {template.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(template.difficulty)}>
                        {template.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {template.lastUpdated}
                      </span>
                    </div>
                    
                    <Button className="w-full">
                      Download Template <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready for a Professional Audit?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use these templates as a starting point, or get a comprehensive security audit from our verified experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg">
                Request Professional Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                Browse Expert Auditors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Templates;
