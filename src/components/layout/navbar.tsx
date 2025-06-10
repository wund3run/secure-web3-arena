
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Shield, Zap, Star } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 nav-brand">
      <div className="container flex h-16 items-center justify-between">
        {/* Enhanced Logo */}
        <Link to="/" className="flex items-center space-x-3 group brand-hover-lift">
          <div className="relative">
            <img 
              src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
              alt="Hawkly"
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
          </div>
          <span className="text-xl font-bold gradient-text">
            Hawkly
          </span>
          <Badge variant="outline" className="text-xs px-2 py-0.5 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10">
            <Shield className="h-3 w-3 mr-1" />
            Security
          </Badge>
        </Link>

        {/* Desktop Navigation with enhanced styling */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/marketplace" 
            className="nav-item-brand text-sm font-medium transition-all duration-200"
          >
            Find Auditors
          </Link>
          <Link 
            to="/request-audit" 
            className="nav-item-brand text-sm font-medium transition-all duration-200"
          >
            Request Audit
          </Link>
          <Link 
            to="/resources" 
            className="nav-item-brand text-sm font-medium transition-all duration-200"
          >
            Resources
          </Link>
        </div>

        {/* Enhanced Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="nav-item-brand">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary/50 transition-all duration-300"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="nav-item-brand">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="brand" size="sm" className="shadow-brand-md hover:shadow-brand-lg hover:-translate-y-0.5 transition-all duration-300">
                  <Star className="h-4 w-4 mr-1" />
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Enhanced Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-brand-primary/10 transition-colors brand-hover-lift"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-brand-primary/20 bg-background/95 backdrop-blur animate-fade-in-up">
          <div className="container py-4 space-y-4">
            <Link 
              to="/marketplace" 
              className="block py-2 text-sm font-medium nav-item-brand transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Auditors
            </Link>
            <Link 
              to="/request-audit" 
              className="block py-2 text-sm font-medium nav-item-brand transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Audit
            </Link>
            <Link 
              to="/resources" 
              className="block py-2 text-sm font-medium nav-item-brand transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <div className="border-t border-brand-primary/20 pt-4 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start nav-item-brand">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                    className="w-full border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start nav-item-brand">
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
