
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { navigationLinks } from "./navigation/navigation-links";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { toast } from "sonner";

export function SimplifiedNavbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);
  
  // Close dropdown when clicking outside or pressing Escape
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

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeDropdown]);
  
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSignOut = async () => {
    try {
      console.log("Initiating sign out...");
      await signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };
  
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      {showAlert && !user && (
        <Alert className="rounded-none border-t-0 border-l-0 border-r-0 border-b bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground">
          <div className="container flex items-center justify-between py-1">
            <AlertDescription>
              <span className="text-sm">
                <strong>Welcome to Hawkly!</strong> Sign up today to access expert Web3 security services
              </span>
            </AlertDescription>
            <button onClick={() => setShowAlert(false)} className="text-muted-foreground hover:text-foreground transition-colors">
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
            <img 
              src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
              alt="Hawkly Logo"
              className="h-12 w-12 object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>
          
          {/* Desktop Navigation - show basic navigation for all users */}
          <DesktopNavigation 
            activeDropdown={activeDropdown} 
            handleDropdownToggle={handleDropdownToggle} 
          />
        </div>
        
        {/* Desktop Auth Buttons */}
        <AuthButtons isAuthenticated={!!user} onSignOut={handleSignOut} />
        
        {/* Mobile Menu */}
        <MobileNavigation 
          navigationLinks={navigationLinks} 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
          isAuthenticated={!!user}
          onSignOut={handleSignOut}
        />
      </div>
    </header>
  );
}
