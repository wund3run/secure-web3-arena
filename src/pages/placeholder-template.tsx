
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description, 
  icon: Icon = Construction 
}) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Icon className="h-16 w-16 text-primary/50" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-base mt-2">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm text-muted-foreground">
                  Current path: <code className="text-xs">{location.pathname}</code>
                </p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Homepage
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Report an Issue</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
