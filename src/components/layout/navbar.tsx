
import { useAuth } from "@/contexts/auth";
import { HawklyLogo } from "./hawkly-logo";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { BetaBanner } from "@/components/ui/beta-banner";

export function Navbar() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Security Insights", href: "/security-insights" },
    { name: "Community", href: "/community" },
    { name: "Stats", href: "/stats" },
  ];

  const isMainPage = pathname === "/";
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <BetaBanner />
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b backdrop-blur-sm",
          isMainPage ? "bg-background/70" : "bg-background/95"
        )}
      >
        <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 mr-2 text-base hover:bg-transparent hover:text-primary focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="px-2">
                  <Link
                    to="/"
                    className="flex items-center"
                    onClick={() => setOpen(false)}
                  >
                    <HawklyLogo className="h-8 w-auto" />
                  </Link>
                  <div className="mt-8 flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex rounded-md p-2 text-sm font-medium hover:bg-accent",
                          isActive(item.href) && "bg-accent"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {user && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex rounded-md p-2 text-sm font-medium hover:bg-accent",
                            isActive("/dashboard") && "bg-accent"
                          )}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/audits"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex rounded-md p-2 text-sm font-medium hover:bg-accent",
                            isActive("/audits") && "bg-accent"
                          )}
                        >
                          My Audits
                        </Link>
                        <Link
                          to="/request-audit"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex rounded-md p-2 text-sm font-medium hover:bg-accent",
                            isActive("/request-audit") && "bg-accent"
                          )}
                        >
                          Request Audit
                        </Link>
                      </>
                    )}
                    <div className="pt-4">
                      {user ? (
                        <button
                          className="rounded-md p-2 text-sm font-medium w-full text-left hover:bg-accent"
                          onClick={() => {
                            signOut();
                            setOpen(false);
                          }}
                        >
                          Sign Out
                        </button>
                      ) : (
                        <Link
                          to="/auth"
                          onClick={() => setOpen(false)}
                          className="rounded-md bg-primary text-white p-2 text-sm font-medium text-center block"
                        >
                          Sign In
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <HawklyLogo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right actions menu */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/request-audit">
                    <Shield className="h-4 w-4 mr-1" />
                    Request Audit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {user.user_metadata?.full_name
                          ? user.user_metadata.full_name.charAt(0)
                          : user.email?.charAt(0) || "U"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="flex w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/audits" className="flex w-full">
                        My Audits
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/escrow" className="flex w-full">
                        Escrow
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
