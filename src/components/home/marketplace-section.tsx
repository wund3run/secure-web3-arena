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
    tags: ["Governance", "Voting", "TokenomicsTimelocks"],
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

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredServices = activeTab === "all" 
    ? SERVICES.slice(0, 4) // Show only 4 services on the homepage
    : SERVICES.filter(service => 
        service.category.toLowerCase() === activeTab.toLowerCase() || 
        service.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase())
      ).slice(0, 4);

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Security Services
            </h2>
          </div>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse top security services from verified providers
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
        
        {/* Blockchain Ecosystems Logos - More compact version */}
        <div className="mt-8 mb-8 text-center">
          <h3 className="text-xl font-bold mb-4">Blockchain Ecosystems Supported</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {BLOCKCHAIN_ECOSYSTEMS.map((ecosystem) => (
              <div 
                key={ecosystem.name} 
                className="bg-card hover:bg-card/80 border border-border/50 rounded-lg p-2 flex items-center justify-center hover-lift transition-all duration-300 w-20 h-20"
                title={`${ecosystem.name} Security Audits`}
              >
                <img 
                  src={ecosystem.logoUrl} 
                  alt={`${ecosystem.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Web2 + Web3 Security Services - Made more compact */}
        <div className="mt-8 mb-8">
          <h3 className="text-xl font-bold text-center mb-4">Comprehensive Security Services</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border/50 rounded-lg p-4 hover-lift">
              <h4 className="text-lg font-bold mb-1">API Security</h4>
              <p className="text-sm text-muted-foreground">Secure connection between Web2 backends and Web3 contracts</p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-4 hover-lift">
              <h4 className="text-lg font-bold mb-1">Key Management</h4>
              <p className="text-sm text-muted-foreground">Secure wallet key storage and private key handling</p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-4 hover-lift">
              <h4 className="text-lg font-bold mb-1">Infrastructure</h4>
              <p className="text-sm text-muted-foreground">Secure blockchain nodes, RPC endpoints, and indexers</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/marketplace">
            <Button size="lg" variant="default" className="flex items-center mx-auto">
              Explore Full Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
