
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { MobileNavigation } from "@/components/ui/mobile-navigation";
import { AuthButtons } from "./navigation/auth-buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { mainNavigation } from "@/components/ui/navigation/navigation-config";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function EnhancedNavbar() {
  const { user, signOut } = useAuth();
  const [showAlert, setShowAlert] = useState(true);
  const location = useLocation();
  
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      {showAlert && (
        <Alert className="rounded-none border-t-0 border-l-0 border-r-0 border-b bg-primary text-primary-foreground">
          <div className="container flex items-center justify-between py-1">
            <AlertDescription>
              <span className="text-sm">
                <strong>Platform Status:</strong> This is a development version. You may encounter some incomplete features.
              </span>
            </AlertDescription>
            <button onClick={() => setShowAlert(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
              <X size={18} />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </Alert>
      )}
      
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
            aria-label="Home page"
          >
            <HawklyLogo asLink={false} />
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {mainNavigation.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 gap-3 p-6">
                          {item.children.map((child) => (
                            <NavigationMenuLink key={child.href} asChild>
                              <Link
                                to={child.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                  child.featured && "bg-primary/5 border border-primary/20"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-medium leading-none">
                                    {child.title}
                                  </div>
                                  {child.badge && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        location.pathname === item.href && "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex">
          <AuthButtons isAuthenticated={!!user} onSignOut={signOut} />
        </div>
        
        {/* Mobile Menu */}
        <MobileNavigation 
          isAuthenticated={!!user}
          onSignOut={signOut}
        />
      </div>
    </header>
  );
}
