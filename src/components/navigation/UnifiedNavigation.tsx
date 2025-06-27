
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  requiresAuth?: boolean;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Services',
    href: '/marketplace',
    children: [
      { title: 'Security Audits', href: '/security-audits', description: 'Comprehensive smart contract audits' },
      { title: 'Code Reviews', href: '/code-reviews', description: 'Professional code review services' },
      { title: 'Penetration Testing', href: '/penetration-testing', description: 'Web3 security testing' },
      { title: 'Consulting', href: '/consulting', description: 'Security consulting services' }
    ]
  },
  {
    title: 'Tools',
    href: '/ai-tools',
    children: [
      { title: 'AI Security Scanner', href: '/ai-tools', description: 'Automated vulnerability detection' },
      { title: 'Vulnerability Scanner', href: '/vulnerability-scanner', description: 'Comprehensive security scanning' }
    ]
  },
  {
    title: 'Resources',
    href: '/resources',
    children: [
      { title: 'Documentation', href: '/resources', description: 'Security guides and documentation' },
      { title: 'Community', href: '/community', description: 'Join our security community' },
      { title: 'Vulnerabilities', href: '/vulnerabilities', description: 'Known vulnerability database' }
    ]
  }
];

const authenticatedItems: NavigationItem[] = [
  { title: 'Dashboard', href: '/dashboard', requiresAuth: true },
  { title: 'My Audits', href: '/audits', requiresAuth: true },
  { title: 'Messages', href: '/messages', requiresAuth: true }
];

export function UnifiedNavigation() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.children ? (
              <>
                <NavigationMenuTrigger className={cn(
                  isActive(item.href) && "bg-accent text-accent-foreground"
                )}>
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {item.children.map((child) => (
                      <NavigationMenuLink key={child.title} asChild>
                        <Link
                          to={child.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            isActive(child.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {child.title}
                          </div>
                          {child.description && (
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link 
                  to={item.href}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive(item.href) && "bg-accent text-accent-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}

        {user && authenticatedItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink asChild>
              <Link 
                to={item.href}
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive(item.href) && "bg-accent text-accent-foreground"
                )}
              >
                {item.title}
                {item.title === 'Messages' && (
                  <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs">
                    3
                  </Badge>
                )}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
