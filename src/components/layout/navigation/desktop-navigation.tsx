
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
import { useAuth } from "@/contexts/auth";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface DesktopNavigationProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function DesktopNavigation({ 
  activeDropdown, 
  handleDropdownToggle 
}: DesktopNavigationProps) {
  const { user, userProfile } = useAuth();
  const { largeText, keyboardMode } = useAccessibility();
  
  // Determine if the user is an auditor or project owner
  const userType = userProfile?.user_type || user?.user_metadata?.user_type;
  const isAuditor = userType === 'auditor';
  
  // ARIA labels for better accessibility
  const getAriaLabel = (section: string) => {
    return `${section} navigation menu, press Enter to expand`;
  };
  
  return (
    <NavigationMenu className="mx-6 hidden md:flex" aria-label="Main Navigation">
      <NavigationMenuList className="gap-1">
        <NavigationDropdownItem 
          title="Marketplace"
          items={navigationLinks.marketplace}
          isActive={activeDropdown === 'marketplace'}
          onToggle={() => handleDropdownToggle('marketplace')}
          ariaLabel={getAriaLabel("Marketplace")}
        />
        
        <NavigationDropdownItem 
          title="Audits"
          items={navigationLinks.audits}
          isActive={activeDropdown === 'audits'}
          onToggle={() => handleDropdownToggle('audits')}
          ariaLabel={getAriaLabel("Audits")}
        />
        
        <NavigationDropdownItem 
          title="Resources"
          items={navigationLinks.resources}
          isActive={activeDropdown === 'resources'}
          onToggle={() => handleDropdownToggle('resources')}
          ariaLabel={getAriaLabel("Resources")}
        />
        
        {user && (
          <NavigationDropdownItem 
            title={isAuditor ? "Auditor Hub" : "Project Hub"}
            items={navigationLinks.dashboards.filter(item => 
              isAuditor 
                ? !item.href.includes('/dashboard/project')
                : !item.href.includes('/dashboard/auditor')
            )}
            isActive={activeDropdown === 'dashboards'}
            onToggle={() => handleDropdownToggle('dashboards')}
            ariaLabel={getAriaLabel(isAuditor ? "Auditor Hub" : "Project Hub")}
          />
        )}
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors relative",
            largeText ? "text-base" : "text-sm",
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
            "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
            "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0",
            "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
            "hover:after:scale-x-100 hover:after:origin-bottom-left",
            keyboardMode ? "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" : ""
          )}>
            <Link to="/pricing">
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
