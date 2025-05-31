
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen,
  FileText,
  Video,
  Code,
  Search,
  ArrowRight,
  Star,
  MessageSquare,
  HelpCircle,
  Zap,
  Shield,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      title: "Getting Started",
      description: "Basic concepts and setup guides for Web3 security",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-800",
      articles: 24,
      popular: ["Web3 Security Basics", "Smart Contract Fundamentals", "Audit Process Overview"]
    },
    {
      title: "Security Tools",
      description: "Comprehensive guides for security analysis tools",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-800",
      articles: 18,
      popular: ["Slither Usage Guide", "MythX Integration", "AI-Powered Analysis"]
    },
    {
      title: "Vulnerability Patterns",
      description: "Common vulnerabilities and exploitation techniques",
      icon: Shield,
      color: "bg-red-100 text-red-800",
      articles: 32,
      popular: ["Reentrancy Attacks", "Flash Loan Exploits", "Oracle Manipulation"]
    },
    {
      title: "DeFi Security",
      description: "Specialized knowledge for DeFi protocol security",
      icon: Database,
      color: "bg-green-100 text-green-800",
      articles: 28,
      popular: ["Liquidity Pool Security", "Governance Attacks", "Cross-Protocol Risks"]
    },
    {
      title: "Platform Documentation",
      description: "How to use Hawkly platform features effectively",
      icon: FileText,
      color: "bg-purple-100 text-purple-800",
      articles: 16,
      popular: ["Auditor Onboarding", "Project Submission", "Payment Process"]
    },
    {
      title: "Troubleshooting",
      description: "Common issues and their solutions",
      icon: HelpCircle,
      color: "bg-orange-100 text-orange-800",
      articles: 12,
      popular: ["Integration Issues", "Payment Problems", "Communication Tips"]
    }
  ];

  const recentArticles = [
    {
      title: "AI-Enhanced Security Analysis: March 2025 Update",
      category: "Security Tools",
      views: "15.2k",
      rating: 4.9,
      type: "article",
      new: true
    },
    {
      title: "Layer 2 Security Considerations for 2025",
      category: "Getting Started", 
      views: "12.8k",
      rating: 4.8,
      type: "guide",
      new: true
    },
    {
      title: "Cross-Chain Bridge Vulnerabilities",
      category: "Vulnerability Patterns",
      views: "18.4k",
      rating: 4.9,
      type: "article"
    },
    {
      title: "DeFi MEV Protection Strategies",
      category: "DeFi Security",
      views: "14.7k",
      rating: 4.7,
      type: "guide"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.popular.some(article => article.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <StandardLayout
      title="Knowledge Base"
      description="Comprehensive documentation and resources for Web3 security"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive resource for Web3 security knowledge, platform documentation, 
            and troubleshooting guides updated for the 2025 security landscape.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search documentation, guides, and troubleshooting..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">130+</div>
            <div className="text-sm text-muted-foreground">Documentation Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">45+</div>
            <div className="text-sm text-muted-foreground">Video Tutorials</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">89%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Access Available</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className={category.color}>
                      {category.articles} articles
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Articles:</h4>
                      <ul className="space-y-1">
                        {category.popular.map((article, idx) => (
                          <li key={idx} className="text-sm hover:text-primary cursor-pointer">
                            • {article}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full">
                      Browse Category <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Articles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Recently Updated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {article.new && (
                          <Badge variant="default" className="text-xs">New 2025</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {article.type === 'article' ? <FileText className="h-3 w-3 mr-1" /> : <Video className="h-3 w-3 mr-1" />}
                          {article.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {article.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {article.rating}
                    </span>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Community Q&A</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get answers from security experts and community members
            </p>
            <Button variant="outline" asChild>
              <Link to="/forum">Visit Forum</Link>
            </Button>
          </Card>

          <Card className="text-center p-6">
            <Video className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn through hands-on video guides and demonstrations
            </p>
            <Button variant="outline" asChild>
              <Link to="/tutorials">Watch Tutorials</Link>
            </Button>
          </Card>

          <Card className="text-center p-6">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Get Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Need help? Contact our support team for assistance
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our knowledge base is constantly expanding. Suggest new topics or get personalized help from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask the Community
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default KnowledgeBase;
