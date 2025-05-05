
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Users,
  Shield,
  FileText,
  Package,
  Settings,
  Home,
  LogOut,
  PanelLeft,
  AlertCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BetaWarning } from "@/components/ui/beta-warning";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showBetaNotice, setShowBetaNotice] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const menuItems = [
    {
      icon: <BarChart className="h-4 w-4" />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <Package className="h-4 w-4" />,
      label: "Services",
      href: "/admin/services",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: "Audits",
      href: "/admin/audits",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Reports",
      href: "/admin/reports",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`bg-muted h-screen ${
          collapsed ? "w-16" : "w-64"
        } transition-all duration-300 ease-in-out overflow-hidden fixed left-0 top-0 border-r z-30`}
      >
        <div className="flex h-14 items-center px-4 border-b">
          {!collapsed && (
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="font-semibold text-lg flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                ICOinc Admin
              </span>
            </Link>
          )}
          {collapsed && (
            <Link to="/admin/dashboard" className="mx-auto">
              <Shield className="h-5 w-5 text-primary" />
            </Link>
          )}
        </div>

        <div className="py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <div
                  className={`flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                    currentPath === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            ))}
          </nav>
          
          <Separator className="my-4" />
          
          <div className="px-2">
            <Link to="/">
              <div className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                <span className="mr-3"><Home className="h-4 w-4" /></span>
                {!collapsed && <span>Main Site</span>}
              </div>
            </Link>
            
            {!collapsed && (
              <div className="flex items-center px-2 py-2 text-sm">
                <span className="mr-3"><ThemeToggle /></span>
                <span>Theme</span>
              </div>
            )}
            
            {collapsed && (
              <div className="flex justify-center mt-2">
                <ThemeToggle />
              </div>
            )}
            
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-2 text-sm mt-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              {!collapsed && <span>Log out</span>}
            </Button>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 4L2.5 7.5L6.5 11M12.5 4L8.5 7.5L12.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Button>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${collapsed ? "ml-16" : "ml-64"} transition-all duration-300 ease-in-out`}>
        <header className="h-14 border-b flex items-center px-6 bg-background sticky top-0 z-20">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Admin: {localStorage.getItem("adminUser")}
              </span>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </header>
        <main className="p-6">
          {showBetaNotice && (
            <BetaWarning
              variant="subtle"
              size="sm"
              dismissable={true}
              onDismiss={() => setShowBetaNotice(false)}
              className="mb-6"
              title="Admin Panel (Beta)"
            >
              <p className="text-sm">
                The admin panel is currently in beta. Some features may be limited or contain bugs.
                Use with caution and report any issues to the development team.
              </p>
            </BetaWarning>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
