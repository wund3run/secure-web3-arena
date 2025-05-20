
import { ReactNode } from "react";

export type NavigationLinkItem = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export type NavigationLinksStructure = {
  marketplace: NavigationLinkItem[];
  audits: NavigationLinkItem[];
  resources: NavigationLinkItem[];
  dashboards: NavigationLinkItem[]; // Add dashboards to the type definition
};

// The navigationLinks content has been moved to navigation-links.ts for better organization
