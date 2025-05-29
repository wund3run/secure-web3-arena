
import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface ErrorMessageProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  severity?: 'error' | 'warning' | 'info';
}

export function ErrorMessage({ title, description, action, severity = 'error' }: ErrorMessageProps) {
  const variants = {
    error: 'destructive',
    warning: 'default',
    info: 'default'
  } as const;

  return (
    <Alert variant={variants[severity]} className="max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">{title}</p>
          <p className="text-sm">{description}</p>
          {action && (
            <Button size="sm" variant="outline" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

export function NetworkErrorCard({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Wifi className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-semibold">Connection Problem</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Unable to connect to our servers. Please check your internet connection and try again.
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function NotFoundError({ 
  title = "Page Not Found", 
  description = "The page you're looking for doesn't exist or has been moved.",
  showReportButton = false 
}: {
  title?: string;
  description?: string;
  showReportButton?: boolean;
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-gray-600" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground max-w-md">{description}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
        
        {showReportButton && (
          <Button variant="outline">
            <Bug className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        )}
      </div>
    </div>
  );
}

export function AuthenticationError() {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="font-semibold">Authentication Required</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You need to sign in to access this page.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link to="/auth">Sign In</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function PermissionError() {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-semibold">Access Denied</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You don't have permission to access this resource.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
