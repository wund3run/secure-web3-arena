
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart4,
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Github, 
  LayoutDashboard,
  Lock, 
  Settings, 
  Shield, 
  User, 
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DashboardSidebar({ open, setOpen }: DashboardSidebarProps) {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/dashboard'
    },
    {
      title: 'My Audits',
      icon: <Shield className="w-5 h-5" />,
      href: '/audits'
    },
    {
      title: 'Calendar',
      icon: <Calendar className="w-5 h-5" />,
      href: '/dashboard/calendar'
    },
    {
      title: 'Reports',
      icon: <FileText className="w-5 h-5" />,
      href: '/dashboard/reports'
    },
    {
      title: 'Marketplace',
      icon: <BarChart4 className="w-5 h-5" />,
      href: '/marketplace'
    },
    { 
      type: 'divider' 
    },
    {
      title: 'GitHub Integration',
      icon: <Github className="w-5 h-5" />,
      href: '/dashboard?tab=profile'
    },
    {
      title: 'Security',
      icon: <Lock className="w-5 h-5" />,
      href: '/dashboard/security'
    },
    { 
      type: 'divider' 
    },
    {
      title: 'Team',
      icon: <Users className="w-5 h-5" />,
      href: '/dashboard/team'
    },
    {
      title: 'Profile',
      icon: <User className="w-5 h-5" />,
      href: '/dashboard?tab=profile'
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '/dashboard?tab=settings'
    },
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-20 bg-background border-r flex flex-col",
        open ? "w-64" : "w-0 lg:w-16",
        "transition-all duration-300"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b justify-between">
        {open ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {userInitial}
            </div>
            <span className="font-medium">{userName}</span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {userInitial}
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item, i) => {
              if (item.type === 'divider') {
                return <div key={`divider-${i}`} className="my-2 border-t mx-2" />;
              }
              
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {open && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}
