
import { useState } from "react";
import { ServiceCard, ServiceCardProps } from "@/components/marketplace/service-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for marketplace services
const SERVICES: ServiceCardProps[] = [
  {
    id: "1",
    title: "Smart Contract Security Audit",
    description: "Comprehensive analysis of your smart contract code to identify vulnerabilities, logic flaws, and security issues before deployment.",
    provider: {
      name: "CryptoShield",
      reputation: 98,
      isVerified: true,
      level: "expert"
    },
    pricing: {
      amount: 4.5,
      currency: "ETH"
    },
    rating: 4.9,
    completedJobs: 124,
    category: "Smart Contracts",
    tags: ["Solidity", "ERC20", "ERC721", "DeFi"]
  },
  {
    id: "2",
    title: "DApp Security Assessment",
    description: "End-to-end security assessment for decentralized applications, including frontend, backend, and blockchain integration points.",
    provider: {
      name: "BlockSafe",
      reputation: 82,
      isVerified: true,
      level: "verified"
    },
    pricing: {
      amount: 3.2,
      currency: "ETH"
    },
    rating: 4.7,
    completedJobs: 87,
    category: "DApps",
    tags: ["Web3", "React", "API Security"]
  },
  {
    id: "3",
    title: "Protocol Security Review",
    description: "Deep dive analysis of your protocol's architecture, economic model, and smart contract interactions to identify systemic risks.",
    provider: {
      name: "SecureLabs",
      reputation: 95,
      isVerified: true,
      level: "expert"
    },
    pricing: {
      amount: 7.8,
      currency: "ETH"
    },
    rating: 4.9,
    completedJobs: 53,
    category: "Protocols",
    tags: ["DeFi", "Yield", "Lending", "Complex Logic"]
  },
  {
    id: "4",
    title: "NFT Project Security Check",
    description: "Security assessment specifically for NFT projects, including smart contracts, metadata, and marketplace interactions.",
    provider: {
      name: "Web3Guard",
      reputation: 76,
      isVerified: false,
      level: "rookie"
    },
    pricing: {
      amount: 2.5,
      currency: "ETH"
    },
    rating: 4.3,
    completedJobs: 28,
    category: "NFTs",
    tags: ["ERC721", "Metadata", "Royalties"]
  }
];

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredServices = activeTab === "all" 
    ? SERVICES 
    : SERVICES.filter(service => 
        service.category.toLowerCase() === activeTab || 
        service.tags.some(tag => tag.toLowerCase() === activeTab)
      );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Security Services Marketplace
            </h2>
          </div>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse top security services from verified providers or list your expertise
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="inline-flex h-auto p-1 gap-2 w-auto flex-wrap">
              <TabsTrigger value="all" className="px-4 py-2 rounded-md">All</TabsTrigger>
              <TabsTrigger value="smart contracts" className="px-4 py-2 rounded-md">Smart Contracts</TabsTrigger>
              <TabsTrigger value="dapps" className="px-4 py-2 rounded-md">DApps</TabsTrigger>
              <TabsTrigger value="protocols" className="px-4 py-2 rounded-md">Protocols</TabsTrigger>
              <TabsTrigger value="nfts" className="px-4 py-2 rounded-md">NFTs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/marketplace">
            <Button size="lg" variant="default" className="flex items-center">
              Browse All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/requests">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Post Security Request
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
