
export const FEATURED_SERVICES = [
  {
    id: "smart-contract-audit",
    title: "Comprehensive Smart Contract Security Audit",
    description: "Professional security assessment of your smart contracts including automated scanning, manual code review, and detailed vulnerability reporting. Our certified auditors examine your code for common vulnerabilities, business logic flaws, and gas optimization opportunities.",
    provider: {
      name: "BlockSafe Security",
      level: "expert" as const,
      reputation: 4.9,
      isVerified: true
    },
    pricing: {
      currency: "USD",
      amount: 2500,
      type: "starting" as const
    },
    category: "Security Audits",
    tags: ["Smart Contracts", "Solidity", "Security", "DeFi"],
    completedJobs: 156,
    rating: 4.9,
    responseTime: "2-4 hours",
    deliveryTime: "5-7 days",
    imageUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
  },
  {
    id: "defi-protocol-audit",
    title: "DeFi Protocol Security Assessment",
    description: "Specialized audit for decentralized finance protocols including liquidity pools, yield farming mechanisms, and token economics. We analyze smart contract interactions, oracle dependencies, and economic attack vectors to ensure your protocol's security.",
    provider: {
      name: "CryptoGuard Labs",
      level: "expert" as const,
      reputation: 4.8,
      isVerified: true
    },
    pricing: {
      currency: "USD",
      amount: 15000,
      type: "starting" as const
    },
    category: "DeFi Audits",
    tags: ["DeFi", "Liquidity", "Yield Farming", "Token Economics"],
    completedJobs: 89,
    rating: 4.8,
    responseTime: "1-2 hours",
    deliveryTime: "3-5 days",
    imageUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
  },
  {
    id: "nft-marketplace-audit",
    title: "NFT Marketplace Security Review",
    description: "Complete security evaluation of NFT marketplaces and related smart contracts. We examine minting mechanisms, marketplace logic, royalty implementations, and metadata security to protect against common NFT vulnerabilities.",
    provider: {
      name: "NFT Security Pro",
      level: "verified" as const,
      reputation: 4.7,
      isVerified: true
    },
    pricing: {
      currency: "USD",
      amount: 8000,
      type: "starting" as const
    },
    category: "NFT Security",
    tags: ["NFT", "Marketplace", "Minting", "ERC-721"],
    completedJobs: 67,
    rating: 4.7,
    responseTime: "3-6 hours",
    deliveryTime: "7-10 days",
    imageUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
  },
  {
    id: "cross-chain-bridge-audit",
    title: "Cross-Chain Bridge Security Audit",
    description: "Specialized security assessment for cross-chain bridges and interoperability protocols. Our experts analyze bridge mechanisms, validator networks, and cross-chain message passing to identify potential vulnerabilities and attack vectors.",
    provider: {
      name: "InterChain Security",
      level: "expert" as const,
      reputation: 4.9,
      isVerified: true
    },
    pricing: {
      currency: "USD",
      amount: 25000,
      type: "starting" as const
    },
    category: "Cross-Chain",
    tags: ["Bridge", "Cross-Chain", "Validators", "Multi-Chain"],
    completedJobs: 43,
    rating: 4.9,
    responseTime: "1-3 hours",
    deliveryTime: "7-14 days",
    imageUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
  },
  {
    id: "dao-governance-audit",
    title: "DAO Governance Security Assessment",
    description: "Comprehensive review of DAO governance mechanisms including voting systems, proposal execution, treasury management, and token distribution. We ensure your DAO's governance is secure against manipulation and economic attacks.",
    provider: {
      name: "Governance Guard",
      level: "verified" as const,
      reputation: 4.6,
      isVerified: true
    },
    pricing: {
      currency: "USD",
      amount: 12000,
      type: "starting" as const
    },
    category: "DAO Security",
    tags: ["DAO", "Governance", "Voting", "Treasury"],
    completedJobs: 34,
    rating: 4.6,
    responseTime: "4-8 hours",
    deliveryTime: "10-14 days",
    imageUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
  },
  {
    id: "zk-proof-audit",
    title: "Zero-Knowledge Proof Security Review",
    description: "Expert analysis of zero-knowledge proof implementations including zk-SNARKs, zk-STARKs, and privacy-preserving protocols. Our cryptography specialists verify the correctness and security of your ZK circuits and implementations.",
    provider: {
      name: "ZK Security Labs",
      level: "expert" as const,
      reputation: 4.8,
      isVerified: true
    },
    pricing: {
      currency: "USD",
      amount: 18000,
      type: "starting" as const
    },
    category: "Cryptography",
    tags: ["Zero-Knowledge", "zk-SNARKs", "Privacy", "Cryptography"],
    completedJobs: 28,
    rating: 4.8,
    responseTime: "2-4 hours",
    deliveryTime: "14-21 days",
    imageUrl: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
  }
];

