
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { navigationLinks } from "./navigation-links";
import { NavigationDropdownItem } from "./navigation-dropdown-item";
import { ChevronDown } from "lucide-react";

interface EnhancedNavigationDropdownProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function EnhancedNavigationDropdown({ 
  activeDropdown, 
  handleDropdownToggle 
}: EnhancedNavigationDropdownProps) {
  const { user } = useAuth();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Enhanced click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!activeDropdown) return;
      
      const dropdownElement = dropdownRefs.current[activeDropdown];
      const triggerElement = document.querySelector(`[data-dropdown="${activeDropdown}"]`);
      
      if (dropdownElement && triggerElement) {
        const clickedInsideDropdown = dropdownElement.contains(event.target as Node);
        const clickedOnTrigger = triggerElement.contains(event.target as Node);
        
        if (!clickedInsideDropdown && !clickedOnTrigger) {
          handleDropdownToggle(activeDropdown);
        }
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown, handleDropdownToggle]);

  // Filter navigation items based on authentication status but show core items for all
  const filteredNavigationLinks = navigationLinks.filter(item => {
    // Show core navigation items for all users
    if (['Services', 'Resources', 'Community'].includes(item.label)) {
      return true;
    }
    // Show auth-specific items only for authenticated users
    if (item.requiresAuth && !user) {
      return false;
    }
    return true;
  });

  return (
    <nav 
      className="hidden md:flex items-center space-x-6 ml-8" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {filteredNavigationLinks.map((item) => {
        if (item.children) {
          return (
            <div key={item.label} className="relative">
              <button
                data-dropdown={item.label}
                onClick={() => handleDropdownToggle(item.label)}
                className="navigation-trigger flex items-center text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={activeDropdown === item.label}
                aria-haspopup="true"
                type="button"
              >
                {item.label}
                <ChevronDown 
                  className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                    activeDropdown === item.label ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeDropdown === item.label && (
                <div 
                  ref={(el) => (dropdownRefs.current[item.label] = el)}
                  className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-[10000] animate-in fade-in-0 zoom-in-95 duration-200"
                  role="menu"
                  style={{ 
                    backgroundColor: 'white',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    minWidth: '288px'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleDropdownToggle(item.label);
                    }
                  }}
                >
                  <div className="py-1">
                    {item.children.map((child, index) => {
                      // Filter child items based on auth status
                      if (child.requiresAuth && !user) {
                        return null;
                      }
                      return (
                        <NavigationDropdownItem
                          key={child.href}
                          href={child.href}
                          title={child.label}
                          description={child.description}
                          onNavigate={() => handleDropdownToggle(item.label)}
                          isFirst={index === 0}
                          isLast={index === item.children!.length - 1}
                        />
                      );
                    })}
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
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
