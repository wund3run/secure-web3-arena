import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { LogOut, User, Settings, LayoutDashboard, FileText, Shield } from "lucide-react";
import { toast } from "sonner";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  const { user, userProfile, getUserType } = useAuth();

  const handleSignOut = async () => {
    try {
      await onSignOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const getDashboardPath = () => {
    if (!isAuthenticated) return "/dashboard";
    
    try {
      const userType = getUserType();
      return userType === 'auditor' ? '/dashboard/auditor' : '/dashboard/project';
    } catch (error) {
      console.error('Error determining user type:', error);
      return '/dashboard';
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-3">
      {isAuthenticated && <NotificationBell />}
      
      {!isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/request-audit">
            <Button>Get Started</Button>
          </Link>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.avatar_url ?? undefined} alt={user?.email || "User Avatar"} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userProfile?.full_name || user?.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={getDashboardPath()} className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/audits" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                My Audits
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/security-settings" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
