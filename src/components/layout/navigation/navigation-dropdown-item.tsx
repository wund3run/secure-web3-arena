
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationLinkItem } from "./navigation-links";

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
          'navigation-trigger group',
          isActive ? 'bg-accent text-accent-foreground' : ''
        )}
        aria-expanded={isActive}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[400px] p-4 rounded-md shadow-md border bg-popover">
          <div className="grid gap-3">
            {items.map((item) => (
              <NavigationMenuLink key={item.href} asChild>
                <Link 
                  to={item.href} 
                  className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary"
                >
                  <div className="font-medium flex items-center">
                    {item.title}
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
