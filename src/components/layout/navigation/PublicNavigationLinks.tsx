
export interface PublicNavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: PublicNavigationLink[];
}

export const publicNavigationLinks: PublicNavigationLink[] = [
  {
    title: "Services",
    href: "/marketplace",
    children: [
      {
        title: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract security reviews"
      },
      {
        title: "Browse Marketplace",
        href: "/marketplace",
        description: "Find verified security experts"
      },
      {
        title: "Request Audit",
        href: "/request-audit",
        description: "Submit your project for review"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    children: [
      {
        title: "Security Guides",
        href: "/resources/security-guides",
        description: "Best practices and security guidelines"
      },
      {
        title: "Knowledge Base",
        href: "/resources/knowledge-base",
        description: "Comprehensive security documentation"
      },
      {
        title: "Tutorials",
        href: "/resources/tutorials",
        description: "Step-by-step security tutorials"
      }
    ]
  },
  {
    title: "Tools",
    href: "/tools",
    children: [
      {
        title: "Security Insights",
        href: "/tools/security-insights",
        description: "Real-time vulnerability analysis"
      },
      {
        title: "AI Tools",
        href: "/tools/ai-tools",
        description: "AI-powered security analysis"
      },
      {
        title: "Vulnerability Scanner",
        href: "/tools/vulnerability-scanner",
        description: "Automated security scanning"
      }
    ]
  },
  {
    title: "Company",
    href: "/business",
    children: [
      {
        title: "About",
        href: "/business/about",
        description: "Learn about Hawkly's mission"
      },
      {
        title: "Pricing",
        href: "/business/pricing",
        description: "Transparent pricing for all services"
      },
      {
        title: "Careers",
        href: "/business/careers",
        description: "Join our security team"
      },
      {
        title: "Contact",
        href: "/business/contact",
        description: "Get in touch with us"
      }
    ]
  }
];
