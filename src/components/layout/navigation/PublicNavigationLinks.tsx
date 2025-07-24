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
        href: "/services/security-audits",
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
    title: "Platform",
    href: "/auditor/enhanced-dashboard",
    children: [
      {
        title: "Advanced Features",
        href: "/auditor/enhanced-dashboard",
        description: "Explore our comprehensive platform capabilities"
      },
      {
        title: "Escrow & Payments",
        href: "/dashboard",
        description: "Secure milestone-based payment system"
      },
      {
        title: "Real-time Collaboration",
        href: "/project-management",
        description: "Live document editing and team communication"
      },
      {
        title: "Analytics Dashboard",
        href: "/dashboard",
        description: "Advanced insights and performance metrics"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources/security-guides",
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
      },
      {
        title: "Vulnerability Database",
        href: "/resources/vulnerability-database",
        description: "Known vulnerabilities and fixes"
      }
    ]
  },
  {
    title: "Support",
    href: "/support",
    children: [
      {
        title: "Support Center",
        href: "/support",
        description: "Get help and find answers"
      },
      {
        title: "FAQ",
        href: "/support/faq",
        description: "Frequently asked questions"
      },
      {
        title: "Documentation",
        href: "/support/documentation",
        description: "Comprehensive platform guides"
      }
    ]
  },
  {
    title: "Company",
    href: "/about",
    children: [
      {
        title: "About",
        href: "/about",
        description: "Learn about Hawkly's mission"
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "Transparent pricing for all services"
      },
      {
        title: "Careers",
        href: "/business/careers",
        description: "Join our security team"
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with us"
      }
    ]
  }
];

console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
