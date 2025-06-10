
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/auth';

interface MobileMenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  requiresAuth?: boolean;
}

const mobileMenuItems: MobileMenuItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: User, requiresAuth: true },
  { label: 'Marketplace', href: '/marketplace', icon: User },
  { label: 'Security Audits', href: '/security-audits', icon: User },
  { label: 'Request Audit', href: '/request-audit', icon: User, requiresAuth: true },
  { label: 'My Audits', href: '/audits', icon: User, requiresAuth: true },
  { label: 'AI Tools', href: '/ai-tools', icon: User },
  { label: 'Resources', href: '/resources', icon: User },
];

export const EnhancedMobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const filteredItems = mobileMenuItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden relative">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-3">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
                  alt="Hawkly Logo"
                  className="h-8 w-8 object-contain"
                />
                Hawkly
              </SheetTitle>
            </div>
            
            {user && (
              <div className="flex items-center gap-3 mt-4 p-3 bg-muted rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {userProfile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </SheetHeader>

          <Separator />

          <nav className="flex-1 p-3">
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center justify-between p-3 rounded-lg transition-colors
                    ${location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          <Separator />

          <div className="p-4 space-y-2">
            {user ? (
              <>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-600"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
