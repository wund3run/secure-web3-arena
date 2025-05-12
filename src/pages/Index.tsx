
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
      
        {/* Hero Section */}
        <EnhancedHeroHeader />
        
        {/* Stats Section with visual separator */}
        <section className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 py-16 border-y border-border/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Securing the Web3 Ecosystem
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Stats cards with enhanced visual separation */}
              <div className="glass-card p-6 rounded-xl shadow-md hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  500+
                </div>
                <div className="text-muted-foreground font-medium">Security Experts</div>
              </div>
              <div className="glass-card p-6 rounded-xl shadow-md hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  $350M+
                </div>
                <div className="text-muted-foreground font-medium">Assets Protected</div>
              </div>
              <div className="glass-card p-6 rounded-xl shadow-md hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  2,500+
                </div>
                <div className="text-muted-foreground font-medium">Projects Secured</div>
              </div>
              <div className="glass-card p-6 rounded-xl shadow-md hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
                  12,800+
                </div>
                <div className="text-muted-foreground font-medium">Vulnerabilities Found</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Primary Value Proposition */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MarketplaceSection />
          </div>
          <Separator className="max-w-5xl mx-auto my-16 opacity-30" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AuditStatsTable />
          </div>
        </section>
        
        {/* Clear CTA Section with visual emphasis */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Web3 Security Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you're a security provider or project owner, our guided onboarding will help you get started.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8 py-6 text-lg transition-all shadow-lg"
              onClick={handleStartOnboarding}
            >
              <Shield className="mr-2 h-6 w-6" />
              Start Guided Onboarding
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        {/* Key Features Section with improved visual hierarchy */}
        <section className="py-20 bg-gradient-to-b from-white to-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">Key Platform Features</h2>
            <div className="space-y-24">
              <GamificationSection />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <OnboardingPaths />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <IntelligentMatching />
            </div>
          </div>
        </section>
        
        {/* Additional Value Props with better spacing */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">Why Choose Hawkly</h2>
            <div className="space-y-24">
              <ReputationSystem />
              <Separator className="max-w-5xl mx-auto opacity-30" />
              <ContinuousSecurity />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-white to-muted/20 border-t border-border/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
