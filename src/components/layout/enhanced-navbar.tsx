
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { navigationLinks } from "./navigation/navigation-links";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BreadcrumbTrail } from "./navigation/breadcrumb-trail";
import { X } from "lucide-react";

export function EnhancedNavbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);
  const location = useLocation();
  
  // Close dropdown when clicking outside, pressing Escape, or route changes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (activeDropdown && 
          !target.closest('.navigation-trigger') &&
          !target.closest('[role="menu"]')) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    // Close dropdown when route changes
    setActiveDropdown(null);

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeDropdown, location.pathname]);
  
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      {showAlert && (
        <Alert className="rounded-none border-t-0 border-l-0 border-r-0 border-b bg-primary text-primary-foreground">
          <div className="container flex items-center justify-between py-1">
            <AlertDescription>
              <span className="text-sm">
                <strong>Platform Status:</strong> This is a development version. You may encounter some incomplete features.
              </span>
            </AlertDescription>
            <button onClick={() => setShowAlert(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
              <X size={18} />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </Alert>
      )}
      
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
            aria-label="Home page"
          >
            <HawklyLogo asLink={false} />
          </Link>
          
          {/* Desktop Navigation */}
          <DesktopNavigation 
            activeDropdown={activeDropdown} 
            handleDropdownToggle={handleDropdownToggle} 
          />
        </div>
        
        {/* Desktop Auth Buttons */}
        <AuthButtons isAuthenticated={!!user} onSignOut={signOut} />
        
        {/* Mobile Menu */}
        <MobileNavigation 
          navigationLinks={navigationLinks} 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
          isAuthenticated={!!user}
          onSignOut={signOut}
        />
      </div>
      
      {/* Breadcrumb navigation for deep pages */}
      {location.pathname !== '/' && <BreadcrumbTrail />}
    </header>
  );
}
