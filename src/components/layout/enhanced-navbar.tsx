
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { MobileNavigation } from "@/components/ui/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";
import { NavigationMenuEnhanced } from "./navigation/navigation-menu-enhanced";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

export function EnhancedNavbar() {
  const { user, signOut } = useAuth();
  const [showAlert, setShowAlert] = useState(true);
  
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
        onFocus={(e) => e.target.classList.add('focus-visible')}
        onBlur={(e) => e.target.classList.remove('focus-visible')}
      >
        Skip to main content
      </a>
      
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
              <button 
                onClick={() => setShowAlert(false)} 
                className="text-primary-foreground/80 hover:text-primary-foreground"
                aria-label="Close platform status alert"
              >
                <X size={18} />
              </button>
            </div>
          </Alert>
        )}
        
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
              aria-label="Hawkly home page"
            >
              <HawklyLogo asLink={false} />
            </Link>
            
            <NavigationMenuEnhanced />
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex">
            <AuthButtons isAuthenticated={!!user} onSignOut={signOut} />
          </div>
          
          {/* Mobile Menu */}
          <MobileNavigation 
            isAuthenticated={!!user}
            onSignOut={signOut}
          />
        </div>
      </header>
    </>
  );
}
