
import { RoadmapPhase, CompletedMilestone } from "./types";

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: "Phase 1: Foundation and User Experience",
    description: "Enhance user interfaces and establish core Web3 features to improve accessibility and trust",
    progress: 100,
    milestones: [
      {
        title: "User-Friendly Interfaces",
        description: "Redesigned website with intuitive navigation, tooltips, guided tours, and mobile optimization",
        date: "Q1 2025",
        link: {
          url: "/request-audit",
          text: "Try New Interface"
        },
        status: "completed"
      },
      {
        title: "Web3 Wallet Integration",
        description: "MetaMask and WalletConnect integration for authentication and payments (USDT, ETH)",
        date: "Q2 2025",
        link: {
          url: "/auth",
          text: "Connect Wallet"
        },
        status: "completed"
      },
      {
        title: "Basic Support Services",
        description: "24/7 email support and comprehensive FAQ page on Web3 security",
        date: "Q1 2025",
        link: {
          url: "/support",
          text: "Visit Support Hub"
        },
        status: "completed"
      },
      {
        title: "Community Engagement Kickoff",
        description: "X and Discord communities with weekly updates and AMA sessions",
        date: "Q2 2025",
        status: "completed"
      }
    ],
    visualAsset: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Phase 2: Security and Innovation",
    description: "Strengthen security features and introduce innovative tools to enhance audit efficiency and trust",
    progress: 75,
    milestones: [
      {
        title: "Advanced Security Features",
        description: "End-to-end encryption for all data and third-party security audit",
        date: "Q2 2025",
        link: {
          url: "/security-policy",
          text: "View Audit Report"
        },
        status: "completed"
      },
      {
        title: "Innovative Tools",
        description: "AI-assisted code review tool and automated vulnerability scanner",
        date: "Q3 2025",
        link: {
          url: "/ai-tools",
          text: "Try Beta"
        },
        status: "in-progress"
      },
      {
        title: "Blockchain-Based Transparency",
        description: "Audit results stored on Polygon with public explorer for verification",
        date: "Q3 2025",
        status: "in-progress"
      },
      {
        title: "Enhanced Community Engagement",
        description: "Free webinar series on smart contract security and referral program with crypto rewards",
        date: "Q4 2025",
        status: "upcoming"
      }
    ],
    visualAsset: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Phase 3: Scalability and Web3 Integration",
    description: "Ensure platform scalability and deepen Web3 integration to support diverse users and blockchains",
    progress: 25,
    milestones: [
      {
        title: "Performance and Scalability",
        description: "Backend optimization with AWS cloud infrastructure and load testing for 10,000+ users",
        date: "Q1 2026",
        status: "upcoming"
      },
      {
        title: "Decentralized Identity Verification",
        description: "W3C DID integration for auditor credential verification linked to blockchain",
        date: "Q1 2026",
        status: "upcoming"
      },
      {
        title: "Token-Based Incentive System",
        description: "ERC-20 token launch for rewards supporting audit milestones and referrals",
        date: "Q2 2026",
        status: "upcoming"
      },
      {
        title: "Interoperability Across Blockchains",
        description: "Expanded audit services to Solana and Cosmos, supporting multi-chain projects",
        date: "Q2 2026",
        status: "upcoming"
      }
    ],
    visualAsset: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Phase 4: Community-Driven Growth and Governance",
    description: "Foster community-driven development and establish long-term governance to sustain leadership",
    progress: 25,
    milestones: [
      {
        title: "Decentralized Autonomous Organization",
        description: "Aragon-based DAO for community voting on feature priorities and auditor admissions",
        date: "Q3 2026",
        status: "upcoming"
      },
      {
        title: "Community-Driven Knowledge Hub",
        description: "IPFS-based wiki for Web3 security resources with token rewards for contributors",
        date: "Q3 2026",
        status: "upcoming"
      },
      {
        title: "Smart Contract-Based Subscriptions",
        description: "Subscription plans for continuous monitoring managed via smart contracts",
        date: "Q4 2026",
        status: "upcoming"
      },
      {
        title: "Decentralized Dispute Resolution",
        description: "Kleros-based arbitration for audit disputes integrated with smart contracts",
        date: "Q4 2026",
        status: "upcoming"
      }
    ],
    visualAsset: "/placeholder.svg"
  }
];

export const completedMilestones: CompletedMilestone[] = [
  {
    title: "New Interface Launch",
    description: "Comprehensive redesign focused on user experience and accessibility",
    date: "March 2025",
    impact: "47% decrease in onboarding time for new users",
    caseStudyLink: "/blog/new-interface-case-study",
    image: "/placeholder.svg"
  },
  {
    title: "Wallet Authentication",
    description: "Integrated MetaMask and WalletConnect for secure Web3 login",
    date: "February 2025",
    impact: "63% increase in user trust metrics",
    caseStudyLink: "/blog/wallet-auth-benefits",
    image: "/placeholder.svg"
  },
  {
    title: "Support Hub Launch",
    description: "24/7 email support and comprehensive knowledge base",
    date: "January 2025",
    impact: "89% satisfaction rate for support inquiries",
    image: "/placeholder.svg"
  }
];
