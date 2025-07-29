
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Activity, Eye, Zap } from 'lucide-react';
import { SecurityMonitoringService, SecurityAlert } from '@/services/integrations/securityMonitoringService';
import { toast } from 'sonner';

export const SecurityMonitoringDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAlerts: 0,
    criticalAlerts: 0,
    recentAlerts: [] as SecurityAlert[],
    monitoredContracts: 0
  });
  const [contractAddress, setContractAddress] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const data = await SecurityMonitoringService.getSecurityDashboardData();
    setDashboardData(data);
  };

  const handleSetupMonitoring = async () => {
    if (!contractAddress) {
      toast.error('Please enter a contract address');
      return;
    }

    setIsLoading(true);
    try {
      await SecurityMonitoringService.setupFortaMonitoring(contractAddress, network);
      await SecurityMonitoringService.setupDefenderAutotasks(contractAddress, network);
      await loadDashboardData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecurityScan = async () => {
    if (!contractAddress) {
      toast.error('Please enter a contract address');
      return;
    }

    setIsLoading(true);
    try {
      const results = await SecurityMonitoringService.runSecurityScan('// Contract code placeholder', 'mythril');
      console.log('Security scan results:', results);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Monitoring</h1>
          <p className="text-muted-foreground">
            Continuous security monitoring with Forta, OpenZeppelin Defender, and automated scanning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            Multi-Layer Protection
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalAlerts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{dashboardData.criticalAlerts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitored Contracts</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.monitoredContracts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitoring">Contract Monitoring</TabsTrigger>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="scanning">Automated Scanning</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setup Contract Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contract Address</label>
                  <input
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="0x..."
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Network</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSetupMonitoring} disabled={isLoading}>
                    {isLoading ? 'Setting up...' : 'Enable Monitoring'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <span className="font-medium">{alert.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Network: {alert.network}
                      </div>
                    </div>
                  </div>
                ))}
                {dashboardData.recentAlerts.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No security alerts found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Security Scanning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button onClick={handleSecurityScan} disabled={isLoading}>
                  <Zap className="h-4 w-4 mr-2" />
                  {isLoading ? 'Scanning...' : 'Run Mythril Scan'}
                </Button>
                <Button variant="outline" disabled={isLoading}>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Slither Analysis
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Mythril Security Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced symbolic execution for vulnerability detection
                  </p>
                </div>
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Slither Static Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast static analysis for common security issues
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
