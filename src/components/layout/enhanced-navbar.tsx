import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
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
import { ModeToggle } from "@/components/theme/ModeToggle";
import { useLocation } from 'react-router-dom';
import { NotificationBell } from '@/components/notifications/NotificationBell';

export function EnhancedNavbar() {
  const { user, signOut, userProfile } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/hawkly-logo.svg"
                alt="Hawkly Logo"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/marketplace">Marketplace</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/request-audit">Request Audit</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/audits">Active Audits</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user && <NotificationBell />}
            {!user && !isAuthPage && (
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {user && (
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
                  <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
