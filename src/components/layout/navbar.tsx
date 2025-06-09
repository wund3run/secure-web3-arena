
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <img 
              src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
              alt="Hawkly"
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan bg-clip-text text-transparent">
            Hawkly
          </span>
          <Badge variant="brand" className="text-xs px-2 py-0.5">
            <Shield className="h-3 w-3 mr-1" />
            Security
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/marketplace" 
            className="text-sm font-medium text-foreground/80 hover:text-brand-blue transition-colors duration-200 hover:underline decoration-brand-blue underline-offset-4"
          >
            Find Auditors
          </Link>
          <Link 
            to="/request-audit" 
            className="text-sm font-medium text-foreground/80 hover:text-brand-purple transition-colors duration-200 hover:underline decoration-brand-purple underline-offset-4"
          >
            Request Audit
          </Link>
          <Link 
            to="/resources" 
            className="text-sm font-medium text-foreground/80 hover:text-brand-cyan transition-colors duration-200 hover:underline decoration-brand-cyan underline-offset-4"
          >
            Resources
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-brand-blue hover:bg-brand-blue/10">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 hover:border-brand-blue/50"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-brand-blue hover:bg-brand-blue/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="brand" size="sm" className="hawk-shadow hover:hawk-shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <Zap className="h-4 w-4 mr-1" />
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            <Link 
              to="/marketplace" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-brand-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Auditors
            </Link>
            <Link 
              to="/request-audit" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-brand-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Audit
            </Link>
            <Link 
              to="/resources" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-brand-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <div className="border-t border-border/40 pt-4 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="brand" size="sm" className="w-full">
                      <Zap className="h-4 w-4 mr-1" />
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
