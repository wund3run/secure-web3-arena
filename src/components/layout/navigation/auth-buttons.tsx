
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  return (
    <div className="hidden md:flex items-center justify-end space-x-2">
      {!isAuthenticated ? (
        <>
          <Button variant="outline" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/service-provider-onboarding">Join as Auditor</Link>
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" onClick={onSignOut}>
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
}
