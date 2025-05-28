
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Search, Book, FileText, Video, ExternalLink, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: "Getting Started",
      description: "Basic concepts and first steps in Web3 security",
      icon: <Book className="h-6 w-6" />,
      articles: [
        { title: "What is Web3 Security?", type: "article", readTime: "5 min" },
        { title: "Smart Contract Basics", type: "article", readTime: "8 min" },
        { title: "Common Vulnerabilities Overview", type: "article", readTime: "10 min" },
        { title: "Security Audit Process", type: "video", readTime: "15 min" }
      ]
    },
    {
      title: "Smart Contract Security",
      description: "In-depth guides for securing smart contracts",
      icon: <FileText className="h-6 w-6" />,
      articles: [
        { title: "Reentrancy Attack Prevention", type: "article", readTime: "12 min" },
        { title: "Access Control Patterns", type: "article", readTime: "15 min" },
        { title: "Gas Optimization Security", type: "article", readTime: "10 min" },
        { title: "Testing Smart Contracts", type: "video", readTime: "25 min" }
      ]
    },
    {
      title: "DeFi Security",
      description: "Specialized security for decentralized finance",
      icon: <Video className="h-6 w-6" />,
      articles: [
        { title: "Flash Loan Attack Prevention", type: "article", readTime: "18 min" },
        { title: "Oracle Manipulation Defenses", type: "article", readTime: "20 min" },
        { title: "MEV Protection Strategies", type: "article", readTime: "16 min" },
        { title: "DeFi Security Checklist", type: "guide", readTime: "30 min" }
      ]
    },
    {
      title: "Audit Process",
      description: "Understanding security audits and reviews",
      icon: <ExternalLink className="h-6 w-6" />,
      articles: [
        { title: "Preparing for an Audit", type: "article", readTime: "12 min" },
        { title: "Reading Audit Reports", type: "article", readTime: "10 min" },
        { title: "Post-Audit Actions", type: "article", readTime: "8 min" },
        { title: "Continuous Security Monitoring", type: "video", readTime: "20 min" }
      ]
    }
  ];

  const popularArticles = [
    { title: "Top 10 Smart Contract Vulnerabilities in 2025", readTime: "15 min", views: "12.5k" },
    { title: "Complete Guide to DeFi Security", readTime: "25 min", views: "8.2k" },
    { title: "How to Choose a Security Auditor", readTime: "10 min", views: "6.8k" },
    { title: "Emergency Response for Security Incidents", readTime: "12 min", views: "5.4k" }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'guide': return <Book className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Knowledge Base | Hawkly</title>
        <meta name="description" content="Comprehensive knowledge base for Web3 security, smart contract development, and blockchain security best practices." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Knowledge 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Base</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive resources, guides, and tutorials to help you understand and implement 
            Web3 security best practices.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{article.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.readTime}</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(article.type)}
                          <span className="font-medium">{article.title}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(article.type)} variant="secondary">
                          {article.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{article.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Articles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our security experts are here to help. Get personalized guidance or request specific topics to be added to our knowledge base.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button>Contact Support</Button>
            </Link>
            <Link to="/request-audit">
              <Button variant="outline">Get Professional Audit</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
