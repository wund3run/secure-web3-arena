
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Shield, Star, BookOpen, Users, Zap, TrendingUp } from "lucide-react";
import { RoleBasedAuthButtons } from "@/components/layout/navigation/role-based-auth-buttons";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { NavbarSearch } from "./navbar/NavbarSearch";

const features = [
  {
    title: "AI-Powered Matching",
    href: "/features/ai-matching",
    description: "Smart auditor matching using advanced algorithms",
    icon: Zap,
    badge: "AI"
  },
  {
    title: "Escrow & Payments",
    href: "/features/escrow",
    description: "Secure milestone-based payments",
    icon: Shield,
    badge: "Secure"
  },
  {
    title: "Real-time Collaboration",
    href: "/features/collaboration",
    description: "Live communication and project tracking",
    icon: Users,
    badge: "Live"
  },
  {
    title: "Advanced Analytics",
    href: "/features/analytics",
    description: "Comprehensive insights and reporting",
    icon: TrendingUp,
    badge: "Pro"
  }
];

const navigationItems = [
  {
    title: "Marketplace",
    href: "/marketplace",
  },
  {
    title: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
];

const MobileNavItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className="flex items-center text-sm font-medium text-foreground hover:text-primary"
      {...props}
    >
      {children}
    </Link>
  );
});
MobileNavItem.displayName = "MobileNavItem";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-brand-gradient">Hawkly</span>
          </Link>

          {/* Search Bar - Desktop */}
          <NavbarSearch />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                      {features.map((feature) => (
                        <NavigationMenuLink key={feature.href} asChild>
                          <Link
                            to={feature.href}
                            className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <feature.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{feature.title}</div>
                              <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/marketplace"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Marketplace
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/resources"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Resources
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NotificationBell />
            <RoleBasedAuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <NotificationBell />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                {/* Mobile search */}
                <div className="mb-6">
                  <NavbarSearch />
                </div>
                
                <div className="flex flex-col space-y-6 text-right">
                  {navigationItems.map((item) => (
                    <MobileNavItem key={item.href} to={item.href}>
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </MobileNavItem>
                  ))}
                  <RoleBasedAuthButtons />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
