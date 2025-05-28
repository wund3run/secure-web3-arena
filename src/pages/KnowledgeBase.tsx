
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Book, Shield, Code, Zap, Users, FileText, 
  ArrowRight, Star, Clock, TrendingUp, Bookmark 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'security',
      name: 'Security',
      icon: <Shield className="h-5 w-5" />,
      count: 45,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 'development',
      name: 'Development',
      icon: <Code className="h-5 w-5" />,
      count: 32,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'auditing',
      name: 'Auditing',
      icon: <FileText className="h-5 w-5" />,
      count: 28,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'defi',
      name: 'DeFi',
      icon: <Zap className="h-5 w-5" />,
      count: 19,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'nft',
      name: 'NFT',
      icon: <Star className="h-5 w-5" />,
      count: 15,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'governance',
      name: 'Governance',
      icon: <Users className="h-5 w-5" />,
      count: 12,
      color: 'bg-teal-100 text-teal-700'
    }
  ];

  const featuredArticles = [
    {
      title: "Complete Guide to Smart Contract Security Auditing",
      description: "Learn the systematic approach to identifying vulnerabilities in smart contracts",
      category: "Auditing",
      readTime: "15 min",
      views: "2.3k",
      rating: 4.9,
      author: "Sarah Chen",
      date: "2024-01-15",
      tags: ["Security", "Solidity", "Best Practices"]
    },
    {
      title: "Understanding Reentrancy Attacks and Prevention",
      description: "Deep dive into one of the most common smart contract vulnerabilities",
      category: "Security", 
      readTime: "12 min",
      views: "1.8k",
      rating: 4.8,
      author: "Michael Torres",
      date: "2024-01-10",
      tags: ["Reentrancy", "Ethereum", "Vulnerabilities"]
    },
    {
      title: "DeFi Protocol Security: Flash Loan Attack Vectors",
      description: "Comprehensive analysis of flash loan exploits and mitigation strategies",
      category: "DeFi",
      readTime: "18 min", 
      views: "1.5k",
      rating: 4.7,
      author: "Alex Kim",
      date: "2024-01-08",
      tags: ["Flash Loans", "DeFi", "Security"]
    },
    {
      title: "Gas Optimization Techniques for Smart Contracts",
      description: "Practical strategies to reduce gas costs while maintaining security",
      category: "Development",
      readTime: "10 min",
      views: "1.2k", 
      rating: 4.6,
      author: "Emma Rodriguez",
      date: "2024-01-05",
      tags: ["Gas", "Optimization", "Solidity"]
    }
  ];

  const trendingTopics = [
    { name: "MEV Protection", growth: "+150%" },
    { name: "Account Abstraction", growth: "+120%" },
    { name: "Layer 2 Security", growth: "+95%" },
    { name: "Cross-chain Bridges", growth: "+80%" },
    { name: "Upgradeable Contracts", growth: "+75%" }
  ];

  const quickLinks = [
    { title: "Getting Started with Web3 Security", href: "/web3-security" },
    { title: "Smart Contract Audit Checklist", href: "/templates" },
    { title: "Security Tools & Resources", href: "/ai-tools" },
    { title: "Vulnerability Database", href: "/vulnerabilities" },
    { title: "Community Discussions", href: "/forum" },
    { title: "Security Events", href: "/events" }
  ];

  return (
    <ContentPage
      title="Knowledge Base"
      description="Comprehensive Web3 security knowledge repository with guides, tutorials, best practices, and expert insights for developers and auditors."
    >
      <div className="space-y-8">
        {/* Hero & Search */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Web3 Security <span className="text-primary">Knowledge Base</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive resource for blockchain security, smart contract best practices, 
            and cutting-edge Web3 development insights.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles, guides, tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge key={category.id} variant="secondary" className={`${category.color} hover:opacity-80 cursor-pointer`}>
                {category.icon}
                <span className="ml-1">{category.name} ({category.count})</span>
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                      <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                    </div>
                    <CardTitle className="text-lg hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                        <span>{article.views} views</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">By {article.author}</span>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTopics.map((topic, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {topic.growth}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12">
              <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Recent Articles</h3>
              <p className="text-muted-foreground">Stay updated with the latest security insights and developments.</p>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.count} articles</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <section className="bg-muted/50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickLinks.map((link, index) => (
              <Button key={index} variant="ghost" asChild className="justify-start">
                <Link to={link.href}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-muted-foreground mb-6">
            Join our community of security experts and get personalized help with your Web3 security questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/forum">
                <Users className="mr-2 h-4 w-4" />
                Ask the Community
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/request-audit">
                Get Expert Help
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default KnowledgeBase;
