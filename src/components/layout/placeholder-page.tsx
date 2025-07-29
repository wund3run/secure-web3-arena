import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Construction, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';
import { AppContainer } from './AppContainer';

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export function PlaceholderPage({ title, description, comingSoon = true }: PlaceholderPageProps) {
  return (
    <ProductionErrorBoundary>
      <AppContainer maxWidth="max-w-4xl" padding="py-12" elevation>
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <Construction className="h-16 w-16 text-muted-foreground" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {comingSoon && (
            <Alert className="max-w-md mx-auto">
              <Construction className="h-4 w-4" />
              <AlertDescription>
                This feature is currently under development and will be available soon.
              </AlertDescription>
            </Alert>
          )}

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>What's Available Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                While we're building this feature, you can explore these available sections:
              </p>
              
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/marketplace">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Browse Security Auditors
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/platform-report">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Platform Analysis
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're actively developing new features to enhance your Web3 security experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" size="sm">
                Subscribe to Updates
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/roadmap">
                  View Roadmap
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AppContainer>
    </ProductionErrorBoundary>
  );
}
