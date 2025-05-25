
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle, MessageCircle } from "lucide-react";
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
  errorId: string;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo
    });
    
    // Log error to analytics
    logErrorToAnalytics(error, 'EnhancedErrorBoundary');
    
    // Show toast notification
    toast.error("An unexpected error occurred", {
      description: "We've logged the issue and our team will investigate it.",
      action: {
        label: "Refresh",
        onClick: () => window.location.reload()
      }
    });
    
    console.error('Error Boundary caught an error:', error, errorInfo);
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
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
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-background">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
            We've encountered an unexpected error. Our development team has been notified and is working to fix the issue.
          </p>
          
          {this.state.errorId && (
            <div className="bg-muted/50 border border-border rounded-lg p-3 mb-6 text-xs">
              <p className="text-muted-foreground mb-1">Error ID for support:</p>
              <code className="text-foreground font-mono">{this.state.errorId}</code>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="default" 
              onClick={this.handleReset}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            
            {this.props.routeFallback && (
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Return to home
                </Link>
              </Button>
            )}
            
            <Button asChild variant="ghost">
              <Link to="/support" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact support
              </Link>
            </Button>
          </div>
          
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <details className="mt-8 w-full max-w-2xl">
              <summary className="cursor-pointer text-sm font-medium mb-2 text-muted-foreground hover:text-foreground">
                Developer Information (Click to expand)
              </summary>
              <div className="p-4 bg-muted rounded-md text-left overflow-auto text-xs">
                <p className="font-medium mb-2 text-red-600 dark:text-red-400">Error Details:</p>
                <p className="mb-3 font-mono text-red-500">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <>
                    <p className="font-medium mb-2 text-amber-600 dark:text-amber-400">Component Stack:</p>
                    <pre className="overflow-auto max-h-40 text-amber-700 dark:text-amber-300">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>
                )}
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
