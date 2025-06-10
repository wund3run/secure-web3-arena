
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, ExternalLink, Star } from 'lucide-react';

const KnowledgeBasePage = () => {
  return (
    <StandardLayout
      title="Knowledge Base | Hawkly"
      description="Comprehensive documentation and resources for Web3 security"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Knowledge Base
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers, documentation, and resources for all your Web3 security needs
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search the knowledge base..." 
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Popular Articles */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Popular Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Getting Started with Smart Contract Audits", views: "15.2k", category: "Getting Started" },
                { title: "Understanding Common Vulnerabilities", views: "12.8k", category: "Security" },
                { title: "How to Choose the Right Auditor", views: "9.3k", category: "Marketplace" },
                { title: "Audit Report Interpretation Guide", views: "8.1k", category: "Reports" }
              ].map((article, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Getting Started",
              description: "New to Web3 security? Start here",
              articles: 25,
              icon: "🚀"
            },
            {
              title: "Smart Contract Security",
              description: "Best practices for secure contracts",
              articles: 42,
              icon: "🔒"
            },
            {
              title: "DeFi Security",
              description: "Securing decentralized finance protocols",
              articles: 18,
              icon: "💰"
            },
            {
              title: "NFT Security",
              description: "Protecting non-fungible token projects",
              articles: 15,
              icon: "🎨"
            },
            {
              title: "Audit Process",
              description: "Understanding security audits",
              articles: 32,
              icon: "📋"
            },
            {
              title: "Tools & Resources",
              description: "Security tools and utilities",
              articles: 28,
              icon: "🛠️"
            }
          ].map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{category.articles} articles</span>
                  <Button variant="ghost" size="sm">
                    Browse <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StandardLayout>
  );
};

export default KnowledgeBasePage;
