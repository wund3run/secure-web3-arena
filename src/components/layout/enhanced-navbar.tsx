
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
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-brand-primary/20 sticky top-0 z-50 nav-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 brand-hover-lift p-2 rounded-lg transition-all duration-300">
              <img
                className="h-12 w-12 object-contain bg-transparent"
                src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png"
                alt="Hawkly Logo"
                style={{ backgroundColor: 'transparent' }}
              />
            </Link>
          </div>

          {/* Enhanced navigation items with brand styling */}
          {user && (
            <div className="flex items-center space-x-1">
              <Button variant="ghost" asChild className="nav-item-brand">
                <Link to="/marketplace">Marketplace</Link>
              </Button>
              <Button variant="ghost" asChild className="nav-item-brand">
                <Link to="/request-audit">Request Audit</Link>
              </Button>
              <Button variant="ghost" asChild className="nav-item-brand">
                <Link to="/audits">Active Audits</Link>
              </Button>
              <Button variant="ghost" asChild className="nav-item-brand">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          )}

          <div className="flex items-center space-x-3">
            {user && <NotificationBell />}
            {!user && !isAuthPage && (
              <Button variant="brand" asChild className="shadow-brand-md">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 brand-hover-lift">
                    <Avatar className="h-8 w-8 ring-2 ring-brand-primary/20">
                      <AvatarImage src={userProfile?.avatar_url} alt={user?.email || "User Avatar"} />
                      <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-semibold">
                        {user?.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="card-enhanced">
                  <DropdownMenuLabel className="gradient-text">My Account</DropdownMenuLabel>
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
