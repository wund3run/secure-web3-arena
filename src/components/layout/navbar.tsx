
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Trophy, Search, User, Menu, X, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-card border-b border-border/40 z-50 sticky top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="h-9 w-9 text-primary" />
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rotate-45 rounded-sm opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse-glow"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Hawkly</span>
                <span className="text-xs text-muted-foreground leading-none">Security Marketplace</span>
              </div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/marketplace" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/marketplace") 
                    ? "border-primary text-primary" 
                    : "border-transparent text-foreground hover:text-primary hover:border-primary/30"
                )}
              >
                Marketplace
              </Link>
              <Link 
                to="/leaderboard" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/leaderboard") 
                    ? "border-primary text-primary" 
                    : "border-transparent text-foreground hover:text-primary hover:border-primary/30"
                )}
              >
                Leaderboard
              </Link>
              <Link 
                to="/audits" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/audits") 
                    ? "border-primary text-primary" 
                    : "border-transparent text-foreground hover:text-primary hover:border-primary/30"
                )}
              >
                Audits
              </Link>
              <Link 
                to="/community" 
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                  isActive("/community") 
                    ? "border-primary text-primary" 
                    : "border-transparent text-foreground hover:text-primary hover:border-primary/30"
                )}
              >
                Community
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-foreground">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="default" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1">
            <Link 
              to="/marketplace" 
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium border-l-4",
                isActive("/marketplace") 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-foreground hover:text-primary hover:border-primary/30 hover:bg-background"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/leaderboard" 
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium border-l-4",
                isActive("/leaderboard") 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-foreground hover:text-primary hover:border-primary/30 hover:bg-background"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link 
              to="/audits" 
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium border-l-4",
                isActive("/audits") 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-foreground hover:text-primary hover:border-primary/30 hover:bg-background"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Audits
            </Link>
            <Link 
              to="/community" 
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium border-l-4",
                isActive("/community") 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-foreground hover:text-primary hover:border-primary/30 hover:bg-background"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="flex flex-col space-y-2 pl-3 pr-4 py-2">
              <Button variant="outline" size="sm" className="text-foreground justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="default" size="sm" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
