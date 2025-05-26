
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { GamificationSection } from "@/components/home/gamification-section";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Code, CheckCircle, Database, Key, Activity, MessageSquare, Layout, Zap, Users, Lock, Award, Target } from "lucide-react";

// New components for improved UX
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { PricingPreview } from "@/components/home/pricing-preview";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Connect with top security auditors and protect your blockchain project. Smart contract audits, bug bounties, and continuous security services."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {/* Simplified Hero Section */}
          <SimplifiedHero />
          
          {/* Trust Indicators */}
          <TrustIndicators />
          
          {/* Interactive Demo */}
          <div id="demo">
            <InteractiveDemo />
          </div>
          
          {/* Clear user paths section */}
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Whether you're securing a project or offering security expertise, we've made it simple.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Project Owner Path */}
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">I Need Security Audit</h3>
                    <p className="text-muted-foreground">Protect your Web3 project from vulnerabilities</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>AI-powered auditor matching</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Comprehensive security reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Secure escrow payments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Post-audit support</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/request-audit" className="flex items-center justify-center">
                      Request Security Audit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                {/* Security Auditor Path */}
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-secondary/10 rounded-full mb-4">
                      <Users className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">I'm a Security Expert</h3>
                    <p className="text-muted-foreground">Join our network of verified auditors</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Access to quality projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Competitive compensation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Build your reputation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Flexible working</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/service-provider-onboarding" className="flex items-center justify-center">
                      Join as Auditor <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing Preview */}
          <PricingPreview />
          
          {/* Comprehensive Web3 Security Services Section */}
          <section className="py-20 border-t border-b">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Security Coverage</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  End-to-end security solutions for every layer of your Web3 application
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Smart Contract Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <Code className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold">Smart Contract Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Comprehensive audits for Solidity, Rust, and Move smart contracts
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Reentrancy protection</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Access control validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Logic optimization</span>
                    </li>
                  </ul>
                </div>
                
                {/* Infrastructure Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-cyan-600 mr-2" />
                    <h3 className="text-xl font-semibold">Infrastructure Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Secure blockchain nodes, RPC endpoints, and Web3 infrastructure
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-600 mr-2"></div>
                      <span className="text-sm">Node configuration hardening</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-600 mr-2"></div>
                      <span className="text-sm">RPC endpoint protection</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-600 mr-2"></div>
                      <span className="text-sm">DDoS mitigation strategies</span>
                    </li>
                  </ul>
                </div>
                
                {/* Key Management */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <Key className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold">Key Management</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Secure wallet key storage and multi-signature implementation
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Hardware security modules</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Multi-sig architecture</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Key rotation protocols</span>
                    </li>
                  </ul>
                </div>
                
                {/* Oracle Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <Activity className="h-6 w-6 text-orange-600 mr-2" />
                    <h3 className="text-xl font-semibold">Oracle Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Protection against price manipulation and data source verification
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-600 mr-2"></div>
                      <span className="text-sm">Price feed validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-600 mr-2"></div>
                      <span className="text-sm">Multiple data sources</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-600 mr-2"></div>
                      <span className="text-sm">Heartbeat monitoring</span>
                    </li>
                  </ul>
                </div>
                
                {/* API Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold">API Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Secure Web2-Web3 connections with proper authentication
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm">Message signing verification</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm">Rate limiting</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm">Authentication best practices</span>
                    </li>
                  </ul>
                </div>
                
                {/* Front-end DApp Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <Layout className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold">Front-end DApp Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Protection for web interfaces and wallet connections
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-sm">Wallet connection validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-sm">Transaction simulation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-sm">User interface safeguards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <GamificationSection />
          <FaqSection />
        </div>
        <EnhancedFooter />
      </div>
    </>
  );
}
