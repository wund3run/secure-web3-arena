
import React from 'react';
import { Loader2, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EnhancedLoadingStateProps {
  message?: string;
  submessage?: string;
  progress?: number;
  variant?: 'default' | 'card' | 'fullscreen' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  icon?: 'spinner' | 'shield' | 'clock' | 'check';
}

export const EnhancedLoadingState: React.FC<EnhancedLoadingStateProps> = ({
  message = "Loading...",
  submessage,
  progress,
  variant = 'default',
  size = 'md',
  showProgress = false,
  icon = 'spinner'
}) => {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const getIcon = () => {
    const iconClass = iconSizes[size];
    
    switch (icon) {
      case 'shield':
        return <Shield className={`${iconClass} text-primary`} />;
      case 'clock':
        return <Clock className={`${iconClass} text-muted-foreground`} />;
      case 'check':
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      default:
        return <Loader2 className={`${iconClass} animate-spin text-primary`} />;
    }
  };

  const content = (
    <div className="flex flex-col items-center space-y-3">
      {getIcon()}
      
      <div className="text-center space-y-1">
        <div className={`font-medium ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {message}
        </div>
        {submessage && (
          <div className={`text-muted-foreground ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {submessage}
          </div>
        )}
      </div>
      
      {showProgress && typeof progress === 'number' && (
        <div className="w-full max-w-xs space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {Math.round(progress)}% complete
          </div>
        </div>
      )}
    </div>
  );

  switch (variant) {
    case 'fullscreen':
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="p-8">
            {content}
          </div>
        </div>
      );
      
    case 'card':
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8">
            {content}
          </CardContent>
        </Card>
      );
      
    case 'inline':
      return (
        <div className="py-4">
          {content}
        </div>
      );
      
    default:
      return (
        <div className="flex items-center justify-center p-8">
          {content}
        </div>
      );
  }
};

// Specialized loading components for common use cases
export const AuthLoadingState = () => (
  <EnhancedLoadingState 
    message="Verifying credentials..."
    submessage="Please wait while we authenticate you"
    variant="card"
    icon="shield"
  />
);

export const DashboardLoadingState = () => (
  <EnhancedLoadingState 
    message="Loading dashboard..."
    submessage="Preparing your workspace"
    variant="fullscreen"
    size="lg"
  />
);

export const DataLoadingState = ({ entityName = "data" }: { entityName?: string }) => (
  <EnhancedLoadingState 
    message={`Loading ${entityName}...`}
    variant="inline"
    size="sm"
  />
);
