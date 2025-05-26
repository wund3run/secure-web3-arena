
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
          {/* Hero Section */}
          <SimplifiedHero />
          
          {/* Trust Indicators */}
          <TrustIndicators />
          
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
                      <span>Get matched with security experts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Detailed security reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Pay only when satisfied</span>
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
                      <span>Work with quality projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Earn competitive rates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Build your reputation</span>
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
