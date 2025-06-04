
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Database,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

interface ConsistencyCheck {
  id: string;
  name: string;
  status: 'passed' | 'warning' | 'failed';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastChecked: Date;
  details?: string;
}

interface DataQualityMetrics {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  overall: number;
}

export const DataConsistencyChecker = () => {
  const [checks, setChecks] = useState<ConsistencyCheck[]>([]);
  const [metrics, setMetrics] = useState<DataQualityMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);

  const runConsistencyChecks = async () => {
    setIsRunning(true);
    
    // Simulate API call to run consistency checks
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockChecks: ConsistencyCheck[] = [
      {
        id: '1',
        name: 'Audit Metrics Alignment',
        status: 'passed',
        message: 'All audit metrics are properly aligned across tables',
        severity: 'low',
        lastChecked: new Date(),
        details: 'Checked 1,247 audit records'
      },
      {
        id: '2',
        name: 'Revenue Calculations',
        status: 'warning',
        message: 'Minor discrepancies in revenue aggregations detected',
        severity: 'medium',
        lastChecked: new Date(),
        details: '3 records with calculation variance < 1%'
      },
      {
        id: '3',
        name: 'User Activity Timestamps',
        status: 'passed',
        message: 'All timestamps are within expected ranges',
        severity: 'low',
        lastChecked: new Date()
      },
      {
        id: '4',
        name: 'KPI Data Sources',
        status: 'failed',
        message: 'Data source connection timeout for external metrics',
        severity: 'high',
        lastChecked: new Date(),
        details: 'External API response time exceeded 30s threshold'
      }
    ];
    
    const mockMetrics: DataQualityMetrics = {
      completeness: 94.5,
      accuracy: 98.2,
      consistency: 91.8,
      timeliness: 89.3,
      overall: 93.5
    };
    
    setChecks(mockChecks);
    setMetrics(mockMetrics);
    setLastRunTime(new Date());
    setIsRunning(false);
  };

  useEffect(() => {
    // Run initial checks
    runConsistencyChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricIcon = (value: number) => {
    if (value >= 95) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value >= 85) return <TrendingUp className="h-4 w-4 text-yellow-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Consistency Checker
            </CardTitle>
            <Button 
              onClick={runConsistencyChecks} 
              disabled={isRunning}
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running...' : 'Run Checks'}
            </Button>
          </div>
          {lastRunTime && (
            <p className="text-sm text-muted-foreground">
              Last run: {lastRunTime.toLocaleString()}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Quality Metrics */}
          {metrics && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Data Quality Metrics</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{key}</span>
                      {getMetricIcon(value)}
                    </div>
                    <Progress value={value} className="h-2" />
                    <p className="text-sm text-muted-foreground">{value.toFixed(1)}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consistency Checks */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Consistency Checks</h3>
            <div className="space-y-3">
              {checks.map(check => (
                <Alert key={check.id} className={getStatusColor(check.status)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(check.status)}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{check.name}</span>
                          <Badge variant="outline" className={getSeverityColor(check.severity)}>
                            {check.severity}
                          </Badge>
                        </div>
                        <AlertDescription>{check.message}</AlertDescription>
                        {check.details && (
                          <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {check.lastChecked.toLocaleTimeString()}
                    </span>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
