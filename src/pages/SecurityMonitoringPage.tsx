
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Activity, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { EnhancedLoadingState } from '@/components/ui/enhanced-loading-state';

export default function SecurityMonitoringPage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <EnhancedLoadingState message="Loading security monitoring data..." />;
  }

  const securityMetrics = [
    { label: 'Active Monitors', value: '12', icon: Activity, status: 'healthy' },
    { label: 'Critical Alerts', value: '2', icon: AlertTriangle, status: 'warning' },
    { label: 'Resolved Issues', value: '45', icon: CheckCircle, status: 'success' },
    { label: 'Avg Response Time', value: '2.3m', icon: Clock, status: 'neutral' }
  ];

  const recentAlerts = [
    { id: 1, severity: 'high', message: 'Unusual API access pattern detected', time: '5 minutes ago' },
    { id: 2, severity: 'medium', message: 'Smart contract gas limit exceeded', time: '15 minutes ago' },
    { id: 3, severity: 'low', message: 'New dependency vulnerability found', time: '1 hour ago' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Security Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time security monitoring and threat detection
          </p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge 
                  variant={metric.status === 'warning' ? 'destructive' : 
                          metric.status === 'success' ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {metric.status === 'healthy' ? 'Healthy' :
                   metric.status === 'warning' ? 'Needs Attention' :
                   metric.status === 'success' ? 'Good' : 'Normal'}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Alerts</CardTitle>
          <CardDescription>
            Latest security events and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === 'high' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex justify-between items-center">
                <span>{alert.message}</span>
                <Badge variant="outline">{alert.time}</Badge>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Monitoring Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Monitoring</CardTitle>
            <CardDescription>Current security monitoring services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Smart Contract Monitoring</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>API Security Scanning</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Vulnerability Assessment</span>
              <Badge variant="secondary">Scheduled</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Score</CardTitle>
            <CardDescription>Overall security posture rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">87/100</div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Good Security Posture
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Your security score is above average. Consider addressing the 2 critical alerts to improve further.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
