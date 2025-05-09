
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
      
        <EnhancedHeroHeader />
        
        {/* Stats and features sections */}
        <section className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {/* Stats cards */}
              <div className="glass-card p-6 rounded-xl hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  500+
                </div>
                <div className="text-muted-foreground font-medium">Security Experts</div>
              </div>
              <div className="glass-card p-6 rounded-xl hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  $350M+
                </div>
                <div className="text-muted-foreground font-medium">Assets Protected</div>
              </div>
              <div className="glass-card p-6 rounded-xl hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  2,500+
                </div>
                <div className="text-muted-foreground font-medium">Projects Secured</div>
              </div>
              <div className="glass-card p-6 rounded-xl hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  12,800+
                </div>
                <div className="text-muted-foreground font-medium">Vulnerabilities Found</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Get started CTA */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold mb-6">Join Our Web3 Security Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a security provider or project owner, our guided onboarding will help you get started.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8 transition-all"
                onClick={handleStartOnboarding}
              >
                <Shield className="mr-2 h-5 w-5" />
                Start Guided Onboarding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main content sections */}
        <MarketplaceSection />
        <AuditStatsTable />
        <GamificationSection />
        
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OnboardingPaths />
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <IntelligentMatching />
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReputationSystem />
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContinuousSecurity />
          </div>
        </section>
        
        {/* FAQ Section */}
        <FaqSection />
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
