
import React from 'react';

export function SimplifiedNavbarNoRouter() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Hawkly Home"
          >
            <img 
              src="/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
              alt="Hawkly Logo"
              className="h-12 w-12 object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </a>
          
          <nav className="hidden md:flex items-center space-x-6 ml-10">
            <a href="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
              Marketplace
            </a>
            <a href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </a>
            <a href="/community" className="text-sm font-medium transition-colors hover:text-primary">
              Community
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="/auth" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Sign In
          </a>
          <a 
            href="/auth?mode=signup" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
