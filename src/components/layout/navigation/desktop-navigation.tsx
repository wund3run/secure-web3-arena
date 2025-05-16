
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationDropdownItem } from "./navigation-dropdown-item";
import { navigationLinks } from "./navigation-links";

interface DesktopNavigationProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function DesktopNavigation({ 
  activeDropdown, 
  handleDropdownToggle 
}: DesktopNavigationProps) {
  return (
    <NavigationMenu className="mx-6 hidden md:flex" aria-label="Main Navigation">
      <NavigationMenuList className="gap-1">
        <NavigationDropdownItem 
          title="Marketplace"
          items={navigationLinks.marketplace}
          isActive={activeDropdown === 'marketplace'}
          onToggle={() => handleDropdownToggle('marketplace')}
        />
        
        <NavigationDropdownItem 
          title="Audits"
          items={navigationLinks.audits}
          isActive={activeDropdown === 'audits'}
          onToggle={() => handleDropdownToggle('audits')}
        />
        
        <NavigationDropdownItem 
          title="Resources"
          items={navigationLinks.resources}
          isActive={activeDropdown === 'resources'}
          onToggle={() => handleDropdownToggle('resources')}
        />
        
        <NavigationMenuItem>
          <Link to="/pricing">
            <NavigationMenuLink className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors relative",
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
              "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0",
              "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
              "hover:after:scale-x-100 hover:after:origin-bottom-left"
            )}
            aria-label="View pricing plans"
            >
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
