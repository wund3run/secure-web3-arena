
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { MobileResponsiveNavigation } from "./mobile-responsive-navigation";
import { RoleFilteredNavigation } from "@/components/layout/navigation/role-filtered-navigation";
import { RoleBasedAuthButtons } from "@/components/layout/navigation/role-based-auth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

export function ProductionNavbar() {
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  
  // Enhanced keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);
  
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
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Hawkly Home"
          >
            <HawklyLogo asLink={false} />
          </Link>
          
          {/* Role-filtered Desktop Navigation */}
          <RoleFilteredNavigation 
            activeDropdown={activeDropdown} 
            handleDropdownToggle={handleDropdownToggle} 
          />
        </div>
        
        {/* Role-based Auth Buttons */}
        <RoleBasedAuthButtons />
        
        {/* Mobile Navigation */}
        <MobileResponsiveNavigation />
      </div>
    </header>
  );
}
