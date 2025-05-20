
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { NavigationLinksStructure } from "./navigation-links";

interface MobileNavigationProps {
  navigationLinks: NavigationLinksStructure;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function MobileNavigation({
  navigationLinks,
  isOpen,
  setIsOpen,
  isAuthenticated,
  onSignOut,
}: MobileNavigationProps) {
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  
  const handleToggleCategory = (category: string) => {
    setActiveMobileCategory(activeMobileCategory === category ? null : category);
  };
  
  return (
    <div className="md:hidden flex items-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b p-4">
              <span className="font-medium">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="py-4 flex-1 overflow-auto">
              <div className="space-y-4 px-1">
                {Object.entries(navigationLinks).map(([category, links]) => (
                  <div key={category} className="border-b pb-3">
                    <button 
                      onClick={() => handleToggleCategory(category)}
                      className="flex items-center justify-between w-full p-3 rounded-md hover:bg-accent"
                      aria-expanded={activeMobileCategory === category}
                      aria-controls={`mobile-${category}-links`}
                    >
                      <span className="font-medium capitalize">{category}</span>
                      <span className="text-muted-foreground">
                        {activeMobileCategory === category ? "−" : "+"}
                      </span>
                    </button>
                    
                    {activeMobileCategory === category && (
                      <div 
                        id={`mobile-${category}-links`} 
                        className="mt-1 space-y-1 pl-3"
                      >
                        {links.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="block p-3 text-sm hover:bg-accent rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.title}
                            {link.badge && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t p-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button className="w-full" variant="destructive" onClick={() => {
                    onSignOut();
                    setIsOpen(false);
                  }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/auth?mode=login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
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
