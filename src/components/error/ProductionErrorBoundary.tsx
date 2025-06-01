
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class ProductionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to monitoring service
    console.error('Production Error Boundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show user-friendly toast
    toast.error("Something went wrong", {
      description: "We've logged the issue and will fix it soon."
    });

    // In production, send to error monitoring service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorId: null
    });
  };

  handleReportError = (): void => {
    if (this.state.error && this.state.errorId) {
      // In production, this would send detailed error report
      console.log('Error reported:', {
        id: this.state.errorId,
        error: this.state.error.message,
        stack: this.state.error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
      
      toast.success("Error reported successfully", {
        description: "Thank you for helping us improve the platform."
      });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="rounded-full bg-red-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Something went wrong</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  We encountered an unexpected error. Our team has been automatically notified.
                </AlertDescription>
              </Alert>

              {this.state.errorId && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Error ID: <code className="text-xs">{this.state.errorId}</code>
                  </p>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={this.handleReset}
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={this.handleReportError}
                  className="w-full"
                >
                  <Bug className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
                
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full"
                >
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Developer Details
                  </summary>
                  <div className="text-left bg-muted p-3 rounded text-xs overflow-auto max-h-32">
                    <pre>{this.state.error.stack}</pre>
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
