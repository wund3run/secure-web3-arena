import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { OnboardingPaths } from "@/components/onboarding/onboarding-paths";
import { IntelligentMatching } from "@/components/matching/intelligent-matching";
import { ReputationSystem } from "@/components/reputation/reputation-system";
import { ContinuousSecurity } from "@/components/security/continuous-security";
import { GamificationSection } from "@/components/home/gamification-section";
import { AuditStatsTable } from "@/components/home/audit-stats-table";
import { Shield, Trophy, Users, Check, ArrowRight } from "lucide-react";
import { BadgeAward } from "@/components/ui/badge-award";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Expert Security Audits",
      description: "Access verified security experts specialized in blockchain and smart contract auditing to protect your Web3 projects."
    },
    {
      id: 2,
      icon: Trophy,
      title: "Rewards & Recognition",
      description: "Build your reputation, unlock achievements, and earn rewards for finding vulnerabilities and contributing to security."
    },
    {
      id: 3,
      icon: Users,
      title: "Community-Driven",
      description: "Join a thriving network of security experts, developers, and project owners collaborating to secure the Web3 ecosystem."
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
              className="group relative glass-card rounded-xl p-8 hover-lift"
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

function StatsSection() {
  const stats = [
    { id: 1, value: "500+", label: "Security Experts" },
    { id: 2, value: "$350M+", label: "Assets Protected" },
    { id: 3, value: "2,500+", label: "Projects Secured" },
    { id: 4, value: "12,800+", label: "Vulnerabilities Found" }
  ];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary mb-2">
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

function CallToActionSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Web3 Project?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join Hawkly today and connect with verified security experts who can help protect your blockchain assets from vulnerabilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>Access to 500+ verified security auditors</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>Competitive pricing through our marketplace model</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>Transparent reputation system to find the best match</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/marketplace">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <Shield className="h-64 w-64 text-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                    <h3 className="text-xl font-bold mb-4 text-center">Security First</h3>
                    <p className="text-muted-foreground">
                      In Web3, security isn't just a feature — it's the foundation of trust and success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <AuditStatsTable />
        <GamificationSection />
        
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OnboardingPaths />
          </div>
        </section>
        
        <CallToActionSection />
        
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
