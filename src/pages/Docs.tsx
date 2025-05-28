
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Book, 
  Code, 
  Shield, 
  Zap, 
  Users, 
  Settings, 
  ExternalLink,
  ChevronRight,
  FileText,
  GitBranch,
  Database
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickStartGuides = [
    {
      title: "Getting Started with Hawkly",
      description: "Complete onboarding guide for new users",
      time: "5 min",
      level: "Beginner",
      icon: <Book className="h-5 w-5" />
    },
    {
      title: "Requesting Your First Audit",
      description: "Step-by-step guide to audit requests",
      time: "10 min",
      level: "Beginner",
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "Becoming a Verified Auditor",
      description: "Join our network of security experts",
      time: "15 min",
      level: "Intermediate",
      icon: <Users className="h-5 w-5" />
    }
  ];

  const apiDocuments = [
    {
      title: "Authentication API",
      description: "User authentication and session management",
      endpoint: "/api/auth",
      method: "POST",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Audit Requests API",
      description: "Create and manage audit requests",
      endpoint: "/api/audits",
      method: "GET/POST",
      icon: <Database className="h-5 w-5" />
    },
    {
      title: "Marketplace API",
      description: "Browse and filter security services",
      endpoint: "/api/marketplace",
      method: "GET",
      icon: <GitBranch className="h-5 w-5" />
    }
  ];

  const securityGuides = [
    {
      title: "Smart Contract Security Checklist",
      description: "Essential security practices for smart contracts",
      category: "Security",
      difficulty: "Intermediate"
    },
    {
      title: "DeFi Protocol Audit Guidelines",
      description: "Comprehensive guide for DeFi security audits",
      category: "DeFi",
      difficulty: "Advanced"
    },
    {
      title: "Common Vulnerabilities in Web3",
      description: "Overview of frequent security issues and prevention",
      category: "Education",
      difficulty: "Beginner"
    },
    {
      title: "Multi-signature Wallet Security",
      description: "Best practices for multisig implementations",
      category: "Security",
      difficulty: "Intermediate"
    }
  ];

  const integrationGuides = [
    {
      title: "CI/CD Integration",
      description: "Integrate security audits into your development workflow",
      tools: ["GitHub Actions", "GitLab CI", "Jenkins"]
    },
    {
      title: "Webhook Configuration",
      description: "Set up webhooks for audit status notifications",
      tools: ["Discord", "Slack", "Custom APIs"]
    },
    {
      title: "SDK Implementation",
      description: "Use our JavaScript/TypeScript SDK",
      tools: ["Node.js", "React", "Vue.js"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Documentation | Hawkly</title>
        <meta name="description" content="Comprehensive documentation for developers, including API references, integration guides, and best practices" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to integrate, use, and build with Hawkly's Web3 security platform.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documentation..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Quick Start Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickStartGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-primary">
                        {guide.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{guide.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{guide.level}</Badge>
                          <span className="text-xs text-gray-500">{guide.time} read</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Documentation */}
          <Tabs defaultValue="api" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="security">Security Guides</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="sdk">SDK & Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="api" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">API Reference</h3>
                <p className="text-gray-600 mb-6">
                  Complete API documentation for integrating Hawkly services into your applications.
                </p>
                
                <div className="space-y-4">
                  {apiDocuments.map((doc, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-primary">
                              {doc.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold">{doc.title}</h4>
                              <p className="text-sm text-gray-600">{doc.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">{doc.method}</Badge>
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                  {doc.endpoint}
                                </code>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Security Guidelines</h3>
                <p className="text-gray-600 mb-6">
                  Best practices, checklists, and comprehensive guides for Web3 security.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {securityGuides.map((guide, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{guide.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{guide.category}</Badge>
                              <Badge 
                                variant={guide.difficulty === 'Beginner' ? 'default' : 
                                        guide.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                              >
                                {guide.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <FileText className="h-5 w-5 text-gray-400 ml-4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Integration Guides</h3>
                <p className="text-gray-600 mb-6">
                  Learn how to integrate Hawkly into your development workflow and toolchain.
                </p>
                
                <div className="space-y-4">
                  {integrationGuides.map((guide, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{guide.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {guide.tools.map((tool, toolIndex) => (
                                <Badge key={toolIndex} variant="secondary">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Read Guide
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sdk" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">SDK & Developer Tools</h3>
                <p className="text-gray-600 mb-6">
                  Official SDKs, CLI tools, and development resources for building with Hawkly.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        JavaScript SDK
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Official JavaScript/TypeScript SDK for Node.js and browser applications.
                      </p>
                      <div className="space-y-2">
                        <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                          npm install @hawkly/sdk
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Documentation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        CLI Tool
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Command-line interface for managing audits and integrating with CI/CD.
                      </p>
                      <div className="space-y-2">
                        <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                          npm install -g hawkly-cli
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          CLI Reference
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Support Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  Our documentation is constantly evolving. If you can't find what you're looking for, reach out to our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/community">Join Community</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Docs;
