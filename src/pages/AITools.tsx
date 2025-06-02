
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Brain, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AITools = () => {
  const aiTools = [
    {
      title: "AI Vulnerability Scanner",
      description: "Advanced AI-powered vulnerability detection for smart contracts and DeFi protocols",
      features: ["Real-time vulnerability detection", "Pattern recognition", "False positive reduction", "Continuous monitoring"],
      price: "Starting at $500/month",
      icon: <Target className="h-6 w-6 text-red-500" />
    },
    {
      title: "Smart Contract Analyzer",
      description: "Automated code analysis using machine learning for comprehensive security assessment",
      features: ["Automated code review", "Security scoring", "Risk assessment", "Compliance checking"],
      price: "Starting at $300/month",
      icon: <Brain className="h-6 w-6 text-blue-500" />
    },
    {
      title: "AI Audit Assistant",
      description: "AI-powered assistant that helps auditors identify potential security issues faster",
      features: ["Audit workflow automation", "Issue prioritization", "Report generation", "Expert recommendations"],
      price: "Starting at $800/month",
      icon: <Bot className="h-6 w-6 text-green-500" />
    }
  ];

  return (
    <StandardLayout
      title="AI Security Tools"
      description="Advanced AI-powered security tools for Web3 - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">AI-Powered Security</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI Security Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Leverage cutting-edge AI technology to enhance your Web3 security. Our AI tools 
            have analyzed over 50,000 smart contracts and identified critical vulnerabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vulnerabilities">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Zap className="mr-2 h-5 w-5" />
                Try AI Scanner
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {aiTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {tool.icon}
                  {tool.title}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-primary">{tool.price}</div>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Capabilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">AI Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Pattern Recognition", description: "Identifies complex vulnerability patterns", icon: <Brain className="h-8 w-8 text-purple-500" /> },
              { title: "Real-time Analysis", description: "Instant security feedback", icon: <Zap className="h-8 w-8 text-yellow-500" /> },
              { title: "Continuous Learning", description: "Improves with each analysis", icon: <Target className="h-8 w-8 text-red-500" /> },
              { title: "Smart Recommendations", description: "Actionable security advice", icon: <Bot className="h-8 w-8 text-green-500" /> }
            ].map((capability, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{capability.icon}</div>
                  <h3 className="font-semibold mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <Bot className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Experience AI-Powered Security</h2>
          <p className="text-muted-foreground mb-6">
            Join 2,000+ developers using our AI tools to build more secure Web3 applications.
          </p>
          <Link to="/vulnerabilities">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">Start Free Trial</Button>
          </Link>
        </div>
      </div>
    </StandardLayout>
  );
};

export default AITools;
