
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { User, Menu, X } from "lucide-react";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  currentPath: string;
};

const NavLink = ({ to, children, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to || 
                  (to !== '/' && currentPath.startsWith(to));
                  
  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/10 transition-colors ${
        isActive ? "text-primary font-semibold" : "text-foreground/80"
      }`}
    >
      {children}
    </Link>
  );
};

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = location.pathname;

  const mainNavLinks = [
    { path: "/", label: "Home" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/audits", label: "Audits" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/security-insights", label: "Security Insights" },
    { path: "/community", label: "Community" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <HawklyLogo size="sm" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {mainNavLinks.map((link) => (
              <NavLink key={link.path} to={link.path} currentPath={currentPath}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Login / Request Audit Buttons */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              <Button variant="outline" asChild>
                <Link to="/auth">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/request-audit">Request Audit</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-muted transition-colors ${
                  currentPath === link.path ? "text-primary font-semibold" : "text-foreground/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/request-audit">Request Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
