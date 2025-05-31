
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock, Users, Star, ArrowRight, FileText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityAudits = () => {
  const auditTypes = [
    {
      title: "Smart Contract Audit",
      description: "Comprehensive security review of smart contracts including vulnerability detection, gas optimization, and best practice verification",
      features: ["Automated + Manual Testing", "Gas Optimization", "Security Report", "Remediation Support"],
      price: "Starting at $5,000",
      duration: "3-7 days",
      popular: true
    },
    {
      title: "DeFi Protocol Audit",
      description: "Specialized security audit for DeFi protocols covering flash loan attacks, oracle manipulation, and economic model validation",
      features: ["Economic Model Review", "Flash Loan Testing", "Oracle Security", "Liquidity Analysis"],
      price: "Starting at $15,000",
      duration: "1-2 weeks",
      popular: false
    },
    {
      title: "Cross-Chain Bridge Audit",
      description: "Security assessment for cross-chain bridges and multi-chain applications with focus on consensus and state verification",
      features: ["Consensus Verification", "State Validation", "Multi-Chain Testing", "Bridge Security"],
      price: "Starting at $25,000", 
      duration: "2-3 weeks",
      popular: false
    }
  ];

  const process = [
    {
      step: 1,
      title: "Project Submission",
      description: "Submit your project details, codebase, and specific security requirements"
    },
    {
      step: 2,
      title: "Auditor Matching",
      description: "Our AI matches you with verified auditors specialized in your technology stack"
    },
    {
      step: 3,
      title: "Security Assessment",
      description: "Comprehensive manual and automated security testing using industry-leading tools"
    },
    {
      step: 4,
      title: "Detailed Report",
      description: "Receive a detailed security report with findings, recommendations, and remediation steps"
    },
    {
      step: 5,
      title: "Fix Verification",
      description: "Free verification of implemented fixes and final security confirmation"
    }
  ];

  return (
    <StandardLayout
      title="Security Audits"
      description="Professional Web3 security audits by verified experts - March 2025"
    >
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Security Audits for Web3 Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Secure your blockchain applications with comprehensive security audits from verified experts. 
            Our auditors have identified over 7,000 vulnerabilities and secured $350M+ in assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <FileText className="mr-2 h-5 w-5" />
                Request Security Audit
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                Browse Auditors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,387</div>
            <div className="text-sm text-muted-foreground">Completed Audits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">7,129</div>
            <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">$350M+</div>
            <div className="text-sm text-muted-foreground">Assets Secured</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.2</div>
            <div className="text-sm text-muted-foreground">Days Avg. Completion</div>
          </div>
        </div>

        {/* Audit Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Audit Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auditTypes.map((audit, index) => (
              <Card key={index} className={`relative ${audit.popular ? 'border-primary shadow-lg' : ''}`}>
                {audit.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {audit.title}
                  </CardTitle>
                  <CardDescription>{audit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-primary">{audit.price}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {audit.duration}
                    </div>
                    <ul className="space-y-2">
                      {audit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={audit.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Audit Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Security Audit Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Standards */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Industry-Leading Security Standards</CardTitle>
            <CardDescription>
              Our audits follow the latest security standards and methodologies updated for 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">OWASP Top 10</h4>
                <p className="text-sm text-muted-foreground">Web3 Edition 2025</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">SWC Registry</h4>
                <p className="text-sm text-muted-foreground">Smart Contract Weaknesses</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">NIST Framework</h4>
                <p className="text-sm text-muted-foreground">Cybersecurity Standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">ISO 27001</h4>
                <p className="text-sm text-muted-foreground">Information Security</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join over 2,000 projects that have secured their applications with our expert security audits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg">
                Start Your Security Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Talk to Security Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default SecurityAudits;
