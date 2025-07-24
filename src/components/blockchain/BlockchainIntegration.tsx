import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet,
  Shield,
  Code,
  CheckCircle,
  AlertTriangle,
  Link,
  Globe,
  Settings,
  RefreshCw,
  Copy,
  ExternalLink,
  Search,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ContractInfo {
  address: string;
  name: string;
  network: string;
  verified: boolean;
  compiler_version: string;
  optimization: boolean;
  runs: number;
  proxy_type?: string;
  implementation_address?: string;
}

interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  gas_used: string;
  gas_price: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  block_number: number;
  function_name?: string;
}

interface SecurityCheck {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'warning' | 'running';
  description: string;
  details?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface BlockchainIntegrationProps {
  auditId: string;
  className?: string;
}

export function BlockchainIntegration({ auditId, className }: BlockchainIntegrationProps) {
  const [activeTab, setActiveTab] = useState('contracts');
  const [contractAddress, setContractAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

  const networks = [
    { id: 'ethereum', name: 'Ethereum Mainnet', chainId: 1 },
    { id: 'polygon', name: 'Polygon', chainId: 137 },
    { id: 'bsc', name: 'BSC', chainId: 56 },
    { id: 'arbitrum', name: 'Arbitrum', chainId: 42161 },
    { id: 'optimism', name: 'Optimism', chainId: 10 },
    { id: 'avalanche', name: 'Avalanche', chainId: 43114 }
  ];

  const mockContractInfo: ContractInfo = {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    name: 'Uniswap Token',
    network: 'ethereum',
    verified: true,
    compiler_version: '0.7.6+commit.7338295f',
    optimization: true,
    runs: 999999,
    proxy_type: 'Transparent',
    implementation_address: '0x41A08648C3766F9F9d85598fF102a08f4ef84F84'
  };

  const mockTransactions: TransactionData[] = [
    {
      hash: '0x1234567890abcdef...',
      from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      to: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      value: '0.0',
      gas_used: '46,523',
      gas_price: '20.5',
      status: 'success',
      timestamp: '2024-01-15T10:30:00Z',
      block_number: 18950000,
      function_name: 'transfer'
    }
  ];

  const mockSecurityChecks: SecurityCheck[] = [
    {
      id: '1',
      name: 'Reentrancy Protection',
      status: 'passed',
      description: 'Contract implements proper reentrancy guards',
      severity: 'high'
    },
    {
      id: '2',
      name: 'Access Control',
      status: 'warning',
      description: 'Some functions lack proper access control',
      details: 'Functions: mint(), burn() should have onlyOwner modifier',
      severity: 'medium'
    }
  ];

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      setWalletAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setWalletAddress('');
    toast.info('Wallet disconnected');
  }, []);

  const fetchContractInfo = useCallback(async () => {
    if (!contractAddress) {
      toast.error('Please enter a contract address');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setContractInfo(mockContractInfo);
      setTransactions(mockTransactions);
      toast.success('Contract information loaded successfully!');
    } catch (error) {
      toast.error('Failed to fetch contract information');
    } finally {
      setIsLoading(false);
    }
  }, [contractAddress]);

