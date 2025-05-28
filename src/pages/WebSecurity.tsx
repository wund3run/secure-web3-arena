
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Shield, AlertTriangle, CheckCircle, Target, Code, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function WebSecurity() {
  const securityCategories = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Smart Contract Security",
      description: "Comprehensive analysis of smart contract vulnerabilities, reentrancy attacks, and best practices for secure code development.",
      topics: ["Reentrancy Attacks", "Integer Overflow/Underflow", "Access Control", "Gas Optimization"]
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "DeFi Protocol Security",
      description: "Specialized security measures for decentralized finance protocols, including flash loan attacks and oracle manipulation.",
      topics: ["Flash Loan Attacks", "Oracle Manipulation", "MEV Protection", "Liquidity Pool Security"]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "NFT & Token Security",
      description: "Security considerations for non-fungible tokens and custom token implementations.",
      topics: ["Metadata Security", "Royalty Mechanisms", "Transfer Restrictions", "Minting Controls"]
    },
    {
      icon: <Lock className="h-8 w-8 text-red-500" />,
      title: "Bridge & Cross-Chain Security",
      description: "Security challenges and solutions for cross-chain bridges and multi-chain applications.",
      topics: ["Bridge Validation", "Cross-Chain Messaging", "Multi-Sig Security", "Validator Sets"]
    }
  ];

  const commonVulnerabilities = [
    {
      severity: "Critical",
      name: "Reentrancy",
      description: "Allows attackers to repeatedly call functions before state changes are finalized.",
      color: "text-red-600"
    },
    {
      severity: "High", 
      name: "Flash Loan Attacks",
      description: "Exploits using uncollateralized loans to manipulate market conditions.",
      color: "text-orange-600"
    },
    {
      severity: "Medium",
      name: "Front-Running",
      description: "MEV bots exploiting transaction ordering in mempool.",
      color: "text-yellow-600"
    },
    {
      severity: "Low",
      name: "Gas Griefing",
      description: "Attacks that waste gas or cause transactions to fail unexpectedly.",
      color: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Web3 Security Guide | Hawkly</title>
        <meta name="description" content="Comprehensive guide to Web3 security, smart contract vulnerabilities, and blockchain security best practices." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Web3 Security Center</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Web3 Security 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Guide</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay ahead of evolving threats in the Web3 ecosystem. Learn about the latest security vulnerabilities, 
            attack vectors, and defense mechanisms to protect your blockchain applications.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-audit">
              <Button size="lg">Get Security Audit</Button>
            </Link>
            <Link to="/vulnerabilities">
              <Button variant="outline" size="lg">View Vulnerability Database</Button>
            </Link>
          </div>
        </div>

        {/* Security Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Security Categories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {securityCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {category.icon}
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-muted rounded-md text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Vulnerabilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Common Vulnerabilities in 2025</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {commonVulnerabilities.map((vuln, index) => (
              <Card key={index} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{vuln.name}</CardTitle>
                    <span className={`text-sm font-medium ${vuln.color}`}>
                      {vuln.severity}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{vuln.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Security Best Practices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Regular Audits</h3>
              <p className="text-muted-foreground">
                Conduct comprehensive security audits before deployment and after major updates.
              </p>
            </div>
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Continuous Monitoring</h3>
              <p className="text-muted-foreground">
                Implement real-time monitoring systems to detect suspicious activities.
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Defense in Depth</h3>
              <p className="text-muted-foreground">
                Layer multiple security measures to create comprehensive protection.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Web3 Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with expert security auditors who understand the latest threats and can help protect your project.
          </p>
          <Link to="/marketplace">
            <Button size="lg">Find Security Experts</Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
