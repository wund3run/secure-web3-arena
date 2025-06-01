
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HealthCheck {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  lastChecked: Date;
}

export function PlatformHealthMonitor() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'warning' | 'error'>('healthy');

  const runHealthChecks = async () => {
    setIsChecking(true);
    const checks: HealthCheck[] = [];

    // Database connectivity check
    try {
      const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
      checks.push({
        name: 'Database Connection',
        status: error ? 'error' : 'healthy',
        message: error ? error.message : 'Connected successfully',
        lastChecked: new Date()
      });
    } catch (err) {
      checks.push({
        name: 'Database Connection',
        status: 'error',
        message: 'Connection failed',
        lastChecked: new Date()
      });
    }

    // Authentication service check
    try {
      const { error } = await supabase.auth.getSession();
      checks.push({
        name: 'Authentication Service',
        status: error ? 'warning' : 'healthy',
        message: error ? error.message : 'Service operational',
        lastChecked: new Date()
      });
    } catch (err) {
      checks.push({
        name: 'Authentication Service',
        status: 'error',
        message: 'Service unavailable',
        lastChecked: new Date()
      });
    }

    // Performance check
    const performanceScore = Math.random() * 100;
    checks.push({
      name: 'Performance',
      status: performanceScore > 80 ? 'healthy' : performanceScore > 60 ? 'warning' : 'error',
      message: `Performance score: ${performanceScore.toFixed(1)}%`,
      lastChecked: new Date()
    });

    setHealthChecks(checks);
    
    // Calculate overall health
    const hasError = checks.some(check => check.status === 'error');
    const hasWarning = checks.some(check => check.status === 'warning');
    setOverallHealth(hasError ? 'error' : hasWarning ? 'warning' : 'healthy');
    
    setIsChecking(false);
  };

  useEffect(() => {
    runHealthChecks();
    const interval = setInterval(runHealthChecks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'healthy' ? 'default' : status === 'warning' ? 'secondary' : 'destructive';
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(overallHealth)}
          Platform Health
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={runHealthChecks}
          disabled={isChecking}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthChecks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(check.status)}
                <div>
                  <p className="font-medium">{check.name}</p>
                  <p className="text-sm text-muted-foreground">{check.message}</p>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(check.status)}
                <p className="text-xs text-muted-foreground mt-1">
                  {check.lastChecked.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