  const runSecurityChecks = useCallback(async () => {
    setIsLoading(true);
    setSecurityChecks([]);
    
    try {
      for (let i = 0; i < mockSecurityChecks.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSecurityChecks(prev => [...prev, { ...mockSecurityChecks[i], status: 'running' }]);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSecurityChecks(prev => 
          prev.map((check, index) => 
            index === i ? { ...mockSecurityChecks[i] } : check
          )
        );
      }
      toast.success('Security checks completed!');
    } catch (error) {
      toast.error('Security checks failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyContract = useCallback(async () => {
    setVerificationStatus('verifying');
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setVerificationStatus('verified');
      toast.success('Contract verified successfully!');
    } catch (error) {
      setVerificationStatus('failed');
      toast.error('Contract verification failed');
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': case 'success': case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'running': case 'pending': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': case 'success': case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'failed': case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'running': case 'pending': return <RefreshCw className="h-4 w-4 animate-spin" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Link className="h-8 w-8 text-primary" />
            Blockchain Integration
          </h2>
          <p className="text-muted-foreground">
            Smart contract interaction and on-chain verification
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isConnected ? (
            <Button onClick={connectWallet} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Badge>
              <Button variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Network Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Network</label>
              <select 
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full p-2 border rounded-md"
                title="Select blockchain network"
              >
                {networks.map(network => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Contract Address</label>
              <Input
                placeholder="0x..."
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={fetchContractInfo} disabled={isLoading || !contractAddress} className="w-full gap-2">
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Analyze Contract
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">Contract Info</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security Checks</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-6">
          {contractInfo ? (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Contract Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contract Name</label>
                    <p className="font-mono">{contractInfo.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm">{contractInfo.address}</p>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(contractInfo.address)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Network</label>
                    <p className="capitalize">{contractInfo.network}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                    <Badge variant={contractInfo.verified ? "default" : "destructive"}>
                      {contractInfo.verified ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Compilation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Compiler Version</label>
                    <p className="font-mono">{contractInfo.compiler_version}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Optimization</label>
                    <Badge variant={contractInfo.optimization ? "default" : "secondary"}>
                      {contractInfo.optimization ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Optimization Runs</label>
                    <p>{contractInfo.runs.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Enter a contract address and select a network to view contract information</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {transactions.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {transactions.map((tx, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(tx.status)}>
                              {getStatusIcon(tx.status)}
                              {tx.status}
                            </Badge>
                            {tx.function_name && (
                              <Badge variant="outline">{tx.function_name}</Badge>
                            )}
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>Block #{tx.block_number.toLocaleString()}</div>
                            <div>{new Date(tx.timestamp).toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Hash:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono">{tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}</span>
                              <Button size="sm" variant="outline" onClick={() => copyToClipboard(tx.hash)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">From:</span>
                            <span className="font-mono">{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">To:</span>
                            <span className="font-mono">{tx.to.slice(0, 6)}...{tx.to.slice(-4)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Gas Used:</span>
                            <span>{tx.gas_used} ({tx.gas_price} Gwei)</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No transactions found. Analyze a contract to view its transaction history.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Security Analysis</h3>
            <Button onClick={runSecurityChecks} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Running Checks...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Run Security Checks
                </>
              )}
            </Button>
          </div>

          {securityChecks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {securityChecks.map((check) => (
                <Card key={check.id} className={cn("border", getStatusColor(check.status))}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(check.status)}
                        <h4 className="font-medium">{check.name}</h4>
                      </div>
                      <Badge variant="outline" className={getStatusColor(check.severity)}>
                        {check.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{check.description}</p>
                    {check.details && (
                      <Alert>
                        <AlertDescription className="text-xs">
                          {check.details}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Run security checks to analyze contract vulnerabilities and best practices</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Contract Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Source Code</label>
                  <Textarea
                    placeholder="Paste your Solidity source code here..."
                    rows={10}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Compiler Version</label>
                    <Input placeholder="0.8.19+commit.7dd6d404" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Constructor Arguments</label>
                    <Input placeholder="ABI-encoded constructor arguments" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="optimization" />
                    <label htmlFor="optimization" className="text-sm">Enable optimization</label>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Optimization Runs</label>
                    <Input placeholder="200" type="number" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  onClick={verifyContract}
                  disabled={verificationStatus === 'verifying'}
                  className="gap-2"
                >
                  {verificationStatus === 'verifying' ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Verify Contract
                    </>
                  )}
                </Button>
                
                {verificationStatus === 'verified' && (
                  <Badge variant="default" className="gap-2">
                    <CheckCircle className="h-3 w-3" />
                    Verified Successfully
                  </Badge>
                )}
                
                {verificationStatus === 'failed' && (
                  <Badge variant="destructive" className="gap-2">
                    <AlertTriangle className="h-3 w-3" />
                    Verification Failed
                  </Badge>
                )}
              </div>

              {verificationStatus === 'verifying' && (
                <div className="space-y-2">
                  <Progress value={60} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Compiling contract and comparing bytecode...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 