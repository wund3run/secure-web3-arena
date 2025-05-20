
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationLinksStructure } from "./navigation-links";
import { useAccessibility } from "@/contexts/AccessibilityContext";

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
  const { largeText, reducedMotion } = useAccessibility();
  
  // Set up keyboard shortcut for mobile menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+M to toggle mobile menu
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);
  
  const textSizeClass = largeText ? "text-lg" : "text-base";
  const headingClass = largeText ? "text-xl mb-2" : "text-lg mb-1";
  
  const renderLinkSection = (title: string, links: typeof navigationLinks.marketplace) => (
    <div className="py-4">
      <h3 className={`font-medium ${headingClass}`}>{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {links.map((item) => (
          <Link 
            key={item.href}
            to={item.href}
            className={`p-2 hover:bg-accent rounded-md ${textSizeClass}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex justify-between items-center">
              <span>{item.title}</span>
              {item.badge && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="Menu"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-[85vw] max-w-sm overflow-y-auto"
          style={{
            transition: reducedMotion ? 'none' : undefined
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-8 flex flex-col gap-6">
            {renderLinkSection("Marketplace", navigationLinks.marketplace)}
            {renderLinkSection("Audits", navigationLinks.audits)}
            {renderLinkSection("Resources", navigationLinks.resources)}
            
            {isAuthenticated && (
              <>
                {renderLinkSection("Dashboard", navigationLinks.dashboards)}
                <div className="pt-4 border-t">
                  <Button 
                    className="w-full" 
                    variant="destructive"
                    onClick={() => {
                      onSignOut();
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="pt-4 border-t space-y-4">
                <Button 
                  className="w-full" 
                  variant="outline"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth?mode=login">Sign In</Link>
                </Button>
                <Button 
                  className="w-full" 
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth?mode=signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
