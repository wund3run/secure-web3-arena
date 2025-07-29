import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scan, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download
} from 'lucide-react';

interface SecurityScan {
  id: string;
  name: string;
  type: 'vulnerability' | 'compliance' | 'configuration' | 'dependency';
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  startTime: string;
  endTime?: string;
  findings: SecurityFinding[];
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
}

interface SecurityFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  title: string;
  description: string;
  location: string;
  recommendation: string;
  cve?: string;
  risk_score: number;
}

interface ScanConfiguration {
  id: string;
  name: string;
  enabled: boolean;
  schedule: string;
  scanTypes: string[];
  lastRun?: string;
  nextRun?: string;
}

export function AutomatedSecurityScanning() {
  const [activeScans, setActiveScans] = useState<SecurityScan[]>([
    {
      id: '1',
      name: 'Smart Contract Vulnerability Scan',
      type: 'vulnerability',
      status: 'running',
      progress: 65,
      startTime: '2024-01-15T14:00:00Z',
      findings: [],
      severity: 'medium'
    },
    {
      id: '2',
      name: 'Dependency Security Check',
      type: 'dependency',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-15T13:00:00Z',
      endTime: '2024-01-15T13:15:00Z',
      findings: [
        {
          id: 'dep-1',
          severity: 'high',
          category: 'Dependency',
          title: 'Vulnerable Package: lodash@4.17.20',
          description: 'Known security vulnerability in lodash package',
          location: 'package.json',
          recommendation: 'Update to lodash@4.17.21 or higher',
          cve: 'CVE-2021-23337',
          risk_score: 7.5
        }
      ],
      severity: 'high'
    }
  ]);

  const [scanConfigurations, setScanConfigurations] = useState<ScanConfiguration[]>([
    {
      id: 'auto-vuln',
      name: 'Automated Vulnerability Scanning',
      enabled: true,
      schedule: 'Daily at 2:00 AM',
      scanTypes: ['vulnerability', 'dependency'],
      lastRun: '2024-01-15T02:00:00Z',
      nextRun: '2024-01-16T02:00:00Z'
    },
    {
      id: 'compliance',
      name: 'Compliance Checks',
      enabled: true,
      schedule: 'Weekly on Sundays',
      scanTypes: ['compliance', 'configuration'],
      lastRun: '2024-01-14T00:00:00Z',
      nextRun: '2024-01-21T00:00:00Z'
    }
  ]);

  const [scanHistory, setScanHistory] = useState<SecurityScan[]>([
    {
      id: 'hist-1',
      name: 'Weekly Security Assessment',
      type: 'vulnerability',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-14T02:00:00Z',
      endTime: '2024-01-14T02:45:00Z',
      findings: [
        {
          id: 'vuln-1',
          severity: 'medium',
          category: 'Authentication',
          title: 'Weak Session Management',
          description: 'Session tokens do not have sufficient entropy',
          location: 'auth/session.js:45',
          recommendation: 'Implement stronger session token generation',
          risk_score: 5.2
        }
      ],
      severity: 'medium'
    }
  ]);

  const startScan = (scanType: string) => {
    const newScan: SecurityScan = {
      id: Date.now().toString(),
      name: `Manual ${scanType} Scan`,
      type: scanType as 'vulnerability' | 'compliance' | 'configuration' | 'dependency',
      status: 'running',
      progress: 0,
      startTime: new Date().toISOString(),
      findings: [],
      severity: 'info'
    };

    setActiveScans(prev => [...prev, newScan]);

    // Simulate scan progress
    const interval = setInterval(() => {
      setActiveScans(prev => prev.map(scan => {
        if (scan.id === newScan.id && scan.status === 'running') {
          const newProgress = Math.min(scan.progress + Math.random() * 15, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...scan,
              status: 'completed',
              progress: 100,
              endTime: new Date().toISOString()
            };
          }
          return { ...scan, progress: newProgress };
        }
        return scan;
      }));
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'info': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <Scan className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDuration = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);
    return `${duration} min`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-purple-500" />
                Automated Security Scanning
              </CardTitle>
              <CardDescription>
                Continuous security assessment and vulnerability detection
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => startScan('vulnerability')}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Start Manual Scan
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="active">Active Scans</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeScans.map((scan) => (
            <Card key={scan.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(scan.status)}
                      <h4 className="font-semibold">{scan.name}</h4>
                      <Badge className={getSeverityColor(scan.severity)} variant="outline">
                        {scan.severity}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {scan.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(scan.progress)}%</span>
                      </div>
                      <Progress value={scan.progress} className="h-2" />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Started:</span>
                          <div>{new Date(scan.startTime).toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <div>{formatDuration(scan.startTime, scan.endTime)}</div>
                        </div>
                      </div>
                      
                      {scan.findings.length > 0 && (
                        <div>
                          <span className="text-sm font-medium">Findings: {scan.findings.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {scan.status === 'running' && (
                      <Button size="sm" variant="outline">
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    )}
                    {scan.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          {activeScans.concat(scanHistory).flatMap(scan => scan.findings).map((finding) => (
            <Card key={finding.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getSeverityColor(finding.severity)} variant="outline">
                        {finding.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary">{finding.category}</Badge>
                      {finding.cve && (
                        <Badge variant="outline" className="font-mono text-xs">
                          {finding.cve}
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-medium mb-1">{finding.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium">Location:</span>
                        <div className="font-mono text-xs">{finding.location}</div>
                      </div>
                      <div>
                        <span className="font-medium">Risk Score:</span>
                        <div className="font-bold">{finding.risk_score}/10</div>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <div>Open</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded border">
                      <span className="text-sm font-medium">Recommendation:</span>
                      <div className="text-sm mt-1">{finding.recommendation}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Details
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

        <TabsContent value="configuration" className="space-y-4">
          {scanConfigurations.map((config) => (
            <Card key={config.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Settings className="h-4 w-4" />
                      <h4 className="font-semibold">{config.name}</h4>
                      <Badge variant={config.enabled ? "default" : "secondary"}>
                        {config.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Schedule:</span>
                        <div>{config.schedule}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <div>{config.lastRun ? new Date(config.lastRun).toLocaleString() : 'Never'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Run:</span>
                        <div>{config.nextRun ? new Date(config.nextRun).toLocaleString() : 'Not scheduled'}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="text-sm font-medium">Scan Types:</span>
                      <div className="flex gap-1 mt-1">
                        {config.scanTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs capitalize">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Run Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {scanHistory.map((scan) => (
            <Card key={scan.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(scan.status)}
                      <h4 className="font-medium">{scan.name}</h4>
                      <Badge className={getSeverityColor(scan.severity)} variant="outline">
                        {scan.severity}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {scan.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Started:</span>
                        <div>{new Date(scan.startTime).toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div>{formatDuration(scan.startTime, scan.endTime)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Findings:</span>
                        <div className="font-semibold">{scan.findings.length}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <div className="capitalize">{scan.status}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
