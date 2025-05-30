
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { navigationLinks } from "./navigation-links";
import { EnhancedNavigationDropdownItem } from "./enhanced-navigation-dropdown-item";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter navigation items based on authentication status
  const filteredNavigationLinks = navigationLinks.filter(item => {
    // If item requires auth and user is not authenticated, hide it
    if (item.requiresAuth && !user) {
      return false;
    }
    return true;
  });

  // Enhanced click outside detection with better event handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!activeDropdown || !isClient) return;
      
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        handleDropdownToggle(activeDropdown);
      }
    };

    if (activeDropdown && isClient) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeDropdown, handleDropdownToggle, isClient]);

  if (!isClient) {
    return null; // Prevent SSR issues
  }

  return (
    <nav 
      className="hidden md:flex items-center space-x-6 ml-8" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {filteredNavigationLinks.map((item) => {
        if (item.children) {
          return (
            <div key={item.title} className="relative">
              <button
                data-dropdown={item.title}
                onClick={() => handleDropdownToggle(item.title)}
                className="navigation-trigger flex items-center text-sm font-medium hover:text-primary transition-all duration-200 py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={activeDropdown === item.title}
                aria-haspopup="true"
                type="button"
              >
                {item.title}
                <ChevronDown 
                  className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                    activeDropdown === item.title ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeDropdown === item.title && (
                <div 
                  ref={(el) => (dropdownRefs.current[item.title] = el)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-[9999] animate-in fade-in-0 zoom-in-95 duration-300"
                  role="menu"
                  style={{ 
                    backgroundColor: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    minWidth: '320px',
                    maxHeight: '80vh',
                    overflowY: 'auto'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleDropdownToggle(item.title);
                    }
                  }}
                >
                  <div className="py-2">
                    {item.children.map((child, index) => (
                      <EnhancedNavigationDropdownItem
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
            className="text-sm font-medium hover:text-primary transition-all duration-200 py-2 px-3 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
