
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { publicNavigationLinks } from './PublicNavigationLinks';
import { navigationLinks } from './navigation-links';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const links = user ? navigationLinks : publicNavigationLinks;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <img
                className="h-8 w-8 object-contain"
                src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png"
                alt="Hawkly Logo"
              />
              <span className="text-lg font-bold">Hawkly</span>
            </Link>
          </div>

          <div className="flex-1 space-y-4">
            {links.map((link) => (
              <div key={link.title} className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                  {link.title}
                </h3>
                {link.children ? (
                  <div className="space-y-1 pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.title}
                        to={child.href}
                        className="block py-2 text-sm hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="block py-2 text-sm hover:text-primary transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="border-t pt-4 space-y-2">
            {user ? (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" onClick={signOut} className="w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
