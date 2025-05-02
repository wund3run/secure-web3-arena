import React from "react";
import { useState } from "react";
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
import { Menu } from "lucide-react";

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M3 12a9 9 0 1 1 18 0a9 9 0 0 1-18 0Z" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
          <span className="font-bold">Hawkly</span>
        </Link>
        <div className="hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/marketplace"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/marketplace" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Marketplace
            </Link>
            <Link
              to="/audits"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/audits" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Audits
            </Link>
            <Link
              to="/leaderboard"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname.startsWith("/leaderboard") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Leaderboard
            </Link>
            <Link
              to="/community"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/community" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Community
            </Link>
            <Link
              to="/join"
              className={cn(
                "transition-colors hover:text-primary font-medium",
                pathname === "/join" ? "text-primary" : "text-primary/80"
              )}
            >
              Join as Provider
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex h-8 w-8 rounded-full md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
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
                <Link to="/join" className="px-4 py-2 rounded-md hover:bg-secondary">
                  Join as Provider
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden sm:block">
            <Link to="/join">
              <Button variant="default" size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Join Security Circle
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
