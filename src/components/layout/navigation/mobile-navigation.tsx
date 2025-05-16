
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationLinksStructure } from "./navigation-links";

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
          <Button variant="ghost" size="icon" aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <div className="flex flex-col gap-6 py-6">
            {/* Mobile Menu Content */}
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium mb-2">Marketplace</h3>
                <div className="space-y-2">
                  {navigationLinks.marketplace.map((item) => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      className="block py-2 text-sm hover:text-primary transition-colors" 
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="border-b pb-2">
                <h3 className="font-medium mb-2">Audits</h3>
                <div className="space-y-2">
                  {navigationLinks.audits.map((item) => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      className="block py-2 text-sm hover:text-primary transition-colors" 
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="border-b pb-2">
                <h3 className="font-medium mb-2">Resources</h3>
                <div className="space-y-2">
                  {navigationLinks.resources.map((item) => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      className="block py-2 text-sm hover:text-primary transition-colors" 
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <Link 
                  to="/pricing" 
                  className="block py-2 font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
              </div>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="space-y-2 pt-4 border-t">
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/service-provider-onboarding" onClick={() => setIsOpen(false)}>Join as Auditor</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => {
                      onSignOut();
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
