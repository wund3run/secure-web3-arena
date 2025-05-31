
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Shield, ArrowRight, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Documentation() {
  const docSections = [
    {
      title: "Getting Started",
      description: "Quick start guides for project owners and auditors",
      icon: BookOpen,
      items: [
        "Platform Overview",
        "Creating Your First Audit Request", 
        "Onboarding as a Security Expert",
        "Understanding Audit Types"
      ]
    },
    {
      title: "API Documentation",
      description: "Complete API reference for platform integration",
      icon: Code,
      items: [
        "Authentication & Authorization",
        "Audit Management APIs",
        "Webhook Integration",
        "Rate Limiting & Usage"
      ]
    },
    {
      title: "Security Standards", 
      description: "Industry standards and best practices for Web3 security",
      icon: Shield,
      items: [
        "Smart Contract Security Patterns",
        "DeFi Security Guidelines",
        "Cross-Chain Security Considerations",
        "AI-Powered Security Analysis"
      ]
    }
  ];

  return (
    <StandardLayout 
      title="Documentation" 
      description="Comprehensive guides and resources for Web3 security - Updated March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Platform Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about using Hawkly's Web3 security marketplace. 
            From quick start guides to advanced API integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {docSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <section.icon className="h-8 w-8 text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Getting Started?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you succeed with Web3 security best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/tutorials">Watch Tutorials</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
