
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type NavigationLinksStructure } from "./navigation-links.tsx";
import { FocusTrap } from "@/components/ui/focus-trap";
import { useAuth } from "@/contexts/auth";

interface MobileNavigationProps {
  navigationLinks: NavigationLinksStructure;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function MobileNavigation({ 
  navigationLinks, 
  isOpen, 
  setIsOpen, 
  isAuthenticated, 
  onSignOut 
}: MobileNavigationProps) {
  const { getUserType } = useAuth();
  
  // Determine if the user is an auditor or project owner
  const userType = isAuthenticated ? getUserType() : null;
  const isAuditor = userType === 'auditor';
  
  // Filter dashboard links based on user type
  const dashboardLinks = isAuthenticated
    ? navigationLinks.dashboards.filter(item => 
        isAuditor 
          ? !item.href.includes('/dashboard/project')
          : !item.href.includes('/dashboard/auditor')
      )
    : [];
  
  return (
    <div className="flex md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[85vw] max-w-[300px] sm:max-w-sm p-0" 
          id="mobile-menu"
        >
          <FocusTrap active={isOpen} onEscape={() => setIsOpen(false)}>
            <div className="flex flex-col gap-4 py-6 h-full overflow-y-auto">
              {/* Mobile Menu Content */}
              <div className="space-y-2 px-4">
                <div className="border-b pb-2">
                  <h3 className="font-medium mb-2" id="mobile-marketplace-heading">Marketplace</h3>
                  <nav aria-labelledby="mobile-marketplace-heading">
                    <ul className="space-y-1">
                      {navigationLinks.marketplace.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block py-2 text-sm hover:text-primary transition-colors relative group w-full text-left px-2 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30" 
                            onClick={() => setIsOpen(false)}
                            aria-label={item.title}
                          >
                            <span className="relative">
                              {item.title}
                              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                <div className="border-b pb-2 pt-2">
                  <h3 className="font-medium mb-2" id="mobile-audits-heading">Audits</h3>
                  <nav aria-labelledby="mobile-audits-heading">
                    <ul className="space-y-1">
                      {navigationLinks.audits.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block py-2 text-sm hover:text-primary transition-colors relative group w-full text-left px-2 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                            onClick={() => setIsOpen(false)}
                            aria-label={item.badge ? `${item.title} (${item.badge})` : item.title}
                          >
                            <div className="flex items-center justify-between relative">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span 
                                  className="px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full"
                                  aria-hidden="true"
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                <div className="border-b pb-2 pt-2">
                  <h3 className="font-medium mb-2" id="mobile-resources-heading">Resources</h3>
                  <nav aria-labelledby="mobile-resources-heading">
                    <ul className="space-y-1">
                      {navigationLinks.resources.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block py-2 text-sm hover:text-primary transition-colors relative group w-full text-left px-2 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                            onClick={() => setIsOpen(false)}
                            aria-label={item.badge ? `${item.title} (${item.badge})` : item.title}
                          >
                            <div className="flex items-center justify-between relative">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span 
                                  className="px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full"
                                  aria-hidden="true"
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {isAuthenticated && dashboardLinks.length > 0 && (
                  <div className="border-b pb-2 pt-2">
                    <h3 className="font-medium mb-2" id="mobile-dashboard-heading">
                      {isAuditor ? "Auditor Hub" : "Project Hub"}
                    </h3>
                    <nav aria-labelledby="mobile-dashboard-heading">
                      <ul className="space-y-1">
                        {dashboardLinks.map((item) => (
                          <li key={item.href}>
                            <Link 
                              to={item.href} 
                              className="block py-2 text-sm hover:text-primary transition-colors relative group w-full text-left px-2 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                              onClick={() => setIsOpen(false)}
                              aria-label={item.badge ? `${item.title} (${item.badge})` : item.title}
                            >
                              <div className="flex items-center justify-between relative">
                                <span>{item.title}</span>
                                {item.badge && (
                                  <span 
                                    className="px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full"
                                    aria-hidden="true"
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}
                
                <div className="pt-2">
                  <Link 
                    to="/pricing" 
                    className="block py-2 font-medium hover:text-primary transition-colors relative group px-2 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    onClick={() => setIsOpen(false)}
                    aria-label="View pricing plans"
                  >
                    <span className="relative">
                      Pricing
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="mt-auto space-y-2 pt-4 px-4 border-t" role="navigation" aria-label="Authentication">
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" className="w-full justify-center h-10" asChild>
                      <Link 
                        to="/auth" 
                        onClick={() => setIsOpen(false)}
                        aria-label="Sign in to your account"
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full justify-center h-10" asChild>
                      <Link 
                        to="/service-provider-onboarding" 
                        onClick={() => setIsOpen(false)}
                        aria-label="Join as an auditor"
                      >
                        Join as Auditor
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-center h-10" asChild>
                      <Link 
                        to={isAuditor ? "/dashboard/auditor" : "/dashboard/project"}
                        onClick={() => setIsOpen(false)}
                        aria-label="Go to your dashboard"
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-center h-10"
                      onClick={() => {
                        onSignOut();
                        setIsOpen(false);
                      }}
                      aria-label="Sign out of your account"
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </FocusTrap>
        </SheetContent>
      </Sheet>
    </div>
  );
}
