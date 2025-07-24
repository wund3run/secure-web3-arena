import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  TrendingUp, 
  Brain, 
  Network, 
  Database,
  Zap,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Code,
  Users,
  Globe
} from 'lucide-react';

const Web3Security = () => {
  const securityCategories = [
    {
      title: "Smart Contract Security",
      description: "Essential security practices for smart contract development",
      icon: Code,
      topics: ["Reentrancy Attacks", "Integer Overflow", "Access Control", "Gas Optimization"],
      level: "Fundamental",
      color: "bg-blue-500"
    },
    {
      title: "DeFi Security",
      description: "Advanced security for decentralized finance protocols",
      icon: TrendingUp,
      topics: ["Flash Loan Attacks", "Oracle Manipulation", "Liquidity Risks", "MEV Protection"],
      level: "Advanced",
      color: "bg-green-500"
    },
    {
      title: "Cross-Chain Security",
      description: "Security considerations for multi-chain applications",
      icon: Network,
      topics: ["Bridge Security", "Chain Validation", "Asset Mapping", "Consensus Risks"],
      level: "Expert",
      color: "bg-purple-500"
    },
    {
      title: "AI-Enhanced Security",
      description: "Leveraging AI for automated security analysis",
      icon: Brain,
      topics: ["Pattern Recognition", "Anomaly Detection", "Predictive Analysis", "ML Models"],
      level: "Cutting-edge",
      color: "bg-orange-500"
    },
    {
      title: "Privacy & ZK Security",
      description: "Zero-knowledge proofs and privacy-preserving technologies",
      icon: Eye,
      topics: ["ZK-SNARKs", "ZK-STARKs", "Privacy Coins", "Anonymous Protocols"],
      level: "Specialized",
      color: "bg-indigo-500"
    },
    {
      title: "Infrastructure Security",
      description: "Securing the underlying blockchain infrastructure",
      icon: Database,
      topics: ["Node Security", "Consensus Attacks", "Network Security", "Validator Security"],
      level: "Core",
      color: "bg-red-500"
    }
  ];

  const threatLandscape = [
    {
      threat: "Smart Contract Vulnerabilities",
      impact: "$3.8B",
      trend: "increasing",
      description: "Bugs in smart contract code leading to fund loss"
    },
    {
      threat: "Bridge Exploits",
      impact: "$2.1B",
      trend: "stable",
      description: "Cross-chain bridge vulnerabilities"
    },
    {
      threat: "Flash Loan Attacks",
      impact: "$1.2B",
      trend: "decreasing",
      description: "Manipulation of DeFi protocols using flash loans"
    },
    {
      threat: "Private Key Compromise",
      impact: "$900M",
      trend: "stable",
      description: "Stolen or compromised private keys"
    }
  ];

  const securityPrinciples = [
    {
      title: "Defense in Depth",
      description: "Multiple layers of security controls to protect against various attack vectors",
      icon: Shield
    },
    {
      title: "Principle of Least Privilege",
      description: "Grant minimum necessary permissions to users and contracts",
      icon: Lock
    },
    {
      title: "Fail-Safe Defaults",
      description: "Design systems to fail securely when unexpected conditions occur",
      icon: CheckCircle
    },
    {
      title: "Zero Trust Architecture",
      description: "Never trust, always verify - validate all interactions",
      icon: Target
    }
  ];

  const emergingThreats = [
    "AI-powered smart contract exploits",
    "Quantum computing threats to cryptography",
    "MEV (Maximal Extractable Value) attacks",
    "Social engineering targeting DeFi users",
    "Governance token manipulation",
    "Intent-based protocol vulnerabilities"
  ];

  return (
    <>
      <Helmet>
        <title>Web3 Security Guide - Complete Security Framework for 2025 | Hawkly</title>
        <meta name="description" content="Comprehensive guide to Web3 security including smart contracts, DeFi, cross-chain, and AI-enhanced security. Updated for 2025 threat landscape." />
        <meta name="keywords" content="web3 security, smart contract security, defi security, blockchain security, cross-chain security, ai security" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Updated for 2025 Threat Landscape
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent mb-6">
              Web3 Security Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Master the complete Web3 security landscape. From smart contracts to DeFi protocols, 
              cross-chain bridges to AI-enhanced security - everything you need to build secure blockchain applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/resources/security-guides">
                  Start Learning
                  <BookOpen className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/request-audit">
                  Get Security Audit
                  <Shield className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Threat Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {threatLandscape.map((threat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-red-500 mb-1">{threat.impact}</div>
                  <div className="text-sm text-muted-foreground">{threat.threat}</div>
                  <div className={`text-xs mt-1 ${
                    threat.trend === 'increasing' ? 'text-red-500' : 
                    threat.trend === 'decreasing' ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {threat.trend} trend
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Security Domains</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the key areas of Web3 security and build comprehensive protection
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityCategories.map((category, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.color}/10`}>
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline">{category.level}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {category.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Principles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Core Security Principles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fundamental principles that guide secure Web3 development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityPrinciples.map((principle, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <principle.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emerging Threats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="destructive" className="mb-4">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Emerging Threats 2025
                </Badge>
                <h2 className="text-3xl font-bold mb-6">Stay Ahead of New Threats</h2>
                <p className="text-muted-foreground mb-6">
                  The Web3 threat landscape is constantly evolving. Stay informed about the latest 
                  attack vectors and emerging security challenges facing blockchain applications.
                </p>
                <ul className="space-y-3 mb-8">
                  {emergingThreats.map((threat, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{threat}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/resources/vulnerability-database">
                    View Threat Database
                    <Database className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
              
              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-500" />
                    Security Alert System
                  </CardTitle>
                  <CardDescription>
                    Get real-time alerts about new vulnerabilities and threats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Critical: New DeFi Exploit</div>
                        <div className="text-xs text-muted-foreground">Flash loan vulnerability discovered</div>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Update: Bridge Security</div>
                        <div className="text-xs text-muted-foreground">New security patches available</div>
                      </div>
                      <Badge variant="default">Medium</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Subscribe to Alerts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Your Security Learning Journey</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Follow our structured learning path to master Web3 security from basics to advanced concepts
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-500 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">Learn basic security concepts and common vulnerabilities</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-500 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Practice</h3>
                  <p className="text-sm text-muted-foreground">Apply knowledge through hands-on security challenges</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-500 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Master</h3>
                  <p className="text-sm text-muted-foreground">Become an expert through advanced techniques and research</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" asChild>
              <Link to="/learning">
                Start Learning Path
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Web3 Project?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you're building a new DeFi protocol or upgrading existing smart contracts, 
                  our security experts are here to help you build with confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/request-audit">
                      Get Security Audit
                      <Shield className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/community">
                      Join Security Community
                      <Users className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Web3Security;
