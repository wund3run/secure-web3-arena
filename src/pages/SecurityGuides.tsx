
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, BookOpen, Code, Users, Zap, Target,
  CheckCircle, Clock, Star, Search, Filter,
  ArrowRight, Download, Play, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guideCategories = [
    {
      id: 'fundamentals',
      name: 'Security Fundamentals',
      icon: <Shield className="h-5 w-5" />,
      count: 12,
      description: 'Basic security principles and best practices',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'smart-contracts',
      name: 'Smart Contract Security',
      icon: <Code className="h-5 w-5" />,
      count: 18,
      description: 'Solidity security patterns and anti-patterns',
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'defi',
      name: 'DeFi Security',
      icon: <Zap className="h-5 w-5" />,
      count: 15,
      description: 'Decentralized finance security considerations',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'auditing',
      name: 'Auditing Process',
      icon: <Target className="h-5 w-5" />,
      count: 10,
      description: 'Professional auditing methodologies',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'governance',
      name: 'DAO & Governance',
      icon: <Users className="h-5 w-5" />,
      count: 8,
      description: 'Decentralized governance security',
      color: 'bg-teal-100 text-teal-700'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Security',
      icon: <Lock className="h-5 w-5" />,
      count: 14,
      description: 'Blockchain infrastructure and operations',
      color: 'bg-red-100 text-red-700'
    }
  ];

  const featuredGuides = [
    {
      title: "Complete Smart Contract Security Checklist",
      description: "A comprehensive 50-point checklist for secure smart contract development",
      category: "Smart Contracts",
      difficulty: "Beginner",
      readTime: "15 min",
      rating: 4.9,
      downloads: "12.5k",
      author: "Security Team",
      lastUpdated: "2024-01-15",
      tags: ["Checklist", "Solidity", "Best Practices"],
      type: "Interactive Guide"
    },
    {
      title: "DeFi Security: Flash Loan Attack Prevention",
      description: "Learn to identify and prevent flash loan vulnerabilities in DeFi protocols",
      category: "DeFi Security",
      difficulty: "Advanced",
      readTime: "25 min",
      rating: 4.8,
      downloads: "8.2k",
      author: "Alex Kim",
      lastUpdated: "2024-01-12",
      tags: ["Flash Loans", "DeFi", "Attack Vectors"],
      type: "Video Guide"
    },
    {
      title: "Access Control Patterns in Smart Contracts",
      description: "Master role-based access control and permission systems",
      category: "Smart Contracts", 
      difficulty: "Intermediate",
      readTime: "20 min",
      rating: 4.7,
      downloads: "9.8k",
      author: "Sarah Chen",
      lastUpdated: "2024-01-10",
      tags: ["Access Control", "Patterns", "Security"],
      type: "Step-by-step"
    },
    {
      title: "Audit Methodology: From Planning to Report",
      description: "Professional audit process used by top security firms",
      category: "Auditing Process",
      difficulty: "Expert",
      readTime: "45 min",
      rating: 4.9,
      downloads: "15.3k",
      author: "Michael Torres",
      lastUpdated: "2024-01-08",
      tags: ["Methodology", "Process", "Professional"],
      type: "Comprehensive Guide"
    }
  ];

  const quickStartGuides = [
    {
      title: "5-Minute Security Setup",
      description: "Essential security tools and configurations",
      icon: <Clock className="h-4 w-4" />,
      time: "5 min"
    },
    {
      title: "First Smart Contract Audit",
      description: "Your first security review walkthrough",
      icon: <Target className="h-4 w-4" />,
      time: "10 min"
    },
    {
      title: "Security Testing Basics",
      description: "Introduction to automated security testing",
      icon: <Shield className="h-4 w-4" />,
      time: "15 min"
    },
    {
      title: "Common Vulnerability Fixes",
      description: "Quick fixes for the most common issues",
      icon: <CheckCircle className="h-4 w-4" />,
      time: "12 min"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Guide': return <Play className="h-3 w-3" />;
      case 'Interactive Guide': return <Zap className="h-3 w-3" />;
      case 'Step-by-step': return <ArrowRight className="h-3 w-3" />;
      default: return <BookOpen className="h-3 w-3" />;
    }
  };

  return (
    <ContentPage
      title="Security Guides"
      description="Comprehensive Web3 security guides, best practices, and step-by-step tutorials for developers, auditors, and security professionals."
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Web3 Security <span className="text-primary">Guides</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with our comprehensive guides, tutorials, and best practices. 
            From beginner basics to expert methodologies.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search security guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Start Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Quick Start Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartGuides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {guide.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {guide.time}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured">Featured Guides</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="latest">Latest Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(guide.difficulty)}>
                            {guide.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getTypeIcon(guide.type)}
                            <span className="ml-1">{guide.type}</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-lg hover:text-primary transition-colors">
                          {guide.title}
                        </CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {guide.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {guide.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {guide.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">By </span>
                        <span className="font-medium">{guide.author}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guideCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.count} guides available
                        </CardDescription>
                      </div>
                    </div>
                    <CardDescription className="mt-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Browse {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="latest">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Latest Security Updates</h3>
              <p className="text-muted-foreground mb-6">
                Stay current with the latest security guides and best practices.
              </p>
              <Button asChild>
                <Link to="/blog">
                  View Security Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Implement These Security Practices?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Put your knowledge into practice by getting a professional security audit 
            or connecting with expert auditors on our marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/marketplace">
                <Users className="mr-2 h-4 w-4" />
                Find Security Experts
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-4 w-4" />
                Request Security Audit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default SecurityGuides;
