import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  Target,
  Clock,
  FileText,
  Download,
  Copy,
  Play,
  Loader2,
  Eye,
  Settings,
  TrendingUp,
  Activity,
  Link,
  Zap,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

interface CrossChainVulnerability {
  id: string;
  type: 'bridge' | 'consensus' | 'interoperability' | 'governance' | 'liquidity';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedChains: string[];
  impact: string;
  recommendation: string;
  confidence: number;
  automated: boolean;
  timestamp: Date;
}

interface BridgeSecurity {
  id: string;
  bridgeName: string;
  sourceChain: string;
  targetChain: string;
  securityScore: number;
  vulnerabilities: CrossChainVulnerability[];
  recommendations: string[];
  lastAudit: string;
  tvl: number;
}

interface ChainComparison {
  chain: string;
  consensus: string;
  securityFeatures: string[];
  knownVulnerabilities: string[];
  auditHistory: number;
  securityScore: number;
}

export function CrossChainSecurityAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedChains, setSelectedChains] = useState<string[]>(['ethereum', 'polygon']);
  const [analysisResults, setAnalysisResults] = useState<CrossChainVulnerability[]>([]);
  const [bridgeSecurity, setBridgeSecurity] = useState<BridgeSecurity[]>([]);
  const [chainComparison, setChainComparison] = useState<ChainComparison[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('vulnerabilities');

  const availableChains = [
    { id: 'ethereum', name: 'Ethereum', icon: '🔵' },
    { id: 'polygon', name: 'Polygon', icon: '🟣' },
    { id: 'bsc', name: 'BSC', icon: '🟡' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔵' },
    { id: 'optimism', name: 'Optimism', icon: '🔴' },
    { id: 'avalanche', name: 'Avalanche', icon: '🔴' },
    { id: 'solana', name: 'Solana', icon: '🟣' },
    { id: 'cosmos', name: 'Cosmos', icon: '🔵' }
  ];

  useEffect(() => {
    generateSampleData();
  }, []);

  const generateSampleData = () => {
    const sampleVulnerabilities: CrossChainVulnerability[] = [
      {
        id: '1',
        type: 'bridge',
        severity: 'critical',
        title: 'Bridge Reentrancy Vulnerability',
        description: 'Cross-chain bridge allows reentrancy attacks during asset transfers.',
        affectedChains: ['ethereum', 'polygon'],
        impact: 'Potential loss of locked assets across chains',
        recommendation: 'Implement proper reentrancy guards and state validation',
        confidence: 92,
        automated: true,
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'consensus',
        severity: 'high',
        title: 'Consensus Mechanism Mismatch',
        description: 'Different consensus mechanisms may lead to finality issues.',
        affectedChains: ['ethereum', 'solana'],
        impact: 'Transaction finality and confirmation delays',
        recommendation: 'Implement proper finality checks and confirmation mechanisms',
        confidence: 85,
        automated: true,
        timestamp: new Date()
      }
    ];

    const sampleBridgeSecurity: BridgeSecurity[] = [
      {
        id: '1',
        bridgeName: 'Polygon Bridge',
        sourceChain: 'Ethereum',
        targetChain: 'Polygon',
        securityScore: 78,
        vulnerabilities: [sampleVulnerabilities[0]],
        recommendations: [
          'Implement additional validation layers',
          'Add circuit breakers for emergency stops',
          'Regular security audits'
        ],
        lastAudit: '2024-12-15',
        tvl: 2500000000
      },
      {
        id: '2',
        bridgeName: 'Arbitrum Bridge',
        sourceChain: 'Ethereum',
        targetChain: 'Arbitrum',
        securityScore: 85,
        vulnerabilities: [],
        recommendations: [
          'Monitor for new attack vectors',
          'Implement real-time monitoring'
        ],
        lastAudit: '2024-12-20',
        tvl: 1800000000
      }
    ];

    const sampleChainComparison: ChainComparison[] = [
      {
        chain: 'Ethereum',
        consensus: 'Proof of Stake',
        securityFeatures: ['Smart Contract Security', 'Formal Verification', 'Bug Bounties'],
        knownVulnerabilities: ['MEV', 'Front-running'],
        auditHistory: 150,
        securityScore: 92
      },
      {
        chain: 'Polygon',
        consensus: 'Proof of Stake',
        securityFeatures: ['Plasma Framework', 'Checkpointing', 'Validator Security'],
        knownVulnerabilities: ['Bridge Vulnerabilities', 'Validator Centralization'],
        auditHistory: 45,
        securityScore: 78
      }
    ];

    setAnalysisResults(sampleVulnerabilities);
    setBridgeSecurity(sampleBridgeSecurity);
    setChainComparison(sampleChainComparison);
  };

  const runCrossChainAnalysis = async () => {
    if (selectedChains.length < 2) {
      toast.error('Please select at least 2 chains for cross-chain analysis');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate multi-stage cross-chain analysis
    const stages = [
      { name: 'Chain Compatibility Analysis', duration: 1200 },
      { name: 'Bridge Security Assessment', duration: 1800 },
      { name: 'Consensus Mechanism Analysis', duration: 1500 },
      { name: 'Interoperability Testing', duration: 2000 },
      { name: 'Vulnerability Correlation', duration: 1600 }
    ];

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      setAnalysisProgress(((i + 1) / stages.length) * 100);
      toast.info(`Running ${stage.name}...`);
      await new Promise(resolve => setTimeout(resolve, stage.duration));
    }

    // Generate new cross-chain vulnerability
    const newVulnerability: CrossChainVulnerability = {
      id: Date.now().toString(),
      type: 'interoperability',
      severity: 'medium',
      title: 'Cross-Chain Message Validation Issue',
      description: 'Insufficient validation of cross-chain messages between selected chains.',
      affectedChains: selectedChains,
      impact: 'Potential message replay attacks and state inconsistencies',
      recommendation: 'Implement proper message validation and nonce checking',
      confidence: 88,
      automated: true,
      timestamp: new Date()
    };

    setAnalysisResults(prev => [newVulnerability, ...prev]);
    setIsAnalyzing(false);
    setAnalysisProgress(100);
    toast.success('Cross-chain analysis completed!');
  };

  const toggleChainSelection = (chainId: string) => {
    setSelectedChains(prev => 
      prev.includes(chainId) 
        ? prev.filter(id => id !== chainId)
        : [...prev, chainId]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cross-Chain Security Analyzer</h1>
          <p className="text-muted-foreground">
            Multi-chain vulnerability detection and bridge security assessment
          </p>
        </div>
        <Button onClick={runCrossChainAnalysis} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Analysis
            </>
          )}
        </Button>
      </div>

      {/* Chain Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Select Chains for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableChains.map((chain) => (
              <Button
                key={chain.id}
                variant={selectedChains.includes(chain.id) ? "default" : "outline"}
                className="flex items-center gap-2 h-auto p-3"
                onClick={() => toggleChainSelection(chain.id)}
              >
                <span className="text-lg">{chain.icon}</span>
                <span className="text-sm">{chain.name}</span>
              </Button>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Selected: {selectedChains.length} chains ({selectedChains.join(', ')})
          </div>
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-blue-600 animate-pulse" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Cross-Chain Analysis Progress</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Vulnerabilities ({analysisResults.length})
          </TabsTrigger>
          <TabsTrigger value="bridges" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Bridge Security ({bridgeSecurity.length})
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Chain Comparison ({chainComparison.length})
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-4">
          {analysisResults.map((vulnerability) => (
            <Card key={vulnerability.id} className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-medium">{vulnerability.title}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{vulnerability.type} vulnerability</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(vulnerability.severity)}>
                    {vulnerability.severity}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {vulnerability.description}
                </p>

                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-2">Affected Chains</h5>
                  <div className="flex flex-wrap gap-2">
                    {vulnerability.affectedChains.map((chain) => (
                      <Badge key={chain} variant="outline" className="text-xs">
                        {chain}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-1">Impact</h5>
                  <p className="text-sm">{vulnerability.impact}</p>
                </div>

                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                  <p className="text-sm">{vulnerability.recommendation}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Confidence: {vulnerability.confidence}%</span>
                    <span>{vulnerability.automated ? 'Automated' : 'Manual'}</span>
                  </div>
                  <span>{vulnerability.timestamp.toLocaleTimeString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="bridges" className="space-y-4">
          {bridgeSecurity.map((bridge) => (
            <Card key={bridge.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="h-5 w-5" />
                      {bridge.bridgeName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {bridge.sourceChain} → {bridge.targetChain}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getSecurityScoreColor(bridge.securityScore)}`}>
                      {bridge.securityScore}/100
                    </div>
                    <p className="text-xs text-muted-foreground">Security Score</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">${(bridge.tvl / 1000000000).toFixed(1)}B</div>
                    <div className="text-xs text-muted-foreground">Total Value Locked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{bridge.vulnerabilities.length}</div>
                    <div className="text-xs text-muted-foreground">Vulnerabilities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{bridge.lastAudit}</div>
                    <div className="text-xs text-muted-foreground">Last Audit</div>
                  </div>
                </div>

                {bridge.vulnerabilities.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium mb-2">Vulnerabilities</h5>
                    <div className="space-y-2">
                      {bridge.vulnerabilities.map((vuln) => (
                        <div key={vuln.id} className="p-2 bg-red-50 border border-red-200 rounded">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            <span className="text-sm font-medium">{vuln.title}</span>
                            <Badge className={getSeverityColor(vuln.severity)}>
                              {vuln.severity}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-medium mb-2">Recommendations</h5>
                  <ul className="space-y-1">
                    {bridge.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chainComparison.map((chain) => (
              <Card key={chain.chain}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      {chain.chain}
                    </CardTitle>
                    <div className={`text-2xl font-bold ${getSecurityScoreColor(chain.securityScore)}`}>
                      {chain.securityScore}/100
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Consensus Mechanism</h5>
                      <Badge variant="outline">{chain.consensus}</Badge>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Security Features</h5>
                      <div className="flex flex-wrap gap-1">
                        {chain.securityFeatures.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Known Vulnerabilities</h5>
                      <div className="flex flex-wrap gap-1">
                        {chain.knownVulnerabilities.map((vuln, index) => (
                          <Badge key={index} variant="error" className="text-xs">
                            {vuln}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Audit History: </span>
                        <span className="font-medium">{chain.auditHistory} audits</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Security Score: </span>
                        <span className="font-medium">{chain.securityScore}/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h4 className="font-medium">Cross-Chain Vulnerabilities</h4>
                  <p className="text-2xl font-bold text-red-500">{analysisResults.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {analysisResults.filter(v => v.severity === 'critical').length} critical
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Link className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">Bridges Analyzed</h4>
                  <p className="text-2xl font-bold text-blue-500">{bridgeSecurity.length}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg Score: {Math.round(bridgeSecurity.reduce((sum, b) => sum + b.securityScore, 0) / bridgeSecurity.length)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Network className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Chains Compared</h4>
                  <p className="text-2xl font-bold text-green-500">{chainComparison.length}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg Score: {Math.round(chainComparison.reduce((sum, c) => sum + c.securityScore, 0) / chainComparison.length)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cross-Chain Analysis Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Analysis Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chains Analyzed</span>
                  <span>{selectedChains.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bridges Checked</span>
                  <span>{bridgeSecurity.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Analysis Time</span>
                  <span>~8.1 seconds</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CrossChainSecurityAnalyzer; 