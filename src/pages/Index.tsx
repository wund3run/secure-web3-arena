
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesOverview } from "@/components/sections/FeaturesOverview";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureShowcase } from "@/components/features/FeatureShowcase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, Users, Zap, BarChart3, MessageSquare, Bell, FileText, Scale } from "lucide-react";

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

        {/* Legal Compliance Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Legal & Compliance</Badge>
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Legal Protection</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive legal framework with GDPR and Indian DPDP compliance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <Scale className="h-8 w-8" />,
                  title: "GDPR Compliant",
                  description: "Full European data protection compliance",
                  href: "/privacy"
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Indian DPDP Act",
                  description: "Adherence to India's data protection laws",
                  href: "/privacy"
                },
                {
                  icon: <FileText className="h-8 w-8" />,
                  title: "Service Terms",
                  description: "Transparent terms with quality guarantees",
                  href: "/terms"
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Professional Liability",
                  description: "$2M insurance coverage per auditor",
                  href: "/terms"
                }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit mb-4">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={item.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enhanced Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4">Platform Features</Badge>
              <h2 className="text-3xl font-bold mb-4">Advanced Platform Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for Web3 security professionals with cutting-edge tools and seamless workflows
              </p>
            </div>
            <FeatureShowcase />
          </div>
        </section>

        {/* New Functional Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4">Real-time Features</Badge>
              <h2 className="text-3xl font-bold mb-4">Enhanced Communication & Tracking</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-time collaboration tools for seamless audit management
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <BarChart3 className="h-12 w-12" />,
                  title: "Progress Tracking",
                  description: "Real-time audit progress with milestone tracking and visual indicators",
                  features: ["Visual progress bars", "Milestone tracking", "Activity feeds", "Real-time updates"]
                },
                {
                  icon: <MessageSquare className="h-12 w-12" />,
                  title: "Real-time Chat",
                  description: "Instant communication between auditors and clients with file sharing",
                  features: ["Instant messaging", "File attachments", "Typing indicators", "Message status"]
                },
                {
                  icon: <Bell className="h-12 w-12" />,
                  title: "Smart Notifications",
                  description: "Intelligent notification system with priority levels and filtering",
                  features: ["Priority filtering", "Category sorting", "Read/unread status", "Custom alerts"]
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="mx-auto p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      <div className="text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="mb-4">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link to="/dashboard">Try Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-20 bg-muted/30">
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
                  icon: <BarChart3 className="h-8 w-8" />,
                  title: "Track Progress",
                  description: "Monitor your audit progress in real-time",
                  href: "/dashboard",
                  cta: "View Dashboard"
                },
                {
                  icon: <MessageSquare className="h-8 w-8" />,
                  title: "Communicate",
                  description: "Chat with auditors and track notifications",
                  href: "/dashboard",
                  cta: "Start Chatting"
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
