
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Database, RefreshCw, Shield } from 'lucide-react';

interface DataIntegrityCheck {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'warning' | 'checking';
  lastChecked: string;
  description: string;
  criticalLevel: 'high' | 'medium' | 'low';
  affectedRecords?: number;
}

export function DataConsistencyChecker() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date>(new Date());

  const [integrityChecks, setIntegrityChecks] = useState<DataIntegrityCheck[]>([
    {
      id: 'user-audit-consistency',
      name: 'User-Audit Relationship Integrity',
      status: 'passed',
      lastChecked: '5 minutes ago',
      description: 'Validates that all audit records have valid user references',
      criticalLevel: 'high'
    },
    {
      id: 'payment-audit-sync',
      name: 'Payment-Audit Synchronization',
      status: 'warning',
      lastChecked: '12 minutes ago',
      description: 'Ensures payment records match corresponding audit statuses',
      criticalLevel: 'high',
      affectedRecords: 3
    },
    {
      id: 'auditor-availability',
      name: 'Auditor Availability Data',
      status: 'passed',
      lastChecked: '8 minutes ago',
      description: 'Checks for inconsistencies in auditor availability status',
      criticalLevel: 'medium'
    },
    {
      id: 'service-pricing',
      name: 'Service Pricing Validation',
      status: 'failed',
      lastChecked: '15 minutes ago',
      description: 'Validates pricing data across all service listings',
      criticalLevel: 'medium',
      affectedRecords: 7
    },
    {
      id: 'analytics-tracking',
      name: 'Analytics Event Tracking',
      status: 'passed',
      lastChecked: '3 minutes ago',
      description: 'Ensures analytics events are properly recorded and consistent',
      criticalLevel: 'low'
    }
  ]);

  const runFullScan = async () => {
    setIsChecking(true);
    
    // Update all checks to "checking" status
    setIntegrityChecks(prev => prev.map(check => ({
      ...check,
      status: 'checking' as const
    })));

    // Simulate checking each component
    for (let i = 0; i < integrityChecks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIntegrityChecks(prev => prev.map((check, index) => {
        if (index === i) {
          // Simulate random results for demo
          const statuses: ('passed' | 'warning' | 'failed')[] = ['passed', 'passed', 'passed', 'warning', 'failed'];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          return {
            ...check,
            status: randomStatus,
            lastChecked: 'Just now',
            affectedRecords: randomStatus !== 'passed' ? Math.floor(Math.random() * 10) + 1 : undefined
          };
        }
        return check;
      }));
    }
    
    setIsChecking(false);
    setLastScanTime(new Date());

    // Track data consistency check
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'data_consistency_check',
        category: 'analytics',
        label: 'full_scan'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'checking':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'checking':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCriticalityColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const passedChecks = integrityChecks.filter(check => check.status === 'passed').length;
  const totalChecks = integrityChecks.length;
  const healthPercentage = (passedChecks / totalChecks) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Data Consistency & Integrity Monitor
              </CardTitle>
              <CardDescription>
                Automated validation of data relationships and consistency across the platform
              </CardDescription>
            </div>
            <Button
              onClick={runFullScan}
              disabled={isChecking}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Scanning...' : 'Run Full Scan'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Health */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <div>
              <h3 className="text-lg font-semibold">Data Health Score</h3>
              <p className="text-sm text-muted-foreground">
                Last scan: {lastScanTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{Math.round(healthPercentage)}%</div>
              <div className="text-sm text-muted-foreground">
                {passedChecks}/{totalChecks} checks passed
              </div>
            </div>
          </div>
          
          <Progress value={healthPercentage} className="h-3" />

          {/* Individual Checks */}
          <div className="space-y-4">
            <h4 className="font-semibold">Integrity Checks</h4>
            {integrityChecks.map((check) => (
              <Card key={check.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(check.status)}
                      <div className="flex-1">
                        <h5 className="font-medium">{check.name}</h5>
                        <p className="text-sm text-muted-foreground">{check.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(check.status)} variant="outline">
                            {check.status}
                          </Badge>
                          <Badge className={getCriticalityColor(check.criticalLevel)} variant="secondary">
                            {check.criticalLevel} priority
                          </Badge>
                          {check.affectedRecords && (
                            <Badge variant="outline" className="text-xs">
                              {check.affectedRecords} records affected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {check.lastChecked}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {integrityChecks.filter(c => c.status === 'passed').length}
              </div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {integrityChecks.filter(c => c.status === 'warning').length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {integrityChecks.filter(c => c.status === 'failed').length}
              </div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {integrityChecks.filter(c => c.criticalLevel === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
