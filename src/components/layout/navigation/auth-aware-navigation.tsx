
import React from "react";
import { useAuth } from "@/contexts/auth";
import { navigationLinks, NavigationLink } from "./navigation-links";

interface AuthAwareNavigationProps {
  children: (filteredLinks: NavigationLink[]) => React.ReactNode;
}

export function AuthAwareNavigation({ children }: AuthAwareNavigationProps) {
  const { user } = useAuth();
  
  const filterNavigationLinks = (links: NavigationLink[]): NavigationLink[] => {
    return links
      .filter(link => {
        // If requiresAuth is false or undefined, always show
        if (!link.requiresAuth) return true;
        // If requiresAuth is true, only show if user is authenticated
        return !!user;
      })
      .map(link => ({
        ...link,
        children: link.children ? filterNavigationLinks(link.children) : undefined
      }));
  };

  const filteredLinks = filterNavigationLinks(navigationLinks);
  
  return <>{children(filteredLinks)}</>;
}
