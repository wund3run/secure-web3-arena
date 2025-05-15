
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, Lock, CheckCircle, AlertTriangle, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WebThreeSecurity = () => {
  return (
    <>
      <Helmet>
        <title>Web3 Security | Hawkly</title>
        <meta name="description" content="Learn about Web3 security best practices, common vulnerabilities, and how Hawkly helps secure your blockchain applications" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-black to-primary/90 py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center p-3 bg-white/10 rounded-full">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Web3 Security, Reimagined
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
              End-to-end protection for your blockchain projects with advanced security features designed for Web3
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="/request-audit">
                  Secure Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="/security-insights">
                  View Security Features
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Security Features Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Web3 Security</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive protection across the entire blockchain application lifecycle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>End-to-End Encryption</CardTitle>
                  <CardDescription>
                    All data is encrypted at rest and in transit using military-grade encryption
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>AES-256 encryption for all stored data</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>TLS 1.3 for secure communications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Zero-knowledge architecture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Third-Party Audits</CardTitle>
                  <CardDescription>
                    Regular security assessments by independent security firms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Quarterly security assessments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Public disclosure of audit results</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Bug bounty program for vulnerabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Threat Monitoring</CardTitle>
                  <CardDescription>
                    24/7 monitoring for suspicious activities and potential threats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Real-time threat detection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automated incident response</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Security operations center</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V6a9 9 0 0 0-12-3A9 9 0 0 0 4 6v6c0 6 8 10 8 10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </div>
                  <CardTitle>Smart Contract Security</CardTitle>
                  <CardDescription>
                    Specialized tools for blockchain application security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automated vulnerability scanning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Formal verification options</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Gas optimization analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56L19 19" />
                      <path d="M2 8h14.1a.1.1 0 0 1 .09.13L15 14" />
                    </svg>
                  </div>
                  <CardTitle>Access Controls</CardTitle>
                  <CardDescription>
                    Granular permissions and multi-factor authentication
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Role-based access control</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Hardware wallet integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>Biometric authentication options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                  </div>
                  <CardTitle>Compliance Standards</CardTitle>
                  <CardDescription>
                    Meeting industry regulations and security standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>SOC 2 Type II compliance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>GDPR data protection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-web3-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>ISO 27001 certification</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Blockchain Security Best Practices */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Web3 Security Best Practices</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn how to secure your Web3 projects with our comprehensive guides
              </p>
            </div>
            
            <Tabs defaultValue="smart-contracts" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
                <TabsTrigger value="defi">DeFi Security</TabsTrigger>
                <TabsTrigger value="wallets">Wallet Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="smart-contracts" className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-2xl font-bold mb-4">Smart Contract Security</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">1. Code Audits</h4>
                    <p className="text-muted-foreground">
                      Always have your smart contracts audited by reputable security firms before deployment. 
                      Multiple independent audits provide better coverage of potential vulnerabilities.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">2. Formal Verification</h4>
                    <p className="text-muted-foreground">
                      Consider formal verification for high-value contracts to mathematically prove the 
                      correctness of your smart contract against its specification.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">3. Use Proven Libraries</h4>
                    <p className="text-muted-foreground">
                      Utilize established, well-tested libraries like OpenZeppelin instead of implementing 
                      complex functionality from scratch.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <a href="/audit-guidelines" className="flex items-center">
                      View Complete Guide
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="defi" className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-2xl font-bold mb-4">DeFi Protocol Security</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">1. Oracle Security</h4>
                    <p className="text-muted-foreground">
                      Implement robust oracle designs to prevent price manipulation attacks. Consider using 
                      time-weighted average prices and multiple oracles for critical price data.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">2. Economic Attack Vectors</h4>
                    <p className="text-muted-foreground">
                      Model and simulate economic attack scenarios, including flash loans, to understand 
                      how your protocol behaves under extreme market conditions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">3. Governance Security</h4>
                    <p className="text-muted-foreground">
                      Implement timelock delays for governance actions and emergency pause mechanisms to 
                      prevent or mitigate damages from exploits.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <a href="/defi-security-guide" className="flex items-center">
                      View Complete Guide
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="wallets" className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-2xl font-bold mb-4">Wallet Security</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">1. Hardware Wallets</h4>
                    <p className="text-muted-foreground">
                      Use hardware wallets for storing significant assets. Hardware wallets keep private 
                      keys offline, significantly reducing the risk of theft.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">2. Multisig Security</h4>
                    <p className="text-muted-foreground">
                      Implement multisig wallets for organization funds requiring multiple signers to 
                      approve transactions, preventing single points of failure.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">3. Regular Security Reviews</h4>
                    <p className="text-muted-foreground">
                      Periodically review wallet permissions and connected applications. Revoke access for 
                      dApps you no longer use to minimize potential attack surfaces.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <a href="/wallet-security-guide" className="flex items-center">
                      View Complete Guide
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to secure your blockchain project?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Connect with top security experts and leverage advanced security tools to protect your Web3 investments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <a href="/request-audit">
                  Request Security Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/ai-tools">
                  Try AI Security Tools
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WebThreeSecurity;
