
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, LogIn, User, LogOut } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
}

interface MobileNavigationProps {
  navigationLinks: NavigationLink[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            {navigationLinks.map((item) => {
              if (item.children) {
                return (
                  <Collapsible key={item.title}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                      {item.title}
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 ml-4 mt-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={handleLinkClick}
                          className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <div>
                            <div className="font-medium">{child.title}</div>
                            {child.description && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {child.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className="font-medium py-2 hover:text-primary"
                >
                  {item.title}
                </Link>
              );
            })}
            
            <div className="border-t pt-4 mt-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/auth" onClick={handleLinkClick}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start">
                    <Link to="/service-provider-onboarding" onClick={handleLinkClick}>
                      <User className="mr-2 h-4 w-4" />
                      Join as Auditor
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/dashboard" onClick={handleLinkClick}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
