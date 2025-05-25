
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { mainNavigation } from './navigation/navigation-config';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export function MobileNavigation({ isAuthenticated, onSignOut }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeSheet = () => setIsOpen(false);

  const isActivePath = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>Navigation</SheetTitle>
              <Button variant="ghost" size="icon" onClick={closeSheet}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex flex-col h-full">
            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={closeSheet}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-colors",
                    isActivePath('/') && location.pathname === '/' 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">Home</span>
                </Link>

                {/* Navigation Items */}
                <Accordion type="single" collapsible className="space-y-2">
                  {mainNavigation.map((item) => (
                    <div key={item.href}>
                      {item.children ? (
                        <AccordionItem value={item.href} className="border-none">
                          <AccordionTrigger 
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg transition-colors hover:no-underline [&[data-state=open]>svg]:rotate-90",
                              isActivePath(item.href) 
                                ? "bg-primary/10 text-primary" 
                                : "hover:bg-muted"
                            )}
                          >
                            <span className="font-medium">{item.title}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pt-2">
                            <div className="space-y-1 ml-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  onClick={closeSheet}
                                  className={cn(
                                    "flex items-center justify-between p-2 rounded-md transition-colors text-sm",
                                    isActivePath(child.href) 
                                      ? "bg-primary text-primary-foreground" 
                                      : "hover:bg-muted"
                                  )}
                                >
                                  <div>
                                    <div className="font-medium">{child.title}</div>
                                    {child.description && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {child.description}
                                      </div>
                                    )}
                                  </div>
                                  {child.featured && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                      Featured
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={closeSheet}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg transition-colors",
                            isActivePath(item.href) 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted"
                          )}
                        >
                          <span className="font-medium">{item.title}</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </Accordion>
              </div>
            </nav>

            {/* User Actions */}
            <div className="border-t p-6 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={closeSheet}>
                    <Button className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      onSignOut();
                      closeSheet();
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={closeSheet}>
                    <Button className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/service-provider-onboarding" onClick={closeSheet}>
                    <Button variant="outline" className="w-full">
                      Become an Auditor
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
