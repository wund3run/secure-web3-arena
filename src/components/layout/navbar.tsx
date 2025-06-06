import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Hawkly</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/marketplace" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Marketplace
              </Link>
              <Link 
                to="/services" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                to="/journey-analysis" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Journey Analysis
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ""} alt={user.full_name || "Avatar"} />
                      <AvatarFallback>{user.full_name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.full_name || "User"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" onClick={toggleMobileMenu}>
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Explore Hawkly and manage your account.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link to="/" className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold">Hawkly</span>
                  </Link>
                  <Link to="/marketplace" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
                    Marketplace
                  </Link>
                  <Link to="/services" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
                    Services
                  </Link>
                  <Link to="/about" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                  <Link 
                    to="/journey-analysis" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Journey Analysis
                  </Link>
                  {user ? (
                    <>
                      <Link to="/dashboard" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
                        Dashboard
                      </Link>
                      <Link to="/profile" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">
                        Profile
                      </Link>
                      <Button variant="destructive" className="w-full" onClick={signOut}>Sign Out</Button>
                    </>
                  ) : (
                    <Link to="/auth">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
