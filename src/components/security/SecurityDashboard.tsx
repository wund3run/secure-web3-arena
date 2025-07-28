
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Activity, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { auditLogger, AuditLogEntry } from '@/utils/security/AuditLogger';
import { SecurityHeadersManager } from '@/utils/security/SecurityHeadersManager';
import { useSecurity } from './SecurityProvider';
import { PermissionGuard } from '@/components/auth/rbac/PermissionGuard';

export const SecurityDashboard: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<AuditLogEntry[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState({
    totalEvents: 0,
    criticalEvents: 0,
    lastUpdate: new Date().toISOString()
  });
  const { securityInitialized } = useSecurity();

  useEffect(() => {
    loadAuditEvents();
  }, []);

  const loadAuditEvents = () => {
    const events = auditLogger.getLogs();
    setAuditEvents(events.slice(-50).reverse()); // Show last 50 events
    
    setSecurityMetrics({
      totalEvents: events.length,
      criticalEvents: events.filter(e => e.severity === 'critical').length,
      lastUpdate: new Date().toISOString()
    });
  };

  const exportAuditLog = (format: 'json' | 'csv') => {
    const data = auditLogger.exportAuditLog(format);
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hawkly-audit-log.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const generateCSPReport = () => {
    const headerManager = SecurityHeadersManager.getInstance();
    const report = headerManager.generateCSPReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csp-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PermissionGuard permission="view_audit_logs">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Security Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor security events and audit logs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={securityInitialized ? "default" : "error"}>
              {securityInitialized ? "Security Active" : "Security Inactive"}
            </Badge>
            <Button variant="outline" onClick={loadAuditEvents}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{securityMetrics.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(securityMetrics.lastUpdate).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {securityMetrics.criticalEvents}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Status</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Protected</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">Audit Events</TabsTrigger>
            <TabsTrigger value="security">Security Headers</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Audit Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {auditEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                          <span className="font-medium">{event.action}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{event.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {auditEvents.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      No audit events recorded yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Headers Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Content Security Policy</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>HSTS</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>X-Frame-Options</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>X-Content-Type-Options</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
                <Button onClick={generateCSPReport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSP Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Audit Logs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={() => exportAuditLog('json')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export as JSON
                  </Button>
                  <Button onClick={() => exportAuditLog('csv')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Export audit logs for compliance reporting and analysis.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PermissionGuard>
  );
};
