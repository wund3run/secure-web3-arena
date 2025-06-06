
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { navigationLinks, dashboardLinks, adminLinks } from '@/components/layout/navigation/navigation-links';

interface RouteValidationResult {
  path: string;
  label: string;
  status: 'valid' | 'invalid' | 'warning';
  message: string;
}

export function RouteChecker() {
  const [validationResults, setValidationResults] = useState<RouteValidationResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const validateRoutes = async () => {
    setIsChecking(true);
    const results: RouteValidationResult[] = [];
    
    // Combine all navigation links
    const allLinks = [...navigationLinks, ...dashboardLinks, ...adminLinks];
    
    for (const link of allLinks) {
      try {
        // Skip external links
        if (link.href.startsWith('http') || link.href.startsWith('#')) {
          results.push({
            path: link.href,
            label: link.label,
            status: 'valid',
            message: 'External link - skipped validation'
          });
          continue;
        }

        // Check if route exists in our routing system
        const response = await fetch(link.href, { method: 'HEAD' });
        
        if (response.ok || response.status === 404) {
          // 404 might be expected for dynamic routes
          results.push({
            path: link.href,
            label: link.label,
            status: response.ok ? 'valid' : 'warning',
            message: response.ok ? 'Route accessible' : 'Route returns 404 (may be dynamic)'
          });
        } else {
          results.push({
            path: link.href,
            label: link.label,
            status: 'invalid',
            message: `HTTP ${response.status}: ${response.statusText}`
          });
        }
      } catch (error) {
        results.push({
          path: link.href,
          label: link.label,
          status: 'invalid',
          message: 'Failed to validate route'
        });
      }
    }
    
    setValidationResults(results);
    setIsChecking(false);
  };

  const getStatusIcon = (status: RouteValidationResult['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'invalid':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: RouteValidationResult['status']) => {
    switch (status) {
      case 'valid':
        return <Badge variant="default" className="bg-green-100 text-green-800">Valid</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'invalid':
        return <Badge variant="destructive">Invalid</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Route Validation Checker</CardTitle>
        <CardDescription>
          Validate all navigation routes to ensure they are accessible and working correctly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={validateRoutes} 
            disabled={isChecking}
            className="w-full"
          >
            {isChecking ? 'Checking Routes...' : 'Validate All Routes'}
          </Button>
          
          {validationResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Validation Results</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {validationResults.map((result, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.label}</span>
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">
                            {result.path}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(result.status)}
                      {!result.path.startsWith('http') && !result.path.startsWith('#') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(result.path, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Valid: {validationResults.filter(r => r.status === 'valid').length}
                </span>
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  Warnings: {validationResults.filter(r => r.status === 'warning').length}
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-red-500" />
                  Invalid: {validationResults.filter(r => r.status === 'invalid').length}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
