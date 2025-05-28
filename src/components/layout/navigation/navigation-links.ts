
export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "Services",
    href: "/marketplace",
    children: [
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
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    children: [
      {
        title: "Web3 Security",
        href: "/web3-security",
        description: "Learn about blockchain and smart contract security"
      },
      {
        title: "Documentation",
        href: "/docs",
        description: "Platform guides and API documentation"
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
    ]
  },
  {
    title: "Tools",
    href: "/ai-tools",
    children: [
      {
        title: "AI Security Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis and testing tools"
      },
      {
        title: "Platform Analysis",
        href: "/platform-report",
        description: "Comprehensive platform security assessment"
      },
      {
        title: "Vulnerability Database",
        href: "/vulnerabilities",
        description: "Known vulnerabilities and exploits database"
      },
      {
        title: "Audit Templates",
        href: "/templates",
        description: "Standardized audit templates and checklists"
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    children: [
      {
        title: "Forum",
        href: "/forum",
        description: "Connect with security professionals worldwide"
      },
      {
        title: "Events",
        href: "/events",
        description: "Security conferences and workshops"
      },
      {
        title: "Challenges",
        href: "/challenges",
        description: "Security challenges and CTF competitions"
      },
      {
        title: "Leaderboard",
        href: "/leaderboard",
        description: "Top auditors and community contributors"
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Latest insights and security updates"
      }
    ]
  }
];
