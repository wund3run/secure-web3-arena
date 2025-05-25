
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, User, LogOut } from "lucide-react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <div className="hidden md:flex items-center justify-end space-x-2" role="navigation" aria-label="Authentication">
      {!isAuthenticated ? (
        <>
          <Button variant="outline" asChild className="relative group">
            <Link to="/auth" aria-label="Sign in to your account">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </Button>
          <Button asChild className="relative overflow-hidden">
            <Link to="/service-provider-onboarding" aria-label="Join as an auditor">
              <User className="mr-2 h-4 w-4" />
              Join as Auditor
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" asChild className="relative group">
            <Link to="/dashboard" aria-label="Go to your dashboard">
              <User className="mr-2 h-4 w-4" />
              Dashboard
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            aria-label="Sign out of your account"
            className="relative group"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="relative">
              Sign Out
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </span>
          </Button>
        </>
      )}
    </div>
  );
}
