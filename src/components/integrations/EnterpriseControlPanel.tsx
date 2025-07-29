
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, CheckCircle, Settings, Download, Globe } from 'lucide-react';
import { EnterpriseService } from '@/services/integrations/enterpriseService';
import { toast } from 'sonner';

export const EnterpriseControlPanel = () => {
  const [enterpriseMetrics, setEnterpriseMetrics] = useState({
    complianceScore: 0,
    totalSimulations: 0,
    verifiedIdentities: 0,
    deploymentHealth: 'unknown' as string
  });
  const [contractAddress, setContractAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEnterpriseMetrics();
  }, []);

  const loadEnterpriseMetrics = async () => {
    const metrics = await EnterpriseService.getEnterpriseMetrics();
    setEnterpriseMetrics(metrics);
  };

  const handleComplianceCheck = async () => {
    if (!contractAddress) {
      toast.error('Please enter a contract address');
      return;
    }

    setIsLoading(true);
    try {
      const report = await EnterpriseService.performComplianceCheck(contractAddress);
      if (report) {
        toast.success(`Compliance score: ${report.complianceScore}%`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCeramicProfile = async () => {
    setIsLoading(true);
    try {
      const profile = await EnterpriseService.createCeramicProfile({
        name: 'Hawkly User',
        description: 'Web3 Security Professional',
        image: '/hawkly-logo.svg'
      });
      
      if (profile) {
        toast.success(`Profile created with DID: ${profile.did}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateTransaction = async () => {
    if (!contractAddress) {
      toast.error('Please enter a contract address');
      return;
    }

    setIsLoading(true);
    try {
      const simulation = await EnterpriseService.simulateTransaction(
        contractAddress,
        'transfer',
        ['0x...', '1000000000000000000']
      );
      
      if (simulation) {
        toast.success(`Simulation completed. Gas used: ${simulation.gasUsed}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadKubernetesConfig = () => {
    const config = EnterpriseService.generateKubernetesConfig();
    const blob = new Blob([config], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hawkly-k8s-deployment.yaml';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Kubernetes configuration downloaded');
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'default';
      case 'degraded': return 'secondary';
      case 'unhealthy': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enterprise Control Panel</h1>
          <p className="text-muted-foreground">
            Advanced enterprise features including compliance, identity, and deployment management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Building className="h-3 w-3 mr-1" />
            Enterprise Grade
          </Badge>
          <Badge variant={getHealthColor(enterpriseMetrics.deploymentHealth)}>
            {enterpriseMetrics.deploymentHealth}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enterpriseMetrics.complianceScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simulations</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enterpriseMetrics.totalSimulations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Identities</CardTitle>
            <Globe className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enterpriseMetrics.verifiedIdentities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployment</CardTitle>
            <Badge variant={getHealthColor(enterpriseMetrics.deploymentHealth)}>
              {enterpriseMetrics.deploymentHealth}
            </Badge>
          </CardHeader>
          <CardContent>
            <Button size="sm" onClick={downloadKubernetesConfig}>
              <Download className="h-3 w-3 mr-1" />
              K8s Config
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compliance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="debugging">Contract Debugging</TabsTrigger>
          <TabsTrigger value="identity">Decentralized Identity</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chainalysis Compliance Checking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contract Address</label>
                  <input
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="0x..."
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleComplianceCheck} disabled={isLoading}>
                    {isLoading ? 'Checking...' : 'Run Compliance Check'}
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Compliance Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• AML/KYC verification</li>
                  <li>• Sanctions screening</li>
                  <li>• Risk assessment</li>
                  <li>• Regulatory reporting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debugging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenderly Contract Debugging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button onClick={handleSimulateTransaction} disabled={isLoading}>
                  {isLoading ? 'Simulating...' : 'Simulate Transaction'}
                </Button>
                <Button variant="outline">
                  Analyze Contract
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Transaction Simulation</h4>
                  <p className="text-sm text-muted-foreground">
                    Test contract interactions without spending gas
                  </p>
                </div>
                <div className="p-4 border rounded">
                  <h4 className="font-medium mb-2">Execution Traces</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed execution analysis and debugging
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="identity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ceramic Network Identity Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button onClick={handleCreateCeramicProfile} disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create DID Profile'}
                </Button>
                <Button variant="outline">
                  Verify Credentials
                </Button>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Decentralized Identity Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Self-sovereign identity</li>
                  <li>• Verifiable credentials</li>
                  <li>• Cross-platform compatibility</li>
                  <li>• Privacy-preserving</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kubernetes Deployment Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button onClick={downloadKubernetesConfig}>
                  <Download className="h-4 w-4 mr-2" />
                  Download K8s Config
                </Button>
                <Button variant="outline">
                  View Cluster Status
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded text-center">
                  <div className="text-2xl font-bold text-green-500">3</div>
                  <div className="text-sm text-muted-foreground">Running Pods</div>
                </div>
                <div className="p-4 border rounded text-center">
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Services</div>
                </div>
                <div className="p-4 border rounded text-center">
                  <div className="text-2xl font-bold text-blue-500">1</div>
                  <div className="text-sm text-muted-foreground">Load Balancer</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
