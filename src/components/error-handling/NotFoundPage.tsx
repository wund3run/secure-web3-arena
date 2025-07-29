
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Hawkly</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">
              404
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Looking for something specific?
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/marketplace" className="hover:underline text-primary">
                  Marketplace
                </Link>
                <Link to="/business/about" className="hover:underline text-primary">
                  About Us
                </Link>
                <Link to="/business/pricing" className="hover:underline text-primary">
                  Pricing
                </Link>
                <Link to="/support/faq" className="hover:underline text-primary">
                  FAQ
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
