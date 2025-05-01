import { useState, useEffect } from "react";
import { toast } from "sonner";

// Define service and provider types to match what's used in the app
export interface ServiceProvider {
  name: string;
  reputation: number;
  isVerified: boolean;
  level: "rookie" | "verified" | "expert";
}

export interface ServicePricing {
  amount: number;
  currency: string;
}

export interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  provider: ServiceProvider;
  pricing: ServicePricing;
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
}

export function useMarketplaceServices() {
  const [services, setServices] = useState<MarketplaceService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Updated blockchain ecosystems with the full set requested
  const BLOCKCHAIN_ECOSYSTEMS = [
    {
      name: "Ethereum",
      logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      color: "#627EEA"
    },
    {
      name: "Solana",
      logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
      color: "#9945FF"
    },
    {
      name: "Polygon",
      logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      color: "#8247E5"
    },
    {
      name: "Avalanche",
      logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
      color: "#E84142"
    },
    {
      name: "BNB Chain",
      logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      color: "#F3BA2F"
    },
    {
      name: "Arbitrum",
      logoUrl: "https://cryptologos.cc/logos/arbitrum-arb-logo.png", 
      color: "#28A0F0"
    },
    {
      name: "Optimism",
      logoUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
      color: "#FF0420"
    },
    {
      name: "Aptos",
      logoUrl: "https://cryptologos.cc/logos/aptos-apt-logo.png",
      color: "#277DA1"
    },
    {
      name: "Sui",
      logoUrl: "https://cryptologos.cc/logos/sui-sui-logo.png",
      color: "#6FBCF0"
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

  // Sample data for marketplace services
  const SERVICES: MarketplaceService[] = [
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

  // Simulate fetching data with a slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(SERVICES);
      setIsLoading(false);
    }, 800);
    
    // Make services available globally for compatibility with the existing code
    window.SERVICES = SERVICES;
    
    return () => clearTimeout(timer);
  }, []);

  // Filter services function
  const filterServices = (
    activeCategory: string, 
    filters: { 
      auditTypes?: string[], 
      blockchains?: string[], 
      priceRange?: [number, number],
      minReputation?: number,
      deliveryTime?: string
    }
  ) => {
    let filtered = activeCategory === "all" 
      ? [...services] 
      : services.filter(service => 
          service.category.toLowerCase() === activeCategory.toLowerCase() || 
          service.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
        );
    
    // Apply additional filters if any
    if (filters.auditTypes && filters.auditTypes.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          filters.auditTypes?.includes(tag)
        )
      );
    }
    
    if (filters.blockchains && filters.blockchains.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          filters.blockchains?.includes(tag.toLowerCase())
        )
      );
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(service => 
        service.pricing.amount >= filters.priceRange![0] && 
        service.pricing.amount <= filters.priceRange![1]
      );
    }
    
    if (filters.minReputation) {
      filtered = filtered.filter(service => 
        service.provider.reputation >= filters.minReputation!
      );
    }
    
    if (filters.deliveryTime && filters.deliveryTime !== 'any') {
      // Simulated delivery time filtering - in a real app, this would be a property of each service
      const deliveryTimes: Record<string, [number, number]> = {
        '1-3': [1, 3],
        '4-7': [4, 7],
        '8-14': [8, 14],
        '15+': [15, 30]
      };
      
      const [min, max] = deliveryTimes[filters.deliveryTime] || [0, 100];
      
      // For demo purposes, we'll use a formula based on service size and provider level
      filtered = filtered.filter(service => {
        const estimatedDays = service.provider.level === 'expert' ? 3 : (service.provider.level === 'verified' ? 7 : 14);
        return estimatedDays >= min && estimatedDays <= max;
      });
    }
    
    return filtered;
  };

  return {
    services,
    isLoading,
    BLOCKCHAIN_ECOSYSTEMS,
    SAMPLE_REVIEWS,
    filterServices
  };
}
