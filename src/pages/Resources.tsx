
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Download, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Resources() {
  const resourceCategories = [
    {
      title: "Security Guides",
      description: "Comprehensive guides for Web3 security best practices",
      icon: BookOpen,
      items: [
        "Smart Contract Security Checklist",
        "DeFi Protocol Security Framework", 
        "Cross-Chain Security Guidelines",
        "Layer 2 Security Considerations"
      ],
      link: "/security-guides"
    },
    {
      title: "Video Tutorials",
      description: "Expert-led tutorials on Web3 security topics",
      icon: Video,
      items: [
        "Smart Contract Auditing Fundamentals",
        "Advanced Vulnerability Detection",
        "DeFi Security Analysis",
        "AI-Powered Security Tools"
      ],
      link: "/tutorials"
    },
    {
      title: "Templates & Tools",
      description: "Ready-to-use templates and security tools",
      icon: FileText,
      items: [
        "Audit Report Templates",
        "Security Checklist Templates",
        "Vulnerability Assessment Forms",
        "Risk Assessment Frameworks"
      ],
      link: "/templates"
    },
    {
      title: "Knowledge Base", 
      description: "Searchable database of security knowledge",
      icon: Shield,
      items: [
        "Common Vulnerability Patterns",
        "Security Best Practices Database",
        "Protocol-Specific Guidelines",
        "Emergency Response Procedures"
      ],
      link: "/knowledge-base"
    }
  ];

  return (
    <StandardLayout 
      title="Resource Center" 
      description="Comprehensive Web3 security resources and learning materials - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Security Resource Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build secure Web3 applications. From beginner guides to advanced security frameworks, 
            all curated by our expert security community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {resourceCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <category.icon className="h-8 w-8 text-primary" />
                  <CardTitle>{category.title}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link to={category.link}>
                    Explore {category.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link to="/docs">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Documentation</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link to="/blog">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">Security Blog</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link to="/vulnerabilities">
                <Shield className="h-6 w-6 mb-2" />
                <span className="text-sm">Vulnerabilities</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link to="/forum">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-sm">Community</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h3>
          <p className="text-muted-foreground mb-6">
            Connect with our security experts for tailored advice and comprehensive security assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/request-audit">Get Security Audit</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
