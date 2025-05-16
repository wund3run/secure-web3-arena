
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
import { ChevronDown, Menu } from "lucide-react";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SimplifiedNavbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation links structure for consistency between desktop and mobile views
  const navigationLinks = {
    marketplace: [
      { title: "Security Services", description: "Browse auditors and security services", href: "/marketplace" },
      { title: "Request Audit", description: "Submit your project for security assessment", href: "/request-audit" },
      { title: "Pricing", description: "Flexible plans for projects of all sizes", href: "/pricing" }
    ],
    audits: [
      { title: "Security Audits", description: "Browse completed security audits and reports from our verified providers", href: "/audits" },
      { title: "Request New Audit", description: "Start the process of getting your project audited", href: "/request-audit" },
      { title: "Audit Guidelines", description: "Best practices and standards for security audits", href: "/audit-guidelines" }
    ],
    resources: [
      { title: "Audit Guidelines", description: "Best practices for secure development", href: "/audit-guidelines" },
      { title: "Documentation", description: "Comprehensive guides and tutorials", href: "/resources" },
      { title: "Learning Center", description: "Educational resources on Web3 security", href: "/web3-security" },
      { title: "Achievements", description: "Track your badges and auditor journey", href: "/achievements" }
    ]
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <HawklyLogo />
          
          {/* Desktop Navigation */}
          <NavigationMenu className="mx-6 hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="bg-popover p-4 w-[240px] rounded-md shadow-md">
                    <div className="grid gap-3">
                      {navigationLinks.marketplace.map((item) => (
                        <Link key={item.href} to={item.href} className="block">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Audits</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="bg-popover p-4 w-[240px] rounded-md shadow-md">
                    <div className="grid gap-3">
                      {navigationLinks.audits.map((item) => (
                        <Link key={item.href} to={item.href} className="block">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="bg-popover p-4 w-[240px] rounded-md shadow-md">
                    <div className="grid gap-3">
                      {navigationLinks.resources.map((item) => (
                        <Link key={item.href} to={item.href} className="block">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </Link>
                      ))}
                    </div>
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
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center justify-end space-x-2">
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
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 py-6">
                {/* Mobile Menu Content */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-medium mb-2">Marketplace</h3>
                    <div className="space-y-2">
                      {navigationLinks.marketplace.map((item) => (
                        <Link 
                          key={item.href} 
                          to={item.href} 
                          className="block py-2 text-sm" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <h3 className="font-medium mb-2">Audits</h3>
                    <div className="space-y-2">
                      {navigationLinks.audits.map((item) => (
                        <Link 
                          key={item.href} 
                          to={item.href} 
                          className="block py-2 text-sm" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <h3 className="font-medium mb-2">Resources</h3>
                    <div className="space-y-2">
                      {navigationLinks.resources.map((item) => (
                        <Link 
                          key={item.href} 
                          to={item.href} 
                          className="block py-2 text-sm" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Link 
                      to="/pricing" 
                      className="block py-2 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </div>
                </div>
                
                {/* Mobile Auth Buttons */}
                <div className="space-y-2 pt-4 border-t">
                  {!user ? (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link to="/service-provider-onboarding" onClick={() => setIsMobileMenuOpen(false)}>Join as Auditor</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
