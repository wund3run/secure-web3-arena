
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
