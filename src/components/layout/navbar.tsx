
import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Trophy, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border/40 z-50 sticky top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
              <span className="font-bold text-xl">SecureBlock</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/marketplace" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
                Marketplace
              </Link>
              <Link to="/leaderboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
                Leaderboard
              </Link>
              <Link to="/audits" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
                Audits
              </Link>
              <Link to="/community" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1">
            <Link to="/marketplace" className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-background">
              Marketplace
            </Link>
            <Link to="/leaderboard" className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-background">
              Leaderboard
            </Link>
            <Link to="/audits" className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-background">
              Audits
            </Link>
            <Link to="/community" className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-background">
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
