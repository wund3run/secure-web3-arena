
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  const { reducedMotion, keyboardMode } = useAccessibility();
  
  const buttonStyles = {
    transition: reducedMotion ? 'none' : undefined,
    ...(keyboardMode ? { outline: 'none' } : {})
  };
  
  if (isAuthenticated) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Button asChild variant="outline" style={buttonStyles}>
          <Link to="/dashboard" aria-label="Access your dashboard">
            Dashboard
          </Link>
        </Button>
        <Button 
          variant="destructive" 
          onClick={onSignOut}
          style={buttonStyles}
          aria-label="Sign out from your account"
        >
          Sign Out
        </Button>
      </div>
    );
  }
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button asChild variant="outline" style={buttonStyles}>
        <Link to="/auth?mode=login" aria-label="Sign in to your account">
          Sign In
        </Link>
      </Button>
      <Button asChild style={buttonStyles}>
        <Link to="/auth?mode=signup" aria-label="Create a new account">
          Sign Up
        </Link>
      </Button>
    </div>
  );
}
