
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

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <WhyHawklySection />
        <HowItWorksSection />
        <FeaturesGlanceSection />
        <TestimonialsSection />
        
        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join Hawkly and experience the future of Web3 security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/request-audit">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/marketplace">
                  See Platform Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
