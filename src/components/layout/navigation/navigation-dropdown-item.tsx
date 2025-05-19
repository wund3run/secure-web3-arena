import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationLinkItem } from "./navigation-links.ts";

interface NavigationDropdownItemProps {
  title: string;
  items: NavigationLinkItem[];
  isActive: boolean;
  onToggle: () => void;
}

export function NavigationDropdownItem({ 
  title, 
  items, 
  isActive, 
  onToggle 
}: NavigationDropdownItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        onClick={onToggle}
        className={cn(
          'navigation-trigger group relative',
          isActive ? 'bg-accent text-accent-foreground' : '',
          "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0",
          "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
          "hover:after:scale-x-100 hover:after:origin-bottom-left"
        )}
        aria-expanded={isActive}
        aria-controls={`${title.toLowerCase()}-dropdown`}
        aria-label={`${title} menu`}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent id={`${title.toLowerCase()}-dropdown`}>
        <div className="w-[400px] p-4 rounded-md shadow-md border bg-popover">
          <div className="grid gap-3">
            {items.map((item) => (
              <NavigationMenuLink key={item.href} asChild>
                <Link 
                  to={item.href} 
                  className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary relative group"
                  aria-label={item.badge ? `${item.title} (${item.badge})` : item.title}
                >
                  <div className="font-medium flex items-center">
                    {item.title}
                    {item.badge && (
                      <span 
                        className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full"
                        aria-label={item.badge}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
