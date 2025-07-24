import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Shield, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to homepage"
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: Shield,
    description: "Browse security services"
  },
  {
    title: "Audits",
    href: "/audit-details",
    icon: FileText,
    description: "View audit reports"
  },
  {
    title: "Community",
    href: "/community/forum",
    icon: Users,
    description: "Join the community"
  }
];

interface MobileResponsiveNavigationProps {
  className?: string;
}

export function MobileResponsiveNavigation({ className }: MobileResponsiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="Open navigation menu"
            className="relative"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <nav className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleNavigation}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                        isActive && "bg-accent text-accent-foreground font-medium"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
