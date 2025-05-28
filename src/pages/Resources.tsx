
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookOpen, FileText, Video, Download, ExternalLink, Shield, Code, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function Resources() {
  const resourceCategories = [
    {
      title: "Documentation",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Platform guides, API documentation, and integration tutorials",
      link: "/docs",
      resources: [
        "Platform API Reference",
        "Integration Guides", 
        "SDK Documentation",
        "Migration Tutorials"
      ]
    },
    {
      title: "Security Guides",
      icon: <Shield className="h-6 w-6" />,
      description: "Comprehensive security best practices and vulnerability prevention",
      link: "/guides",
      resources: [
        "Smart Contract Security Checklist",
        "DeFi Security Framework",
        "NFT Security Best Practices",
        "Cross-Chain Security Guide"
      ]
    },
    {
      title: "Knowledge Base",
      icon: <FileText className="h-6 w-6" />,
      description: "In-depth articles, tutorials, and educational content",
      link: "/knowledge-base",
      resources: [
        "Security Fundamentals",
        "Audit Process Guide",
        "Vulnerability Database",
        "Case Studies"
      ]
    },
    {
      title: "Templates & Tools",
      icon: <Code className="h-6 w-6" />,
      description: "Ready-to-use templates, checklists, and development tools",
      link: "/templates",
      resources: [
        "Security Audit Templates",
        "Smart Contract Templates",
        "Security Checklists",
        "Testing Frameworks"
      ]
    }
  ];

  const featuredResources = [
    {
      title: "Complete Web3 Security Handbook 2025",
      description: "Comprehensive 200-page guide covering all aspects of Web3 security",
      type: "PDF Guide",
      size: "15.2 MB",
      downloads: "25,847",
      badge: "Featured"
    },
    {
      title: "Smart Contract Security Masterclass",
      description: "6-hour video course covering advanced security concepts and best practices",
      type: "Video Course",
      duration: "6 hours",
      downloads: "12,334",
      badge: "Popular"
    },
    {
      title: "DeFi Security Assessment Toolkit",
      description: "Complete toolkit for assessing DeFi protocol security vulnerabilities",
      type: "Toolkit",
      size: "42.8 MB",
      downloads: "8,912",
      badge: "New"
    }
  ];

  const externalResources = [
    {
      title: "OpenZeppelin Security Guidelines",
      description: "Industry-standard security guidelines and best practices",
      url: "https://docs.openzeppelin.com/contracts/security-considerations",
      provider: "OpenZeppelin"
    },
    {
      title: "ConsenSys Diligence Blog",
      description: "Latest security research and vulnerability discoveries",
      url: "https://consensys.net/diligence/blog/",
      provider: "ConsenSys"
    },
    {
      title: "OWASP Web3 Security Guide",
      description: "Comprehensive Web3 security testing methodology",
      url: "https://owasp.org/www-project-web3-security/",
      provider: "OWASP"
    },
    {
      title: "Ethereum Security Best Practices",
      description: "Official Ethereum Foundation security recommendations",
      url: "https://ethereum.org/en/developers/docs/smart-contracts/security/",
      provider: "Ethereum Foundation"
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case 'Featured': return 'bg-blue-100 text-blue-800';
      case 'Popular': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resources | Hawkly</title>
        <meta name="description" content="Comprehensive Web3 security resources, guides, templates, and tools for developers and security professionals." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <FileText className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Resource Center</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Resources</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to build secure Web3 applications. From comprehensive guides to 
            practical tools, find all the resources to enhance your project's security.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resourceCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                  {category.icon}
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <CardDescription className="text-sm">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <li key={resourceIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {resource}
                    </li>
                  ))}
                </ul>
                <Link to={category.link}>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Resources</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getBadgeColor(resource.badge)}>
                      {resource.badge}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{resource.type}</span>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <span>{resource.size || resource.duration}</span>
                    <span>{resource.downloads} downloads</span>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">External Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {externalResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <span className="text-xs text-primary">{resource.provider}</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get notified when we publish new security guides, tools, and resources. Join thousands of 
            developers staying ahead of Web3 security threats.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button>Subscribe to Newsletter</Button>
            <Link to="/community">
              <Button variant="outline">Join Community</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
