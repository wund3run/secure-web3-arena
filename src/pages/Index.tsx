
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesOverview } from "@/components/sections/FeaturesOverview";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureShowcase } from "@/components/features/FeatureShowcase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, Users, Zap, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hawkly - Web3 Security Audit Platform</title>
        <meta name="description" content="Professional Web3 security auditing platform with AI-powered matching, escrow payments, and real-time collaboration tools." />
        <meta name="keywords" content="Web3 security, smart contract audit, blockchain security, DeFi audit, NFT security" />
        <meta property="og:title" content="Hawkly - Web3 Security Audit Platform" />
        <meta property="og:description" content="Professional Web3 security auditing with advanced features" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Enhanced Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Advanced Platform Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for Web3 security professionals with cutting-edge tools and seamless workflows
              </p>
            </div>
            <FeatureShowcase />
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose your path and start securing Web3 projects with our comprehensive platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Request Audit",
                  description: "Submit your project for professional security review",
                  href: "/request-audit",
                  cta: "Start Audit"
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Browse Experts",
                  description: "Find verified security auditors for your project",
                  href: "/marketplace",
                  cta: "Find Auditors"
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Platform Features",
                  description: "Explore advanced tools and capabilities",
                  href: "/features",
                  cta: "View Features"
                },
                {
                  icon: <BarChart3 className="h-8 w-8" />,
                  title: "Analytics",
                  description: "Access comprehensive insights and reporting",
                  href: "/analytics",
                  cta: "View Analytics"
                }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit mb-4">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={item.href}>{item.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FeaturesOverview />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
