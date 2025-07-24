import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Brain, Shield, Scan, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const AISecuritySuitePage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: 'AI-Powered Code Analysis',
      description: 'Advanced machine learning algorithms analyze your smart contracts for vulnerabilities',
      capabilities: ['Pattern Recognition', 'Anomaly Detection', 'Risk Assessment', 'Auto-Suggestions']
    },
    {
      icon: <Scan className="h-8 w-8 text-purple-500" />,
      title: 'Real-time Vulnerability Detection',
      description: 'Continuous monitoring and instant alerts for potential security issues',
      capabilities: ['Live Scanning', 'Instant Alerts', 'Threat Classification', 'Priority Scoring']
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: 'Smart Contract Hardening',
      description: 'AI-driven recommendations to strengthen your contract security',
      capabilities: ['Security Patterns', 'Best Practices', 'Code Optimization', 'Gas Efficiency']
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: 'Predictive Security Analytics',
      description: 'Forecast potential security risks before they become vulnerabilities',
      capabilities: ['Risk Modeling', 'Trend Analysis', 'Threat Intelligence', 'Proactive Alerts']
    }
  ];

  const benefits = [
    'Reduce audit time by up to 70%',
    'Catch vulnerabilities before deployment',
    'Continuous security monitoring',
    'AI-powered risk assessment',
    'Automated compliance checking',
    'Integration with existing workflows'
  ];

  const useCases = [
    {
      title: 'DeFi Protocol Security',
      description: 'Comprehensive security analysis for decentralized finance protocols',
      example: 'Automated detection of flash loan vulnerabilities and reentrancy attacks'
    },
    {
      title: 'NFT Marketplace Auditing',
      description: 'Specialized analysis for NFT contracts and marketplace logic',
      example: 'Verification of ownership transfers and royalty mechanisms'
    },
    {
      title: 'Cross-Chain Bridge Analysis',
      description: 'Security assessment for cross-chain communication protocols',
      example: 'Validation of bridge logic and asset locking mechanisms'
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Security Suite - Hawkly Tools</title>
        <meta name="description" content="Next-generation AI-powered security analysis for smart contracts and Web3 applications" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Zap className="h-16 w-16 text-primary" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              AI Security Suite
              <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary">New</Badge>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to secure your Web3 applications. 
              Our cutting-edge AI analyzes, detects, and prevents security vulnerabilities before they impact your users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                Start Free Analysis
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Brain className="h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Powered by Advanced AI</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {feature.icon}
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose AI Security Suite?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Traditional security audits are time-consuming and expensive. Our AI Security Suite 
                  provides instant, comprehensive analysis while maintaining the highest accuracy standards.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">99.7%</div>
                  <div className="text-lg font-semibold mb-4">Accuracy Rate</div>
                  <p className="text-muted-foreground mb-6">
                    Our AI models achieve industry-leading accuracy in vulnerability detection
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2.5M+</div>
                      <div className="text-sm text-muted-foreground">Contracts Analyzed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">15K+</div>
                      <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Real-World Applications</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {useCases.map((useCase, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Example:</strong> {useCase.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-6">Ready to Secure Your Web3 Project?</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of developers who trust Hawkly's AI Security Suite to protect their smart contracts
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    <Zap className="h-5 w-5" />
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    Schedule Demo <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AISecuritySuitePage; 