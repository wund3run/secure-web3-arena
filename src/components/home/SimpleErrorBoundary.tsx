
import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SimpleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Home component error:', error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[200px] flex flex-col items-center justify-center p-6 text-center bg-gray-900">
          <AlertTriangle className="h-8 w-8 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Section Loading Issue</h3>
          <p className="text-gray-300 text-sm">This section is temporarily unavailable. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
