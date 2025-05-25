
// Define the NavigationLinkItem interface directly instead of importing it
export interface NavigationLinkItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavigationLinksStructure {
  marketplace: NavigationLinkItem[];
  audits: NavigationLinkItem[];
  resources: NavigationLinkItem[];
  dashboards: NavigationLinkItem[];
}

// Create the actual structured navigation data - ensuring all routes exist in App.tsx
export const navigationLinksStructure: NavigationLinksStructure = {
  marketplace: [
    {
      title: "Browse Auditors",
      href: "/marketplace",
      description: "Find verified security auditors for your project"
    },
    {
      title: "Request Audit",
      href: "/request-audit",
      description: "Submit your project for professional security review"
    },
    {
      title: "Join as Auditor",
      href: "/service-provider-onboarding",
      description: "Become a certified security auditor on our platform"
    },
    {
      title: "Pricing",
      href: "/pricing",
      description: "Transparent pricing for all audit services"
    }
  ],
  audits: [
    {
      title: "All Audits",
      href: "/audits",
      description: "Browse completed security audits"
    },
    {
      title: "Audit Details",
      href: "/audit/1",
      description: "View specific audit progress and results"
    },
    {
      title: "Escrow Management",
      href: "/escrow",
      description: "Secure payment management for audits"
    }
  ],
  resources: [
    {
      title: "Documentation",
      href: "/docs",
      description: "Platform guides and API documentation"
    },
    {
      title: "Web3 Security",
      href: "/web3-security",
      description: "Learn about blockchain and smart contract security"
    },
    {
      title: "Security Guides",
      href: "/guides",
      description: "Best practices for Web3 security"
    },
    {
      title: "Tutorials",
      href: "/tutorials",
      description: "Step-by-step security tutorials"
    },
    {
      title: "Knowledge Base",
      href: "/knowledge-base",
      description: "Comprehensive security knowledge repository"
    },
    {
      title: "FAQ",
      href: "/faq",
      description: "Frequently asked questions"
    }
  ],
  dashboards: [
    {
      title: "User Dashboard",
      href: "/dashboard",
      description: "Your personal dashboard and analytics"
    },
    {
      title: "Platform Analysis",
      href: "/platform-report",
      description: "Comprehensive platform security assessment"
    },
    {
      title: "AI Tools",
      href: "/ai-tools",
      description: "AI-powered security analysis and testing tools"
    },
    {
      title: "Admin Dashboard",
      href: "/admin/dashboard",
      description: "Administrative controls and platform management"
    }
  ]
};
