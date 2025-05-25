
import { ReactNode, useState, useEffect } from "react";
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
  AlertCircle,
  ActivitySquare,
  ShoppingCart,
  BookOpen
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BetaWarning } from "@/components/ui/beta-warning";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlatformStatusMonitor } from "./PlatformStatusMonitor";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showBetaNotice, setShowBetaNotice] = useState(true);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Check time since login
  useEffect(() => {
    const loginTime = localStorage.getItem("adminLoginTime");
    
    if (!loginTime) {
      localStorage.setItem("adminLoginTime", Date.now().toString());
    } else {
      const sessionDuration = Date.now() - parseInt(loginTime);
      const sessionHours = sessionDuration / (1000 * 60 * 60);
      
      if (sessionHours > 24) {
        toast.warning("Session expired", {
          description: "Your admin session has expired. Please login again."
        });
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoginTime");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const confirmLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      handleLogout();
    }
  };

  const menuItems = [
    {
      icon: <BarChart className="h-4 w-4" />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      href: "/admin/dashboard?tab=users",
    },
    {
      icon: <Package className="h-4 w-4" />,
      label: "Services",
      href: "/admin/dashboard?tab=services",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: "Audits",
      href: "/admin/dashboard?tab=audits",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Reports",
      href: "/admin/dashboard?tab=reports",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      href: "/admin/dashboard?tab=settings",
    },
  ];

  // App integration menu items
  const appIntegrationItems = [
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      label: "Marketplace",
      href: "/marketplace",
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Resources",
      href: "/resources",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: "Guidelines",
      href: "/audit-guidelines",
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
                Hawkly Admin
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
          {/* Admin Functions */}
          <div className="px-2 mb-4">
            {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-2 px-2">ADMIN FUNCTIONS</p>}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <div
                    className={`flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                      currentPath === item.href || (item.href.includes('?tab=') && location.search.includes(item.href.split('?tab=')[1]))
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
          </div>
          
          <Separator className="my-4" />
          
          {/* App Integration */}
          <div className="px-2 mb-4">
            {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-2 px-2">APP FEATURES</p>}
            <nav className="space-y-1">
              {appIntegrationItems.map((item) => (
                <Link key={item.href} to={item.href} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <span className="mr-3">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          
          <Separator className="my-4" />
          
          <div className="px-2">
            <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
              <DialogTrigger asChild>
                <div className={`flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors cursor-pointer`}>
                  <span className="mr-3"><ActivitySquare className="h-4 w-4" /></span>
                  {!collapsed && <span>Platform Status</span>}
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Platform Status</DialogTitle>
                </DialogHeader>
                <PlatformStatusMonitor />
              </DialogContent>
            </Dialog>
            
            <Link to="/">
              <div className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                <span className="mr-3"><Home className="h-4 w-4" /></span>
                {!collapsed && <span>Main Site</span>}
              </div>
            </Link>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-2 text-sm hover:bg-red-100 hover:text-red-700 transition-colors"
              onClick={confirmLogout}
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
              <Button 
                variant="destructive" 
                size="sm"
                onClick={confirmLogout}
                className="h-8"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
              </Button>
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
                The admin panel is currently in beta. All links now connect to proper app features.
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
