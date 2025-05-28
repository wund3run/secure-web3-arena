
import React from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle, CheckCircle, ArrowRight, BookOpen, Target, Zap, Bot, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Web3Security = () => {
  const securityThreats = [
    {
      title: "AI-Powered Exploit Generation",
      severity: "Critical",
      description: "AI tools being used to automatically discover and exploit smart contract vulnerabilities",
      impact: "$1.2B+ losses in 2024 from AI-assisted attacks",
      prevention: "AI-powered security audits and formal verification"
    },
    {
      title: "Cross-Chain Bridge Exploits", 
      severity: "Critical",
      description: "Vulnerabilities in cross-chain protocols enabling massive fund drains",
      impact: "$2.8B stolen from bridges in 2024",
      prevention: "Multi-signature validation and time-delayed withdrawals"
    },
    {
      title: "MEV Sandwich Attacks",
      severity: "High", 
      description: "Sophisticated front/back-running attacks exploiting transaction ordering",
      impact: "$900M+ extracted via MEV in 2024",
      prevention: "Private mempools and commit-reveal schemes"
    },
    {
      title: "Governance Token Manipulation",
      severity: "High",
      description: "Flash loan attacks to temporarily gain voting power in DAOs",
      impact: "Multiple protocol takeovers in 2024",
      prevention: "Time-weighted voting and delegation locks"
    },
    {
      title: "Restaking Slashing Risks",
      severity: "Medium",
      description: "New attack vectors in liquid staking and restaking protocols",
      impact: "Emerging threat with growing TVL",
      prevention: "Diversified validator sets and slashing insurance"
    },
    {
      title: "Account Abstraction Exploits",
      severity: "Medium",
      description: "Vulnerabilities in smart contract wallets and bundler systems",
      impact: "Growing concern with EIP-4337 adoption",
      prevention: "Formal verification of wallet logic and bundler audits"
    }
  ];

  const securityLayers = [
    {
      icon: <Bot className="h-8 w-8 text-blue-600" />,
      title: "AI-Enhanced Auditing",
      description: "Machine learning models for automated vulnerability detection",
      features: ["Pattern recognition", "Anomaly detection", "Predictive analysis"]
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Formal Verification", 
      description: "Mathematical proofs of smart contract correctness",
      features: ["Property verification", "Invariant checking", "Symbolic execution"]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Real-time Monitoring",
      description: "24/7 threat detection and incident response systems",
      features: ["Transaction analysis", "Behavioral monitoring", "Automated alerts"]
    },
    {
      icon: <Cpu className="h-8 w-8 text-orange-600" />,
      title: "Zero-Knowledge Security",
      description: "Privacy-preserving security mechanisms and proofs",
      features: ["ZK fraud proofs", "Private auditing", "Confidential computing"]
    }
  ];

  const emergingThreats = [
    {
      title: "Quantum Computing Risks",
      description: "Preparing for post-quantum cryptography transition",
      timeline: "2030-2035 estimated impact"
    },
    {
      title: "Social Engineering 3.0",
      description: "AI-generated deepfakes targeting crypto executives",
      timeline: "Active threat since 2024"
    },
    {
      title: "Supply Chain Attacks",
      description: "Compromised development tools and dependencies",
      timeline: "Increasing frequency in 2024-2025"
    }
  ];

  return (
    <ContentPage
      title="Web3 Security Guide"
      description="Comprehensive guide to blockchain and smart contract security threats, vulnerabilities, and best practices for Web3 developers and projects in 2025."
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            $5.7B stolen from Web3 protocols in 2024 - 45% increase from 2023
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Web3 Security in 2025
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of evolving threats in the Web3 ecosystem. Learn about AI-powered attacks, 
            cross-chain vulnerabilities, and cutting-edge security practices to protect your blockchain projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-5 w-5" />
                Get AI-Enhanced Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/guides">
                <BookOpen className="mr-2 h-5 w-5" />
                2025 Security Guides
              </Link>
            </Button>
          </div>
        </div>

        {/* Current Security Threats */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Critical Web3 Threats in 2025</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding these evolving vulnerabilities is essential for building secure decentralized applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Modern Security Layers */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Next-Generation Security Framework</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Implement cutting-edge security layers powered by AI, formal verification, and zero-knowledge proofs.
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

        {/* Emerging Threats */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Emerging Threats to Watch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about future security challenges that will impact the Web3 ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {emergingThreats.map((threat, index) => (
              <Card key={index} className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-800">{threat.title}</CardTitle>
                  <CardDescription className="text-orange-700">{threat.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    {threat.timeline}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 2025 Security Stats */}
        <section className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Web3 Security in Numbers (2024-2025)</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">$5.7B</div>
              <div className="text-sm text-muted-foreground">Total funds lost in 2024</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">312</div>
              <div className="text-sm text-muted-foreground">Major security incidents</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">89%</div>
              <div className="text-sm text-muted-foreground">Preventable through audits</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">24hrs</div>
              <div className="text-sm text-muted-foreground">Average attack detection time</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Secure Your Web3 Project with 2025 Standards</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with AI-enhanced security experts on Hawkly who use the latest tools and methodologies 
            to protect your smart contracts and DApps from evolving threats.
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
