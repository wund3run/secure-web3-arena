
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMonitoringServices } from '@/hooks/useMonitoringServices';
import { AlertTriangle, Shield, Clock, CheckCircle, Eye, Settings } from 'lucide-react';

const getThreatLevelColor = (level: string) => {
  switch (level) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getThreatIcon = (level: string) => {
  switch (level) {
    case 'critical':
    case 'high':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

export const ThreatIntelligenceDashboard = () => {
  const { services, threats, loading, resolveThreat } = useMonitoringServices();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Threat Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeThreatsByLevel = threats.filter(t => !t.is_resolved).reduce((acc, threat) => {
    acc[threat.threat_level] = (acc[threat.threat_level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentThreats = threats.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">{services.filter(s => s.is_active).length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Threats</p>
                <p className="text-2xl font-bold text-red-600">{activeThreatsByLevel.critical || 0}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Threats</p>
                <p className="text-2xl font-bold">{threats.filter(t => !t.is_resolved).length}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{threats.filter(t => t.is_resolved).length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Monitoring Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Active Monitoring Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No monitoring services configured. Set up continuous monitoring to detect threats.
            </p>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Project: {service.project_id}</h4>
                    <p className="text-sm text-muted-foreground">
                      {service.monitoring_type} • Scans every {service.scan_frequency_hours}h
                    </p>
                    {service.last_scan_at && (
                      <p className="text-xs text-muted-foreground">
                        Last scan: {new Date(service.last_scan_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <Badge variant={service.is_active ? 'default' : 'secondary'}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Threat Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentThreats.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No threats detected. Your projects are secure.
            </p>
          ) : (
            <div className="space-y-4">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getThreatLevelColor(threat.threat_level)}>
                        {getThreatIcon(threat.threat_level)}
                        <span className="ml-1">{threat.threat_level}</span>
                      </Badge>
                      <span className="font-medium">{threat.threat_type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={threat.is_resolved ? 'default' : 'secondary'}>
                        {threat.is_resolved ? 'Resolved' : 'Active'}
                      </Badge>
                      {!threat.is_resolved && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolveThreat(threat.id)}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm">{threat.description}</p>
                  
                  {threat.recommendation && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                      <p className="text-sm text-blue-700">{threat.recommendation}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Detected {new Date(threat.detected_at).toLocaleString()}
                    {threat.resolved_at && (
                      <span className="ml-4">
                        • Resolved {new Date(threat.resolved_at).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
