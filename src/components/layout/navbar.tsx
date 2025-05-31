
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MainNavigation } from './main-navigation';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/d96077a4-3ebd-4779-9a3e-a504ff6822f1.png" 
              alt="Hawkly Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <MainNavigation />
          </div>
          <nav className="flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/request-audit">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
