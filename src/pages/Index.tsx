
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { SupportButton } from "@/components/ui/support-button";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, Users } from "lucide-react";

// Simplified components for better UX
import { SimplifiedHero } from "@/components/home/simplified-hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { PricingPreview } from "@/components/home/pricing-preview";
import { IndustrySpecificCases } from "@/components/home/industry-specific-cases";
import { CompetitiveAdvantages } from "@/components/home/competitive-advantages";
import { ComprehensiveSecurity } from "@/components/home/comprehensive-security";

// New strategic positioning components
import { MarketPositioning } from "@/components/home/market-positioning";
import { PlatformFeaturesShowcase } from "@/components/home/platform-features-showcase";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Next-Generation Web3 Security Platform</title>
        <meta
          name="description"
          content="The leading Web3 security marketplace. AI-powered auditor matching, smart contract escrow, and continuous monitoring. Faster, more secure, more affordable than traditional audit firms."
        />
        <meta name="keywords" content="web3 security, smart contract audit, blockchain security, DeFi audit, NFT security, crypto audit" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {/* Hero Section */}
          <SimplifiedHero />
          
          {/* Trust Indicators */}
          <TrustIndicators />
          
          {/* Market Positioning - NEW */}
          <MarketPositioning />
          
          {/* Platform Features Showcase - NEW */}
          <PlatformFeaturesShowcase />
          
          {/* Interactive Demo */}
          <div id="demo">
            <InteractiveDemo />
          </div>
          
          {/* Simplified user paths section */}
          <section className="py-16 bg-muted/20">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Whether you need security help or want to provide security services, we've got you covered.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Project Owner Path - simplified language */}
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">I Need Security Help</h3>
                    <p className="text-muted-foreground">Protect your project from security risks</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Get matched with security experts in under 2 hours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Detailed security reports with continuous monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Smart contract escrow - pay only when satisfied</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/request-audit" className="flex items-center justify-center">
                      Get Security Help <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                {/* Security Expert Path - simplified language */}
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-secondary/10 rounded-full mb-4">
                      <Users className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">I'm a Security Expert</h3>
                    <p className="text-muted-foreground">Join our network of security professionals</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>AI-powered matching with quality projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Earn competitive rates with instant payments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Build your reputation in our verified network</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/service-provider-onboarding" className="flex items-center justify-center">
                      Join as Expert <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Learn More Section - Enhanced with competitive positioning */}
          <section className="py-16 border-t">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Hawkly Leads the Market</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Discover how our next-generation platform outperforms traditional audit firms and competitor platforms
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Why Choose Hawkly?</h3>
                    <p className="text-muted-foreground">See how we outperform Code4rena, Spearbit, and traditional auditors</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/competitive-advantages" className="flex items-center justify-center">
                      Compare vs Competitors <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-secondary/10 rounded-full mb-4">
                      <Users className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Complete Security Coverage</h3>
                    <p className="text-muted-foreground">Explore our comprehensive security solutions</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/comprehensive-security" className="flex items-center justify-center">
                      View Services <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Industry-Specific Security Solutions */}
          <IndustrySpecificCases />
          
          {/* Enhanced Competitive Advantages */}
          <CompetitiveAdvantages />
          
          {/* Comprehensive Security */}
          <ComprehensiveSecurity />
          
          {/* Pricing Preview */}
          <PricingPreview />
          
          {/* FAQ Section */}
          <FaqSection />
        </div>
        <EnhancedFooter />
        
        {/* Live Chat/Support Widget */}
        <SupportButton />
      </div>
    </>
  );
}
