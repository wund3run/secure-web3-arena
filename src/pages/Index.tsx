import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { WhyHawklySection } from "@/components/home/why-hawkly-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { FeaturesGlanceSection } from "@/components/home/features-glance-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { EnhancedPageMeta } from "@/components/seo/EnhancedPageMeta";
import { createOrganizationStructuredData } from "@/utils/seo/structured-data-templates";

export default function Index() {
  const structuredData = createOrganizationStructuredData();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <EnhancedPageMeta
        title="Hawkly - Leading Web3 Security Platform | Smart Contract Audits"
        description="Connect with verified Web3 security experts for professional smart contract audits. Fast, secure, and affordable blockchain security solutions for DeFi, NFT, and Web3 projects."
        keywords={['web3 security', 'smart contract audit', 'blockchain security', 'defi audit', 'nft security', 'cryptocurrency audit']}
        type="website"
        structuredData={structuredData}
      />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <WhyHawklySection />
        <HowItWorksSection />
        <FeaturesGlanceSection />
        <TestimonialsSection />
        {/* Enhanced Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Secure Your Web3 Project Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join 2,500+ successful projects that trust Hawkly for their security needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/request-audit">
                  Get Security Audit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/marketplace">
                  Browse Security Experts
                </Link>
              </Button>
            </div>
            <div className="mt-8 text-sm text-blue-100">
              <p> 500+ Verified Experts  $350M+ Protected  48hr Average Turnaround</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
