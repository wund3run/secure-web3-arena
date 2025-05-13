
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { EnhancedHeroHeader } from "@/components/home/enhanced-hero-header";
import { OnboardingPaths } from "@/components/onboarding/onboarding-paths";
import { IntelligentMatching } from "@/components/matching/intelligent-matching";
import { ReputationSystem } from "@/components/reputation/reputation-system";
import { ContinuousSecurity } from "@/components/security/continuous-security";
import { GamificationSection } from "@/components/home/gamification-section";
import { AuditStatsTable } from "@/components/home/audit-stats-table";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { FaqSection } from "@/components/home/faq-section";
import { EnhancedOnboarding } from "@/components/onboarding/enhanced-onboarding";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { BetaWarning } from "@/components/ui/beta-warning";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator"; 

const Index = () => {
  const [showEnhancedOnboarding, setShowEnhancedOnboarding] = useState(false);
  const [showBetaMessage, setShowBetaMessage] = useState(true);
  
  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("has_visited_hawkly");
    const hasCompletedOnboarding = localStorage.getItem("hawkly_onboarding_completed");
    const hasClosedBetaMessage = localStorage.getItem("hawkly_beta_notice_closed");
    
    if (!hasVisited && !hasCompletedOnboarding) {
      // Set a slight delay to show the onboarding after page loads
      const timer = setTimeout(() => {
        setShowEnhancedOnboarding(true);
        localStorage.setItem("has_visited_hawkly", "true");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    if (hasClosedBetaMessage) {
      setShowBetaMessage(false);
    }
  }, []);
  
  const handleCloseBetaMessage = () => {
    setShowBetaMessage(false);
    localStorage.setItem("hawkly_beta_notice_closed", "true");
  };

  const handleStartOnboarding = () => {
    setShowEnhancedOnboarding(true);
    toast.info("Starting guided onboarding...", { 
      duration: 2000 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Navbar />
      
      <main className="flex-grow">
        {showBetaMessage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
            <BetaWarning
              title="Hawkly Beta Platform"
              size="sm"
              dismissable={true}
              onDismiss={handleCloseBetaMessage}
              storageKey="hawkly_beta_notice_closed"
            >
              <p>
                Welcome to Hawkly Beta! We're continuously improving our Web3 security marketplace.
                Your feedback helps us improve.
              </p>
            </BetaWarning>
          </div>
        )}
      
        {/* Hero Section - The first thing users see */}
        <EnhancedHeroHeader />
        
        {/* Primary Value Proposition - What we offer */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-heading text-4xl font-extrabold">Secure Your Web3 Projects</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with expert security providers to protect your blockchain assets
              </p>
            </div>
            
            <MarketplaceSection />
          </div>
        </section>
        
        {/* Social Proof - Building trust */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-white to-secondary/5 border-y border-border/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading text-4xl font-extrabold">
                Trusted Security Results
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform delivers measurable security outcomes
              </p>
            </div>
            
            <AuditStatsTable />
          </div>
        </section>
        
        {/* Primary CTA - Main conversion point */}
        <section className="py-24 bg-gradient-to-br from-primary/20 via-white to-secondary/20 border-y border-border/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Our guided onboarding will help you find the right security solution
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-10 py-7 text-xl transition-all shadow-lg"
              onClick={handleStartOnboarding}
            >
              <Shield className="mr-3 h-7 w-7" />
              Start Guided Onboarding
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </section>
        
        {/* Key Features Section - What makes us different */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-heading text-4xl font-extrabold">Why Choose Hawkly</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our unique features designed for the Web3 security ecosystem
              </p>
            </div>
            
            <div className="space-y-32">
              <GamificationSection />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <OnboardingPaths />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <IntelligentMatching />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <ReputationSystem />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <ContinuousSecurity />
            </div>
          </div>
        </section>
        
        {/* FAQ Section - Addressing common questions */}
        <section className="py-24 bg-gradient-to-b from-white to-muted/20 border-t border-border/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-heading text-4xl font-extrabold">Common Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to know about our security platform
              </p>
            </div>
            
            <FaqSection />
          </div>
        </section>
      </main>
      
      <EnhancedFooter />
      
      {/* Enhanced Onboarding */}
      <EnhancedOnboarding 
        open={showEnhancedOnboarding} 
        onOpenChange={setShowEnhancedOnboarding} 
      />
    </div>
  );
};

export default Index;
