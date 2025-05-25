
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { MobileResponsiveNavigation } from "./mobile-responsive-navigation";
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

export function ProductionNavbar() {
  const { user, signOut } = useAuth();
  const [showAlert, setShowAlert] = useState(true);
  const location = useLocation();
  
  // Enhanced keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close any open dropdowns/menus
        const openMenus = document.querySelectorAll('[data-state="open"]');
        openMenus.forEach(menu => {
          const button = menu.querySelector('button');
          if (button) button.click();
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    
    try {
      // This would need to be implemented based on your auth context
      return "/dashboard";
    } catch (error) {
      console.error('Error determining user type:', error);
      return '/dashboard';
    }
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <Link 
              to="/marketplace" 
              className="text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none rounded px-2 py-1"
            >
              Marketplace
            </Link>
            <Link 
              to="/audits" 
              className="text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none rounded px-2 py-1"
            >
              Audits
            </Link>
            <Link 
              to="/community" 
              className="text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none rounded px-2 py-1"
            >
              Community
            </Link>
          </nav>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Authentication">
          {!user ? (
            <>
              <Button variant="outline" asChild className="relative group">
                <Link to="/auth" aria-label="Sign in to your account">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/service-provider-onboarding" aria-label="Join as an auditor">
                  <User className="mr-2 h-4 w-4" />
                  Join as Auditor
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to={getDashboardPath()} aria-label="Go to your dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                onClick={signOut}
                aria-label="Sign out of your account"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <MobileResponsiveNavigation />
      </div>
    </header>
  );
}
