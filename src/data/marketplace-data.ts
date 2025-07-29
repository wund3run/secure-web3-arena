
// Sample data for marketplace services
export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    reputation: number;
    isVerified: boolean;
    level: "rookie" | "expert" | "verified";
  };
  pricing: {
    amount: number;
    currency: string;
  };
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}

export const SERVICES: ServiceCardProps[] = [
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
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop"
  }
];

// Blockchain ecosystems with their logos
export const BLOCKCHAIN_ECOSYSTEMS = [
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
