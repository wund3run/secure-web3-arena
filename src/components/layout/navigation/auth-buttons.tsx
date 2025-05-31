
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
import { ModeToggle } from "@/components/theme/ModeToggle";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function AuthButtons({ isAuthenticated, onSignOut }: AuthButtonsProps) {
  const { user, userProfile } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-3">
      {isAuthenticated && <NotificationBell />}
      
      {!isAuthenticated ? (
        <>
          <Button variant="outline" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.avatar_url} alt={user?.email || "User Avatar"} />
                <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <ModeToggle />
    </div>
  );
}
