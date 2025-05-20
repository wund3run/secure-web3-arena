
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  return (
    <div className="hidden md:flex items-center gap-4">
      {isAuthenticated ? (
        <>
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="outline" size="sm">
            <Link to="/auth?mode=login">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/auth?mode=signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
