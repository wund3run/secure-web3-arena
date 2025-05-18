
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { navigationLinks } from "./navigation/navigation-links";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";

export function SimplifiedNavbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && 
          !(event.target as Element).closest('.navigation-trigger')) {
        setActiveDropdown(null);
      }
    };

    // Close dropdown when Escape key is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDropdown]);
  
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
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
    </header>
  );
}
