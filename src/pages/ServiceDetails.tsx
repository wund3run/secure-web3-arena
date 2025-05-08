
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Star, BadgeCheck, Clock, Users, ArrowLeft, ExternalLink, Share, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Import layout components
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Import marketplace components
import { ServiceReviews } from "@/components/marketplace/service-reviews";
import { SecurityScore } from "@/components/trust/security-metrics";
import { SERVICES } from "@/data/marketplace-data";

export default function ServiceDetails() {
  const location = useLocation();
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  // Get service details from location state or fetch based on serviceId
  const [serviceDetail, setServiceDetail] = useState<any>(
    location.state?.serviceDetail || null
  );
  
  const [loading, setLoading] = useState(!location.state?.serviceDetail);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch service details if not available in location state
  useEffect(() => {
    if (!serviceDetail && serviceId) {
      setLoading(true);
      // In a real app, this would be an API call
      const service = SERVICES.find(s => s.id === serviceId);
      
      if (service) {
        setServiceDetail(service);
      } else {
        toast.error("Service not found", {
          description: "The service you're looking for doesn't exist or has been removed."
        });
        navigate("/marketplace");
      }
      
      setLoading(false);
    }
  }, [serviceDetail, serviceId, navigate]);

  const handleRequestService = () => {
    navigate(`/request-audit/${serviceId}`);
  };

  const handleContactProvider = () => {
    if (serviceDetail) {
      navigate(`/contact-provider/${serviceDetail.provider.name.toLowerCase().replace(/\s+/g, "-")}`);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      {
        description: isFavorite 
          ? "This service has been removed from your favorites" 
          : "This service has been added to your favorites"
      }
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      description: "You can now share this service with others"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-secondary/30 rounded-full mb-4"></div>
            <div className="h-6 w-64 bg-secondary/30 rounded mb-2"></div>
            <div className="h-4 w-48 bg-secondary/20 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!serviceDetail) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/marketplace")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{serviceDetail.title} | Hawkly</title>
        <meta name="description" content={serviceDetail.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/90 text-white">
                    {serviceDetail.category}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
                    <span className="font-semibold">{serviceDetail.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{serviceDetail.title}</h1>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">By:</span>
                    <span>{serviceDetail.provider.name}</span>
                    {serviceDetail.provider.isVerified && (
                      <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{serviceDetail.completedJobs} completed audits</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{serviceDetail.responseTime || "24h"} response time</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-start">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${isFavorite ? 'text-red-500' : ''}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className="rounded-lg overflow-hidden h-[300px] md:h-[400px] relative">
                <img
                  src={serviceDetail.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50`}
                  alt={serviceDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Security score badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <SecurityScore score={serviceDetail.securityScore || 85} size="md" showLabel={true} />
                </div>
              </div>
              
              {/* Tabs Content */}
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Service Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <section>
                    <h2 className="text-xl font-bold mb-3">Service Description</h2>
                    <p className="text-muted-foreground">{serviceDetail.description}</p>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h2 className="text-xl font-bold mb-3">Service Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Security Expertise</h3>
                        <ul className="space-y-2">
                          {serviceDetail.tags.slice(0, 3).map((tag: string) => (
                            <li key={tag} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-card border border-border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Provider Verification</h3>
                        <p className="text-sm mb-2">
                          {serviceDetail.provider.isVerified 
                            ? "This provider has been verified by Hawkly." 
                            : "This provider is new to the platform."}
                        </p>
                        <div className="flex items-center space-x-1 text-sm">
                          <span>Provider level:</span>
                          <Badge variant="outline" className="capitalize">
                            {serviceDetail.provider.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-6">
                  <section>
                    <h2 className="text-xl font-bold mb-3">Service Specifications</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                          <p>{serviceDetail.category}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Response Time</h3>
                          <p>{serviceDetail.responseTime || "24h"}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Provider Rating</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-1" />
                            <span>{serviceDetail.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Provider Experience</h3>
                          <p>{serviceDetail.completedJobs} completed audits</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Provider Reputation</h3>
                          <p>{serviceDetail.provider.reputation}% positive</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Compatible With</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {serviceDetail.tags.filter((tag: string) => 
                              tag.includes("ETH") || 
                              tag.includes("Solana") || 
                              tag.includes("BSC") || 
                              tag.includes("Chain")
                            ).map((tag: string) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  <section>
                    <h2 className="text-xl font-bold mb-3">Service Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {serviceDetail.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </section>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <ServiceReviews 
                    serviceId={serviceDetail.id}
                    averageRating={serviceDetail.rating}
                    totalReviews={5}
                    reviews={[
                      {
                        id: "1",
                        author: "Alex Johnson",
                        rating: 5,
                        date: "2025-04-15",
                        content: "Exceptional service. The audit was thorough and identified critical vulnerabilities in our smart contract that we had missed. Highly recommended!"
                      },
                      {
                        id: "2",
                        author: "Samantha Lee",
                        rating: 4,
                        date: "2025-04-02",
                        content: "Very professional and detailed in their approach. They provided clear explanations for each finding and suggestions for improvements."
                      },
                      {
                        id: "3",
                        author: "Michael Chen",
                        rating: 5,
                        date: "2025-03-28",
                        content: "Outstanding service! They not only found issues but also explained the potential risks and helped implement solutions."
                      }
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2">
                    {serviceDetail.pricing.amount} {serviceDetail.pricing.currency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Starting price
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    onClick={handleRequestService}
                  >
                    Request Service
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleContactProvider}
                  >
                    Contact Provider
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-center"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Visit Provider Profile
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="font-semibold">About the Provider</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{serviceDetail.provider.name}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verification</span>
                    <span className="flex items-center font-medium">
                      {serviceDetail.provider.isVerified ? "Verified" : "Unverified"}
                      {serviceDetail.provider.isVerified && (
                        <BadgeCheck className="h-4 w-4 text-web3-teal ml-1" />
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
