
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
    title: "Platform",
    href: "/features",
    children: [
      {
        title: "Advanced Features",
        href: "/features",
        description: "Explore our comprehensive platform capabilities"
      },
      {
        title: "Escrow & Payments",
        href: "/escrow",
        description: "Secure milestone-based payment system"
      },
      {
        title: "Real-time Collaboration",
        href: "/collaboration",
        description: "Live document editing and team communication"
      },
      {
        title: "Analytics Dashboard",
        href: "/analytics",
        description: "Advanced insights and performance metrics"
      }
    ]
  },
  {
    title: "Resources",
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
        href: "/support",
        description: "Comprehensive platform guides"
      }
    ]
  },
  {
    title: "Company",
    href: "/business/about",
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
