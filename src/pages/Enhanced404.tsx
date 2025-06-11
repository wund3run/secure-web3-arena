
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, ArrowLeft, HelpCircle } from 'lucide-react';

export function Enhanced404() {
  const popularPages = [
    { name: 'Marketplace', href: '/marketplace', icon: Search },
    { name: 'Request Audit', href: '/request-audit', icon: HelpCircle },
    { name: 'About Us', href: '/about', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <Card className="max-w-2xl w-full text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Popular Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {popularPages.map((page) => (
                <Button
                  key={page.href}
                  variant="outline"
                  asChild
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <Link to={page.href}>
                    <page.icon className="h-6 w-6" />
                    <span className="font-medium">{page.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Need help? <Link to="/support" className="text-primary hover:underline">Contact our support team</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Enhanced404;
