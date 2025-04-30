import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/marketplace/service-card";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplaceEnhancedHeader } from "@/components/marketplace/marketplace-enhanced-header";
import { MarketplaceEnhancedFooter } from "@/components/marketplace/marketplace-enhanced-footer";
import { EnhancedFilters } from "@/components/marketplace/enhanced-filters";
import { OptimizedListingGrid } from "@/components/marketplace/optimized-listing-grid";
import { MarketplaceOnboarding } from "@/components/marketplace/marketplace-onboarding";
import { ServiceReviews } from "@/components/marketplace/service-reviews";
import { EnhancedOnboarding } from "@/components/onboarding/enhanced-onboarding";
import { Shield, ArrowRight, Filter, LayoutGrid, List, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showEnhancedOnboarding, setShowEnhancedOnboarding] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  
  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedMarketplaceOnboarding = localStorage.getItem('marketplace-onboarding-completed');
    const hasCompletedEnhancedOnboarding = localStorage.getItem('hawkly_onboarding_completed');
    
    if (!hasCompletedMarketplaceOnboarding && !hasCompletedEnhancedOnboarding) {
      // Delay showing onboarding slightly for better UX
      const timer = setTimeout(() => setShowEnhancedOnboarding(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Blockchain ecosystems with their logos - updated with more reliable image sources
  const BLOCKCHAIN_ECOSYSTEMS = [
    {
      name: "Solana",
      logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
      color: "#9945FF"
    },
    {
      name: "Ethereum",
      logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      color: "#627EEA"
    },
    {
      name: "Polkadot",
      logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
      color: "#E6007A"
    },
    {
      name: "Avalanche",
      logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
      color: "#E84142"
    },
    {
      name: "Cosmos",
      logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
      color: "#2E3148"
    },
    {
      name: "zkSync",
      logoUrl: "https://cryptologos.cc/logos/generic/token.png",
      color: "#4E529A"
    }
  ];

  // Sample data for marketplace services with improved images
  const SERVICES = [
    {
      id: "1",
      title: "Smart Contract Security Audit",
      description: "Comprehensive analysis of your smart contract code to identify vulnerabilities, logic flaws, and security issues before deployment.",
      provider: {
        name: "CryptoShield",
        reputation: 98,
        isVerified: true,
        level: "expert" as const
      },
      pricing: {
        amount: 4.5,
        currency: "ETH"
      },
      rating: 4.9,
      completedJobs: 124,
      category: "Smart Contracts",
      tags: ["Solidity", "ERC20", "ERC721", "DeFi"],
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "DApp Security Assessment",
      description: "End-to-end security assessment for decentralized applications, including frontend, backend, and blockchain integration points.",
      provider: {
        name: "BlockSafe",
        reputation: 82,
        isVerified: true,
        level: "verified" as const
      },
      pricing: {
        amount: 3.2,
        currency: "ETH"
      },
      rating: 4.7,
      completedJobs: 87,
      category: "DApps",
      tags: ["Web3", "React", "API Security"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "Protocol Security Review",
      description: "Deep dive analysis of your protocol's architecture, economic model, and smart contract interactions to identify systemic risks.",
      provider: {
        name: "SecureLabs",
        reputation: 95,
        isVerified: true,
        level: "expert" as const
      },
      pricing: {
        amount: 7.8,
        currency: "ETH"
      },
      rating: 4.9,
      completedJobs: 53,
      category: "Protocols",
      tags: ["DeFi", "Yield", "Lending", "Complex Logic"],
      imageUrl: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "NFT Project Security Check",
      description: "Security assessment specifically for NFT projects, including smart contracts, metadata, and marketplace interactions.",
      provider: {
        name: "Web3Guard",
        reputation: 76,
        isVerified: false,
        level: "rookie" as const
      },
      pricing: {
        amount: 2.5,
        currency: "ETH"
      },
      rating: 4.3,
      completedJobs: 28,
      category: "NFTs",
      tags: ["ERC721", "Metadata", "Royalties"],
      imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "Layer-2 Bridge Security Audit",
      description: "Specialized security audit for cross-chain bridges to ensure safe asset transfers between Layer-1 and Layer-2 networks.",
      provider: {
        name: "ChainSecurity",
        reputation: 91,
        isVerified: true,
        level: "expert" as const
      },
      pricing: {
        amount: 5.6,
        currency: "ETH"
      },
      rating: 4.8,
      completedJobs: 42,
      category: "Bridges",
      tags: ["Cross-chain", "Layer-2", "Optimistic Rollups", "ZK Rollups"],
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "6",
      title: "Web3 Infrastructure Penetration Testing",
      description: "Comprehensive penetration testing for your Web3 infrastructure, including RPC endpoints, nodes, and API services.",
      provider: {
        name: "PenetrationDAO",
        reputation: 88,
        isVerified: true,
        level: "expert" as const
      },
      pricing: {
        amount: 6.2,
        currency: "ETH"
      },
      rating: 4.7,
      completedJobs: 65,
      category: "Infrastructure",
      tags: ["Nodes", "RPC", "APIs", "DevOps"],
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "7",
      title: "DAO Governance Security Analysis",
      description: "Security analysis of DAO governance mechanisms to prevent takeover attacks, voting manipulation and ensure proper decentralization.",
      provider: {
        name: "GovernanceGuard",
        reputation: 84,
        isVerified: true,
        level: "verified" as const
      },
      pricing: {
        amount: 4.1,
        currency: "ETH"
      },
      rating: 4.6,
      completedJobs: 31,
      category: "DAOs",
      tags: ["Governance", "Voting", "Tokenomics", "Timelocks"],
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop"
    },
    {
      id: "8",
      title: "Zero Knowledge Proof Verification",
      description: "Expert review and verification of zero-knowledge proof implementations to ensure cryptographic soundness and security.",
      provider: {
        name: "ZKPVerified",
        reputation: 96,
        isVerified: true,
        level: "expert" as const
      },
      pricing: {
        amount: 9.5,
        currency: "ETH"
      },
      rating: 4.9,
      completedJobs: 18,
      category: "ZK Proofs",
      tags: ["ZK-SNARKs", "ZK-STARKs", "Privacy", "Cryptography"],
      imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop"
    }
  ];

  // Example review data for the service details dialog
  const SAMPLE_REVIEWS = [
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
    },
    {
      id: "rev3",
      author: {
        name: "David Kim",
        avatar: "https://i.pravatar.cc/150?img=8",
        isVerified: false,
      },
      rating: 5,
      content: "Fast turnaround without compromising on quality. Our DeFi protocol is much more secure thanks to their comprehensive review.",
      date: "2 months ago",
      helpful: 5
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? SERVICES 
    : SERVICES.filter(service => 
        service.category.toLowerCase() === activeCategory.toLowerCase() || 
        service.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
      );

  const handleEcosystemClick = (ecosystem: string) => {
    toast.info(`${ecosystem} security audits are available`, {
      description: "Contact us for specialized security solutions",
      action: {
        label: "Browse Services",
        onClick: () => setActiveCategory("all")
      }
    });
  };

  const handleApplyFilters = (filters: any) => {
    toast.success("Filters applied", {
      description: "Security services updated based on your filters"
    });
    // In a real implementation, we would filter services based on these criteria
    console.log("Applied filters:", filters);
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
  };
  
  const handleOnboardingComplete = () => {
    // Mark both onboardings as completed
    localStorage.setItem('marketplace-onboarding-completed', 'true');
    localStorage.setItem('hawkly_onboarding_completed', 'true');
    setShowEnhancedOnboarding(false);
    setShowOnboarding(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow">
        <MarketplaceEnhancedHeader />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            {/* Hero Banner with onboarding CTA */}
            <div className="w-full rounded-xl overflow-hidden relative mb-6">
              <div className="bg-gradient-to-r from-primary/80 to-secondary/80 h-64 w-full relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Web3 Security Marketplace</h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
                    Connect with expert security providers to protect your blockchain projects from vulnerabilities and attacks
                  </p>
                  <Button 
                    variant="default" 
                    className="bg-white text-primary hover:bg-white/90 w-fit"
                    onClick={() => setShowEnhancedOnboarding(true)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Start Guided Onboarding
                  </Button>
                </div>
              </div>
            </div>

            {/* Header Section with View Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  Security Services
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({filteredServices.length} available)</span>
                </h2>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="bg-muted p-1 rounded-md flex">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 py-1 ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4 mr-1" />
                    Grid
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 py-1 ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4 mr-1" />
                    List
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>
            </div>

            {/* Main Content with Improved Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Enhanced Filters Panel */}
              <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                <EnhancedFilters onFilterChange={handleApplyFilters} />
              </aside>

              <div className="lg:col-span-3">
                {/* Service Categories Tabs */}
                <Tabs 
                  defaultValue="all" 
                  className="w-full mb-8" 
                  onValueChange={setActiveCategory}
                  value={activeCategory}
                >
                  <div className="overflow-x-auto pb-2">
                    <TabsList className="inline-flex h-auto p-1 gap-2 w-auto flex-nowrap">
                      <TabsTrigger value="all" className="px-4 py-2 rounded-md whitespace-nowrap">All</TabsTrigger>
                      <TabsTrigger value="smart contracts" className="px-4 py-2 rounded-md whitespace-nowrap">Smart Contracts</TabsTrigger>
                      <TabsTrigger value="dapps" className="px-4 py-2 rounded-md whitespace-nowrap">DApps</TabsTrigger>
                      <TabsTrigger value="protocols" className="px-4 py-2 rounded-md whitespace-nowrap">Protocols</TabsTrigger>
                      <TabsTrigger value="nfts" className="px-4 py-2 rounded-md whitespace-nowrap">NFTs</TabsTrigger>
                      <TabsTrigger value="bridges" className="px-4 py-2 rounded-md whitespace-nowrap">Bridges</TabsTrigger>
                      <TabsTrigger value="infrastructure" className="px-4 py-2 rounded-md whitespace-nowrap">Infrastructure</TabsTrigger>
                      <TabsTrigger value="daos" className="px-4 py-2 rounded-md whitespace-nowrap">DAOs</TabsTrigger>
                      <TabsTrigger value="zk proofs" className="px-4 py-2 rounded-md whitespace-nowrap">ZK Proofs</TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>

                {/* Blockchain Ecosystem Logos */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-4">Blockchain Ecosystems</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {BLOCKCHAIN_ECOSYSTEMS.map((ecosystem) => (
                      <div 
                        key={ecosystem.name} 
                        className="bg-card hover:bg-card/90 border border-border/40 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer"
                        title={`${ecosystem.name} Security Audits`}
                        onClick={() => handleEcosystemClick(ecosystem.name)}
                      >
                        <div 
                          className="h-16 w-16 mb-2 flex items-center justify-center rounded-full bg-gradient-to-br from-white/80 to-white/20" 
                          style={{ boxShadow: `0 0 15px ${ecosystem.color}40` }}
                        >
                          <img 
                            src={ecosystem.logoUrl} 
                            alt={`${ecosystem.name} logo`}
                            className="h-10 w-10 object-contain animate-float"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://cryptologos.cc/logos/generic/token.png";
                              target.onerror = null;
                            }}
                          />
                        </div>
                        <h4 className="font-medium text-sm text-center">{ecosystem.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Grid with Optimized Listing Component */}
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  Available Security Services
                </h3>
                
                <OptimizedListingGrid 
                  services={filteredServices}
                  isLoading={isLoading}
                  layout={viewMode}
                  onServiceSelect={handleServiceSelect}
                />

                {/* Web2 + Web3 Security Services Section */}
                <div className="mt-12 mb-10">
                  <h3 className="text-xl font-bold mb-6">Comprehensive Web2 + Web3 Security Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift transition-all hover:border-primary/50">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">API Security</h4>
                      <p className="text-muted-foreground">Secure the bridge between your Web2 backends and Web3 smart contracts with comprehensive API security testing.</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift transition-all hover:border-primary/50">
                      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-secondary" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Key Management</h4>
                      <p className="text-muted-foreground">Secure implementation of wallet key management, seed phrase storage, and private key handling in your applications.</p>
                    </div>
                    <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift transition-all hover:border-primary/50">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                        <Server className="h-6 w-6 text-accent" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Infrastructure Security</h4>
                      <p className="text-muted-foreground">Ensure your blockchain nodes, RPC endpoints, and indexers are secured against attacks and downtime.</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 p-6 bg-card border border-border/40 rounded-xl bg-gradient-to-br from-card to-card/80">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Need a Custom Security Solution?</h3>
                      <p className="text-muted-foreground">Post your requirements and get matched with the perfect security expert for your project.</p>
                    </div>
                    <Link to="/requests">
                      <Button size="lg" variant="default" className="flex items-center whitespace-nowrap group">
                        Post Security Request
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceEnhancedFooter />
      <Footer />

      {/* Service Details Dialog */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={closeServiceDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="relative h-56 rounded-lg overflow-hidden">
                <img 
                  src={selectedService.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary/90 text-white mb-2">{selectedService.category}</Badge>
                  <h2 className="text-2xl font-bold text-white">{selectedService.title}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-2">Service Description</h3>
                  <p className="text-muted-foreground mb-6">{selectedService.description}</p>
                  
                  <h3 className="text-xl font-bold mb-2">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedService.tags.map((tag: string) => (
                      <li key={tag} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <ServiceReviews 
                    serviceId={selectedService.id}
                    averageRating={selectedService.rating}
                    totalReviews={SAMPLE_REVIEWS.length}
                    reviews={SAMPLE_REVIEWS}
                  />
                </div>
                
                <div>
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                    <div className="text-2xl font-bold text-center mb-4">
                      {selectedService.pricing.amount} {selectedService.pricing.currency}
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Provider</span>
                      <span className="font-medium">{selectedService.provider.name}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Reputation</span>
                      <span className="font-medium">{selectedService.provider.reputation}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Completed Jobs</span>
                      <span className="font-medium">{selectedService.completedJobs}</span>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        Request Service
                      </Button>
                      <Button variant="outline" className="w-full">
                        Contact Provider
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Onboarding modal */}
      {showOnboarding && (
        <MarketplaceOnboarding onClose={() => setShowOnboarding(false)} />
      )}
      
      {/* Enhanced onboarding flow */}
      <EnhancedOnboarding 
        open={showEnhancedOnboarding} 
        onOpenChange={(open) => {
          setShowEnhancedOnboarding(open);
          if (!open) {
            handleOnboardingComplete();
          }
        }} 
      />
    </div>
  );
}
