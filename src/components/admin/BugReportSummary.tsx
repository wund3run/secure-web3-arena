
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bug, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { errorMonitoring, BugReport } from '@/utils/testing/ErrorMonitoringService';
import { testRunner } from '@/utils/testing/AutomatedTestRunner';

export function BugReportSummary() {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const refreshBugs = () => {
    setIsRefreshing(true);
    setBugs(errorMonitoring.getBugReports());
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    refreshBugs();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshBugs, 30000);
    return () => clearInterval(interval);
  }, []);

  const report = errorMonitoring.generateReport();
  const criticalBugs = bugs.filter(bug => bug.severity === 'critical');
  const openBugs = bugs.filter(bug => bug.status === 'open');
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Bug className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSystemHealthScore = () => {
    if (criticalBugs.length > 0) return { score: 30, status: 'critical', trend: 'down' };
    if (openBugs.length > 5) return { score: 60, status: 'warning', trend: 'down' };
    if (openBugs.length > 0) return { score: 85, status: 'good', trend: 'stable' };
    return { score: 100, status: 'excellent', trend: 'up' };
  };

  const health = getSystemHealthScore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bug Report Summary</h2>
        <Button onClick={refreshBugs} disabled={isRefreshing} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* System Health Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">System Health Score</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold">{health.score}%</span>
                {health.trend === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
                {health.trend === 'down' && <TrendingDown className="h-5 w-5 text-red-500" />}
                <Badge variant={
                  health.status === 'excellent' ? 'default' :
                  health.status === 'good' ? 'secondary' :
                  health.status === 'warning' ? 'outline' : 'destructive'
                }>
                  {health.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Update</p>
              <p className="text-sm">{lastUpdate.toLocaleTimeString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bug Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bugs</p>
                <p className="text-2xl font-bold">{report.summary.totalBugs}</p>
              </div>
              <Bug className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{report.summary.criticalBugs}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open</p>
                <p className="text-2xl font-bold text-orange-600">{report.summary.openBugs}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{report.summary.resolvedBugs}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Critical Issues */}
      {criticalBugs.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Attention Required:</strong> {criticalBugs.length} critical bug{criticalBugs.length !== 1 ? 's' : ''} detected. 
            Immediate action recommended.
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Bugs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Recent Issues ({Math.min(bugs.length, 5)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bugs.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-medium">No bugs detected!</p>
              <p className="text-muted-foreground">System is running smoothly</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bugs.slice(0, 5).map((bug) => (
                <div key={bug.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(bug.severity)}
                    <div>
                      <p className="font-medium text-sm">{bug.title}</p>
                      <p className="text-xs text-muted-foreground">{bug.component}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {bug.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {bug.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
