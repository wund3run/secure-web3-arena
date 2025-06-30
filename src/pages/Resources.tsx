
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandardizedPageLayout } from '@/components/layout/StandardizedPageLayout';
import { BookOpen, Shield, Video, FileText, Users, Zap, ArrowRight, ExternalLink } from 'lucide-react';

export default function Resources() {
  const resourceCategories = [
    {
      title: "Security Guides",
      icon: Shield,
      description: "Comprehensive security best practices and tutorials",
      items: [
        { title: "Smart Contract Security Checklist", href: "/security-guides", type: "guide" },
        { title: "Common Vulnerabilities Guide", href: "/security-guides", type: "guide" },
        { title: "DeFi Security Best Practices", href: "/security-guides", type: "guide" },
        { title: "NFT Security Guidelines", href: "/security-guides", type: "guide" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      description: "Step-by-step video content for auditors and developers",
      items: [
        { title: "How to Conduct a Security Audit", href: "/tutorials", type: "video" },
        { title: "Using Hawkly Platform Guide", href: "/tutorials", type: "video" },
        { title: "Smart Contract Testing Techniques", href: "/tutorials", type: "video" },
        { title: "Vulnerability Assessment Methods", href: "/tutorials", type: "video" }
      ]
    },
    {
      title: "Documentation",
      icon: FileText,
      description: "Technical documentation and API references",
      items: [
        { title: "Platform API Documentation", href: "/documentation", type: "docs" },
        { title: "Integration Guides", href: "/documentation", type: "docs" },
        { title: "Audit Report Templates", href: "/documentation", type: "docs" },
        { title: "Security Standards Reference", href: "/documentation", type: "docs" }
      ]
    },
    {
      title: "Tools & Resources",
      icon: Zap,
      description: "AI-powered tools and utilities for security analysis",
      items: [
        { title: "AI Security Scanner", href: "/ai-tools", type: "tool" },
        { title: "Vulnerability Database", href: "/ai-tools", type: "tool" },
        { title: "Code Analysis Tools", href: "/ai-tools", type: "tool" },
        { title: "Risk Assessment Calculator", href: "/ai-tools", type: "tool" }
      ]
    }
  ];

  const externalResources = [
    {
      title: "OpenZeppelin Security Guidelines",
      description: "Industry-standard security practices for smart contracts",
      url: "https://docs.openzeppelin.com/contracts/security",
      category: "External Guide"
    },
    {
      title: "ConsenSys Security Best Practices",
      description: "Comprehensive security development lifecycle guidelines",
      url: "https://consensys.github.io/smart-contract-best-practices/",
      category: "External Guide"
    },
    {
      title: "Ethereum Security Resources",
      description: "Official Ethereum security documentation and tools",
      url: "https://ethereum.org/en/developers/docs/smart-contracts/security/",
      category: "External Guide"
    }
  ];

  return (
    <StandardizedPageLayout
      title="Web3 Security Resources Hub"
      description="Comprehensive collection of security guides, tutorials, documentation, and tools for Web3 developers and security auditors."
      keywords={['web3 security resources', 'smart contract security guides', 'blockchain security tutorials', 'audit documentation']}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Web3 Security Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to build, audit, and secure Web3 applications. 
            From beginner guides to advanced security techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link to="/security-guides">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/support">Get Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the resources you need to enhance your Web3 security knowledge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to={item.href}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group"
                        >
                          <span className="text-sm">{item.title}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" asChild className="w-full mt-4">
                    <Link to={category.items[0].href}>
                      View All {category.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">External Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curated links to essential security resources from across the Web3 ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {externalResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Visit Resource
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with security experts, share knowledge, and stay updated on the latest Web3 security trends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="https://discord.gg/hawkly" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/hawkly" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://twitter.com/hawkly_security" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get professional security audit from verified experts
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/request-audit">Request Security Audit</Link>
          </Button>
        </div>
      </section>
    </StandardizedPageLayout>
  );
}
