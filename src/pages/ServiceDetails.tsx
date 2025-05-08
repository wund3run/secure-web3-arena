
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceReviews } from "@/components/marketplace/service-reviews";
import { SecurityScore } from "@/components/trust/security-metrics";
import { ChevronLeft, CheckCheck, Clock, Calendar, MessageSquare, Shield } from "lucide-react";

export default function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [service, setService] = useState<any>(null);
  
  // Sample reviews for the service
  const reviews = [
    {
      id: "rev1",
      author: {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        isVerified: true,
      },
      rating: 5,
      content: "Exceptionally thorough security audit. They identified critical vulnerabilities in our smart contract that other auditors missed. The remediation advice was clear and actionable.",
      date: "2 weeks ago",
      helpful: 12
    },
    {
      id: "rev2",
      author: {
        name: "Maria Chen",
        avatar: "https://i.pravatar.cc/150?img=5",
        isVerified: true,
      },
      rating: 4,
      content: "Good communication throughout the entire process. They were responsive to questions and provided detailed explanations for all identified issues.",
      date: "1 month ago",
      helpful: 8
    }
  ];

  // Get service details from location state or fetch from API
  useEffect(() => {
    if (location.state?.serviceDetail) {
      setService(location.state.serviceDetail);
    } else {
      // In a real app, you would fetch the service details from the API
      // For now, we'll just redirect to the marketplace
      navigate("/marketplace");
    }
  }, [location.state, navigate]);

  // If service is not loaded yet
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-muted rounded-md mb-4"></div>
            <div className="h-6 w-64 bg-muted rounded-md"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{service.title} | Hawkly Security</title>
        <meta name="description" content={service.description.substring(0, 160)} />
      </Helmet>
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80">
          <div className="absolute inset-0">
            <img 
              src={service.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50"
                onClick={() => navigate("/marketplace")}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Marketplace
              </Button>
              <Badge className="bg-primary/90 text-white">{service.category}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{service.title}</h1>
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-1 text-white/90">
                <SecurityScore score={service.securityScore || 85} size="sm" />
                <span className="text-sm">Security Score</span>
              </div>
              <div className="h-4 border-l border-white/30"></div>
              <div className="flex items-center text-white/90">
                <CheckCheck className="h-4 w-4 mr-1 text-green-400" />
                <span className="text-sm">{service.completedJobs} Completed Jobs</span>
              </div>
              <div className="h-4 border-l border-white/30"></div>
              <div className="flex items-center text-white/90">
                <Clock className="h-4 w-4 mr-1 text-orange-300" />
                <span className="text-sm">{service.responseTime || "24h"} Response Time</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="samples">Work Samples</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Service Description</h2>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-4">Key Features</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.tags.map((tag: string) => (
                        <li key={tag} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Process</h2>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                        <div className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold mb-1">Initial Consultation</h3>
                          <p className="text-sm text-muted-foreground">We'll discuss your project's specific security needs</p>
                        </div>
                        <div className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <Shield className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold mb-1">Security Analysis</h3>
                          <p className="text-sm text-muted-foreground">Our experts conduct a comprehensive security audit</p>
                        </div>
                        <div className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold mb-1">Detailed Reporting</h3>
                          <p className="text-sm text-muted-foreground">Receive a comprehensive report with actionable insights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <ServiceReviews 
                    serviceId={service.id}
                    averageRating={service.rating}
                    totalReviews={reviews.length}
                    reviews={reviews}
                  />
                </TabsContent>
                
                <TabsContent value="samples">
                  <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
                    <h3 className="font-semibold text-lg mb-2">Sample Reports Available on Request</h3>
                    <p className="text-muted-foreground mb-4">Contact the provider to see samples of their previous work</p>
                    <Button>Contact Provider</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6">
                  <div className="text-3xl font-bold text-center">
                    {service.pricing.amount} {service.pricing.currency}
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Provider</span>
                      <span className="font-medium">{service.provider.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reputation</span>
                      <span className="font-medium">{service.provider.reputation}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-medium">{service.responseTime || "24h"}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary mb-3">
                      Request Service
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Provider
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Provider Card */}
              <div className="bg-card border border-border rounded-lg shadow-sm p-6 space-y-4">
                <h3 className="font-bold">About the Provider</h3>
                
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {service.provider.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{service.provider.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {service.provider.level === "expert" 
                        ? "Expert Auditor" 
                        : service.provider.level === "verified" 
                          ? "Verified Provider" 
                          : "Security Provider"}
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Full Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
