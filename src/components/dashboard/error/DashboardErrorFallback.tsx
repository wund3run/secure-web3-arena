import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface DashboardErrorFallbackProps {
  error: Error;
  retry: () => void;
  className?: string;
}

export function DashboardErrorFallback({ 
  error, 
  retry,
  className 
}: DashboardErrorFallbackProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="h-5 w-5 text-destructive mr-2" />
          <span>Error Loading Component</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {error?.message || 'An unexpected error occurred while loading this component.'}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={retry}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Retry</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
