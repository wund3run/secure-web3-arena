
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";

export function SimplifiedNavbar() {
  const { user, signOut } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <HawklyLogo />
        
        <NavigationMenu className="mx-6 hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover p-4 w-[240px] rounded-md shadow-md">
                <div className="grid gap-3">
                  <Link to="/marketplace" className="block">
                    <div className="font-medium">Security Services</div>
                    <div className="text-sm text-muted-foreground">Browse auditors and security services</div>
                  </Link>
                  <Link to="/request-audit" className="block">
                    <div className="font-medium">Request Audit</div>
                    <div className="text-sm text-muted-foreground">Submit your project for security assessment</div>
                  </Link>
                  <Link to="/pricing" className="block">
                    <div className="font-medium">Pricing</div>
                    <div className="text-sm text-muted-foreground">Flexible plans for projects of all sizes</div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Audits</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover p-4 w-[240px] rounded-md shadow-md">
                <div className="grid gap-3">
                  <Link to="/audits" className="block">
                    <div className="font-medium">Security Audits</div>
                    <div className="text-sm text-muted-foreground">Browse completed security audits and reports from our verified providers</div>
                  </Link>
                  <Link to="/request-audit" className="block">
                    <div className="font-medium">Request New Audit</div>
                    <div className="text-sm text-muted-foreground">Start the process of getting your project audited</div>
                  </Link>
                  <Link to="/audit-guidelines" className="block">
                    <div className="font-medium">Audit Guidelines</div>
                    <div className="text-sm text-muted-foreground">Best practices and standards for security audits</div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover p-4 w-[240px] rounded-md shadow-md">
                <div className="grid gap-3">
                  <Link to="/audit-guidelines" className="block">
                    <div className="font-medium">Audit Guidelines</div>
                    <div className="text-sm text-muted-foreground">Best practices for secure development</div>
                  </Link>
                  <Link to="/resources" className="block">
                    <div className="font-medium">Documentation</div>
                    <div className="text-sm text-muted-foreground">Comprehensive guides and tutorials</div>
                  </Link>
                  <Link to="/web3-security" className="block">
                    <div className="font-medium">Learning Center</div>
                    <div className="text-sm text-muted-foreground">Educational resources on Web3 security</div>
                  </Link>
                  <Link to="/achievements" className="block">
                    <div className="font-medium">Achievements</div>
                    <div className="text-sm text-muted-foreground">Track your badges and auditor journey</div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/pricing">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                )}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/service-provider-onboarding">Join as Auditor</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
