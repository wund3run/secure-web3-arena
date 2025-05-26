
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Search, FileText, Zap, TrendingUp, Link } from 'lucide-react';

export default function AiTools() {
  const aiTools = [
    {
      title: "Smart Contract Analyzer",
      description: "AI-powered static analysis tool that scans smart contracts for vulnerabilities, gas optimization opportunities, and security best practices.",
      icon: Brain,
      features: ["Vulnerability Detection", "Gas Optimization", "Security Scoring", "Real-time Analysis"],
      status: "available",
      category: "Analysis"
    },
    {
      title: "Threat Intelligence Scanner",
      description: "Advanced AI system that monitors blockchain networks for suspicious activities, exploit patterns, and emerging security threats.",
      icon: Shield,
      features: ["Threat Detection", "Pattern Recognition", "Risk Assessment", "Alert System"],
      status: "available",
      category: "Monitoring"
    },
    {
      title: "Code Review Assistant",
      description: "AI-driven code review tool that provides instant feedback on smart contract code quality, security issues, and improvement suggestions.",
      icon: FileText,
      features: ["Code Quality Analysis", "Security Recommendations", "Best Practice Guidance", "Automated Reports"],
      status: "beta",
      category: "Review"
    },
    {
      title: "Vulnerability Search Engine",
      description: "Comprehensive database of known vulnerabilities with AI-powered search capabilities to find relevant security issues for your project.",
      icon: Search,
      features: ["CVE Database", "Smart Search", "Exploit Examples", "Mitigation Strategies"],
      status: "available",
      category: "Research"
    },
    {
      title: "Security Score Predictor",
      description: "Machine learning model that predicts security scores and potential risks based on code patterns, dependencies, and historical data.",
      icon: TrendingUp,
      features: ["Risk Prediction", "Score Calculation", "Trend Analysis", "Comparative Benchmarking"],
      status: "coming-soon",
      category: "Prediction"
    },
    {
      title: "Automated Audit Generator",
      description: "AI system that generates preliminary audit reports, identifies potential issues, and suggests testing strategies for smart contracts.",
      icon: Zap,
      features: ["Report Generation", "Issue Identification", "Test Suggestions", "Documentation"],
      status: "beta",
      category: "Automation"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'beta':
        return <Badge variant="secondary">Beta</Badge>;
      case 'coming-soon':
        return <Badge variant="outline">Coming Soon</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusButton = (status: string) => {
    switch (status) {
      case 'available':
        return <Button className="w-full">Launch Tool</Button>;
      case 'beta':
        return <Button variant="outline" className="w-full">Join Beta</Button>;
      case 'coming-soon':
        return <Button variant="outline" className="w-full" disabled>Notify Me</Button>;
      default:
        return <Button variant="outline" className="w-full" disabled>Unavailable</Button>;
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Security Tools | Hawkly Web3 Security Marketplace</title>
        <meta name="description" content="Access AI-powered security tools for smart contract analysis, vulnerability detection, and automated security assessments." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Security Tools</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Leverage cutting-edge artificial intelligence to enhance your Web3 security posture 
                with automated analysis, threat detection, and intelligent recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <tool.icon className="h-8 w-8 text-primary" />
                      {getStatusBadge(tool.status)}
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {getStatusButton(tool.status)}
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Enterprise AI Solutions</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Need custom AI tools for your organization? We develop bespoke security solutions 
                  tailored to your specific blockchain ecosystem and requirements.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Custom AI Models</h3>
                  <p className="text-sm text-muted-foreground">
                    Trained on your specific protocols and security requirements
                  </p>
                </div>
                <div className="text-center">
                  <Link className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">API Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Seamless integration with your existing development workflow
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">24/7 Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuous security monitoring with intelligent alerting
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Button size="lg" asChild>
                  <a href="/contact">Request Enterprise Demo</a>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
