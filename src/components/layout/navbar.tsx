import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";
import { LanguageSwitcher } from "@/components/accessibility/LanguageSwitcher";
import { 
  Menu, 
  Search, 
  Shield, 
  FileText, 
  Users,
  Settings,
  User,
  LogOut,
  Bell,
  HelpCircle,
  ExternalLink,
  Info
} from "lucide-react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user is logged in (simulated)
  useEffect(() => {
    // In a real application, this would check auth context/cookies
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Define nav items
  const marketplaceItems = [
    {
      title: "Security Services",
      href: "/marketplace",
      description: "Browse auditors and security services",
    },
    {
      title: "Request Audit",
      href: "/request-audit",
      description: "Submit your project for security assessment",
    },
    {
      title: "Pricing",
      href: "/pricing",
      description: "Flexible plans for projects of all sizes",
    },
    {
      title: "Enhanced Dashboard",
      href: "/enhanced-dashboard",
      description: "Try our new user-friendly interface",
      isNew: true,
    },
  ];

  const resourceItems = [
    {
      title: "Audit Guidelines",
      href: "/guidelines",
      description: "Best practices for secure development",
    },
    {
      title: "Documentation",
      href: "/docs",
      description: "Comprehensive guides and tutorials",
    },
    {
      title: "Learning Center",
      href: "/learn",
      description: "Educational resources on Web3 security",
    },
    {
      title: "Achievements",
      href: "/achievements",
      description: "Track your badges and auditor journey",
      isNew: true,
    },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <HawklyLogo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {marketplaceItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={closeMobileMenu}
                            >
                              <div className="flex items-center">
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                                {item.isNew && (
                                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Audits</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/audits"
                          >
                            <Shield className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Security Audits
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Browse completed security audits and reports from our verified providers
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/enhanced-dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={closeMobileMenu}
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none">
                            <FileText className="h-4 w-4" /> 
                            Audit Progress Tracking
                            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                              New
                            </span>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Monitor your audit progress in real-time
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/request-audit"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={closeMobileMenu}
                        >
                          <div className="text-sm font-medium leading-none">Request New Audit</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Start the process of getting your project audited
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/guidelines"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={closeMobileMenu}
                        >
                          <div className="text-sm font-medium leading-none">Audit Guidelines</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Best practices and standards for security audits
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {resourceItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={closeMobileMenu}
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/enhanced-dashboard"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-accent/50"
                            onClick={closeMobileMenu}
                          >
                            <div className="flex items-center text-sm font-medium leading-none">
                              <Info className="mr-2 h-4 w-4" />
                              Accessibility Tools
                              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                                New
                              </span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Self-assessment and non-technical guides for Web3 security
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center">
              <LanguageSwitcher />
            </div>
            
            {/* Help button with tooltip */}
            <EnhancedTooltip 
              content="Access guided tours and learning resources"
              side="bottom"
            >
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </EnhancedTooltip>

            {/* Search button */}
            <EnhancedTooltip 
              content="Search for audits and providers"
              side="bottom"
            >
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
            </EnhancedTooltip>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <EnhancedTooltip 
                  content="View notifications"
                  side="bottom"
                >
                  <Button variant="ghost" size="icon" className="hidden md:flex relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
                  </Button>
                </EnhancedTooltip>
                
                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 border hidden md:flex">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/enhanced-dashboard">Enhanced Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem("auth_token");
                        window.location.href = "/login";
                      }}
                      className="text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:block">
                <Link to="/login">
                  <Button variant="ghost" className="mr-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Hawkly</SheetTitle>
                  <SheetDescription>Web3 Security Marketplace</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  {/* Mobile navigation links */}
                  <div className="space-y-2">
                    <Link
                      to="/marketplace"
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      Marketplace
                    </Link>
                    <Link
                      to="/audits"
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      Audits
                    </Link>
                    <Link
                      to="/guidelines"
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      Guidelines
                    </Link>
                    <Link
                      to="/pricing"
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      Pricing
                    </Link>
                    <Link
                      to="/enhanced-dashboard"
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      <div className="flex items-center">
                        Enhanced Dashboard
                        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                          New
                        </span>
                      </div>
                    </Link>
                  </div>
                  
                  {/* Language switcher in mobile */}
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Language</p>
                    <LanguageSwitcher variant="full" align="start" />
                  </div>

                  {/* Mobile auth buttons */}
                  {!isLoggedIn ? (
                    <div className="pt-4 space-y-2">
                      <Link to="/login" onClick={closeMobileMenu}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={closeMobileMenu}>
                        <Button className="w-full bg-primary">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-4">
                      <Link to="/dashboard" onClick={closeMobileMenu}>
                        <Button className="w-full">Go to Dashboard</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
