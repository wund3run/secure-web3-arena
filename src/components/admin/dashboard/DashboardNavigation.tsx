
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Shield, 
  FileText, 
  Settings, 
  Database, 
  BarChart3,
  Activity,
  AlertTriangle,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  isExternal?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard Overview",
    href: "/admin",
    icon: <Home className="h-4 w-4" />,
    description: "Main dashboard with key metrics"
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
    description: "Manage platform users and permissions"
  },
  {
    label: "Security Services",
    href: "/admin/services",
    icon: <Shield className="h-4 w-4" />,
    description: "Oversee security audit services"
  },
  {
    label: "Audit Reports",
    href: "/admin/audits",
    icon: <FileText className="h-4 w-4" />,
    description: "Review completed and ongoing audits"
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "Platform performance and usage statistics"
  },
  {
    label: "System Health",
    href: "/admin/system",
    icon: <Activity className="h-4 w-4" />,
    description: "Monitor system status and health"
  },
  {
    label: "Database Management",
    href: "/admin/database",
    icon: <Database className="h-4 w-4" />,
    description: "Database administration tools"
  },
  {
    label: "Platform Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
    description: "Configure platform-wide settings"
  }
];

export function DashboardNavigation() {
  const location = useLocation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Admin Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "justify-start h-auto p-3 text-left",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <Link to={item.href}>
                  <div className="flex items-start gap-3 w-full">
                    <div className="mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {item.label}
                      </div>
                      <div className={cn(
                        "text-xs mt-1 truncate",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">
            Quick Actions
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/marketplace">
                View Marketplace
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/dashboard">
                User Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
