
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { NavigationLinkItem } from './navigation-links';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface NavigationDropdownItemProps {
  title: string;
  items: NavigationLinkItem[];
  isActive: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export function NavigationDropdownItem({
  title,
  items,
  isActive,
  onToggle,
  ariaLabel,
}: NavigationDropdownItemProps) {
  const { largeText, reducedMotion } = useAccessibility();

  const linkClasses = "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

  return (
    <NavigationMenuItem className="navigation-trigger">
      <NavigationMenuTrigger
        onClick={onToggle}
        className={isActive ? 'bg-accent/50' : ''}
        aria-label={ariaLabel || `${title} navigation menu`}
        aria-expanded={isActive}
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className={cn(
          "grid gap-3 p-4 min-w-[400px]",
          items.length > 3 ? "grid-cols-2 w-[500px]" : "w-[400px]"
        )}>
          {items.map((item) => (
            <li key={item.href} className="row-span-1">
              <NavigationMenuLink asChild>
                <Link
                  className={linkClasses}
                  to={item.href}
                  aria-label={item.description || item.title}
                  style={{
                    transition: reducedMotion ? 'none' : undefined
                  }}
                >
                  <div className={largeText ? 'text-base' : 'text-sm'}>
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <p className={cn(
                        "line-clamp-2 text-muted-foreground",
                        largeText ? 'text-sm' : 'text-xs'
                      )}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.badge && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
