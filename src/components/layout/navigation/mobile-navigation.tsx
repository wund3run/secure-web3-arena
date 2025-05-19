
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationLinksStructure } from "./navigation-links.ts";
import { FocusTrap } from "@/components/ui/focus-trap";

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
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]" id="mobile-menu">
          <FocusTrap active={isOpen} onEscape={() => setIsOpen(false)}>
            <div className="flex flex-col gap-6 py-6">
              {/* Mobile Menu Content */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="font-medium mb-2" id="mobile-marketplace-heading">Marketplace</h3>
                  <nav aria-labelledby="mobile-marketplace-heading">
                    <ul className="space-y-2">
                      {navigationLinks.marketplace.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block py-2 text-sm hover:text-primary transition-colors relative group" 
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
                
                <div className="border-b pb-2">
                  <h3 className="font-medium mb-2" id="mobile-audits-heading">Audits</h3>
                  <nav aria-labelledby="mobile-audits-heading">
                    <ul className="space-y-2">
                      {navigationLinks.audits.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block py-2 text-sm hover:text-primary transition-colors relative group" 
                            onClick={() => setIsOpen(false)}
                            aria-label={item.badge ? `${item.title} (${item.badge})` : item.title}
                          >
                            <div className="flex items-center relative">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span 
                                  className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full"
                                  aria-hidden="true"
                                >
                                  {item.badge}
                                </span>
                              )}
                              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                <div className="border-b pb-2">
                  <h3 className="font-medium mb-2" id="mobile-resources-heading">Resources</h3>
                  <nav aria-labelledby="mobile-resources-heading">
                    <ul className="space-y-2">
                      {navigationLinks.resources.map((item) => (
                        <li key={item.href}>
                          <Link 
                            to={item.href} 
                            className="block py-2 text-sm hover:text-primary transition-colors relative group" 
                            onClick={() => setIsOpen(false)}
                            aria-label={item.badge ? `${item.title} (${item.badge})` : item.title}
                          >
                            <div className="flex items-center relative">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span 
                                  className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full"
                                  aria-hidden="true"
                                >
                                  {item.badge}
                                </span>
                              )}
                              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                <div>
                  <Link 
                    to="/pricing" 
                    className="block py-2 font-medium hover:text-primary transition-colors relative group"
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
              <div className="space-y-2 pt-4 border-t" role="navigation" aria-label="Authentication">
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link 
                        to="/auth" 
                        onClick={() => setIsOpen(false)}
                        aria-label="Sign in to your account"
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
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
                    <Button variant="outline" className="w-full" asChild>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        aria-label="Go to your dashboard"
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full"
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
