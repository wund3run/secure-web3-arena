
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class RouterErrorBoundary extends Component<Props, State> {
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
    console.error('Router Error Boundary caught an error:', error, errorInfo);
    
    // Log additional context for navigation errors
    if (error.message.includes('navigation') || error.message.includes('route')) {
      console.error('Navigation context:', {
        currentUrl: window.location.href,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
    }
    
    this.setState({ errorInfo });
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Clear any potential auth state issues
    localStorage.removeItem('supabase.auth.token');
    
    // Reload the page to reset the router state
    window.location.reload();
  };

  handleGoHome = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Clear any potential auth state issues
    localStorage.removeItem('supabase.auth.token');
    
    // Navigate to home page safely
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
          <div className="rounded-full bg-destructive/10 p-3 mb-4">
            <RefreshCw className="h-8 w-8 text-destructive" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Navigation Error</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            We encountered a navigation error. This usually happens during sign-in or when switching between pages. Please try refreshing or go back to the home page.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={this.handleReset}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
            
            <Button 
              variant="outline"
              onClick={this.handleGoHome}
              className="flex items-center"
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-8 p-4 bg-muted rounded-md text-left overflow-auto max-w-full">
              <p className="font-medium mb-2 text-sm">Error Details (Development):</p>
              <p className="text-xs mb-2 text-red-500">{this.state.error.toString()}</p>
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
