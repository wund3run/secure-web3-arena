
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { OnboardingPaths } from "@/components/onboarding/onboarding-paths";
import { IntelligentMatching } from "@/components/matching/intelligent-matching";
import { ReputationSystem } from "@/components/reputation/reputation-system";
import { ContinuousSecurity } from "@/components/security/continuous-security";
import { Shield, Trophy, Users } from "lucide-react";

// Features section component
function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Dual-Path Onboarding",
      description: "Tailored experiences for both security providers and project owners with specialized verification processes."
    },
    {
      id: 2,
      icon: Trophy,
      title: "Reputation-Based Ecosystem",
      description: "Build your reputation, unlock achievements, and gain access to exclusive benefits in our gamified security network."
    },
    {
      id: 3,
      icon: Users,
      title: "Intelligent Matching",
      description: "Our AI-powered system connects projects with the most suitable security experts based on specific needs and expertise."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Modern Web3 Security Platform
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond a traditional marketplace - a comprehensive security ecosystem for the blockchain space
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.id} className="bg-card rounded-xl p-8 border border-border/30 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
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
    <section className="bg-web3-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-web3-teal">{stat.label}</div>
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        
        {/* New components */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OnboardingPaths />
          </div>
        </section>
        
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <IntelligentMatching />
          </div>
        </section>
        
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReputationSystem />
          </div>
        </section>
        
        <section className="py-16 bg-background">
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
