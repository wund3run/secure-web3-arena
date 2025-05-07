
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Star, BadgeCheck, Shield, Users, ExternalLink, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeAward } from "@/components/ui/badge-award";
import { SecurityScore } from "@/components/trust/security-metrics";
import { SERVICES } from "@/data/marketplace-data";
import { toast } from "sonner";

export default function ServiceDetails() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API fetch with a small delay
    setIsLoading(true);
    setTimeout(() => {
      const foundService = SERVICES.find(s => s.id === serviceId);
      if (foundService) {
        setService(foundService);
        // Find related services in the same category
        const related = SERVICES.filter(s => 
          s.id !== serviceId && s.category === foundService.category
        ).slice(0, 3);
        setRelatedServices(related);
      }
      setIsLoading(false);
    }, 300);
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-muted rounded mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <Shield className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Link to="/marketplace">
            <Button>Return to Marketplace</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleRequestService = () => {
    toast.success("Service request initiated", {
      description: "Your request has been sent to the provider.",
    });
  };

  const handleContactProvider = () => {
    toast.success("Message sent to provider", {
      description: "You'll be notified when they respond.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>{service.title} | Hawkly Security Services</title>
        <meta name="description" content={service.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="absolute inset-0">
            <img 
              src={service.imageUrl} 
              alt={service.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50`;
              }}
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-6 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="bg-primary/80 text-white border-none">
                {service.category}
              </Badge>
              <BadgeAward 
                variant={service.provider.level === "rookie" ? "verified" : service.provider.level} 
                className="font-medium backdrop-blur-sm shadow-lg"
              >
                {service.provider.level === "rookie" ? "Verified" : service.provider.level === "expert" ? "Expert" : "Verified"}
              </BadgeAward>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h1>
            <div className="flex flex-wrap items-center mt-2 text-white gap-x-6">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                <span className="font-semibold">{service.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{service.completedJobs} completed projects</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>~2-3 week delivery</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/marketplace" className="hover:text-primary flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Marketplace
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Service Details */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Overview */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
                  <p className="text-muted-foreground whitespace-pre-line mb-4">
                    {service.description}
                  </p>
                  <p className="text-muted-foreground">
                    This comprehensive security service provides thorough analysis and protection tailored to 
                    {service.category === "Smart Contracts" ? " your smart contract's unique architecture and use case." :
                     service.category === "DApps" ? " your decentralized application's frontend, backend, and blockchain integration points." :
                     service.category === "Protocols" ? " your protocol's complex architecture, economic model, and smart contract interactions." :
                     service.category === "NFTs" ? " your NFT collection's contract logic, metadata handling, and marketplace interactions." :
                     service.category === "Bridges" ? " cross-chain bridge implementations, focusing on secure asset transfers between networks." :
                     service.category === "Infrastructure" ? " your Web3 infrastructure, including RPC endpoints, nodes, and API services." :
                     service.category === "DAOs" ? " your DAO governance mechanisms to prevent takeover attacks and voting manipulation." :
                     service.category === "ZK Proofs" ? " zero-knowledge proof implementations to ensure cryptographic soundness and security." :
                     " your specific Web3 project needs."}
                  </p>
                </section>
                
                {/* What's Included */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Pre-Audit Consultation</h3>
                        <p className="text-sm text-muted-foreground">Detailed discussion to understand your project requirements and security needs</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Comprehensive Code Review</h3>
                        <p className="text-sm text-muted-foreground">Manual and automated analysis of your {service.category.toLowerCase()} code</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Vulnerability Assessment</h3>
                        <p className="text-sm text-muted-foreground">Identification and classification of security issues by severity</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Detailed Report</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive documentation of findings with remediation guidance</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Fix Verification</h3>
                        <p className="text-sm text-muted-foreground">Validation of implemented fixes to ensure proper remediation</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Post-Audit Support</h3>
                        <p className="text-sm text-muted-foreground">Additional assistance as needed for up to 30 days after delivery</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
                
                {/* Security Methodology */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Security Methodology</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">1. Initial Assessment</h3>
                      <p className="text-sm text-muted-foreground">Thorough review of project scope, architecture, and security requirements.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">2. Automated Analysis</h3>
                      <p className="text-sm text-muted-foreground">Using specialized tools like Slither, MythX, and Echidna to detect common vulnerabilities.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">3. Manual Code Review</h3>
                      <p className="text-sm text-muted-foreground">Experienced security engineers perform line-by-line analysis of critical components.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">4. Testing & Exploitation</h3>
                      <p className="text-sm text-muted-foreground">Executing tests to verify vulnerabilities and demonstrate potential exploits.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">5. Documentation & Reporting</h3>
                      <p className="text-sm text-muted-foreground">Detailed reporting of findings with clear remediation steps and recommendations.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">6. Fix Verification & Support</h3>
                      <p className="text-sm text-muted-foreground">Validation of implemented fixes and ongoing support during remediation.</p>
                    </div>
                  </div>
                </section>
                
                {/* Expertise & Tools */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Expertise & Tools</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="bg-primary/10 text-primary">Static Analysis</Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary">Fuzzing</Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary">Formal Verification</Badge>
                  </div>
                </section>
                
                {/* Case Studies */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Case Studies</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Critical Vulnerability in {service.category} Protocol</h3>
                        <p className="text-sm text-muted-foreground mb-2">Identified and helped fix a critical reentrancy vulnerability that could have led to $2M+ loss of funds.</p>
                        <Badge variant="outline" className="bg-red-100 text-red-800">Critical Issue</Badge>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Pre-Launch Audit for {service.category} Startup</h3>
                        <p className="text-sm text-muted-foreground mb-2">Comprehensive audit revealed 3 high and 5 medium severity issues before public launch.</p>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">High Impact</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </section>
                
                {/* Testimonials */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Client Testimonials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            AC
                          </div>
                          <div className="ml-3">
                            <div className="font-semibold">Alex Chen</div>
                            <div className="text-xs text-muted-foreground">CTO, DeFi Protocol</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "The team's thorough audit identified critical issues we had missed internally. 
                          Their remediation advice was clear and actionable. Highly recommended."
                        </p>
                        <div className="mt-2 flex">
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            JW
                          </div>
                          <div className="ml-3">
                            <div className="font-semibold">Jamie Williams</div>
                            <div className="text-xs text-muted-foreground">Founder, NFT Marketplace</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "Exceptional service from start to finish. Great communication throughout 
                          the audit process and detailed explanations for every finding."
                        </p>
                        <div className="mt-2 flex">
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                          <Star className="h-4 w-4 fill-web3-orange text-web3-orange" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            </div>
            
            {/* Right Column - Pricing & Provider Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Card className="border border-border/50 overflow-hidden">
                  <CardContent className="p-6">
                    {/* Pricing */}
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-primary/80 mb-2">
                        {service.pricing.amount} {service.pricing.currency}
                      </div>
                      <div className="text-sm text-muted-foreground">Starting price</div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Provider Details */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">Provider</h3>
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {service.provider.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-semibold flex items-center">
                            {service.provider.name}
                            {service.provider.isVerified && (
                              <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {service.provider.reputation}% satisfaction rate
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reputation:</span>
                          <span className="font-medium">{service.provider.reputation}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Completed Jobs:</span>
                          <span className="font-medium">{service.completedJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Response Time:</span>
                          <span className="font-medium">24 hours</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-1">Security Score</div>
                        <SecurityScore score={service.provider.reputation} size="md" />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Actions */}
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={handleRequestService}>
                        Request This Service
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleContactProvider}>
                        Contact Provider
                      </Button>
                      <Link to="/request-audit" className="block">
                        <Button variant="secondary" className="w-full">
                          Custom Audit Request
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="flex justify-center items-center text-xs text-muted-foreground">
                        <Shield className="h-3 w-3 mr-1" />
                        <span>100% Money-back guarantee for 7 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Related Services */}
          {relatedServices.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedServices.map((relatedService) => (
                  <Card key={relatedService.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                    <Link to={`/service/${relatedService.id}`}>
                      <div className="h-40 relative">
                        <img 
                          src={relatedService.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                          alt={relatedService.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/60 text-white mb-1">
                            {relatedService.category}
                          </Badge>
                          <h3 className="text-white font-bold">{relatedService.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-lg text-gradient bg-gradient-to-r from-primary to-primary/80">
                            {relatedService.pricing.amount} {relatedService.pricing.currency}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
                            <span className="font-semibold">{relatedService.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
