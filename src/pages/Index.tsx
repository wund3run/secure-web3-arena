
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
import { useEffect, useRef } from "react";

const Index = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const updateCSSVariables = () => {
      document.documentElement.style.setProperty('--mouse-x', `${mousePosition.current.x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mousePosition.current.y}px`);
      animationId.current = requestAnimationFrame(updateCSSVariables);
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateCSSVariables();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Helmet>
        <title>Hawkly - Web3 Security Audit Platform</title>
        <meta name="description" content="Professional Web3 security auditing platform with AI-powered matching, escrow payments, and real-time collaboration tools." />
        <meta name="keywords" content="Web3 security, smart contract audit, blockchain security, DeFi audit, NFT security" />
        <meta property="og:title" content="Hawkly - Web3 Security Audit Platform" />
        <meta property="og:description" content="Professional Web3 security auditing with advanced features" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Global animated background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 animated-grid"></div>
        <div className="absolute inset-0 cursor-glow"></div>
        <div className="floating-particles"></div>
      </div>

      <style>
        {`
          :root {
            --mouse-x: 50vw;
            --mouse-y: 50vh;
          }

          .animated-grid {
            background-image: 
              linear-gradient(rgba(var(--primary-rgb, 74, 144, 226), 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--primary-rgb, 74, 144, 226), 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridFlow 20s linear infinite;
            mask-image: radial-gradient(
              800px circle at var(--mouse-x) var(--mouse-y),
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0.1) 50%,
              transparent 100%
            );
          }

          .cursor-glow {
            background: radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y),
              rgba(var(--primary-rgb, 74, 144, 226), 0.15),
              rgba(var(--secondary-rgb, 51, 195, 240), 0.1) 40%,
              transparent 70%
            );
            animation: pulse 4s ease-in-out infinite;
          }

          .floating-particles {
            background-image: 
              radial-gradient(2px 2px at 20px 30px, rgba(var(--primary-rgb, 74, 144, 226), 0.3), transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(var(--secondary-rgb, 51, 195, 240), 0.4), transparent),
              radial-gradient(1px 1px at 90px 40px, rgba(var(--accent-rgb, 155, 135, 245), 0.3), transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(var(--primary-rgb, 74, 144, 226), 0.2), transparent),
              radial-gradient(2px 2px at 160px 30px, rgba(var(--secondary-rgb, 51, 195, 240), 0.3), transparent);
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: particleFloat 25s linear infinite;
            opacity: 0.6;
          }

          @keyframes gridFlow {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }

          @keyframes particleFloat {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }

          .interactive-section {
            position: relative;
            background: rgba(var(--background-rgb, 0, 0, 0), 0.85);
            backdrop-filter: blur(1px);
            border: 1px solid rgba(var(--primary-rgb, 74, 144, 226), 0.1);
            transition: all 0.3s ease;
          }

          .interactive-section:hover {
            background: rgba(var(--background-rgb, 0, 0, 0), 0.9);
            border-color: rgba(var(--primary-rgb, 74, 144, 226), 0.2);
            box-shadow: 0 8px 32px rgba(var(--primary-rgb, 74, 144, 226), 0.1);
          }

          .interactive-card {
            background: rgba(var(--card-rgb, 0, 0, 0), 0.8);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(var(--primary-rgb, 74, 144, 226), 0.15);
            transition: all 0.3s ease;
          }

          .interactive-card:hover {
            background: rgba(var(--card-rgb, 0, 0, 0), 0.9);
            border-color: rgba(var(--primary-rgb, 74, 144, 226), 0.3);
            box-shadow: 0 12px 40px rgba(var(--primary-rgb, 74, 144, 226), 0.15);
            transform: translateY(-2px);
          }
        `}
      </style>

      <div className="relative z-10">
        <Navbar />
        
        <main>
          <HeroSection />
          
          {/* Enhanced Features Section with interactive background */}
          <section className="py-20 interactive-section">
            <div className="container relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Advanced Platform Features</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Built for Web3 security professionals with cutting-edge tools and seamless workflows
                </p>
              </div>
              <FeatureShowcase />
            </div>
          </section>

          {/* Quick Access Section with interactive cards */}
          <section className="py-20 interactive-section">
            <div className="container relative z-10">
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
                  <Card key={index} className="interactive-card text-center">
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
    </div>
  );
};

export default Index;
