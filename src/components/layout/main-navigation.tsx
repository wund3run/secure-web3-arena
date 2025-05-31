
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
              <div className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/security-audits"
                  >
                    <Shield className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Security Audits
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Comprehensive smart contract security audits by verified experts - Updated March 2025
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink asChild>
                <Link to="/code-reviews" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Code Reviews</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Expert code review services for Web3 projects with AI-enhanced analysis
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/penetration-testing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Penetration Testing</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Advanced security testing and vulnerability assessment for Web3 applications
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/consulting" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Security Consulting</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Strategic security guidance and implementation support for 2025
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
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuLink asChild>
                <Link to="/security-guides" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Security Guides</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Comprehensive security guides for Web3 development updated for March 2025
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/knowledge-base" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Knowledge Base</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Extensive documentation and best practices for 2025 security landscape
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/tutorials" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Video Tutorials</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Expert-led tutorials covering AI-powered security analysis and latest threats
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/templates" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Audit Templates</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Professional audit templates and frameworks enhanced with AI analysis
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuLink asChild>
                <Link to="/security-insights" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Security Insights</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    AI-powered security analytics and real-time threat intelligence for 2025
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/ai-tools" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">AI Security Tools</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    GPT-4 powered analysis, automated vulnerability detection, and ML threat detection
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/vulnerability-scanner" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Vulnerability Scanner</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Automated vulnerability detection with multi-blockchain support and CI/CD integration
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/platform-reports" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Platform Reports</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Comprehensive security reports, ecosystem analysis, and compliance dashboards
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
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuLink asChild>
                <Link to="/forum" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Community Forum</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Technical discussions, vulnerability disclosures, and expert Q&A sessions
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/events" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Security Events</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Workshops, conferences, webinars, and hands-on security training sessions
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/challenges" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Security Challenges</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    CTF challenges, bug bounty training, and skill-building competitions
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/leaderboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Expert Leaderboard</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Top security experts, community contributors, and vulnerability discoverers
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
