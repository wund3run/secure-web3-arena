
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Shield, Download, Clock, Users } from 'lucide-react';

const SecurityGuidesPage = () => {
  const guides = [
    {
      title: "Smart Contract Security Best Practices",
      description: "Comprehensive guide to secure smart contract development",
      level: "Beginner",
      readTime: "15 min",
      downloads: "2.3k",
      category: "Smart Contracts"
    },
    {
      title: "DeFi Security Architecture",
      description: "Advanced patterns for building secure DeFi protocols",
      level: "Advanced",
      readTime: "25 min",
      downloads: "1.8k",
      category: "DeFi"
    },
    {
      title: "NFT Security Checklist",
      description: "Essential security considerations for NFT projects",
      level: "Intermediate",
      readTime: "10 min",
      downloads: "1.5k",
      category: "NFTs"
    }
  ];

  return (
    <StandardLayout
      title="Security Guides | Hawkly"
      description="Comprehensive security guides and best practices for Web3 development"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn & Secure
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Guides & Best Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from industry experts with our comprehensive security guides and best practices
          </p>
        </div>

        {/* Featured Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{guide.category}</Badge>
                  <Badge variant="outline">{guide.level}</Badge>
                </div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{guide.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {guide.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {guide.downloads}
                  </div>
                </div>
                <Button className="w-full">Read Guide</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Smart Contracts', 'DeFi', 'NFTs', 'Infrastructure', 'Governance', 'Privacy', 'Compliance', 'Wallets'].map((category) => (
                <Button key={category} variant="outline" className="h-20 flex-col">
                  <Shield className="h-6 w-6 mb-2" />
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Latest Security Practices</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest security guides and industry insights.
            </p>
            <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
              Subscribe to Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default SecurityGuidesPage;
