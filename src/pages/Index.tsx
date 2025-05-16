
import React from "react";
import { Helmet } from "react-helmet-async";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { GamificationSection } from "@/components/home/gamification-section";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SkipLink } from "@/components/ui/skip-link";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Code, CheckCircle, Database, Key, Activity, MessageSquare, Layout } from "lucide-react";
import { MarketplaceHero } from "@/components/marketplace/sections/MarketplaceHero";

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
      <SkipLink targetId="main-content" />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 border-b">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Secure Your Web3 Projects with Expert Auditors
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                    Connect with verified security experts to protect your blockchain applications from vulnerabilities and exploits.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                      <Link to="/marketplace" className="flex items-center">
                        Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/request-audit">Request Security Audit</Link>
                    </Button>
                  </div>
                  
                  <div className="mt-8 flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Verified auditors with proven expertise</span>
                  </div>
                </div>
                
                <div className="hidden lg:flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-30"></div>
                    <div className="relative bg-card p-8 rounded-lg shadow-xl border">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Shield className="h-16 w-16 text-primary" />
                        <h3 className="text-2xl font-bold">Web3 Security Marketplace</h3>
                        <p className="text-muted-foreground">
                          Find the right security services for your project's specific needs
                        </p>
                        <div className="grid grid-cols-2 gap-4 w-full mt-4">
                          <div className="bg-muted/50 p-4 rounded-md flex flex-col items-center">
                            <Code className="h-8 w-8 text-primary mb-2" />
                            <span className="text-sm font-medium">Smart Contract Audits</span>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-md flex flex-col items-center">
                            <Shield className="h-8 w-8 text-primary mb-2" />
                            <span className="text-sm font-medium">Security Reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Clear user paths section */}
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Simple Security for Every User</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Whether you're a project owner or security expert, we've made the platform intuitive for you.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project Owner Path */}
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <h3 className="text-2xl font-semibold mb-4">Project Owners</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Find verified auditors for your project</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Submit audit requests with ease</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Access clear audit reports and recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Track security improvements over time</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/auth" className="flex items-center justify-center">
                      Sign In as Project Owner <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                {/* Security Auditor Path */}
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <h3 className="text-2xl font-semibold mb-4">Security Auditors</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Showcase your security expertise</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Find new audit opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Earn reputation and recognition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Collaborate with leading blockchain projects</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/service-provider-onboarding" className="flex items-center justify-center">
                      Join as an Auditor <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Comprehensive Web3 Security Services Section */}
          <section className="py-20 border-t border-b">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Web3 Security Services</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Protect your blockchain applications with our end-to-end security solutions across all
                  layers of Web3 architecture
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
                    Comprehensive audits for Solidity, Rust, and Move smart contracts to prevent exploits and vulnerabilities
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
                    Secure blockchain nodes, RPC endpoints, indexers, and Web3 infrastructure components
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
                    Secure wallet key storage, private key handling, and multi-signature implementation
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
                    <Activity className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold">Oracle Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Protection against price manipulation, data source verification, and oracle failure safeguards
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Price feed validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Multiple data source integration</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Heartbeat monitoring</span>
                    </li>
                  </ul>
                </div>
                
                {/* API Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-6 w-6 text-cyan-600 mr-2" />
                    <h3 className="text-xl font-semibold">API Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Secure connection between Web2 backends and Web3 contracts with proper authentication
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-600 mr-2"></div>
                      <span className="text-sm">Message signing verification</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-600 mr-2"></div>
                      <span className="text-sm">Rate limiting implementation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-600 mr-2"></div>
                      <span className="text-sm">Authentication best practices</span>
                    </li>
                  </ul>
                </div>
                
                {/* Front-end DApp Security */}
                <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <Layout className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold">Front-end DApp Security</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Protection for web interfaces, wallet connections, and user interaction with contracts
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Wallet connection validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Transaction simulation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">User interface safeguards</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link to="/web3-security" className="flex items-center justify-center">
                    Explore our full range of specialized security services <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          
          <GamificationSection />
          <FaqSection />
        </main>
        <EnhancedFooter />
      </div>
    </>
  );
}
