
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
                className="navigation-trigger flex items-center text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50"
                aria-expanded={activeDropdown === item.title}
                aria-haspopup="true"
                type="button"
              >
                {item.title}
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                  activeDropdown === item.title ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeDropdown === item.title && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-md shadow-lg z-50">
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
            className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted/50"
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
