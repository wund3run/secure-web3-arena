
import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Shield, FileText } from "lucide-react";
import { HawklyLogo } from "./hawkly-logo";

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  // Set isAuthenticated to false by default to ensure the platform shows a logged-out state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Track scroll position to add background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check authentication status - in reality, you'd use your auth context here
  useEffect(() => {
    // For demo purposes, we're explicitly showing logged-out state
    setIsAuthenticated(false);
  }, []);

  // Determine if on home page to avoid duplicate CTAs
  const isHomePage = pathname === "/";

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/70 transition-all duration-200",
      scrolled ? "bg-background/95 shadow-sm" : "bg-transparent border-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo with tagline on larger screens */}
        <div className="flex items-center">
          <HawklyLogo variant="default" />
          <span className="hidden md:block text-gray-500 ml-2 pl-2 border-l text-sm">
            Web3 Security Marketplace
          </span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/marketplace" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/marketplace" ? "text-[#8A73E2] font-medium" : "text-foreground/70 hover:text-foreground/90"
                )}>
                  Marketplace
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/audits" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/audits" ? "text-[#8A73E2] font-medium" : "text-foreground/70 hover:text-foreground/90"
                )}>
                  Audits
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/leaderboard" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname.startsWith("/leaderboard") ? "text-[#8A73E2] font-medium" : "text-foreground/70 hover:text-foreground/90"
                )}>
                  Leaderboard
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/community" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/community" ? "text-[#8A73E2] font-medium" : "text-foreground/70 hover:text-foreground/90"
                )}>
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {/* Only show account dropdown if authenticated */}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative hidden h-8 w-8 rounded-full md:flex">
                  <div className="h-8 w-8 rounded-full bg-[#8A73E2]/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-[#8A73E2]">SC</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex h-10 w-10 rounded-md md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <HawklyLogo variant="default" className="mb-2" />
                </SheetTitle>
                <SheetDescription>
                  Explore the Hawkly platform.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <Link to="/marketplace" className="px-4 py-2 rounded-md hover:bg-secondary">
                  Marketplace
                </Link>
                <Link to="/audits" className="px-4 py-2 rounded-md hover:bg-secondary">
                  Audits
                </Link>
                <Link to="/leaderboard" className="px-4 py-2 rounded-md hover:bg-secondary">
                  Leaderboard
                </Link>
                <Link to="/community" className="px-4 py-2 rounded-md hover:bg-secondary">
                  Community
                </Link>
                <div className="border-t pt-4 mt-2">
                  <Link to="/join" className="px-4 py-2 rounded-md hover:bg-secondary flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-[#8A73E2]" />
                    Join the Circle
                  </Link>
                  <Link to="/request-audit" className="px-4 py-2 rounded-md hover:bg-secondary flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#8A73E2]" />
                    Request for Audit
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Action buttons - desktop */}
          {!isHomePage && !isAuthenticated && (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/request-audit">
                <Button variant="outline" size="sm" className="border-[#8A73E2] text-[#8A73E2] hover:bg-[#8A73E2]/10">
                  <FileText className="h-4 w-4 mr-2" />
                  Request for Audit
                </Button>
              </Link>
              <Link to="/join">
                <Button variant="default" size="sm" className="bg-gradient-to-r from-[#8A73E2] to-[#33C3F0] hover:opacity-90">
                  <Shield className="h-4 w-4 mr-2" />
                  Join the Circle
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
