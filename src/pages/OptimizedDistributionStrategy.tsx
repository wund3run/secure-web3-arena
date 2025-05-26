
import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, TrendingUp, Globe } from "lucide-react";
import { LazySection } from "@/components/performance/LazySection";

// Lazy load heavy components
const NetworkEffectsSection = React.lazy(() => 
  import("@/components/home/network-effects-section").then(module => ({
    default: module.NetworkEffectsSection
  }))
);

const StrategicPartnershipsSection = React.lazy(() => 
  import("@/components/home/strategic-partnerships-section").then(module => ({
    default: module.StrategicPartnershipsSection
  }))
);

const GlobalExpansionSection = React.lazy(() => 
  import("@/components/home/global-expansion-section").then(module => ({
    default: module.GlobalExpansionSection
  }))
);

const DistributionStrategy = () => {
  return (
    <>
      <Helmet>
        <title>Distribution Strategy | Hawkly</title>
        <meta
          name="description"
          content="Learn how Hawkly is scaling to become the #1 Web3 security platform through strategic partnerships, global expansion, and network effects."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Section - Immediate load */}
          <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Target className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Strategic Distribution Scale</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Becoming the Global
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Web3 Security Standard
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Our comprehensive distribution strategy leverages network effects, strategic partnerships, 
                  and global expansion to establish market dominance in Web3 security.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
                    <Link to="/service-provider-onboarding" className="flex items-center">
                      Join Our Network <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact" className="flex items-center">
                      Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Strategy Overview - Immediate load */}
          <section className="py-16">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Four-Phase Distribution Strategy</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Our systematic approach to achieving global market leadership in Web3 security
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phase 1: Network Effects</h3>
                  <p className="text-sm text-muted-foreground">
                    Accelerate auditor acquisition and project demand generation
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phase 2: Strategic Partnerships</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrate with development tools and blockchain ecosystems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phase 3: Global Expansion</h3>
                  <p className="text-sm text-muted-foreground">
                    Establish presence in key markets with local expertise
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phase 4: Market Dominance</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform evolution and competitive moat establishment
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Lazy loaded sections */}
          <LazySection>
            <NetworkEffectsSection />
          </LazySection>
          
          <LazySection>
            <StrategicPartnershipsSection />
          </LazySection>
          
          <LazySection>
            <GlobalExpansionSection />
          </LazySection>
          
          {/* Call to Action */}
          <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Be Part of the Revolution</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join us as we transform Web3 security and establish the global standard 
                  for blockchain project protection.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
                    <Link to="/marketplace" className="flex items-center">
                      Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/docs" className="flex items-center">
                      View Documentation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default DistributionStrategy;
