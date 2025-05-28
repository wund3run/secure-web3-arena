
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Book, Code, Shield, Zap, Download, ExternalLink,
  ArrowRight, FileText, Terminal, Globe, Lock, Key,
  Cpu, Database, Cloud, CheckCircle, AlertTriangle, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickStartGuides = [
    {
      title: "Getting Started with Hawkly",
      description: "Complete setup guide for new users and projects",
      duration: "5 min",
      difficulty: "Beginner",
      href: "#getting-started",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "API Integration Guide",
      description: "Integrate Hawkly's security APIs into your workflow",
      duration: "15 min", 
      difficulty: "Intermediate",
      href: "#api-integration",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Smart Contract Audit Process",
      description: "Step-by-step audit workflow for project owners",
      duration: "10 min",
      difficulty: "Beginner",
      href: "#audit-process",
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "AI-Enhanced Security Setup",
      description: "Configure AI-powered vulnerability detection",
      duration: "20 min",
      difficulty: "Advanced",
      href: "#ai-security",
      icon: <Cpu className="h-5 w-5" />
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/audits/request",
      description: "Submit a new audit request",
      auth: "Required"
    },
    {
      method: "GET",
      endpoint: "/api/v1/audits/{id}",
      description: "Retrieve audit details and progress",
      auth: "Required"
    },
    {
      method: "GET",
      endpoint: "/api/v1/auditors/search",
      description: "Search and filter available auditors",
      auth: "Optional"
    },
    {
      method: "POST",
      endpoint: "/api/v1/security/scan",
      description: "AI-powered contract vulnerability scan",
      auth: "Required"
    },
    {
      method: "GET",
      endpoint: "/api/v1/reports/{audit_id}",
      description: "Download completed audit reports",
      auth: "Required"
    }
  ];

  const sdkLanguages = [
    {
      name: "JavaScript/TypeScript",
      description: "Official SDK for web and Node.js applications",
      install: "npm install @hawkly/sdk",
      docs: "#js-sdk",
      icon: <Terminal className="h-5 w-5" />
    },
    {
      name: "Python",
      description: "Python SDK for backend integrations",
      install: "pip install hawkly-python",
      docs: "#python-sdk",
      icon: <Database className="h-5 w-5" />
    },
    {
      name: "Solidity",
      description: "Smart contract integration library",
      install: "forge install hawkly-org/hawkly-contracts",
      docs: "#solidity-sdk",
      icon: <Code className="h-5 w-5" />
    },
    {
      name: "REST API",
      description: "Direct API integration for any language",
      install: "curl -X GET https://api.hawkly.com/v1/status",
      docs: "#rest-api",
      icon: <Globe className="h-5 w-5" />
    }
  ];

  const securityBestPractices = [
    {
      title: "Smart Contract Security Patterns",
      description: "Essential security patterns for secure smart contract development",
      topics: ["Reentrancy Guards", "Access Control", "Integer Overflow Protection", "Front-running Prevention"]
    },
    {
      title: "Multi-Chain Security Considerations",
      description: "Security challenges when deploying across multiple blockchains",
      topics: ["Cross-chain Communication", "Bridge Security", "Chain-specific Vulnerabilities", "Gas Optimization"]
    },
    {
      title: "DeFi Protocol Security",
      description: "Specialized security practices for DeFi applications",
      topics: ["Oracle Security", "Liquidity Risk Management", "Flash Loan Protection", "MEV Resistance"]
    },
    {
      title: "DAO Governance Security",
      description: "Securing decentralized governance mechanisms",
      topics: ["Voting Security", "Proposal Validation", "Time-lock Implementation", "Emergency Procedures"]
    }
  ];

  return (
    <ContentPage
      title="Documentation"
      description="Comprehensive technical documentation, API references, and integration guides for Hawkly's Web3 security platform."
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Book className="h-4 w-4" />
            Updated for March 2025 - Latest API v2.1 and AI Security Features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Developer <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to integrate Hawkly's advanced security infrastructure into your Web3 projects, 
            from basic API calls to AI-powered vulnerability detection.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="getting-started">Quick Start</TabsTrigger>
            <TabsTrigger value="api-reference">API Reference</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="security">Security Guides</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {quickStartGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          {guide.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            <a href={guide.href}>{guide.title}</a>
                          </CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline">{guide.duration}</Badge>
                        <Badge variant={guide.difficulty === 'Beginner' ? 'default' : guide.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                          {guide.difficulty}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={guide.href}>
                          Start Guide <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Getting Started Content */}
            <Card id="getting-started">
              <CardHeader>
                <CardTitle className="text-2xl">Getting Started with Hawkly</CardTitle>
                <CardDescription>Set up your account and make your first API call in under 5 minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    Create Your Account
                  </h3>
                  <p className="text-muted-foreground ml-8">
                    Sign up for a Hawkly account and verify your email. New accounts get $100 in free credits to explore our security services.
                  </p>
                  <div className="ml-8">
                    <Button asChild>
                      <Link to="/auth">Create Account</Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    Get Your API Key
                  </h3>
                  <p className="text-muted-foreground ml-8">
                    Generate your API key from the dashboard. Keep it secure and never expose it in client-side code.
                  </p>
                  <div className="ml-8 bg-slate-100 p-4 rounded-lg font-mono text-sm">
                    <code>Authorization: Bearer hk_live_1234567890abcdef...</code>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    Make Your First Request
                  </h3>
                  <p className="text-muted-foreground ml-8">
                    Test your integration with a simple API call to check service status.
                  </p>
                  <div className="ml-8 bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                    <pre><code>{`curl -X GET "https://api.hawkly.com/v1/status" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code></pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-reference" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">API Reference</CardTitle>
                <CardDescription>Complete reference for Hawkly API v2.1 endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Base URL</p>
                      <code className="text-blue-700">https://api.hawkly.com/v1</code>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                            {endpoint.method}
                          </Badge>
                          <code className="font-mono">{endpoint.endpoint}</code>
                          <Badge variant="outline" className={endpoint.auth === 'Required' ? 'border-red-200 text-red-700' : 'border-green-200 text-green-700'}>
                            <Lock className="h-3 w-3 mr-1" />
                            {endpoint.auth}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {sdkLanguages.map((sdk, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        {sdk.icon}
                      </div>
                      <div>
                        <CardTitle>{sdk.name}</CardTitle>
                        <CardDescription>{sdk.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Installation:</p>
                      <div className="bg-slate-900 text-white p-3 rounded font-mono text-sm">
                        <code>{sdk.install}</code>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={sdk.docs}>
                        View Documentation <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {securityBestPractices.map((practice, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      {practice.title}
                    </CardTitle>
                    <CardDescription>{practice.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {practice.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Real-world implementation examples and use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Submit Audit Request</h3>
                  <div className="bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                    <pre><code>{`const response = await fetch('https://api.hawkly.com/v1/audits/request', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    project_name: "DeFi Protocol",
    blockchain: "ethereum",
    contract_count: 5,
    budget: 15000,
    deadline: "2025-04-15",
    scope: "comprehensive"
  })
});

const audit = await response.json();
console.log('Audit ID:', audit.id);`}</code></pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">AI Security Scan</h3>
                  <div className="bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                    <pre><code>{`const scanResult = await hawkly.security.scan({
  contract_address: "0x1234567890abcdef",
  blockchain: "ethereum",
  scan_type: "comprehensive",
  ai_analysis: true
});

console.log('Vulnerabilities found:', scanResult.vulnerabilities.length);
console.log('Risk score:', scanResult.risk_score);`}</code></pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers using Hawkly to secure their Web3 projects with cutting-edge AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download SDK
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Docs;
