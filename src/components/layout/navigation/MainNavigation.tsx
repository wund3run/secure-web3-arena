
import React from 'react';
import { Link } from 'react-router-dom';
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
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { navigationLinks } from './navigation-links';
import { cn } from '@/lib/utils';

export const MainNavigation = () => {
  return (
    <div className="flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.title}>
              {link.children ? (
                <>
                  <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to={link.href}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {link.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our comprehensive {link.title.toLowerCase()} offerings
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-2">
                        {link.children.slice(0, 6).map((child) => (
                          <NavigationMenuLink key={child.title} asChild>
                            <Link
                              to={child.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {child.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {child.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link to={link.href} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    {link.title}
                    {link.requiresAuth && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Auth Required
                      </Badge>
                    )}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Global Search */}
      <div className="hidden md:block">
        <GlobalSearch />
      </div>
    </div>
  );
};
