import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  FileText, 
  Users, 
  BarChart3,
  MessageSquare,
  Home,
  ChevronDown,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

interface NavigationLink {
  label: string;
  href: string;
  icon?: React.ElementType;
  description?: string;
  requiresAuth?: boolean;
  children?: NavigationLink[];
}

const navigationLinks: NavigationLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    description: 'Return to homepage'
  },
  {
    label: 'Services',
    href: '/services',
    icon: Shield,
    description: 'Security audit services',
    children: [
      {
        label: 'Security Audits',
        href: '/security-audits',
        description: 'Comprehensive smart contract security audits'
      },
      {
        label: 'Code Reviews',
        href: '/code-reviews',
        description: 'Professional code review services'
      },
      {
        label: 'Penetration Testing',
        href: '/penetration-testing',
        description: 'Advanced security testing'
      },
      {
        label: 'Consulting',
        href: '/consulting',
        description: 'Security consulting services'
      }
    ]
  },
  {
    label: 'Marketplace',
    href: '/marketplace',
    icon: Users,
    description: 'Find security auditors'
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: FileText,
    description: 'Educational resources',
    children: [
      {
        label: 'Security Guides',
        href: '/security-guides',
        description: 'Learn about Web3 security'
      },
      {
        label: 'Knowledge Base',
        href: '/knowledge-base',
        description: 'Comprehensive documentation'
      },
      {
        label: 'Tutorials',
        href: '/tutorials',
        description: 'Step-by-step tutorials'
      }
    ]
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Your workspace',
    requiresAuth: true
  },
  {
    label: 'Request Audit',
    href: '/request-audit',
    icon: Shield,
    description: 'Start a security audit',
    requiresAuth: true
  }
];

const authLinks: NavigationLink[] = [
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Manage your profile'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Account settings'
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
    description: 'Your messages'
  }
];

export function UnifiedNavigation() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredLinks = navigationLinks.filter(link => 
    !link.requiresAuth || user
  );

  const isActivePath = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to={user ? "/dashboard" : "/"} 
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
          aria-label="Hawkly Home"
        >
          <img 
            src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
            alt="Hawkly Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="hidden sm:block font-bold text-xl text-hawkly-gradient">
            Hawkly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {filteredLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                {link.children ? (
                  <>
                    <NavigationMenuTrigger 
                      className={cn(
                        "h-10 px-4 py-2 text-sm font-medium transition-colors",
                        isActivePath(link.href) 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        {link.icon && <link.icon className="h-4 w-4" />}
                        <span>{link.label}</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            >
                              {link.icon && <link.icon className="h-6 w-6" />}
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {link.label}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {link.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        <div className="grid gap-2">
                          {link.children.map((child) => (
                            <NavigationMenuLink key={child.href} asChild>
                              <Link
                                to={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {child.label}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link 
                      to={link.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActivePath(link.href) 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        {link.icon && <link.icon className="h-4 w-4" />}
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Search */}
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          {user && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>
          )}

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt="Avatar" />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {authLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center space-x-2">
                      {link.icon && <link.icon className="h-4 w-4" />}
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img 
                      src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
                      alt="Hawkly Logo"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="font-bold text-lg text-hawkly-gradient">
                      Hawkly
                    </span>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 py-6">
                  <div className="space-y-2">
                    {filteredLinks.map((link) => (
                      <div key={link.href}>
                        <Link
                          to={link.href}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActivePath(link.href)
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.icon && <link.icon className="h-4 w-4" />}
                          <span>{link.label}</span>
                        </Link>
                        
                        {/* Mobile Submenu */}
                        {link.children && (
                          <div className="ml-6 mt-2 space-y-1">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Mobile Auth Section */}
                <div className="border-t pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-3 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback>
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {user.user_metadata?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      {authLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.icon && <link.icon className="h-4 w-4" />}
                          <span>{link.label}</span>
                        </Link>
                      ))}
                      
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        asChild
                      >
                        <Link 
                          to="/auth" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button 
                        className="w-full" 
                        asChild
                      >
                        <Link 
                          to="/auth" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Link>
                      </Button>
                    </div>
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