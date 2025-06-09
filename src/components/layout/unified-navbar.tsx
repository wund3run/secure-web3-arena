
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  Shield,
  Search,
  Home,
  Users
} from "lucide-react";
import { toast } from "sonner";

const navigationItems = [
  { title: "Home", href: "/", icon: Home, public: true },
  { title: "Marketplace", href: "/marketplace", icon: Search, public: true },
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, auth: true },
  { title: "Audits", href: "/audits", icon: FileText, auth: true },
  { title: "Request Audit", href: "/request-audit", icon: Shield, auth: true },
  { title: "Community", href: "/community", icon: Users, public: true },
];

export function UnifiedNavbar() {
  const { user, signOut, userProfile, getUserType } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthenticated = !!user;
  const userType = getUserType?.() || 'general';
  const displayName = userProfile?.display_name || userProfile?.full_name || user?.email?.split('@')[0] || 'User';

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const getDashboardPath = () => {
    return userType === 'auditor' ? '/dashboard/auditor' : '/dashboard/project';
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const getVisibleNavItems = () => {
    return navigationItems.filter(item => 
      item.public || (item.auth && isAuthenticated)
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="modern-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link 
              to={isAuthenticated ? getDashboardPath() : "/"} 
              className="focus-visible flex-shrink-0"
              aria-label="Hawkly Home"
            >
              <img 
                src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
                alt="Hawkly Logo"
                className="h-12 w-12 object-contain bg-transparent"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {getVisibleNavItems().map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute(item.href) 
                      ? 'nav-link-active bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2 inline" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* User Context Badge */}
            {isAuthenticated && (
              <Badge variant="outline" className="hidden sm:flex bg-primary/5 text-primary border-primary/20">
                {userType === 'auditor' ? 'Security Expert' : 
                 userType === 'admin' ? 'Administrator' : 'Project Owner'}
              </Badge>
            )}

            {/* Notifications */}
            {isAuthenticated && <NotificationBell />}

            {/* Auth Actions */}
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="modern-button modern-button-primary">
                  <Link to="/request-audit">Get Started</Link>
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0 focus-visible">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.avatar_url} alt={displayName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {displayName[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {userType === 'auditor' ? 'Security Expert' : 
                         userType === 'admin' ? 'Administrator' : 'Project Owner'}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardPath()} className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <ModeToggle />

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <MobileNavigationContent 
                  navigationItems={getVisibleNavItems()}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  userProfile={userProfile}
                  userType={userType}
                  displayName={displayName}
                  onSignOut={handleSignOut}
                  isActiveRoute={isActiveRoute}
                  getDashboardPath={getDashboardPath}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// Mobile Navigation Content Component
function MobileNavigationContent({ 
  navigationItems, 
  isAuthenticated, 
  user, 
  userProfile, 
  userType, 
  displayName, 
  onSignOut, 
  isActiveRoute,
  getDashboardPath 
}: any) {
  return (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
            alt="Hawkly Logo"
            className="h-8 w-8 object-contain"
          />
          <div>
            <h2 className="text-lg font-semibold">Hawkly</h2>
            {isAuthenticated && (
              <Badge variant="outline" className="text-xs">
                {userType === 'auditor' ? 'Security Expert' : 
                 userType === 'admin' ? 'Administrator' : 'Project Owner'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* User Info (if authenticated) */}
      {isAuthenticated && (
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userProfile?.avatar_url} alt={displayName} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {displayName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navigationItems.map((item: any) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                isActiveRoute(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Footer Actions */}
      <div className="p-4 border-t space-y-2">
        {!isAuthenticated ? (
          <>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button className="w-full modern-button modern-button-primary" asChild>
              <Link to="/request-audit">Get Started</Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
              onClick={onSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
