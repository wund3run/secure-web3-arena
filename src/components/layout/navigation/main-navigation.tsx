
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MainNavigationProps {
  isAuthenticated: boolean;
}

export function MainNavigation({ isAuthenticated }: MainNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Services", href: "/marketplace" },
    ...(isAuthenticated ? [{ label: "Dashboard", href: "/dashboard" }] : [])
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-gray-600 hover:text-primary transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="relative z-50"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
