
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Book, Shield, Code, Zap, Users, FileText, 
  ArrowRight, Star, Clock, TrendingUp, Bookmark, Bot,
  Brain, Cpu, Globe, Lock, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'security',
      name: 'Security',
      icon: <Shield className="h-5 w-5" />,
      count: 68,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 'ai-security',
      name: 'AI Security',
      icon: <Bot className="h-5 w-5" />,
      count: 42,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'development',
      name: 'Development',
      icon: <Code className="h-5 w-5" />,
      count: 39,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'auditing',
      name: 'Auditing',
      icon: <FileText className="h-5 w-5" />,
      count: 35,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'defi',
      name: 'DeFi',
      icon: <Zap className="h-5 w-5" />,
      count: 28,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'cross-chain',
      name: 'Cross-Chain',
      icon: <Globe className="h-5 w-5" />,
      count: 24,
      color: 'bg-cyan-100 text-cyan-700'
    },
    {
      id: 'zk-proofs',
      name: 'ZK Proofs',
      icon: <Lock className="h-5 w-5" />,
      count: 19,
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'governance',
      name: 'Governance',
      icon: <Users className="h-5 w-5" />,
      count: 16,
      color: 'bg-teal-100 text-teal-700'
    }
  ];

  const featuredArticles = [
    {
      title: "AI-Enhanced Smart Contract Auditing: The 2025 Revolution",
      description: "How machine learning models are transforming vulnerability detection with 95% accuracy rates",
      category: "AI Security",
      readTime: "18 min",
      views: "4.2k",
      rating: 4.9,
      author: "Dr. Elena Vasquez",
      date: "2025-01-20",
      tags: ["AI", "Machine Learning", "Automated Auditing", "GPT-4"],
      isNew: true
    },
    {
      title: "Cross-Chain Bridge Security: Lessons from $3.2B in Losses",
      description: "Comprehensive analysis of bridge vulnerabilities and emerging security patterns in 2024-2025",
      category: "Cross-Chain",
      readTime: "22 min",
      views: "3.8k",
      rating: 4.8,
      author: "Marcus Chen",
      date: "2025-01-15",
      tags: ["Bridges", "Cross-Chain", "Security", "Vulnerabilities"]
    },
    {
      title: "Zero-Knowledge Proof Security: Privacy Meets Verification",
      description: "Deep dive into ZK-STARK and ZK-SNARK security implications for smart contracts",
      category: "ZK Proofs",
      readTime: "16 min",
      views: "2.9k",
      rating: 4.7,
      author: "Prof. Aisha Patel",
      date: "2025-01-10",
      tags: ["ZK-Proofs", "Privacy", "Cryptography", "Scaling"]
    },
    {
      title: "Formal Verification in Practice: Mathematical Proof Systems",
      description: "Real-world implementation of formal verification tools for critical DeFi protocols",
      category: "Development",
      readTime: "20 min",
      views: "2.5k",
      rating: 4.6,
      author: "Sarah Kim",
      date: "2025-01-08",
      tags: ["Formal Verification", "Mathematics", "Proofs", "DeFi"]
    },
    {
      title: "MEV Protection Strategies: Beyond Traditional Defenses",
      description: "Advanced techniques for protecting against MEV attacks using private mempools and commit-reveal",
      category: "DeFi",
      readTime: "14 min",
      views: "2.3k",
      rating: 4.8,
      author: "Alex Rodriguez",
      date: "2025-01-05",
      tags: ["MEV", "Flashbots", "Private Pools", "DeFi"]
    },
    {
      title: "Account Abstraction Security Patterns",
      description: "EIP-4337 implementation security considerations and best practices",
      category: "Development",
      readTime: "12 min",
      views: "1.9k",
      rating: 4.5,
      author: "Jordan Walsh",
      date: "2025-01-03",
      tags: ["Account Abstraction", "EIP-4337", "Wallets", "UX"]
    }
  ];

  const trendingTopics = [
    { name: "AI-Powered Exploit Detection", growth: "+340%", icon: <Brain className="h-4 w-4" /> },
    { name: "Quantum-Resistant Cryptography", growth: "+280%", icon: <Cpu className="h-4 w-4" /> },
    { name: "Cross-Chain Security", growth: "+195%", icon: <Globe className="h-4 w-4" /> },
    { name: "ZK-Proof Vulnerabilities", growth: "+150%", icon: <Lock className="h-4 w-4" /> },
    { name: "Intent-Based Architecture", growth: "+125%", icon: <Zap className="h-4 w-4" /> },
    { name: "Modular Blockchain Security", growth: "+110%", icon: <Code className="h-4 w-4" /> }
  ];

  const emergingTopics = [
    {
      title: "Post-Quantum Cryptography Migration",
      description: "Preparing blockchain systems for quantum computer threats",
      urgency: "High",
      timeline: "2025-2030"
    },
    {
      title: "AI Agent Security Frameworks",
      description: "Securing autonomous AI agents in DeFi and governance",
      urgency: "Critical",
      timeline: "2025"
    },
    {
      title: "Modular Rollup Security",
      description: "Security implications of disaggregated blockchain architecture",
      urgency: "Medium",
      timeline: "2025-2026"
    }
  ];

  const quickLinks = [
    { title: "2025 Web3 Security Landscape", href: "/web3-security" },
    { title: "AI-Enhanced Audit Tools", href: "/ai-tools" },
    { title: "Smart Contract Audit Checklist", href: "/templates" },
    { title: "Cross-Chain Security Guide", href: "/guides" },
    { title: "Vulnerability Database", href: "/vulnerabilities" },
    { title: "Community Security Forum", href: "/forum" },
    { title: "Security Research Events", href: "/events" },
    { title: "ZK-Proof Security Patterns", href: "/tutorials" }
  ];

  return (
    <ContentPage
      title="Knowledge Base"
      description="Comprehensive Web3 security knowledge repository with cutting-edge guides, AI-enhanced tutorials, and expert insights for 2025 security challenges."
    >
      <div className="space-y-8">
        {/* Hero & Search */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            <Bot className="h-4 w-4" />
            271 articles updated with AI-enhanced security insights for 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Web3 Security <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Knowledge Base</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive resource for next-generation blockchain security, AI-enhanced auditing, 
            cross-chain protection, and zero-knowledge proof implementations.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search AI security, ZK proofs, cross-chain..."
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

        {/* 2025 Security Stats */}
        <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Web3 Security Insights 2025</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600">271</div>
              <div className="text-sm text-muted-foreground">Security articles</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-muted-foreground">AI detection accuracy</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">67%</div>
              <div className="text-sm text-muted-foreground">Exploit prevention rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-600">2.4s</div>
              <div className="text-sm text-muted-foreground">Avg AI audit time</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="emerging">Emerging</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className={
                          article.category === 'AI Security' ? 'bg-purple-100 text-purple-700' :
                          article.category === 'Cross-Chain' ? 'bg-cyan-100 text-cyan-700' :
                          article.category === 'ZK Proofs' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {article.category}
                        </Badge>
                        {article.isNew && (
                          <Badge className="bg-green-100 text-green-700 text-xs">NEW</Badge>
                        )}
                      </div>
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
                      <div className="flex items-center gap-2">
                        {topic.icon}
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
                      </div>
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

          <TabsContent value="emerging" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              {emergingTopics.map((topic, index) => (
                <Card key={index} className="border-orange-200 bg-orange-50/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          {topic.title}
                        </CardTitle>
                        <CardDescription className="text-orange-700 mt-2">
                          {topic.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={
                          topic.urgency === 'Critical' ? 'text-red-600 border-red-300' :
                          topic.urgency === 'High' ? 'text-orange-600 border-orange-300' :
                          'text-yellow-600 border-yellow-300'
                        }>
                          {topic.urgency}
                        </Badge>
                        <p className="text-sm text-orange-600 mt-1">{topic.timeline}</p>
                      </div>
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
              <p className="text-muted-foreground">Stay updated with the latest security insights and developments for 2025.</p>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <h3 className="text-xl font-semibold mb-4">Quick Access to 2025 Security Resources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
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
        <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Expert Security Guidance for 2025?</h2>
          <p className="text-muted-foreground mb-6">
            Connect with our AI-enhanced security experts who stay ahead of emerging threats 
            and implement cutting-edge protection strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/forum">
                <Users className="mr-2 h-4 w-4" />
                Join Security Community
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/request-audit">
                Get AI-Enhanced Audit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default KnowledgeBase;
