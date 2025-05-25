
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { EnhancedNavigationDropdown } from "./navigation/enhanced-navigation-dropdown";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BreadcrumbTrail } from "./navigation/breadcrumb-trail";
import { X } from "lucide-react";
import { navigationLinks } from "./navigation/navigation-links";

export function ProductionNavbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);
  const location = useLocation();
  
  // Close dropdown when route changes or clicking outside
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Enhanced keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
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
                <strong>Platform Status:</strong> Welcome to Hawkly - Your Web3 Security Marketplace
              </span>
            </AlertDescription>
            <button 
              onClick={() => setShowAlert(false)} 
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Close announcement"
            >
              <X size={18} />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </Alert>
      )}
      
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Hawkly Home"
          >
            <HawklyLogo asLink={false} />
          </Link>
          
          {/* Enhanced Desktop Navigation */}
          <EnhancedNavigationDropdown 
            activeDropdown={activeDropdown} 
            handleDropdownToggle={handleDropdownToggle} 
          />
        </div>
        
        {/* Desktop Auth Buttons */}
        <AuthButtons isAuthenticated={!!user} onSignOut={signOut} />
        
        {/* Enhanced Mobile Navigation */}
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
