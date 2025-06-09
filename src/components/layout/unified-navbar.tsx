
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Bell, Search } from "lucide-react";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { NotificationBell } from '@/components/notifications/NotificationBell';

interface NavigationLink {
  label: string;
  href: string;
  requiresAuth?: boolean;
  mobileOnly?: boolean;
}

const navigationLinks: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Security Audits", href: "/security-audits" },
  { label: "Request Audit", href: "/request-audit", requiresAuth: true },
  { label: "Dashboard", href: "/dashboard", requiresAuth: true },
  { label: "Active Audits", href: "/audits", requiresAuth: true },
];

export function UnifiedNavbar() {
  const { user, signOut, userProfile } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Filter navigation links based on auth status
  const filteredLinks = navigationLinks.filter(link => 
    !link.requiresAuth || (link.requiresAuth && user)
  );

  const isAuthPage = location.pathname === '/auth';

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full border-b transition-all duration-200
        ${isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm'
        }
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
              src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
              alt="Hawkly Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="hidden sm:block font-bold text-xl text-primary-600">
              Hawkly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  focus-modern
                  ${location.pathname === link.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search (for authenticated users) */}
            {user && (
              <Button variant="ghost" size="icon" className="focus-modern">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            {/* Notifications */}
            {user && <NotificationBell />}

            {/* Theme toggle */}
            <ModeToggle />

            {/* Auth section */}
            {!user && !isAuthPage ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild className="focus-modern">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="btn-modern btn-primary focus-modern">
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
                      <AvatarFallback className="bg-primary-100 text-primary-600">
                        {(userProfile?.full_name || user.email || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {userProfile?.full_name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="text-red-600 focus:text-red-600"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {/* Mobile menu trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="focus-modern">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link to="/" className="flex items-center space-x-2">
                      <img 
                        src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
                        alt="Hawkly Logo"
                        className="h-8 w-8 object-contain"
                      />
                      <span className="font-bold text-lg text-primary-600">Hawkly</span>
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6">
                    <div className="space-y-2">
                      {filteredLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            block px-3 py-2 rounded-md text-base font-medium transition-colors
                            ${location.pathname === link.href
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-neutral-900 hover:text-primary-600 hover:bg-neutral-50'
                            }
                          `}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile auth actions */}
                  {!user && !isAuthPage && (
                    <div className="border-t pt-4 space-y-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/auth">Sign In</Link>
                      </Button>
                      <Button asChild className="w-full btn-modern btn-primary">
                        <Link to="/auth">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
