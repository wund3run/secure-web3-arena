
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { MobileNavigation } from '@/components/layout/navigation/MobileNavigation';
import { RealtimeNotificationSystem } from '@/components/notifications/RealtimeNotificationSystem';
import { RealtimeConnectionStatus } from '@/components/realtime/RealtimeConnectionStatus';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';

export function ConsolidatedNavbar() {
  const { user, signOut, userProfile } = useAuth();
  const { navigation } = useRoleBasedNavigation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthPage = location.pathname === '/auth';

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full border-b border-border transition-all duration-200 
        bg-background/95 backdrop-blur-md shadow-hawkly
      `}
      role="banner"
    >
      <div className="container-modern">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to={user ? "/dashboard" : "/"} 
            className="focus-modern flex items-center space-x-2"
            aria-label="Hawkly Home"
          >
            <img 
              src="/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
              alt="Hawkly Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="hidden sm:block font-bold text-xl text-hawkly-gradient">
              Hawkly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation">
            {navigation.slice(0, 4).map((section) => (
              <Link
                key={section.href}
                to={section.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  focus-modern
                  ${location.pathname === section.href
                    ? 'text-hawkly-primary bg-hawkly-primary/10'
                    : 'text-muted-foreground hover:text-hawkly-primary hover:bg-muted/50'
                  }
                `}
              >
                {section.title}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Connection Status */}
            {user && <RealtimeConnectionStatus />}

            {/* Search (for authenticated users) */}
            {user && (
              <Button variant="ghost" size="icon" className="focus-modern text-muted-foreground hover:text-hawkly-primary">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            {/* Notifications */}
            {user && <RealtimeNotificationSystem />}

            {/* Auth section */}
            {!user && !isAuthPage ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild className="focus-modern text-muted-foreground hover:text-hawkly-primary">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary focus-modern">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0 focus-modern">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={userProfile?.avatar_url} 
                        alt={userProfile?.full_name || user.email || "User"} 
                      />
                      <AvatarFallback className="bg-hawkly-primary/20 text-hawkly-primary">
                        {(userProfile?.full_name || user.email || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {userProfile?.full_name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-card-foreground">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="text-card-foreground">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="text-hawkly-error hover:text-hawkly-error/80"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {/* Mobile menu trigger */}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
