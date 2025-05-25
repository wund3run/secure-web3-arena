
import React from "react";
import { Link } from "react-router-dom";
import { navigationLinks } from "./navigation-links";
import { NavigationDropdownItem } from "./navigation-dropdown-item";
import { ChevronDown } from "lucide-react";

interface DesktopNavigationProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function DesktopNavigation({ activeDropdown, handleDropdownToggle }: DesktopNavigationProps) {
  return (
    <nav className="hidden md:flex items-center space-x-6 ml-8" role="navigation" aria-label="Main navigation">
      {navigationLinks.map((item) => {
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
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                  activeDropdown === item.title ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeDropdown === item.title && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-[9999] animate-in fade-in-0 zoom-in-95 duration-200"
                  role="menu"
                  style={{ 
                    backgroundColor: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div className="py-2">
                    {item.children.map((child) => (
                      <NavigationDropdownItem
                        key={child.href}
                        href={child.href}
                        title={child.title}
                        description={child.description}
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
