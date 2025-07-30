
import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Shield, Code, Zap, Upload, Play, Download, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const aiTools = [
  {
    name: "Smart Contract Analyzer",
    description: "AI-powered analysis to detect security vulnerabilities in your smart contracts",
    icon: Shield,
    category: "Security",
    status: "Available",
    features: ["Vulnerability detection", "Gas optimization", "Best practice recommendations"],
    href: "/ai-tools/contract-analyzer"
  },
  {
    name: "Code Review Assistant", 
    description: "Get instant feedback on your Solidity code with AI-driven suggestions",
    icon: Code,
    category: "Development",
    status: "Available", 
    features: ["Code quality analysis", "Security suggestions", "Performance optimization"],
    href: "/ai-tools/code-review"
  },
  {
    name: "Vulnerability Scanner",
    description: "Automated scanning for known vulnerabilities and attack patterns",
    icon: Bot,
    category: "Security",
    status: "Available",
    features: ["Pattern recognition", "Real-time scanning", "Custom rule sets"],
    href: "/vulnerability-scanner"
  },
  {
    name: "Risk Assessment Tool",
    description: "Comprehensive risk analysis for DeFi protocols and smart contracts", 
    icon: AlertTriangle,
    category: "Analysis",
    status: "Beta",
    features: ["Risk scoring", "Threat modeling", "Compliance checks"],
    href: "/ai-tools/risk-assessment"
  }
];

const quickActions = [
  {
    title: "Upload Contract",
    description: "Upload your smart contract for instant analysis",
    icon: Upload,
    action: "upload"
  },
  {
    title: "Paste Code",
    description: "Paste Solidity code directly for quick review",
    icon: Code,
    action: "paste"
  },
  {
    title: "Connect Repository",
    description: "Connect your GitHub repo for continuous monitoring",
    icon: Bot,
    action: "connect"
  }
];

export default function AITools() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState('');

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Bot className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
          <h1 className="text-4xl font-bold mb-6">AI Security Tools</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Leverage artificial intelligence to identify vulnerabilities, optimize gas usage, 
            and improve the security of your Web3 applications.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action) => (
            <Card 
              key={action.action} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeAction === action.action ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveAction(action.action)}
            >
              <CardContent className="p-6 text-center">
                <action.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Analysis Panel */}
        {activeAction && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Security Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeAction === 'paste' && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste your Solidity code here..."
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button disabled={!codeInput.trim()}>
                      <Play className="h-4 w-4 mr-2" />
                      Analyze Code
                    </Button>
                    <Button variant="outline" onClick={() => setActiveAction(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              {activeAction === 'upload' && (
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Upload Smart Contract Files</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your .sol files or click to browse
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button>Browse Files</Button>
                    <Button variant="outline" onClick={() => setActiveAction(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              {activeAction === 'connect' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Repository URL</label>
                    <Input placeholder="https://github.com/your-username/your-repo" />
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <Bot className="h-4 w-4 mr-2" />
                      Connect Repository
                    </Button>
                    <Button variant="outline" onClick={() => setActiveAction(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* AI Tools Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiTools.map((tool) => (
              <Card key={tool.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <tool.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                          <Badge 
                            variant={tool.status === 'Available' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <ul className="space-y-1 mb-4">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to={tool.href}>Use Tool</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Options */}
        <Card>
          <CardHeader>
            <CardTitle>API Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Developer API</h3>
                <p className="text-muted-foreground mb-4">
                  Integrate our AI security tools directly into your development workflow
                </p>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  View API Docs
                </Button>
              </div>
              <div>
                <h3 className="font-semibold mb-2">CI/CD Integration</h3>
                <p className="text-muted-foreground mb-4">
                  Add automated security checks to your continuous integration pipeline
                </p>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  Setup Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductionLayout>
  );
}
