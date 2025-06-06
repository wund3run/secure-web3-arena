
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { navigationLinks, NavigationLink } from "./navigation-links";
import { NavigationDropdownItem } from "./navigation-dropdown-item";
import { ChevronDown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthAwareNavigationProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function AuthAwareNavigation({ 
  activeDropdown, 
  handleDropdownToggle 
}: AuthAwareNavigationProps) {
  const { user } = useAuth();

  const filterNavigationItems = (items: NavigationLink[]): NavigationLink[] => {
    return items.filter(item => {
      // Show public items to everyone
      if (item.isPublic) return true;
      
      // Show auth-required items only to authenticated users
      if (item.requiresAuth && !user) return false;
      
      // Show items without explicit auth requirements to everyone
      if (!item.requiresAuth && !item.isPublic) return true;
      
      return true;
    }).map(item => ({
      ...item,
      children: item.children ? filterNavigationItems(item.children) : undefined
    }));
  };

  const filteredLinks = filterNavigationItems(navigationLinks);

  const renderAuthIndicator = (item: NavigationLink) => {
    if (item.requiresAuth && !user) {
      return (
        <Lock className="ml-1 h-3 w-3 text-muted-foreground" title="Sign in required" />
      );
    }
    return null;
  };

  return (
    <nav 
      className="hidden md:flex items-center space-x-6 ml-8" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {filteredLinks.map((item) => {
        if (item.children) {
          return (
            <div key={item.title} className="relative">
              <button
                onClick={() => handleDropdownToggle(item.title)}
                className="navigation-trigger flex items-center text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={activeDropdown === item.title}
                aria-haspopup="true"
                type="button"
              >
                {item.title}
                {renderAuthIndicator(item)}
                <ChevronDown 
                  className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                    activeDropdown === item.title ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeDropdown === item.title && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-[10000] animate-in fade-in-0 zoom-in-95 duration-200"
                  role="menu"
                >
                  <div className="py-1">
                    {item.children.map((child, index) => (
                      <div key={child.href} className="relative">
                        <NavigationDropdownItem
                          href={child.href}
                          title={child.title}
                          description={child.description}
                          onNavigate={() => handleDropdownToggle(item.title)}
                          isFirst={index === 0}
                          isLast={index === item.children!.length - 1}
                          disabled={child.requiresAuth && !user}
                        />
                        {child.requiresAuth && !user && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!user && item.children.some(child => child.requiresAuth) && (
                      <div className="px-3 py-2 border-t border-border/50 mt-1">
                        <p className="text-xs text-muted-foreground mb-2">
                          Sign in to access premium features
                        </p>
                        <Button asChild size="sm" className="w-full">
                          <Link to="/auth">Sign In</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Handle disabled links for unauthenticated users
        if (item.requiresAuth && !user) {
          return (
            <button
              key={item.href}
              onClick={() => {}} // No action for disabled items
              className="text-sm font-medium text-muted-foreground cursor-not-allowed py-2 px-3 rounded-md flex items-center"
              disabled
            >
              {item.title}
              {renderAuthIndicator(item)}
            </button>
          );
        }

        return (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center"
          >
            {item.title}
            {renderAuthIndicator(item)}
          </Link>
        );
      })}
    </nav>
  );
}
