
import { RoadmapPhase, CompletedMilestone } from "./types";

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: "Phase 1: Foundation",
    description: "Establishing core marketplace functionality and user onboarding experience",
    progress: 100,
    milestones: [
      {
        title: "Guided Tours Launched",
        description: "Interactive tour for new users to explore platform features",
        date: "Q1 2025",
        link: {
          url: "/request-audit",
          text: "Try Now!"
        },
        status: "completed"
      },
      {
        title: "Marketplace UI Revamp",
        description: "Enhanced interface with improved filtering and search",
        date: "Q1 2025",
        status: "completed"
      },
      {
        title: "Basic Auditor Profiles",
        description: "Verification system and profile pages for security experts",
        date: "Q2 2025",
        status: "completed"
      }
    ],
    visualAsset: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Phase 2: Integration & Transparency",
    description: "Building blockchain integration and enhancing platform transparency",
    progress: 75,
    milestones: [
      {
        title: "On-chain Audit Records",
        description: "Storing audit summaries and verifications on-chain",
        date: "Q2 2025",
        link: {
          url: "/web3-security",
          text: "Learn More"
        },
        status: "in-progress"
      },
      {
        title: "Wallet Integration",
        description: "Enhanced crypto wallet support for seamless payments",
        date: "Q3 2025",
        status: "in-progress"
      },
      {
        title: "Community Metrics Dashboard",
        description: "Public metrics and platform activity visualization",
        date: "Q3 2025",
        status: "upcoming"
      }
    ],
    visualAsset: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Phase 3: Enhanced Tools",
    description: "Developing advanced security tools and AI-assisted auditing",
    progress: 25,
    milestones: [
      {
        title: "AI Audit Assistant",
        description: "AI-powered preliminary code analysis and risk assessment",
        date: "Q4 2025",
        status: "upcoming"
      },
      {
        title: "Knowledge Hub Launch",
        description: "Comprehensive security education resources",
        date: "Q4 2025",
        status: "upcoming"
      },
      {
        title: "Enhanced Vulnerability Scanner",
        description: "Advanced automated scanning for common vulnerabilities",
        date: "Q1 2026",
        status: "upcoming"
      }
    ],
    visualAsset: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Phase 4: Community Governance",
    description: "Transitioning to community-led platform governance",
    progress: 25,
    milestones: [
      {
        title: "DAO Governance Structure",
        description: "Framework for community decision-making",
        date: "Q2 2026",
        status: "upcoming"
      },
      {
        title: "Governance Token Launch",
        description: "Introduction of platform governance token",
        date: "Q3 2026",
        status: "upcoming"
      },
      {
        title: "Community Voting System",
        description: "On-chain voting for platform decisions and upgrades",
        date: "Q4 2026",
        status: "upcoming"
      }
    ],
    visualAsset: "/placeholder.svg"
  }
];

export const completedMilestones: CompletedMilestone[] = [
  {
    title: "Advanced Search Filters",
    description: "Added comprehensive filtering options for the marketplace",
    date: "March 2025",
    impact: "63% increase in service discovery",
    image: "/placeholder.svg"
  },
  {
    title: "Auditor Verification System",
    description: "Implemented multi-tiered verification for security providers",
    date: "February 2025",
    impact: "46% increase in client trust metrics",
    caseStudyLink: "/blog/auditor-verification-case-study",
    image: "/placeholder.svg"
  },
  {
    title: "Initial Marketplace Launch",
    description: "Public launch of the Hawkly security marketplace",
    date: "January 2025",
    impact: "Over 150 security services listed in first month",
    image: "/placeholder.svg"
  }
];
