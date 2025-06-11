
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Shield, Code, Users, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecurityGuides() {
  const guides = [
    {
      title: "Smart Contract Security Best Practices",
      description: "Comprehensive guide to writing secure smart contracts",
      level: "Beginner",
      category: "Development",
      readTime: "15 min",
      icon: Shield
    },
    {
      title: "Common Vulnerabilities and How to Avoid Them",
      description: "Learn about the most common security issues in Web3",
      level: "Intermediate",
      category: "Security",
      readTime: "20 min",
      icon: Code
    },
    {
      title: "Security Testing Methodologies",
      description: "Step-by-step guide to testing smart contract security",
      level: "Advanced",
      category: "Testing",
      readTime: "25 min",
      icon: Users
    }
  ];

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Security Guides</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive security guides and best practices for Web3 development. 
              Learn from industry experts and stay ahead of security threats.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">All</Badge>
              <Badge variant="outline">Beginner</Badge>
              <Badge variant="outline">Intermediate</Badge>
              <Badge variant="outline">Advanced</Badge>
            </div>
          </div>

          {/* Featured Guides */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <Badge variant="secondary">{guide.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{guide.readTime} read</span>
                      <Badge variant={guide.level === 'Beginner' ? 'default' : guide.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {guide.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Categories Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Development Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-primary hover:underline">Secure Coding Practices</Link></li>
                  <li><Link to="#" className="text-primary hover:underline">Gas Optimization Techniques</Link></li>
                  <li><Link to="#" className="text-primary hover:underline">Access Control Patterns</Link></li>
                  <li><Link to="#" className="text-primary hover:underline">Upgrade Patterns & Proxy Contracts</Link></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-primary hover:underline">Automated Testing Tools</Link></li>
                  <li><Link to="#" className="text-primary hover:underline">Manual Review Techniques</Link></li>
                  <li><Link to="#" className="text-primary hover:underline">Fuzzing Strategies</Link></li>
                  <li><Link to="#" className="text-primary hover:underline">Formal Verification</Link></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Need Personalized Security Guidance?</h2>
            <p className="text-muted-foreground mb-6">
              Get expert consultation tailored to your specific project needs
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/consulting">
                  Get Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">Browse Experts</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
