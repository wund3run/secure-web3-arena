
import React from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle, CheckCircle, ArrowRight, BookOpen, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Web3Security = () => {
  const securityThreats = [
    {
      title: "Reentrancy Attacks",
      severity: "Critical",
      description: "Malicious contracts recursively call vulnerable functions before state updates",
      impact: "$60M+ lost in DAO hack",
      prevention: "Use checks-effects-interactions pattern"
    },
    {
      title: "Flash Loan Exploits", 
      severity: "High",
      description: "Attackers manipulate market prices using uncollateralized loans",
      impact: "$320M+ stolen in 2022",
      prevention: "Implement time-weighted average prices"
    },
    {
      title: "Oracle Manipulation",
      severity: "High", 
      description: "Price feed manipulation leading to incorrect valuations",
      impact: "$200M+ in DeFi losses",
      prevention: "Use multiple oracle sources and validation"
    },
    {
      title: "Access Control Bugs",
      severity: "Medium",
      description: "Improper permission checks allowing unauthorized actions",
      impact: "Complete protocol takeover",
      prevention: "Role-based access control with multi-sig"
    }
  ];

  const securityLayers = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Smart Contract Audits",
      description: "Comprehensive code review and vulnerability assessment",
      features: ["Static analysis", "Dynamic testing", "Formal verification"]
    },
    {
      icon: <Lock className="h-8 w-8 text-green-600" />,
      title: "Access Control Systems", 
      description: "Multi-signature wallets and role-based permissions",
      features: ["Multi-sig implementation", "Time locks", "Governance controls"]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Monitoring & Detection",
      description: "Real-time threat detection and incident response",
      features: ["Anomaly detection", "Alert systems", "Automated responses"]
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Emergency Protocols",
      description: "Circuit breakers and emergency pause mechanisms",
      features: ["Pause functions", "Upgrade mechanisms", "Recovery procedures"]
    }
  ];

  return (
    <ContentPage
      title="Web3 Security Guide"
      description="Comprehensive guide to blockchain and smart contract security threats, vulnerabilities, and best practices for Web3 developers and projects."
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            $3.8B stolen from DeFi protocols in 2022
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Web3 Security Fundamentals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protect your blockchain projects from the most common and devastating security vulnerabilities. 
            Learn from real-world exploits and implement battle-tested security practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-5 w-5" />
                Get Security Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/guides">
                <BookOpen className="mr-2 h-5 w-5" />
                Security Guides
              </Link>
            </Button>
          </div>
        </div>

        {/* Security Threats Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Common Web3 Security Threats</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding these vulnerabilities is the first step to building secure decentralized applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {securityThreats.map((threat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{threat.title}</CardTitle>
                    <Badge variant={threat.severity === 'Critical' ? 'destructive' : threat.severity === 'High' ? 'default' : 'secondary'}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <CardDescription>{threat.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Impact: {threat.impact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{threat.prevention}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security Layers Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Defense in Depth Strategy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Implement multiple layers of security to protect your Web3 applications from sophisticated attacks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityLayers.map((layer, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {layer.icon}
                  </div>
                  <CardTitle className="text-lg">{layer.title}</CardTitle>
                  <CardDescription>{layer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {layer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Web3 Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with verified security experts on Hawkly to protect your smart contracts and DApps from vulnerabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/marketplace">
                Find Security Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/ai-tools">
                Try AI Security Tools
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </ContentPage>
  );
};

export default Web3Security;
