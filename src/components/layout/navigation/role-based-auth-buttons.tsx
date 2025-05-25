
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut, Shield, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { getUserDashboard, canPerformAction } from "@/utils/auth/roleBasedRouting";
import { ActionGuard } from "@/components/auth/ActionGuard";

export function RoleBasedAuthButtons() {
  const { user, signOut, userProfile, getUserType } = useAuth();

  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link to="/auth">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Link>
        </Button>
        <ActionGuard 
          action="submit_audit_service"
          fallback={
            <Button variant="outline" asChild>
              <Link to="/auth">
                <User className="mr-2 h-4 w-4" />
                Join Platform
              </Link>
            </Button>
          }
        >
          <Button asChild>
            <Link to="/service-provider-onboarding">
              <User className="mr-2 h-4 w-4" />
              Join as Auditor
            </Link>
          </Button>
        </ActionGuard>
      </div>
    );
  }

  const userDashboard = getUserDashboard(user, userProfile);
  const userType = getUserType();

  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button variant="outline" asChild>
        <Link to={userDashboard}>
          <User className="mr-2 h-4 w-4" />
          {userType === 'auditor' ? 'Auditor Dashboard' : 
           userType === 'admin' ? 'Admin Panel' : 'Dashboard'}
        </Link>
      </Button>
      
      {/* Admin-specific quick access */}
      <ActionGuard action="access_admin_panel">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin">
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      </ActionGuard>

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
