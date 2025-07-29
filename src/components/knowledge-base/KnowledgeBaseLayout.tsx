
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, BookOpen, Star } from 'lucide-react';

export const KnowledgeBaseLayout = () => {
  return (
    <StandardLayout
      title="Knowledge Base | Hawkly"
      description="Comprehensive Web3 security guides and documentation"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Knowledge Base
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Learn Web3 security best practices from expert guides and tutorials
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search guides, tutorials, and documentation..."
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Smart Contract Security",
              description: "Learn to audit and secure smart contracts",
              icon: "🔒",
              count: 24,
              color: "bg-blue-50 hover:bg-blue-100"
            },
            {
              title: "DeFi Security",
              description: "Best practices for DeFi protocol security",
              icon: "💰",
              count: 18,
              color: "bg-green-50 hover:bg-green-100"
            },
            {
              title: "Security Tools",
              description: "Master security analysis tools",
              icon: "🛠️",
              count: 32,
              color: "bg-purple-50 hover:bg-purple-100"
            },
            {
              title: "Audit Methodology",
              description: "Professional audit processes",
              icon: "📋",
              count: 15,
              color: "bg-orange-50 hover:bg-orange-100"
            },
            {
              title: "Vulnerability Research",
              description: "Common vulnerabilities and exploits",
              icon: "🔍",
              count: 28,
              color: "bg-red-50 hover:bg-red-100"
            },
            {
              title: "Best Practices",
              description: "Industry standards and guidelines",
              icon: "⭐",
              count: 21,
              color: "bg-yellow-50 hover:bg-yellow-100"
            }
          ].map((category, index) => (
            <Card key={index} className={`cursor-pointer transition-colors ${category.color}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{category.icon}</div>
                  <Badge variant="secondary">{category.count} articles</Badge>
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Content */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Guides</h2>
            <Button variant="outline">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                title: "Complete Smart Contract Security Audit Guide",
                excerpt: "Learn the step-by-step process of conducting thorough smart contract security audits...",
                author: "Security Team",
                readTime: "15 min read",
                tags: ["Audit", "Security", "Guide"]
              },
              {
                title: "Common DeFi Vulnerabilities and How to Prevent Them",
                excerpt: "Explore the most frequent security issues in DeFi protocols and best practices...",
                author: "DeFi Expert",
                readTime: "12 min read",
                tags: ["DeFi", "Vulnerabilities", "Prevention"]
              }
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <Button className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Getting Started",
              "Audit Checklist",
              "Security Tools",
              "Video Tutorials"
            ].map((link, index) => (
              <Button key={index} variant="ghost" className="justify-start">
                {link}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};
