
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Search, Clock, User, Download, Star, Filter, ChevronRight } from 'lucide-react';

const SecurityGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides', count: 24 },
    { id: 'smart-contracts', name: 'Smart Contracts', count: 8 },
    { id: 'defi', name: 'DeFi Security', count: 6 },
    { id: 'infrastructure', name: 'Infrastructure', count: 5 },
    { id: 'best-practices', name: 'Best Practices', count: 5 }
  ];

  const guides = [
    {
      id: 1,
      title: "Complete Smart Contract Security Guide",
      description: "Comprehensive guide covering all aspects of smart contract security from development to deployment.",
      category: "smart-contracts",
      author: "Dr. Sarah Chen",
      readTime: "45 min",
      rating: 4.9,
      downloads: 2840,
      level: "Beginner",
      updated: "2024-01-15",
      tags: ["Solidity", "Security", "Best Practices"]
    },
    {
      id: 2,
      title: "DeFi Protocol Security Assessment",
      description: "Learn how to assess and secure DeFi protocols against common attack vectors and vulnerabilities.",
      category: "defi",
      author: "Marcus Rodriguez",
      readTime: "35 min",
      rating: 4.8,
      downloads: 1950,
      level: "Intermediate",
      updated: "2024-01-10",
      tags: ["DeFi", "Protocol Security", "Risk Assessment"]
    },
    {
      id: 3,
      title: "Infrastructure Security Hardening",
      description: "Step-by-step guide to securing your Web3 infrastructure and preventing common attack vectors.",
      category: "infrastructure",
      author: "Elena Petrov",
      readTime: "60 min",
      rating: 4.9,
      downloads: 1720,
      level: "Advanced",
      updated: "2024-01-08",
      tags: ["Infrastructure", "Hardening", "Network Security"]
    },
    {
      id: 4,
      title: "Gas Optimization and Security",
      description: "Balance between gas optimization and security best practices in smart contract development.",
      category: "smart-contracts",
      author: "Alex Kumar",
      readTime: "25 min",
      rating: 4.7,
      downloads: 1580,
      level: "Intermediate",
      updated: "2024-01-05",
      tags: ["Gas Optimization", "Solidity", "Performance"]
    },
    {
      id: 5,
      title: "Cross-Chain Security Considerations",
      description: "Security challenges and solutions when building cross-chain applications and bridges.",
      category: "infrastructure",
      author: "Dr. Michael Zhang",
      readTime: "40 min",
      rating: 4.8,
      downloads: 1340,
      level: "Advanced",
      updated: "2024-01-03",
      tags: ["Cross-chain", "Bridges", "Interoperability"]
    },
    {
      id: 6,
      title: "Security Testing Best Practices",
      description: "Comprehensive testing strategies for Web3 applications and smart contracts.",
      category: "best-practices",
      author: "Lisa Thompson",
      readTime: "50 min",
      rating: 4.9,
      downloads: 2100,
      level: "Intermediate",
      updated: "2024-01-01",
      tags: ["Testing", "Automation", "Quality Assurance"]
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-600/20 text-green-300';
      case 'Intermediate': return 'bg-yellow-600/20 text-yellow-300';
      case 'Advanced': return 'bg-red-600/20 text-red-300';
      default: return 'bg-gray-600/20 text-gray-300';
    }
  };

  return (
    <StandardizedLayout
      title="Security Guides | Hawkly"
      description="Comprehensive library of Web3 security guides, best practices, and tutorials"
      keywords="security guides, web3 security, smart contract security, best practices"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-6">
              <Book className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 font-medium">Knowledge Center</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Security Guides & Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive library of security guides, best practices, and tutorials to help you 
              build secure Web3 applications and protect your projects.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search guides and documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="guides" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="guides" className="data-[state=active]:bg-blue-600">Security Guides</TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600">Browse by Category</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getLevelColor(guide.level)}>
                          {guide.level}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-300 text-sm">{guide.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg leading-tight">{guide.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{guide.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {guide.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {guide.readTime}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {guide.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-blue-600/20 text-blue-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Download className="h-4 w-4" />
                          {guide.downloads.toLocaleString()} downloads
                        </div>
                        <span className="text-sm text-gray-400">
                          Updated {new Date(guide.updated).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Read Guide
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.filter(cat => cat.id !== 'all').map((category) => (
                  <Card key={category.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-blue-500/50 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        {category.name}
                        <Badge variant="outline" className="bg-blue-600/20 text-blue-300">
                          {category.count} guides
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4">
                        Explore comprehensive guides and best practices for {category.name.toLowerCase()}.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        Browse {category.name}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Featured Guide */}
              <Card className="mt-8 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-medium">Featured Guide</span>
                  </div>
                  <CardTitle className="text-white text-2xl">Web3 Security Fundamentals</CardTitle>
                  <p className="text-gray-300">
                    A comprehensive introduction to Web3 security covering all essential concepts, 
                    from basic cryptography to advanced attack vectors and mitigation strategies.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Clock className="h-4 w-4" />
                      2 hours read
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Download className="h-4 w-4" />
                      5,240 downloads
                    </div>
                    <Badge className="bg-green-600/20 text-green-300">Beginner Friendly</Badge>
                  </div>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                    Start Reading
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardizedLayout>
  );
};

export default SecurityGuides;
