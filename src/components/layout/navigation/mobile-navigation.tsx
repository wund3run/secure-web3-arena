
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, LogIn, User, LogOut } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";

interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
  requiresAuth?: boolean;
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
  const { getUserType } = useAuth();
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      console.log("Mobile navigation sign out...");
      await onSignOut();
      setIsOpen(false);
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Mobile sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const getDashboardPath = () => {
    if (!isAuthenticated) return "/dashboard";
    
    try {
      const userType = getUserType();
      return userType === 'auditor' ? '/dashboard/auditor' : '/dashboard/project';
    } catch (error) {
      console.error('Error determining user type:', error);
      return '/dashboard';
    }
  };

  // Filter navigation items based on authentication status
  const filteredNavigationLinks = navigationLinks.filter(item => {
    // If item requires auth and user is not authenticated, hide it
    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }
    return true;
  });

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
            {/* Show navigation items only if authenticated or if they don't require auth */}
            {filteredNavigationLinks.map((item) => {
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
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/auth" onClick={handleLinkClick}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to={getDashboardPath()} onClick={handleLinkClick}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
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
