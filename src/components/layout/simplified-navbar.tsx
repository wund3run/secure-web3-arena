
import React, { useState, useEffect } from "react";
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
import { Menu, X } from "lucide-react";
import { HawklyLogo } from "./hawkly-logo";
import { useAuth } from "@/contexts/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SimplifiedNavbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && 
          !(event.target as Element).closest('.navigation-trigger')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);
  
  // Navigation links structure for consistency between desktop and mobile views
  const navigationLinks = {
    marketplace: [
      { title: "Security Services", description: "Browse auditors and security services", href: "/marketplace" },
      { title: "Request Audit", description: "Submit your project for security assessment", href: "/request-audit" },
      { title: "Pricing", description: "Flexible plans for projects of all sizes", href: "/pricing" }
    ],
    audits: [
      { title: "Security Audits", description: "Browse completed security audits and reports from our verified providers", href: "/audits" },
      { title: "Audit Progress Tracking", badge: "New", description: "Monitor your audit progress in real-time", href: "/audits" },
      { title: "Request New Audit", description: "Start the process of getting your project audited", href: "/request-audit" },
      { title: "Audit Guidelines", description: "Best practices and standards for security audits", href: "/audit-guidelines" }
    ],
    resources: [
      { title: "Audit Guidelines", description: "Best practices for secure development", href: "/audit-guidelines" },
      { title: "Documentation", description: "Comprehensive guides and tutorials", href: "/resources" },
      { title: "Learning Center", description: "Educational resources on Web3 security", href: "/web3-security" },
      { title: "Achievements", description: "Track your badges and auditor journey", href: "/achievements" },
      { title: "Accessibility Tools", badge: "New", description: "Self-assessment and non-technical guides for Web3 security", href: "/resources" }
    ]
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded">
            <HawklyLogo />
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="mx-6 hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  onClick={() => handleDropdownToggle('marketplace')}
                  className={cn(
                    'navigation-trigger group',
                    activeDropdown === 'marketplace' ? 'bg-accent text-accent-foreground' : ''
                  )}
                  aria-expanded={activeDropdown === 'marketplace'}
                >
                  Marketplace
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 rounded-md shadow-md border bg-popover">
                    <div className="grid gap-3">
                      {navigationLinks.marketplace.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link 
                            to={item.href} 
                            className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary"
                          >
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  onClick={() => handleDropdownToggle('audits')}
                  className={cn(
                    'navigation-trigger group',
                    activeDropdown === 'audits' ? 'bg-accent text-accent-foreground' : ''
                  )}
                  aria-expanded={activeDropdown === 'audits'}
                >
                  Audits
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 rounded-md shadow-md border bg-popover">
                    <div className="grid gap-3">
                      {navigationLinks.audits.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link 
                            to={item.href} 
                            className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary"
                          >
                            <div className="font-medium flex items-center">
                              {item.title}
                              {item.badge && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  onClick={() => handleDropdownToggle('resources')}
                  className={cn(
                    'navigation-trigger group',
                    activeDropdown === 'resources' ? 'bg-accent text-accent-foreground' : ''
                  )}
                  aria-expanded={activeDropdown === 'resources'}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 rounded-md shadow-md border bg-popover">
                    <div className="grid gap-3">
                      {navigationLinks.resources.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link 
                            to={item.href} 
                            className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary"
                          >
                            <div className="font-medium flex items-center">
                              {item.title}
                              {item.badge && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </Link>
                        </NavigationMenuLink>
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
              <Button variant="ghost" size="icon" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                          className="block py-2 text-sm hover:text-primary transition-colors" 
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
                          className="block py-2 text-sm hover:text-primary transition-colors" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            {item.title}
                            {item.badge && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
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
                          className="block py-2 text-sm hover:text-primary transition-colors" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            {item.title}
                            {item.badge && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Link 
                      to="/pricing" 
                      className="block py-2 font-medium hover:text-primary transition-colors"
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
