
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { EnhancedNavigationDropdown } from "./navigation/enhanced-navigation-dropdown";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";
import { HeaderSearch } from "./navigation/header-search";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Shield } from "lucide-react";
import { navigationLinks } from "./navigation/navigation-links";

export function EnhancedProductionNavbar() {
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
      className="sticky top-0 z-50 w-full border-b border-brand-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 nav-brand"
      role="banner"
    >
      {showAlert && user && (
        <Alert className="rounded-none border-t-0 border-l-0 border-r-0 border-b bg-brand-gradient text-white animate-fade-in-up">
          <div className="container flex items-center justify-between py-2">
            <AlertDescription>
              <span className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <strong>Welcome back!</strong> Access all security services from your dashboard
              </span>
            </AlertDescription>
            <button 
              onClick={() => setShowAlert(false)} 
              className="text-white/80 hover:text-white transition-colors brand-hover-lift"
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
            to={user ? "/dashboard" : "/"} 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary rounded-md p-2 brand-hover-lift transition-all duration-300"
            aria-label="Hawkly Home"
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
                alt="Hawkly Logo"
                className="h-12 w-12 object-contain bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              />
              <div className="absolute inset-0 bg-brand-gradient opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full" />
            </div>
          </Link>
          
          {/* Enhanced Desktop Navigation */}
          <EnhancedNavigationDropdown 
            activeDropdown={activeDropdown} 
            handleDropdownToggle={handleDropdownToggle} 
          />
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Search functionality for authenticated users */}
          {user && <HeaderSearch />}
          
          {/* Desktop Auth Buttons */}
          <AuthButtons isAuthenticated={!!user} onSignOut={signOut} />
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <MobileNavigation 
          navigationLinks={navigationLinks} 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
          isAuthenticated={!!user}
          onSignOut={signOut}
        />
      </div>
    </header>
  );
}
