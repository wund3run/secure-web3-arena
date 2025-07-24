import React, { useState } from 'react';
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
import { useLocation } from 'react-router-dom';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { Menu, X } from 'lucide-react';

export function EnhancedNavbar() {
  const { user, signOut, userProfile } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthPage = location.pathname === '/auth';

  // Navigation links
  const navLinks = [
    { to: "/marketplace", label: "Marketplace" },
    { to: "/request-audit", label: "Request Audit" },
    { to: "/audits", label: "Active Audits" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav
      className="bg-sidebar/90 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60 border-b border-border/40 sticky top-0 z-50 glass"
      style={{ height: '4.5rem' }}
      aria-label="Main navigation"
    >
      <div className="container-modern flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
          <img
            className="h-12 w-12 object-contain bg-transparent rounded-full shadow-glow"
            src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png"
            alt="Hawkly Logo"
            style={{ backgroundColor: 'transparent' }}
          />
          <span className="text-h2 font-black text-accent-primary tracking-tight hidden sm:block">Hawkly</span>
        </Link>

        {/* Desktop Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link uppercase font-bold px-4 py-2 rounded-medium transition-hover text-base ${
                  location.pathname.startsWith(to)
                    ? 'text-accent-primary bg-[rgba(168,121,239,0.07)] shadow-glow' // active
                    : 'text-secondary hover:text-accent-primary hover:bg-[rgba(168,121,239,0.07)]'
                }`}
                aria-current={location.pathname.startsWith(to) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Hamburger */}
        {user && (
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-medium text-accent-primary hover:bg-[rgba(168,121,239,0.07)] transition-hover focus-ring"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
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
                    <AvatarImage src={userProfile?.avatar_url ?? undefined} alt={user?.email || "User Avatar"} />
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
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {user && mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-sidebar/95 backdrop-blur border-b border-border/40 shadow-glow animate-fade-in-up z-40">
          <div className="flex flex-col gap-1 py-3 px-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link uppercase font-bold px-4 py-3 rounded-medium text-base transition-hover ${
                  location.pathname.startsWith(to)
                    ? 'text-accent-primary bg-[rgba(168,121,239,0.07)] shadow-glow' // active
                    : 'text-secondary hover:text-accent-primary hover:bg-[rgba(168,121,239,0.07)]'
                }`}
                aria-current={location.pathname.startsWith(to) ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
