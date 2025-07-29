
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Code, FileText, Star, Zap } from 'lucide-react';

const TemplatesPage = () => {
  return (
    <StandardLayout
      title="Templates | Hawkly"
      description="Ready-to-use security templates and code samples for Web3 projects"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Ready to Use
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Accelerate your development with battle-tested security templates and code samples
          </p>
        </div>

        {/* Template Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Contract Templates",
              description: "Secure smart contract boilerplates",
              icon: <Code className="h-6 w-6" />,
              count: 15,
              popular: true,
              templates: [
                "ERC-20 Token with Security Features",
                "Multi-sig Wallet Contract",
                "Access Control Template"
              ]
            },
            {
              title: "Security Checklists",
              description: "Comprehensive security checklists",
              icon: <FileText className="h-6 w-6" />,
              count: 8,
              popular: false,
              templates: [
                "Smart Contract Audit Checklist",
                "DeFi Security Review",
                "NFT Security Checklist"
              ]
            },
            {
              title: "Test Suites",
              description: "Security testing templates",
              icon: <Star className="h-6 w-6" />,
              count: 12,
              popular: true,
              templates: [
                "Vulnerability Test Suite",
                "Fuzzing Test Templates",
                "Integration Test Framework"
              ]
            }
          ].map((category, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow ${category.popular ? 'border-hawkly-primary/50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-hawkly-primary/10 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      {category.popular && <Badge className="mt-1 bg-hawkly-primary">Popular</Badge>}
                    </div>
                  </div>
                  <Badge variant="outline">{category.count}</Badge>
                </div>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {category.templates.map((template, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">{template}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full">View All Templates</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Templates */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Secure DeFi Protocol Template",
                description: "Complete template for building secure DeFi protocols with access controls, emergency stops, and upgrade mechanisms.",
                downloads: "1.2k",
                rating: 4.9,
                language: "Solidity",
                lastUpdated: "2 days ago"
              },
              {
                title: "NFT Marketplace Security Template",
                description: "Comprehensive template for NFT marketplaces with royalty management, escrow, and anti-fraud mechanisms.",
                downloads: "850",
                rating: 4.8,
                language: "Solidity",
                lastUpdated: "1 week ago"
              }
            ].map((template, index) => (
              <Card key={index} className="border-hawkly-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <Badge variant="outline">{template.language}</Badge>
                  </div>
                  <p className="text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {template.downloads} downloads
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {template.rating}
                    </div>
                    <span>Updated {template.lastUpdated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">Preview</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Template?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our experts can create custom templates for your specific needs.
            </p>
            <Button size="lg" className="bg-hawkly-primary hover:bg-hawkly-primary/90">
              Request Custom Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default TemplatesPage;
