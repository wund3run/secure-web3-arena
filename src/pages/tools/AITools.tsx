
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Shield, Code, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AITools() {
  const tools = [
    {
      name: "Smart Contract Analyzer",
      description: "AI-powered analysis of smart contract code for vulnerabilities",
      category: "Analysis",
      status: "Available",
      icon: Code
    },
    {
      name: "Vulnerability Scanner",
      description: "Automated scanning for common security issues",
      category: "Security",
      status: "Available",
      icon: Shield
    },
    {
      name: "Gas Optimizer",
      description: "AI suggestions for gas optimization in smart contracts",
      category: "Optimization",
      status: "Beta",
      icon: Zap
    },
    {
      name: "Risk Assessment Tool",
      description: "Comprehensive risk analysis for DeFi protocols",
      category: "Analysis",
      status: "Coming Soon",
      icon: Search
    }
  ];

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">AI Security Tools</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leverage cutting-edge AI technology to enhance your Web3 security. 
              Automated analysis, vulnerability detection, and optimization recommendations.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <Badge 
                        variant={tool.status === 'Available' ? 'default' : tool.status === 'Beta' ? 'secondary' : 'outline'}
                      >
                        {tool.status}
                      </Badge>
                    </div>
                    <CardTitle>{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{tool.category}</Badge>
                      <Button 
                        variant={tool.status === 'Available' ? 'default' : 'outline'}
                        disabled={tool.status === 'Coming Soon'}
                      >
                        {tool.status === 'Available' ? 'Try Now' : tool.status === 'Beta' ? 'Join Beta' : 'Notify Me'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">AI-Powered Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Intelligent Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning models trained on thousands of smart contracts
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant feedback and recommendations as you write code
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Continuous Learning</h3>
                <p className="text-sm text-muted-foreground">
                  AI models continuously updated with latest security patterns
                </p>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Seamless Integration</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Developer Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• VS Code Extension</li>
                    <li>• GitHub Integration</li>
                    <li>• CI/CD Pipeline Support</li>
                    <li>• API Access</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Frameworks Supported</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Hardhat</li>
                    <li>• Truffle</li>
                    <li>• Foundry</li>
                    <li>• Remix IDE</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Security?</h2>
            <p className="text-muted-foreground mb-6">
              Start using AI-powered security tools to protect your Web3 projects
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/vulnerability-scanner">Try Scanner</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
