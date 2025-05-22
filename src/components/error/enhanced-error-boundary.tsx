
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { logErrorToAnalytics } from "@/utils/error-handling";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  routeFallback?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo
    });
    
    // Log error to analytics
    logErrorToAnalytics(error, 'EnhancedErrorBoundary');
    
    // Show toast notification
    toast.error("An error occurred", {
      description: "We've logged the issue and will fix it soon."
    });
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-amber-100 p-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            We've encountered an unexpected error. Our team has been notified and is working to fix the issue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={this.handleReset}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            
            {this.props.routeFallback && (
              <Button asChild>
                <Link to="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Return to home
                </Link>
              </Button>
            )}
          </div>
          
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="mt-8 p-4 bg-muted rounded-md text-left overflow-auto max-w-full">
              <p className="font-medium mb-2">Error Details (Development Only):</p>
              <p className="text-sm mb-2 text-red-500">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <pre className="text-xs overflow-auto max-h-40">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
