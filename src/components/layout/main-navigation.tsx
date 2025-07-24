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
import { Shield, FileText, Search, Users, Zap, BookOpen } from 'lucide-react';

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
          <NavigationMenuTrigger className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/marketplace"
                  >
                    <Shield className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Security Audits
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Comprehensive smart contract security audits by verified experts
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink asChild>
                <Link to="/marketplace" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Browse Services</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Find security experts for your project
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/request-audit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Request Audit</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Submit your project for security review
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/pricing-inr" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Pricing</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    View pricing in INR and USD
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
              <NavigationMenuLink asChild>
                <Link to="/audit-details" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Audit Reports</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Browse completed security audits
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/tools/security-insights" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Security Insights</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Latest vulnerability trends and analysis
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">About Hawkly</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn about our platform and mission
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Contact Support</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Get help and support from our team
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[300px]">
              <NavigationMenuLink asChild>
                <Link to="/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Join Community</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Connect with security experts
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/careers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Careers</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Join the Hawkly team
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
