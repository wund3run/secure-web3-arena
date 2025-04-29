
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Navbar />
      <main className="flex-grow">
        <EnhancedHeroHeader />
        
        {/* Stats and features sections */}
        <section className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </main>
      <EnhancedFooter />
    </div>
  );
};

export default Index;
