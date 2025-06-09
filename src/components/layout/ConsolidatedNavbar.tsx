
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
import { Menu, Bell, Search, Home, ShoppingBag, Shield, FileText, Settings } from "lucide-react";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { Badge } from "@/components/ui/badge";

interface NavigationLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  showBadge?: boolean;
}

const navigationLinks: NavigationLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Security Audits", href: "/security-audits", icon: Shield },
  { label: "Request Audit", href: "/request-audit", icon: FileText, requiresAuth: true, showBadge: true },
  { label: "My Audits", href: "/audits", icon: Shield, requiresAuth: true },
];

export function ConsolidatedNavbar() {
  const { user, signOut, userProfile } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
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
  const userRole = userProfile?.user_type || 'general';

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full border-b transition-all duration-300
        ${isScrolled 
          ? 'bg-background/95 backdrop-blur-lg shadow-lg border-border/50' 
          : 'bg-background/80 backdrop-blur-sm border-border/30'
        }
      `}
      role="banner"
    >
      <div className="container-modern">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo with role indicator */}
          <Link 
            to={user ? "/dashboard" : "/"} 
            className="focus-modern flex items-center space-x-3 group"
            aria-label="Hawkly Home"
          >
            <img 
              src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
              alt="Hawkly Logo"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hawkly
              </span>
              {user && userRole !== 'general' && (
                <Badge variant="secondary" className="ml-2 text-xs capitalize">
                  {userRole}
                </Badge>
              )}
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation">
            {filteredLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
                    transition-all duration-200 group focus-modern
                    ${isActive
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{link.label}</span>
                  {link.showBadge && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      New
                    </Badge>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Enhanced Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search for authenticated users */}
            {user && (
              <Button variant="ghost" size="icon" className="focus-modern relative group">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
                <div className="absolute -inset-1 bg-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            )}

            {/* Enhanced Notifications */}
            {user && <NotificationBell />}

            {/* Theme toggle */}
            <ModeToggle />

            {/* Enhanced Auth section */}
            {!user && !isAuthPage ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild className="focus-modern">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 focus-modern">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0 focus-modern relative">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                      <AvatarImage 
                        src={userProfile?.avatar_url} 
                        alt={userProfile?.full_name || user.email || "User"} 
                      />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                        {(userProfile?.full_name || user.email || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 shadow-lg">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {userProfile?.full_name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      {userRole !== 'general' && (
                        <Badge variant="outline" className="w-fit text-xs capitalize">
                          {userRole}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {/* Enhanced Mobile menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="focus-modern">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-lg">
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="flex items-center justify-between pb-6 border-b">
                    <Link to="/" className="flex items-center space-x-2">
                      <img 
                        src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
                        alt="Hawkly Logo"
                        className="h-8 w-8 object-contain"
                      />
                      <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Hawkly
                      </span>
                    </Link>
                    {user && userRole !== 'general' && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {userRole}
                      </Badge>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6">
                    <div className="space-y-2">
                      {filteredLinks.map((link) => {
                        const IconComponent = link.icon;
                        const isActive = location.pathname === link.href;
                        
                        return (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium 
                              transition-colors
                              ${isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-foreground hover:text-primary hover:bg-accent/50'
                              }
                            `}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{link.label}</span>
                            {link.showBadge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                New
                              </Badge>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Mobile auth actions */}
                  {!user && !isAuthPage && (
                    <div className="border-t pt-6 space-y-3">
                      <Button variant="outline" asChild className="w-full h-12">
                        <Link to="/auth">Sign In</Link>
                      </Button>
                      <Button asChild className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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
