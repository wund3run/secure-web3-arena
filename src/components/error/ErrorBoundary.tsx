import { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private readonly MAX_RETRIES = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    toast.error('Component Error', {
      description: 'An error occurred while rendering this component',
      action: {
        label: 'Retry',
        onClick: () => this.handleRetry()
      }
    });
  }

  handleRetry = (): void => {
    const { retryCount } = this.state;
    
    if (retryCount < this.MAX_RETRIES) {
      this.setState(state => ({
        hasError: false,
        error: null,
        retryCount: state.retryCount + 1
      }));
    } else {
      toast.error('Maximum retries reached', {
        description: 'Please refresh the page',
        action: {
          label: 'Refresh',
          onClick: () => window.location.reload()
        }
      });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {this.state.error?.message || 'An unexpected error occurred'}
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            onClick={this.handleRetry}
            className="mt-4 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
} 