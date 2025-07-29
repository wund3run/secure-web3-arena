
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Lock,
  Scan,
  FileText,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface SecurityAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
  affectedSystems: string[];
}

interface SecurityMetric {
  name: string;
  value: number;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export function AdvancedSecurityMonitoring() {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: '1',
      severity: 'medium',
      type: 'Authentication',
      title: 'Multiple Failed Login Attempts',
      description: 'Detected 15 failed login attempts from IP 192.168.1.100',
      timestamp: '2024-01-15 14:30:00',
      status: 'investigating',
      affectedSystems: ['Authentication Service', 'User Management']
    },
    {
      id: '2',
      severity: 'low',
      type: 'Network',
      title: 'Unusual Traffic Pattern',
      description: 'Increased API requests from European region',
      timestamp: '2024-01-15 13:45:00',
      status: 'active',
      affectedSystems: ['API Gateway', 'Load Balancer']
    }
  ]);

  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([
    { name: 'Security Score', value: 94, threshold: 90, status: 'good', trend: 'up' },
    { name: 'Vulnerability Count', value: 3, threshold: 5, status: 'good', trend: 'down' },
    { name: 'Failed Login Rate', value: 2.1, threshold: 5.0, status: 'good', trend: 'stable' },
    { name: 'SSL Certificate Health', value: 100, threshold: 95, status: 'good', trend: 'stable' }
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(new Date());

  const runSecurityScan = async () => {
    setIsScanning(true);
    
    // Simulate security scan
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setLastScanTime(new Date());
    setIsScanning(false);
    
    // Update metrics after scan
    setSecurityMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.name === 'Security Score' ? 96 : metric.value
    })));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Security Score': return <Shield className="h-4 w-4" />;
      case 'Vulnerability Count': return <AlertTriangle className="h-4 w-4" />;
      case 'Failed Login Rate': return <Lock className="h-4 w-4" />;
      case 'SSL Certificate Health': return <CheckCircle className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Advanced Security Monitoring
              </CardTitle>
              <CardDescription>
                Real-time security threat detection and monitoring
              </CardDescription>
            </div>
            <Button
              onClick={runSecurityScan}
              disabled={isScanning}
              className="flex items-center gap-2"
            >
              <Scan className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Run Security Scan'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Security Overview</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMetricIcon(metric.name)}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <TrendingUp className={`h-3 w-3 ${
                      metric.trend === 'up' ? 'text-green-500' : 
                      metric.trend === 'down' ? 'text-red-500 rotate-180' : 
                      'text-gray-500'
                    }`} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {metric.value}{metric.name.includes('Rate') || metric.name.includes('Health') ? '%' : ''}
                    </div>
                    <Progress 
                      value={metric.name === 'Vulnerability Count' ? 
                        ((metric.threshold - metric.value) / metric.threshold) * 100 :
                        (metric.value / metric.threshold) * 100
                      } 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      Target: {metric.threshold}{metric.name.includes('Rate') || metric.name.includes('Health') ? '%' : ''}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Security Status */}
          <Card>
            <CardHeader>
              <CardTitle>Security Posture Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Secure</div>
                  <div className="text-sm text-muted-foreground">Overall Status</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">All Systems Protected</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                  <div className="text-sm text-muted-foreground">Active Monitoring Rules</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Continuous Protection</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {securityAlerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getSeverityColor(alert.severity)} variant="outline">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)} variant="secondary">
                        {alert.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{alert.type}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-medium">Affected Systems:</span>
                      <div className="flex gap-1 mt-1">
                        {alert.affectedSystems.map((system, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Investigate
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Traffic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Inbound Requests</span>
                    <span className="font-semibold">1,247/min</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Blocked Requests</span>
                    <span className="font-semibold text-red-600">23/min</span>
                  </div>
                  <Progress value={15} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>SSL Connections</span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Successful Logins</span>
                    <span className="font-semibold text-green-600">98.9%</span>
                  </div>
                  <Progress value={98.9} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Failed Attempts</span>
                    <span className="font-semibold text-yellow-600">1.1%</span>
                  </div>
                  <Progress value={1.1} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>2FA Enabled</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <CardTitle>SOC 2 Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600">Compliant</div>
                <div className="text-sm text-muted-foreground">Last Audit: Dec 2024</div>
                <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <CardTitle>GDPR Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600">Compliant</div>
                <div className="text-sm text-muted-foreground">Privacy Controls Active</div>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Verified</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Lock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <CardTitle>ISO 27001</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600">In Progress</div>
                <div className="text-sm text-muted-foreground">Certification Pending</div>
                <Badge className="mt-2 bg-purple-100 text-purple-800">Review</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center">
        Last security scan: {lastScanTime.toLocaleString()}
      </div>
    </div>
  );
}
