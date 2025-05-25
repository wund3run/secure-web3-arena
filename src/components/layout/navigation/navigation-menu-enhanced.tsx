
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { mainNavigation } from '@/components/ui/navigation/navigation-config';
import { cn } from '@/lib/utils';

export function NavigationMenuEnhanced() {
  const location = useLocation();

  const isActivePath = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {mainNavigation.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.children ? (
              <>
                <NavigationMenuTrigger className="bg-transparent">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[700px] grid-cols-2 gap-3 p-6">
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                        {item.title}
                      </h3>
                      {item.children.slice(0, Math.ceil(item.children.length / 2)).map((child) => (
                        <NavigationMenuLink key={child.href} asChild>
                          <Link
                            to={child.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
                              child.featured && "bg-primary/5 border border-primary/20 hover:bg-primary/10",
                              isActivePath(child.href) && "bg-accent text-accent-foreground"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium leading-none group-hover:text-foreground">
                                {child.title}
                              </div>
                              {child.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {child.badge}
                                </Badge>
                              )}
                              {child.featured && (
                                <Badge className="text-xs bg-primary">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            {child.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-muted-foreground">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                        More {item.title}
                      </h3>
                      {item.children.slice(Math.ceil(item.children.length / 2)).map((child) => (
                        <NavigationMenuLink key={child.href} asChild>
                          <Link
                            to={child.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
                              child.featured && "bg-primary/5 border border-primary/20 hover:bg-primary/10",
                              isActivePath(child.href) && "bg-accent text-accent-foreground"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium leading-none group-hover:text-foreground">
                                {child.title}
                              </div>
                              {child.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {child.badge}
                                </Badge>
                              )}
                              {child.featured && (
                                <Badge className="text-xs bg-primary">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            {child.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-muted-foreground">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActivePath(item.href) && "bg-accent text-accent-foreground"
                )}
              >
                {item.title}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
