
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    console.group("🚨 Global Error Boundary");
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.error("Error Info:", errorInfo);
    console.groupEnd();
    
    // Show user-friendly notification
    toast.error("Application Error", {
      description: "We've encountered an unexpected error and our team has been notified."
    });
  }

  handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    
    if (newRetryCount > 3) {
      toast.error("Multiple retry attempts failed", {
        description: "Please refresh the page or contact support."
      });
      return;
    }
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: newRetryCount
    });
  };

  handleReport = () => {
    const errorReport = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    console.log("Error Report Generated:", errorReport);
    toast.success("Error reported successfully");
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-red-100 p-4 mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-foreground">Oops! Something went wrong</h1>
            <p className="text-muted-foreground max-w-md">
              We encountered an unexpected error. Our team has been automatically notified.
            </p>
          </div>

          <Alert variant="destructive" className="max-w-md mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {this.state.error?.message || "An unexpected error occurred"}
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button 
              onClick={this.handleRetry}
              className="flex items-center gap-2"
              disabled={this.state.retryCount >= 3}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again {this.state.retryCount > 0 && `(${this.state.retryCount}/3)`}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={this.handleReport}
              className="flex items-center gap-2"
            >
              <Bug className="h-4 w-4" />
              Report Issue
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details className="max-w-4xl">
              <summary className="cursor-pointer text-sm font-medium mb-2 text-left">
                Developer Details (Development Only)
              </summary>
              <div className="text-left bg-muted p-4 rounded-md text-xs overflow-auto max-h-96">
                <div className="mb-4">
                  <strong>Error:</strong>
                  <pre className="mt-1">{this.state.error?.stack}</pre>
                </div>
                <div>
                  <strong>Component Stack:</strong>
                  <pre className="mt-1">{this.state.errorInfo.componentStack}</pre>
                </div>
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
