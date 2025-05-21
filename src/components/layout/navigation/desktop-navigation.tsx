
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
import { navigationLinks } from "./navigation-links.ts";
import { useAuth } from "@/contexts/auth";
import { Badge } from "@/components/ui/badge";

interface DesktopNavigationProps {
  activeDropdown: string | null;
  handleDropdownToggle: (dropdown: string) => void;
}

export function DesktopNavigation({ 
  activeDropdown, 
  handleDropdownToggle 
}: DesktopNavigationProps) {
  const { user, getUserType } = useAuth();
  
  // Determine if the user is an auditor or project owner
  const userType = user ? getUserType() : null;
  const isAuditor = userType === 'auditor';
  
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
        
        {user && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors relative",
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
              "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              isAuditor ? "after:content-[''] after:absolute after:w-full after:scale-x-100 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary" : ""
            )}
            onClick={() => handleDropdownToggle('dashboards')}
            role="button"
            tabIndex={0}
            >
              <span>{isAuditor ? "Auditor Hub" : "Project Hub"}</span>
              {/* Modified this line to safely check for isNew property */}
              {user && ('isNew' in user) && user.isNew && <Badge className="ml-2 bg-primary" variant="outline">New</Badge>}
            </NavigationMenuLink>
            
            {activeDropdown === 'dashboards' && (
              <div className="absolute top-full left-0 mt-2 bg-card rounded-md shadow-md p-2 z-50 border">
                <ul className="space-y-1">
                  {navigationLinks.dashboards
                    .filter(item => 
                      isAuditor 
                        ? !item.href.includes('/dashboard/project')
                        : !item.href.includes('/dashboard/auditor')
                    )
                    .map(item => (
                      <li key={item.href}>
                        <Link 
                          to={item.href}
                          className="block px-4 py-2 text-sm rounded-md hover:bg-accent"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}
          </NavigationMenuItem>
        )}
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors relative",
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
            "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
            "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0",
            "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
            "hover:after:scale-x-100 hover:after:origin-bottom-left"
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
