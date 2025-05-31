
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen,
  Star,
  Clock,
  Users,
  Search,
  Filter,
  ArrowRight,
  Shield,
  Zap,
  Code,
  Database,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityGuides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const guides = [
    {
      id: 1,
      title: "Web3 Security Fundamentals 2025",
      description: "Complete guide to Web3 security covering smart contracts, DeFi protocols, NFTs, and emerging threats in the 2025 landscape",
      category: "Fundamentals",
      readTime: "25 min",
      views: "45.2k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true,
      icon: Shield,
      tags: ["Basics", "Security", "Smart Contracts", "2025"],
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "AI-Enhanced Security Analysis Guide",
      description: "Comprehensive guide to using AI tools like GPT-4, Claude, and specialized ML models for automated vulnerability detection",
      category: "AI Security",
      readTime: "35 min",
      views: "32.8k",
      rating: 4.9,
      lastUpdated: "March 2025",
      new: true,
      icon: Zap,
      tags: ["AI", "GPT-4", "Automation", "Analysis"],
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "DeFi Security Best Practices 2025",
      description: "Updated security patterns for DeFi protocols including MEV protection, oracle security, flash loan defense, and cross-protocol risks",
      category: "DeFi",
      readTime: "40 min",
      views: "28.7k",
      rating: 4.8,
      lastUpdated: "March 2025",
      new: true,
      icon: Database,
      tags: ["DeFi", "MEV", "Oracles", "Flash Loans"],
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Layer 2 Security Architecture",
      description: "Security considerations for rollups, state channels, and sidechains including zk-rollups, optimistic rollups, and cross-layer communication",
      category: "Layer 2",
      readTime: "30 min",
      views: "21.4k",
      rating: 4.7,
      lastUpdated: "March 2025",
      icon: Code,
      tags: ["L2", "Rollups", "ZK", "Scaling"],
      difficulty: "Expert"
    },
    {
      id: 5,
      title: "Cross-Chain Bridge Security",
      description: "Security framework for multi-chain applications, bridge vulnerabilities, validator networks, and consensus mechanisms",
      category: "Cross-Chain",
      readTime: "45 min",
      views: "18.9k",
      rating: 4.8,
      lastUpdated: "February 2025",
      icon: Globe,
      tags: ["Bridges", "Multi-chain", "Validators"],
      difficulty: "Expert"
    },
    {
      id: 6,
      title: "Smart Contract Vulnerability Patterns",
      description: "Common vulnerability patterns in 2025 including reentrancy variants, access control issues, and economic exploits",
      category: "Vulnerabilities",
      readTime: "50 min",
      views: "38.1k",
      rating: 4.9,
      lastUpdated: "March 2025",
      icon: AlertTriangle,
      tags: ["Vulnerabilities", "Exploits", "Patterns"],
      difficulty: "Intermediate"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Fundamentals', label: 'Fundamentals' },
    { value: 'AI Security', label: 'AI Security' },
    { value: 'DeFi', label: 'DeFi' },
    { value: 'Layer 2', label: 'Layer 2' },
    { value: 'Cross-Chain', label: 'Cross-Chain' },
    { value: 'Vulnerabilities', label: 'Vulnerabilities' }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular': return parseInt(b.views.replace('k', '')) - parseInt(a.views.replace('k', ''));
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
      title="Security Guides"
      description="Comprehensive Web3 security guides updated for March 2025"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Guides</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security guides covering the latest Web3 threats, 
            AI-powered analysis techniques, and cutting-edge security practices for 2025.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Security Guides</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">185k</div>
            <div className="text-sm text-muted-foreground">Total Readers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8</div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search guides, topics, or technologies..."
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

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {guide.new && (
                        <Badge variant="default" className="text-xs">New 2025</Badge>
                      )}
                      <Badge variant="secondary">{guide.category}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {guide.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {guide.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {guide.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {guide.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(guide.difficulty)}>
                        {guide.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {guide.lastUpdated}
                      </span>
                    </div>
                    
                    <Button className="w-full">
                      Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply Your Knowledge?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Put your security expertise to work with real projects or get your own code audited by our expert community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg">
                Find Security Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/request-audit">
              <Button size="lg" variant="outline">
                Get Professional Audit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default SecurityGuides;
