
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { navigationLinks } from "./navigation-links";
import { NavigationDropdownItem } from "./navigation-dropdown-item";
import { ChevronDown } from "lucide-react";

interface RoleFilteredNavigationProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function RoleFilteredNavigation({ 
  activeDropdown, 
  handleDropdownToggle 
}: RoleFilteredNavigationProps) {
  const { user, userProfile } = useAuth();
  
  // Filter navigation items based on authentication requirements
  const filteredNavigation = navigationLinks.filter(item => {
    // If item requires auth and user is not authenticated, hide it
    if (item.requiresAuth && !user) {
      return false;
    }
    return true;
  }).map(item => {
    // Filter children if they exist
    if (item.children) {
      const filteredChildren = item.children.filter(child => {
        // Apply same logic to children if needed
        return true; // For now, show all children if parent is visible
      });
      return { ...item, children: filteredChildren };
    }
    return item;
  });

  return (
    <nav 
      className="hidden md:flex items-center space-x-6 ml-8" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {filteredNavigation.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <div key={item.title} className="relative">
              <button
                data-dropdown={item.title}
                onClick={() => handleDropdownToggle(item.title)}
                className="navigation-trigger flex items-center text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={activeDropdown === item.title}
                aria-haspopup="true"
                type="button"
              >
                {item.title}
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
                  style={{ 
                    backgroundColor: 'white',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    minWidth: '288px'
                  }}
                >
                  <div className="py-1">
                    {item.children.map((child, index) => (
                      <NavigationDropdownItem
                        key={child.href}
                        href={child.href}
                        title={child.title}
                        description={child.description}
                        onNavigate={() => handleDropdownToggle(item.title)}
                        isFirst={index === 0}
                        isLast={index === item.children!.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