export const AUDITOR_PROFILES = [
  {
    id: "auditor-1",
    name: "Alex Chen",
    bio: "Senior blockchain security researcher with 8+ years experience in smart contract auditing. Previously led security at ConsenSys Diligence and has audited over $2B in TVL.",
    yearsExperience: 8,
    blockchainExpertise: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
    specializations: ["DeFi", "Smart Contracts", "Formal Verification"],
    hourlyRateMin: 200,
    hourlyRateMax: 350,
    averageRating: 4.9,
    totalAuditsCompleted: 156,
    responseTime: "2h",
    availability: "available",
    currentAuditCount: 2,
    maxConcurrentAudits: 4
  },
  {
    id: "auditor-2",
    name: "Sarah Martinez",
    bio: "Cryptography expert specializing in zero-knowledge proofs and privacy protocols. PhD in Applied Cryptography from MIT, former security engineer at Zcash.",
    yearsExperience: 6,
    blockchainExpertise: ["Ethereum", "Zcash", "Solana", "Cosmos"],
    specializations: ["Zero-Knowledge", "Cryptography", "Privacy Protocols"],
    hourlyRateMin: 250,
    hourlyRateMax: 400,
    averageRating: 4.8,
    totalAuditsCompleted: 89,
    responseTime: "1h",
    availability: "available",
    currentAuditCount: 1,
    maxConcurrentAudits: 3
  },
  {
    id: "auditor-3",
    name: "David Kumar",
    bio: "Full-stack blockchain security specialist with expertise in cross-chain protocols and bridge security. Former security lead at Chainlink, certified in multiple security frameworks.",
    yearsExperience: 7,
    blockchainExpertise: ["Ethereum", "BSC", "Avalanche", "Fantom"],
    specializations: ["Cross-Chain", "Bridges", "Oracle Security"],
    hourlyRateMin: 180,
    hourlyRateMax: 300,
    averageRating: 4.7,
    totalAuditsCompleted: 134,
    responseTime: "3h",
    availability: "available",
    currentAuditCount: 3,
    maxConcurrentAudits: 5
  },
  {
    id: "auditor-4",
    name: "Elena Popovic",
    bio: "DAO governance and tokenomics security expert. Economics PhD with specialization in mechanism design, has secured over 50 DAO protocols and governance systems.",
    yearsExperience: 5,
    blockchainExpertise: ["Ethereum", "Polygon", "Gnosis Chain"],
    specializations: ["DAO Security", "Governance", "Tokenomics"],
    hourlyRateMin: 160,
    hourlyRateMax: 280,
    averageRating: 4.6,
    totalAuditsCompleted: 67,
    responseTime: "4h",
    availability: "busy",
    currentAuditCount: 4,
    maxConcurrentAudits: 4
  },
  {
    id: "auditor-5",
    name: "Michael Thompson",
    bio: "NFT and gaming protocol security specialist. Former game developer turned security auditor, expert in complex NFT mechanics and play-to-earn economics.",
    yearsExperience: 4,
    blockchainExpertise: ["Ethereum", "Polygon", "Immutable X", "Flow"],
    specializations: ["NFT Security", "Gaming", "Marketplace Security"],
    hourlyRateMin: 140,
    hourlyRateMax: 250,
    averageRating: 4.8,
    totalAuditsCompleted: 43,
    responseTime: "6h",
    availability: "available",
    currentAuditCount: 1,
    maxConcurrentAudits: 3
  }
];
