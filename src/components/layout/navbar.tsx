
import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Shield, FileText } from "lucide-react";
import { HawklyLogo } from "./hawkly-logo";

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      scrolled ? "bg-background/95 shadow-sm" : "bg-transparent border-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <HawklyLogo />

        {/* Desktop navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/marketplace" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/marketplace" ? "text-primary" : "text-foreground/60"
                )}>
                  Marketplace
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/audits" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/audits" ? "text-primary" : "text-foreground/60"
                )}>
                  Audits
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/leaderboard" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname.startsWith("/leaderboard") ? "text-primary" : "text-foreground/60"
                )}>
                  Leaderboard
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/community" className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/community" ? "text-primary" : "text-foreground/60"
                )}>
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {/* Account dropdown - desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hidden h-8 w-8 rounded-full md:flex">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex h-8 w-8 rounded-full md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <HawklyLogo variant="compact" className="mb-2" />
                </SheetTitle>
                <SheetDescription>
                  Explore the Hawkly platform.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
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
                <Link to="/join" className="px-4 py-2 rounded-md hover:bg-secondary flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Join the Circle
                </Link>
                <Link to="/request-audit" className="px-4 py-2 rounded-md hover:bg-secondary flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Request for Audit
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Action buttons - desktop */}
          <div className="hidden sm:flex items-center space-x-2">
            <Link to="/request-audit">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                <FileText className="h-4 w-4 mr-2" />
                Request for Audit
              </Button>
            </Link>
            <Link to="/join">
              <Button variant="default" size="sm" className="bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90">
                <Shield className="h-4 w-4 mr-2" />
                Join the Circle
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
