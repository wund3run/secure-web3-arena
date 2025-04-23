import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { OnboardingPaths } from "@/components/onboarding/onboarding-paths";
import { IntelligentMatching } from "@/components/matching/intelligent-matching";
import { ReputationSystem } from "@/components/reputation/reputation-system";
import { ContinuousSecurity } from "@/components/security/continuous-security";
import { GamificationSection } from "@/components/home/gamification-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { Shield, Trophy, Users } from "lucide-react";
import { BadgeAward } from "@/components/ui/badge-award";

// Features section component
function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Expert Security Audits",
      description: "Connect with verified security experts specialized in blockchain and smart contract auditing."
    },
    {
      id: 2,
      icon: Trophy,
      title: "Rewards & Recognition",
      description: "Build your reputation, unlock achievements, and earn rewards for your contributions."
    },
    {
      id: 3,
      icon: Users,
      title: "Community-Driven",
      description: "Join a thriving community of security experts, developers, and project owners."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Why Choose Hawkly?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            The leading Web3 security platform with integrated rewards and community features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group relative bg-card hover:bg-card/80 transition-colors rounded-xl p-8 border border-primary/20 shadow-sm hover:shadow-md"
            >
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats section component
function StatsSection() {
  const stats = [
    { id: 1, value: "500+", label: "Security Experts" },
    { id: 2, value: "$350M+", label: "Assets Protected" },
    { id: 3, value: "2,500+", label: "Projects Secured" },
    { id: 4, value: "12,800+", label: "Vulnerabilities Found" }
  ];

  return (
    <section className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-16 border-y border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Index component
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/90 to-primary/20">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <MarketplaceSection />
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
      <Footer />
    </div>
  );
};

export default Index;
