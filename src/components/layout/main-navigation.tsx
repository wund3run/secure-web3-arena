
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Shield, FileText, Search, Users, Zap, BookOpen, Star, Award } from 'lucide-react';

export function MainNavigation() {
  const { user } = useAuth();

  // Don't show navigation menu items if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2 nav-item-brand">
            <Shield className="h-4 w-4 text-brand-primary" />
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] card-enhanced bg-background border-brand-primary/20">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-brand-gradient p-6 no-underline outline-none focus:shadow-md text-white brand-hover-lift"
                    to="/marketplace"
                  >
                    <Shield className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Security Audits
                    </div>
                    <p className="text-sm leading-tight text-white/80">
                      Comprehensive smart contract security audits by verified experts
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink asChild>
                <Link to="/marketplace" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-primary/10 hover:text-brand-primary focus:bg-brand-primary/10 focus:text-brand-primary">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Browse Services
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Find security experts for your project
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/request-audit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-secondary/10 hover:text-brand-secondary focus:bg-brand-secondary/10 focus:text-brand-secondary">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Request Audit
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Submit your project for security review
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/pricing-inr" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-accent/10 hover:text-brand-accent focus:bg-brand-accent/10 focus:text-brand-accent">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Pricing
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View pricing in INR and USD
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2 nav-item-brand">
            <BookOpen className="h-4 w-4 text-brand-secondary" />
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2 card-enhanced bg-background border-brand-primary/20">
              <NavigationMenuLink asChild>
                <Link to="/audits" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-primary/10 hover:text-brand-primary focus:bg-brand-primary/10 focus:text-brand-primary">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Audit Reports
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Browse completed security audits
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/security-insights" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-secondary/10 hover:text-brand-secondary focus:bg-brand-secondary/10 focus:text-brand-secondary">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Security Insights
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn about Web3 security best practices
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-accent/10 hover:text-brand-accent focus:bg-brand-accent/10 focus:text-brand-accent">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Community
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Join our security community
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-primary/10 hover:text-brand-primary focus:bg-brand-primary/10 focus:text-brand-primary">
                  <div className="text-sm font-medium leading-none flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Blog
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Latest security news and insights
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
