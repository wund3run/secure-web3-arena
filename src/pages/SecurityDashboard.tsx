import React, { useState, useEffect } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard } from '@/components/ui/hawkly-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SecurityAlert } from '@/services/integrations/securityMonitoringService';
import { SecurityDashboard as SecurityDashboardComponent } from '@/components/security/SecurityDashboard';
import { SecurityMonitoringDashboard } from '@/components/integrations/SecurityMonitoringDashboard';
import { HawklyTabs } from '@/components/ui/hawkly-tabs';
import { SecurityAnalyticsChart } from '@/components/security/SecurityAnalyticsChart';
import { SecurityThreatMatrix } from '@/components/security/SecurityThreatMatrix';
import { SecurityComplianceStatus } from '@/components/security/SecurityComplianceStatus';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import {
  Shield,
  AlertTriangle,
  Activity,
  Eye,
  Zap,
  RefreshCw,
  Download,
  FileText,
  GitMerge,
  CheckCircle2,
  Globe,
  Server
} from 'lucide-react';

interface DashboardMetrics {
  totalAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  resolvedAlerts: number;
  securityScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

const SecurityDashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedView, setSelectedView] = useState<string>('overview');
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAlerts: 0,
    criticalAlerts: 0,
    highAlerts: 0,
    resolvedAlerts: 0,
    securityScore: 0,
    threatLevel: 'medium'
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMetrics({
          totalAlerts: 42,
          criticalAlerts: 3,
          highAlerts: 8,
          resolvedAlerts: 31,
          securityScore: 84,
          threatLevel: 'medium'
        });
      } catch (error) {
        console.error('Error loading security data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load security dashboard data',
          variant: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const refreshDashboard = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Dashboard Refreshed',
        description: 'Security metrics updated successfully'
      });
    }, 1000);
  };

  const downloadReport = (format: 'pdf' | 'csv') => {
    toast({
      title: 'Downloading Report',
      description: `Security report will be downloaded as ${format.toUpperCase()}`
    });
    // Implementation would connect to a report generation service
  };

  // Get the color for threat level badges
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500 hover:bg-red-600';
      case 'high': return 'bg-orange-500 hover:bg-orange-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <ProductionLayout
      title="Security Dashboard"
      description="Comprehensive security monitoring and analysis for Web3 projects"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Security Dashboard
            </h1>
            <p className="text-lg text-gray-300">
              Comprehensive security monitoring and vulnerability management
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button 
              onClick={refreshDashboard} 
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4" />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              onClick={() => downloadReport('pdf')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Security Score and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <HawklyCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-300">Security Score</h2>
                {isLoading ? (
                  <Skeleton className="h-10 w-20 mt-2" />
                ) : (
                  <div className="text-4xl font-bold text-white">{metrics.securityScore}</div>
                )}
              </div>
              <div className={`rounded-full p-3 ${metrics.securityScore >= 80 ? 'bg-emerald-900/30' : metrics.securityScore >= 60 ? 'bg-yellow-900/30' : 'bg-red-900/30'}`}>
                <Shield className={`h-6 w-6 ${metrics.securityScore >= 80 ? 'text-emerald-500' : metrics.securityScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`} />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-4 w-full mt-4" />
            ) : (
              <p className="text-sm mt-2 text-gray-400">
                {metrics.securityScore >= 80 
                  ? 'Excellent security posture' 
                  : metrics.securityScore >= 60 
                    ? 'Good security stance with some improvements needed' 
                    : 'Critical security issues require attention'}
              </p>
            )}
          </HawklyCard>

          <HawklyCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-300">Active Alerts</h2>
                {isLoading ? (
                  <Skeleton className="h-10 w-20 mt-2" />
                ) : (
                  <div className="text-4xl font-bold text-white">{metrics.totalAlerts}</div>
                )}
              </div>
              <div className="rounded-full p-3 bg-blue-900/30">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-4 w-full mt-4" />
            ) : (
              <p className="text-sm mt-2 text-gray-400">
                {metrics.criticalAlerts} critical, {metrics.highAlerts} high, {metrics.totalAlerts - metrics.criticalAlerts - metrics.highAlerts} other
              </p>
            )}
          </HawklyCard>

          <HawklyCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-300">Threat Level</h2>
                {isLoading ? (
                  <Skeleton className="h-10 w-20 mt-2" />
                ) : (
                  <div className="text-4xl font-bold text-white capitalize">{metrics.threatLevel}</div>
                )}
              </div>
              <div className={`rounded-full p-3 ${
                metrics.threatLevel === 'critical' ? 'bg-red-900/30' : 
                metrics.threatLevel === 'high' ? 'bg-orange-900/30' :
                metrics.threatLevel === 'medium' ? 'bg-yellow-900/30' : 'bg-green-900/30'
              }`}>
                <AlertTriangle className={`h-6 w-6 ${
                  metrics.threatLevel === 'critical' ? 'text-red-500' : 
                  metrics.threatLevel === 'high' ? 'text-orange-500' :
                  metrics.threatLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-4 w-full mt-4" />
            ) : (
              <p className="text-sm mt-2 text-gray-400">
                Current blockchain ecosystem threat assessment
              </p>
            )}
          </HawklyCard>

          <HawklyCard variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-300">Resolved Issues</h2>
                {isLoading ? (
                  <Skeleton className="h-10 w-20 mt-2" />
                ) : (
                  <div className="text-4xl font-bold text-white">{metrics.resolvedAlerts}</div>
                )}
              </div>
              <div className="rounded-full p-3 bg-green-900/30">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-4 w-full mt-4" />
            ) : (
              <p className="text-sm mt-2 text-gray-400">
                {Math.round((metrics.resolvedAlerts / (metrics.totalAlerts + metrics.resolvedAlerts)) * 100)}% of all issues resolved
              </p>
            )}
          </HawklyCard>
        </div>

        <HawklyTabs defaultValue="overview" value={selectedView} onValueChange={setSelectedView}>
          <div className="mb-6">
            <TabsList className="h-12 bg-transparent border-b border-gray-800">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent px-4"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent px-4"
              >
                Contract Monitoring
              </TabsTrigger>
              <TabsTrigger 
                value="audits" 
                className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent px-4"
              >
                Audit Logs
              </TabsTrigger>
              <TabsTrigger 
                value="compliance" 
                className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent px-4"
              >
                Compliance
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <HawklyCard variant="glass" className="p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Security Analytics</h2>
                  <div className="h-80">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Skeleton className="h-6 w-40 mx-auto" />
                          <p className="text-sm text-gray-400 mt-2">Loading security analytics...</p>
                        </div>
                      </div>
                    ) : (
                      <SecurityAnalyticsChart />
                    )}
                  </div>
                </HawklyCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <HawklyCard variant="glass" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Network Security</h3>
                      <Globe className="h-5 w-5 text-blue-500" />
                    </div>
                    {isLoading ? (
                      <>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Blockchain Node Status</span>
                          <Badge variant="outline" className="bg-green-900/20 text-green-500">Secure</Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">API Gateway Protection</span>
                          <Badge variant="outline" className="bg-green-900/20 text-green-500">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">RPC Endpoint Security</span>
                          <Badge variant="outline" className="bg-yellow-900/20 text-yellow-500">Review</Badge>
                        </div>
                      </>
                    )}
                  </HawklyCard>

                  <HawklyCard variant="glass" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Infrastructure</h3>
                      <Server className="h-5 w-5 text-purple-500" />
                    </div>
                    {isLoading ? (
                      <>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Server Hardening</span>
                          <Badge variant="outline" className="bg-green-900/20 text-green-500">Compliant</Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Database Encryption</span>
                          <Badge variant="outline" className="bg-green-900/20 text-green-500">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Key Management</span>
                          <Badge variant="outline" className="bg-green-900/20 text-green-500">Secure</Badge>
                        </div>
                      </>
                    )}
                  </HawklyCard>
                </div>
              </div>

              <div className="space-y-6">
                <HawklyCard variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Critical Alerts</h3>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-16 w-full mb-3" />
                      <Skeleton className="h-16 w-full mb-3" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border border-red-900 bg-red-900/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="error" className="bg-red-500">Critical</Badge>
                          <span className="font-medium">RPC Endpoint Exposed</span>
                        </div>
                        <p className="text-sm text-gray-400">Sensitive RPC endpoint detected with insufficient access controls.</p>
                      </div>
                      <div className="p-3 rounded-lg border border-red-900 bg-red-900/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="error" className="bg-red-500">Critical</Badge>
                          <span className="font-medium">Private Key Exposure Risk</span>
                        </div>
                        <p className="text-sm text-gray-400">Potential environment variable exposure in deployment script.</p>
                      </div>
                      <div className="p-3 rounded-lg border border-orange-900 bg-orange-900/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-orange-900/20 text-orange-500">High</Badge>
                          <span className="font-medium">Outdated Dependencies</span>
                        </div>
                        <p className="text-sm text-gray-400">Multiple critical dependencies need updates for security patches.</p>
                      </div>
                      <Button variant="link" className="text-blue-500 p-0 h-auto">View all alerts</Button>
                    </div>
                  )}
                </HawklyCard>

                <HawklyCard variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Threat Matrix</h3>
                  {isLoading ? (
                    <div className="h-40">
                      <Skeleton className="h-full w-full" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-red-900/10 border border-red-900 rounded p-2 text-center">
                          <div className="text-xl font-bold text-red-500">High</div>
                          <div className="text-xs text-gray-400">Impact</div>
                        </div>
                        <div className="bg-orange-900/10 border border-orange-900 rounded p-2 text-center">
                          <div className="text-xl font-bold text-orange-500">Medium</div>
                          <div className="text-xs text-gray-400">Likelihood</div>
                        </div>
                      </div>
                      <SecurityThreatMatrix />
                      <Button variant="link" className="text-blue-500 p-0 h-auto">View full threat assessment</Button>
                    </div>
                  )}
                </HawklyCard>

                <HawklyCard variant="glass" className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="space-y-3">
                    <Button variant="default" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Run Security Scan
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Compliance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <GitMerge className="h-4 w-4 mr-2" />
                      Review Code Changes
                    </Button>
                  </div>
                </HawklyCard>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-0">
            <SecurityMonitoringDashboard />
          </TabsContent>

          <TabsContent value="audits" className="mt-0">
            <SecurityDashboardComponent />
          </TabsContent>

          <TabsContent value="compliance" className="mt-0">
            <SecurityComplianceStatus />
          </TabsContent>
        </HawklyTabs>
      </div>
    </ProductionLayout>
  );
};

export default SecurityDashboardPage;
