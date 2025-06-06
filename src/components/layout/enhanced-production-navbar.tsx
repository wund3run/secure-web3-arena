
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, User, Settings, LogOut, Shield, Activity } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { navigationLinks, dashboardLinks, adminLinks, getFilteredLinks } from "./navigation/navigation-links";

export function EnhancedProductionNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, getUserType, loading } = useAuth();

  const userType = getUserType();
  
  // Filter navigation links based on user permissions
  const filteredNavLinks = getFilteredLinks(navigationLinks, user, userType);
  const filteredDashboardLinks = getFilteredLinks(dashboardLinks, user, userType);
  const filteredAdminLinks = getFilteredLinks(adminLinks, user, userType);

  const isActiveRoute = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    return href !== "/" && location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
            alt="Hawkly"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">Hawkly</span>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Main Navigation */}
          <div className="flex items-center space-x-4">
            {filteredNavLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveRoute(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* More Navigation Dropdown */}
            {filteredNavLinks.length > 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuLabel>Additional Pages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filteredNavLinks.slice(4).map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link to={link.href} className="w-full">
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* User Menu */}
          {loading ? (
            <div className="w-24 h-9 bg-muted animate-pulse rounded" />
          ) : user ? (
            <div className="flex items-center space-x-2">
              {/* Dashboard Quick Access */}
              {filteredDashboardLinks.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Activity className="mr-2 h-4 w-4" />
                      Dashboard
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {filteredDashboardLinks.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link to={link.href} className="w-full">
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Admin Quick Access */}
              {filteredAdminLinks.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Administration</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {filteredAdminLinks.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link to={link.href} className="w-full">
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* User Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {user.email}
                    <div className="text-xs text-muted-foreground capitalize">
                      {userType.replace('_', ' ')}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              {/* User Info for Mobile */}
              {user && (
                <div className="pb-4 border-b">
                  <div className="font-medium">{user.email}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {userType.replace('_', ' ')}
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                {filteredNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded-md transition-colors ${
                      isActiveRoute(link.href)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Dashboard Links for Mobile */}
              {filteredDashboardLinks.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="font-medium text-sm text-muted-foreground">Dashboard</div>
                  {filteredDashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 rounded-md hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Admin Links for Mobile */}
              {filteredAdminLinks.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="font-medium text-sm text-muted-foreground">Administration</div>
                  {filteredAdminLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 rounded-md hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Auth Actions for Mobile */}
              {user ? (
                <div className="space-y-2 pt-4 border-t">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  >
                    Settings
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
