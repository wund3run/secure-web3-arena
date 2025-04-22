
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { MarketplaceSection } from "@/components/home/marketplace-section";
import { GamificationSection } from "@/components/home/gamification-section";
import { Shield, Trophy, Users } from "lucide-react";

// Features section component
function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Verified Security Experts",
      description: "Connect with thoroughly vetted and verified security professionals specializing in blockchain and Web3 technologies."
    },
    {
      id: 2,
      icon: Trophy,
      title: "Competitive Gamification",
      description: "Earn rewards, unlock achievements, and climb the security leaderboard as you build your reputation in the ecosystem."
    },
    {
      id: 3,
      icon: Users,
      title: "Community-Driven Security",
      description: "Join a vibrant community of security experts, developers, and project owners working together to secure the Web3 space."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Your Path to Web3 Security Excellence
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            A decentralized marketplace with powerful incentives for both security providers and users
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
        <MarketplaceSection />
        <GamificationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
