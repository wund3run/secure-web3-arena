
import React, { useState, useEffect } from 'react';
import { RouteValidator } from '@/utils/routes/routeValidator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Eye, EyeOff } from 'lucide-react';

interface HealthReport {
  totalRoutes: number;
  publicRoutes: number;
  protectedRoutes: number;
  categoryCounts: Record<string, number>;
  navigationHealth: { valid: number; invalid: number };
}

export function SystemHealthMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development') {
      generateHealthReport();
    }
  }, []);

  const generateHealthReport = () => {
    const report = RouteValidator.generateRouteHealthReport();
    setHealthReport(report);
  };

  if (process.env.NODE_ENV !== 'development' || !healthReport) {
    return null;
  }

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsVisible(true)}
      >
        <Eye className="h-4 w-4 mr-2" />
        System Health
      </Button>
    );
  }

  const getHealthColor = (value: number, total: number) => {
    const percentage = (value / total) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">System Health</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Platform stability overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Total Routes: {healthReport.totalRoutes}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span>Public: {healthReport.publicRoutes}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <span>Protected: {healthReport.protectedRoutes}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className={`h-4 w-4 ${getHealthColor(healthReport.navigationHealth.valid, healthReport.navigationHealth.valid + healthReport.navigationHealth.invalid)}`} />
            <span>Nav Links: {healthReport.navigationHealth.valid}/{healthReport.navigationHealth.valid + healthReport.navigationHealth.invalid}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Route Categories</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {Object.entries(healthReport.categoryCounts).map(([category, count]) => (
              <Badge key={category} variant="secondary" className="justify-between">
                <span>{category}</span>
                <span>{count}</span>
              </Badge>
            ))}
          </div>
        </div>

        <Button onClick={generateHealthReport} size="sm" className="w-full">
          Refresh Health Check
        </Button>
      </CardContent>
    </Card>
  );
}
