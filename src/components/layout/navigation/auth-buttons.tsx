
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  return (
    <div className="hidden md:flex items-center justify-end space-x-2" role="navigation" aria-label="Authentication">
      {!isAuthenticated ? (
        <>
          <Button variant="outline" asChild>
            <Link to="/auth" aria-label="Sign in to your account">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/service-provider-onboarding" aria-label="Join as an auditor">Join as Auditor</Link>
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link to="/dashboard" aria-label="Go to your dashboard">Dashboard</Link>
          </Button>
          <Button 
            variant="ghost" 
            onClick={onSignOut}
            aria-label="Sign out of your account"
          >
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
}
