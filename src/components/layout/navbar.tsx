
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { HawklyLogo } from "./hawkly-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, Shield } from "lucide-react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md z-50 h-16 border-b border-border/40">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <HawklyLogo />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex ml-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/marketplace" className={navigationMenuTriggerStyle()}>
                  Security Services
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <ListItem to="/stats" title="Security Stats">
                      Real-time analytics of the Web3 security landscape
                    </ListItem>
                    <ListItem to="/leaderboard" title="Auditor Leaderboard">
                      Top security professionals ranked by performance
                    </ListItem>
                    <ListItem to="/community" title="Community">
                      Connect with other security-conscious developers
                    </ListItem>
                    <ListItem to="/security-insights" title="Security Insights">
                      Latest reports and trends in blockchain security
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/request-audit">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Request Audit
                </Button>
              </Link>
              <Link to="/audits">
                <Button size="sm" className="hidden md:flex">
                  My Audits
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hidden md:block">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/service-provider-onboarding" className="hidden md:block">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90 flex items-center gap-1"
                >
                  <Shield className="h-4 w-4" />
                  Join the Circle
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border/40 shadow-md">
          <div className="container py-4 flex flex-col gap-2">
            <Link
              to="/marketplace"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Security Services
            </Link>
            <Link
              to="/stats"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Security Stats
            </Link>
            <Link
              to="/leaderboard"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Auditor Leaderboard
            </Link>
            <Link
              to="/community"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-border/40 my-2"></div>
            {user ? (
              <>
                <Link
                  to="/request-audit"
                  className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Request Audit
                </Link>
                <Link
                  to="/audits"
                  className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  My Audits
                </Link>
                <button
                  className="px-4 py-2 text-left text-foreground hover:bg-muted rounded-md"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/service-provider-onboarding"
                  className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Join the Circle
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

interface ListItemProps {
  title: string;
  to: string;
  children: React.ReactNode;
}

const ListItem = ({ title, children, to }: ListItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
};
