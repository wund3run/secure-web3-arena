
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Home, 
  MessageSquare, 
  Search, 
  Shield, 
  User, 
  Users,
  Bell,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/auth';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export function EnhancedQuickNavigation() {
  const { user, userProfile, getUserType } = useAuth();
  const location = useLocation();
  const userType = getUserType();

  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      { label: 'Home', href: '/', icon: Home },
      { label: 'Marketplace', href: '/marketplace', icon: Search },
    ];

    if (!user) {
      return [
        ...baseItems,
        { label: 'About', href: '/about', icon: Users },
        { label: 'Contact', href: '/contact', icon: MessageSquare },
      ];
    }

    const authenticatedItems: NavigationItem[] = [
      ...baseItems,
      { label: 'Dashboard', href: '/dashboard', icon: User },
      { label: 'Messages', href: '/messages', icon: MessageSquare, badge: 3 },
    ];

    if (userType === 'project_owner') {
      authenticatedItems.splice(2, 0, 
        { label: 'Request Audit', href: '/request-audit', icon: Shield },
        { label: 'My Audits', href: '/audits', icon: FileText }
      );
    }

    if (userType === 'auditor') {
      authenticatedItems.splice(2, 0,
        { label: 'Browse Projects', href: '/marketplace', icon: Search },
        { label: 'My Work', href: '/audits', icon: FileText }
      );
    }

    return authenticatedItems;
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center space-x-2">
      {getNavigationItems().map((item) => (
        <Button
          key={item.href}
          variant={isActive(item.href) ? 'default' : 'ghost'}
          size="sm"
          asChild
          className="relative"
        >
          <Link to={item.href} className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
            {item.badge && (
              <Badge 
                variant="error" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        </Button>
      ))}
      
      {user && (
        <>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="error" 
              className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
            >
              2
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
        </>
      )}
    </nav>
  );
}
