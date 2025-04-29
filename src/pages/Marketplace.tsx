
import { useState } from "react";
import { ServiceCard } from "@/components/marketplace/service-card";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { Shield, FileCode, Database, Lock, Network, Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Blockchain ecosystems with their logos
  const BLOCKCHAIN_ECOSYSTEMS = [
    {
      name: "Solana",
      logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024"
    },
    {
      name: "Ethereum",
      logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024"
    },
    {
      name: "Polkadot",
      logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=024"
    },
    {
      name: "Avalanche",
      logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=024"
    },
    {
      name: "Cosmos",
      logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=024"
    },
    {
      name: "zkSync",
      logoUrl: "https://cryptologos.cc/logos/zksync-logo.png?v=024"
    }
  ];

  // Sample data for marketplace services
  const SERVICES = [
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
      tags: ["Solidity", "ERC20", "ERC721", "DeFi"],
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=500&auto=format&fit=crop"
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
      tags: ["Web3", "React", "API Security"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop"
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
      tags: ["DeFi", "Yield", "Lending", "Complex Logic"],
      imageUrl: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=500&auto=format&fit=crop"
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
      tags: ["ERC721", "Metadata", "Royalties"],
      imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "Layer-2 Bridge Security Audit",
      description: "Specialized security audit for cross-chain bridges to ensure safe asset transfers between Layer-1 and Layer-2 networks.",
      provider: {
        name: "ChainSecurity",
        reputation: 91,
        isVerified: true,
        level: "expert"
      },
      pricing: {
        amount: 5.6,
        currency: "ETH"
      },
      rating: 4.8,
      completedJobs: 42,
      category: "Bridges",
      tags: ["Cross-chain", "Layer-2", "Optimistic Rollups", "ZK Rollups"],
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "6",
      title: "Web3 Infrastructure Penetration Testing",
      description: "Comprehensive penetration testing for your Web3 infrastructure, including RPC endpoints, nodes, and API services.",
      provider: {
        name: "PenetrationDAO",
        reputation: 88,
        isVerified: true,
        level: "expert"
      },
      pricing: {
        amount: 6.2,
        currency: "ETH"
      },
      rating: 4.7,
      completedJobs: 65,
      category: "Infrastructure",
      tags: ["Nodes", "RPC", "APIs", "DevOps"],
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "7",
      title: "DAO Governance Security Analysis",
      description: "Security analysis of DAO governance mechanisms to prevent takeover attacks, voting manipulation and ensure proper decentralization.",
      provider: {
        name: "GovernanceGuard",
        reputation: 84,
        isVerified: true,
        level: "verified"
      },
      pricing: {
        amount: 4.1,
        currency: "ETH"
      },
      rating: 4.6,
      completedJobs: 31,
      category: "DAOs",
      tags: ["Governance", "Voting", "Tokenomics", "Timelocks"],
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "8",
      title: "Zero Knowledge Proof Verification",
      description: "Expert review and verification of zero-knowledge proof implementations to ensure cryptographic soundness and security.",
      provider: {
        name: "ZKPVerified",
        reputation: 96,
        isVerified: true,
        level: "expert"
      },
      pricing: {
        amount: 9.5,
        currency: "ETH"
      },
      rating: 4.9,
      completedJobs: 18,
      category: "ZK Proofs",
      tags: ["ZK-SNARKs", "ZK-STARKs", "Privacy", "Cryptography"],
      imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=500&auto=format&fit=crop"
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? SERVICES 
    : SERVICES.filter(service => 
        service.category.toLowerCase() === activeCategory.toLowerCase() || 
        service.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <MarketplaceHeader
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Filters Panel */}
            {showFilters && (
              <aside className="w-64 shrink-0">
                <MarketplaceFilters />
              </aside>
            )}

            <div className="flex-grow">
              {/* Service Categories Tabs */}
              <Tabs 
                defaultValue="all" 
                className="w-full mb-8" 
                onValueChange={setActiveCategory}
              >
                <TabsList className="inline-flex h-auto p-1 gap-2 w-auto flex-wrap">
                  <TabsTrigger value="all" className="px-4 py-2 rounded-md">All</TabsTrigger>
                  <TabsTrigger value="smart contracts" className="px-4 py-2 rounded-md">Smart Contracts</TabsTrigger>
                  <TabsTrigger value="dapps" className="px-4 py-2 rounded-md">DApps</TabsTrigger>
                  <TabsTrigger value="protocols" className="px-4 py-2 rounded-md">Protocols</TabsTrigger>
                  <TabsTrigger value="nfts" className="px-4 py-2 rounded-md">NFTs</TabsTrigger>
                  <TabsTrigger value="bridges" className="px-4 py-2 rounded-md">Bridges</TabsTrigger>
                  <TabsTrigger value="infrastructure" className="px-4 py-2 rounded-md">Infrastructure</TabsTrigger>
                  <TabsTrigger value="daos" className="px-4 py-2 rounded-md">DAOs</TabsTrigger>
                  <TabsTrigger value="zk proofs" className="px-4 py-2 rounded-md">ZK Proofs</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Blockchain Ecosystem Logos */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">Blockchain Ecosystems Security</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {BLOCKCHAIN_ECOSYSTEMS.map((ecosystem) => (
                    <div 
                      key={ecosystem.name} 
                      className="bg-card hover:bg-card/90 border border-border/40 rounded-lg p-3 flex flex-col items-center justify-center hover-lift transition-all duration-300 cursor-pointer"
                      title={`${ecosystem.name} Security Audits`}
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center">
                        <img 
                          src={ecosystem.logoUrl} 
                          alt={`${ecosystem.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h4 className="font-medium text-sm text-center">{ecosystem.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web2 + Web3 Security Services Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">Comprehensive Web2 + Web3 Security Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
                    <Shield className="h-8 w-8 text-primary mb-4" />
                    <h4 className="text-xl font-bold mb-2">API Security</h4>
                    <p className="text-muted-foreground">Secure the bridge between your Web2 backends and Web3 smart contracts with comprehensive API security testing.</p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
                    <Lock className="h-8 w-8 text-primary mb-4" />
                    <h4 className="text-xl font-bold mb-2">Key Management</h4>
                    <p className="text-muted-foreground">Secure implementation of wallet key management, seed phrase storage, and private key handling in your applications.</p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-lg p-6 hover-lift">
                    <Server className="h-8 w-8 text-primary mb-4" />
                    <h4 className="text-xl font-bold mb-2">Infrastructure Security</h4>
                    <p className="text-muted-foreground">Ensure your blockchain nodes, RPC endpoints, and indexers are secured against attacks and downtime.</p>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <h3 className="text-2xl font-bold mb-6">Available Security Services</h3>
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    provider={service.provider}
                    pricing={service.pricing}
                    rating={service.rating}
                    completedJobs={service.completedJobs}
                    category={service.category}
                    tags={service.tags}
                    imageUrl={service.imageUrl}
                  />
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-12 p-6 bg-card border border-border/40 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Need a Custom Security Solution?</h3>
                    <p className="text-muted-foreground">Post your requirements and get matched with the perfect security expert for your project.</p>
                  </div>
                  <Link to="/requests">
                    <Button size="lg" variant="default" className="flex items-center whitespace-nowrap">
                      Post Security Request
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
