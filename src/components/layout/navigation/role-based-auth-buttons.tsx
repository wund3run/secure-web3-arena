
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut, Shield, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { getUserDashboard, canPerformAction } from "@/utils/auth/roleBasedRouting";
import { ActionGuard } from "@/components/auth/ActionGuard";

export function RoleBasedAuthButtons() {
  const { user, signOut, userProfile, getUserType, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <div className="animate-pulse bg-gray-200 h-9 w-20 rounded"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link to="/auth">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Link>
        </Button>
        <Button asChild>
          <Link to="/auth">
            <User className="mr-2 h-4 w-4" />
            Join Platform
          </Link>
        </Button>
      </div>
    );
  }

  const userDashboard = getUserDashboard(user, userProfile);
  const userType = getUserType();
  const displayName = userProfile?.display_name || userProfile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="hidden md:flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">
        Welcome, {displayName}
      </span>
      
      <Button variant="outline" asChild>
        <Link to={userDashboard}>
          <User className="mr-2 h-4 w-4" />
          {userType === 'auditor' ? 'Auditor Dashboard' : 
           userType === 'admin' ? 'Admin Panel' : 'Dashboard'}
        </Link>
      </Button>
      
      {/* Admin-specific quick access */}
      {userType === 'admin' && (
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin">
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      )}

      <Button 
        variant="ghost" 
        onClick={signOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
