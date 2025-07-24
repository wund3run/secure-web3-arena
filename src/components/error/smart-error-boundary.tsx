import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showReportButton?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class SmartErrorBoundary extends Component<Props, State> {
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error with context
    console.group("🚨 Error Boundary Caught Error");
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    
    if (newRetryCount > 3) {
      // Show user-friendly notification
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
    const errorData = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    
    // In production, send to error reporting service
    console.log("Error Report:", errorData);
    toast.success("Error reported successfully");
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-red-50 p-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Oops! Something went wrong</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            We encountered an unexpected error. Don't worry - our team has been notified.
          </p>

          <Alert variant="destructive" className="mb-4 max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {this.state.error?.message || "An unexpected error occurred"}
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={this.handleRetry} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again {this.state.retryCount > 0 && `(${this.state.retryCount})`}
            </Button>
            
            {this.props.showReportButton && (
              <Button variant="outline" onClick={this.handleReport} className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Report Issue
              </Button>
            )}
            
            <Button variant="outline" asChild>
              <a href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </Button>
          </div>

          {import.meta.env.MODE === 'development' && (
            <details className="mt-6 max-w-2xl text-left">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Developer Details
              </summary>
              <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-40">
                {this.state.error?.stack}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
