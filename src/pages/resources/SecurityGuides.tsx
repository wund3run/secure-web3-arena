
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Shield, Code, AlertTriangle, Search, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredGuides = [
  {
    title: "Smart Contract Security Fundamentals",
    description: "Essential security principles every Web3 developer must know",
    category: "Fundamentals",
    readTime: "15 min",
    level: "Beginner",
    icon: Shield,
    href: "/security-guides/fundamentals"
  },
  {
    title: "Common Vulnerability Patterns",
    description: "Identify and prevent the most frequent security issues in smart contracts",
    category: "Vulnerabilities",
    readTime: "25 min", 
    level: "Intermediate",
    icon: AlertTriangle,
    href: "/security-guides/vulnerabilities"
  },
  {
    title: "Secure Coding Best Practices",
    description: "Write more secure smart contracts with these proven techniques",
    category: "Development",
    readTime: "30 min",
    level: "Intermediate",
    icon: Code,
    href: "/security-guides/best-practices"
  }
];

const guideCategories = [
  {
    name: "Fundamentals",
    count: 12,
    description: "Basic security concepts and principles",
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Vulnerabilities",
    count: 18,
    description: "Common attack vectors and how to prevent them",
    color: "bg-red-100 text-red-600"
  },
  {
    name: "Development",
    count: 15,
    description: "Secure coding practices and tools",
    color: "bg-green-100 text-green-600"
  },
  {
    name: "Auditing",
    count: 8,
    description: "How to conduct security reviews",
    color: "bg-purple-100 text-purple-600"
  },
  {
    name: "Protocols",
    count: 10,
    description: "Protocol-specific security considerations",
    color: "bg-orange-100 text-orange-600"
  },
  {
    name: "Tools",
    count: 14,
    description: "Security analysis and testing tools",
    color: "bg-teal-100 text-teal-600"
  }
];

const recentGuides = [
  {
    title: "Reentrancy Attacks: Prevention Guide",
    author: "Alex Chen",
    publishDate: "2 days ago",
    category: "Vulnerabilities"
  },
  {
    title: "Gas Optimization Security Considerations", 
    author: "Sarah Kim",
    publishDate: "5 days ago",
    category: "Development"
  },
  {
    title: "Multi-signature Wallet Security",
    author: "Mike Johnson",
    publishDate: "1 week ago",
    category: "Protocols"
  },
  {
    title: "Automated Testing for Smart Contracts",
    author: "Lisa Wang",
    publishDate: "1 week ago",
    category: "Tools"
  }
];

export default function SecurityGuides() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Knowledge Hub
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Web3 Security Guides</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Learn from security experts with comprehensive guides, tutorials, and best practices 
            for building secure Web3 applications.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search security guides..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Featured Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Card key={guide.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <guide.icon className="h-5 w-5 text-primary" />
                    <Badge variant="outline" className="text-xs">{guide.category}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readTime}
                    </div>
                    <Badge variant="secondary" className="text-xs">{guide.level}</Badge>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={guide.href}>Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guideCategories.map((category) => (
                <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge className={category.color}>{category.count}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Guides Sidebar */}
          <div>
            <h3 className="text-xl font-bold mb-6">Recent Guides</h3>
            <div className="space-y-4">
              {recentGuides.map((guide, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 leading-tight">{guide.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <User className="h-3 w-3" />
                      {guide.author}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{guide.category}</Badge>
                      <span className="text-xs text-muted-foreground">{guide.publishDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="mt-6 bg-muted/50">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Need Expert Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized security guidance from our experts
                </p>
                <Button asChild className="w-full">
                  <Link to="/consulting">Get Consulting</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
