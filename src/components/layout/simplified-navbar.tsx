
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, User, Settings, LogOut, Shield, Home } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useNotifications } from "@/contexts/NotificationContext";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { ActionGuard } from "@/components/auth/ActionGuard";

export function SimplifiedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut, getUserType } = useAuth();
  const navigate = useNavigate();
  const userType = getUserType();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getNavItems = () => {
    const baseItems = [
      { title: "Home", href: "/", icon: Home },
    ];

    if (user) {
      const authenticatedItems = [
        { title: "Marketplace", href: "/marketplace" },
        { title: "Audits", href: "/audits" },
        { title: "Dashboard", href: "/dashboard" },
      ];

      // Add role-specific items
      if (userType === 'admin') {
        authenticatedItems.push({ title: "Admin", href: "/admin" });
      }

      return [...baseItems, ...authenticatedItems];
    }

    return [
      ...baseItems,
      { title: "Marketplace", href: "/marketplace" },
      { title: "About", href: "/#about" },
      { title: "Pricing", href: "/#pricing" },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Hawkly</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">Hawkly</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">Hawkly</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <NotificationBell />
                
                <ActionGuard action="create_audit_request">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/audit-request">Request Audit</Link>
                  </Button>
                </ActionGuard>

                <ActionGuard action="submit_audit_service">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/auditor-parameters">Auditor Panel</Link>
                  </Button>
                </ActionGuard>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={userProfile?.avatar_url || ''} 
                          alt={userProfile?.display_name || userProfile?.full_name || 'User'} 
                        />
                        <AvatarFallback>
                          {(userProfile?.display_name || userProfile?.full_name || 'U')[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">
                          {userProfile?.display_name || userProfile?.full_name || 'User'}
                        </p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        {userType && (
                          <Badge variant="secondary" className="w-fit text-xs">
                            {userType === 'project_owner' ? 'Project Owner' : 
                             userType === 'auditor' ? 'Auditor' : 
                             userType === 'admin' ? 'Admin' : 'General'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <ActionGuard action="access_admin_panel">
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </ActionGuard>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
