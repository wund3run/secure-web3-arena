import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Shield, 
  Zap, 
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
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

interface VulnerabilityReport {
  id: string;
  type: 'reentrancy' | 'overflow' | 'access_control' | 'gas_optimization' | 'logic_error';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  codeSnippet: string;
  lineNumber: number;
  recommendation: string;
  confidence: number;
  automated: boolean;
  timestamp: Date;
  chainSpecific?: string[];
}

interface GasOptimization {
  id: string;
  type: 'storage' | 'computation' | 'memory' | 'loop';
  potential: number; // gas savings in wei
  description: string;
  codeSnippet: string;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
}

interface SecurityPattern {
  id: string;
  name: string;
  description: string;
  implementation: string;
  bestPractices: string[];
  examples: string[];
}

export function CodeAnalysisEngine() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [analysisResults, setAnalysisResults] = useState<VulnerabilityReport[]>([]);
  const [gasOptimizations, setGasOptimizations] = useState<GasOptimization[]>([]);
  const [securityPatterns, setSecurityPatterns] = useState<SecurityPattern[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [activeTab, setActiveTab] = useState('vulnerabilities');

  useEffect(() => {
    // Initialize with sample data
    generateSampleData();
  }, []);

  const generateSampleData = () => {
    const sampleVulnerabilities: VulnerabilityReport[] = [
      {
        id: '1',
        type: 'reentrancy',
        severity: 'critical',
        title: 'Reentrancy Vulnerability in Withdraw Function',
        description: 'The withdraw function updates state after external call, allowing reentrancy attacks.',
        codeSnippet: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    balances[msg.sender] -= amount; // State updated after external call
}`,
        lineNumber: 5,
        recommendation: 'Implement checks-effects-interactions pattern. Update state before external calls.',
        confidence: 95,
        automated: true,
        timestamp: new Date(),
        chainSpecific: ['ethereum', 'polygon', 'bsc']
      },
      {
        id: '2',
        type: 'overflow',
        severity: 'high',
        title: 'Potential Integer Overflow',
        description: 'Unchecked arithmetic operations may cause overflow in older Solidity versions.',
        codeSnippet: `function calculateReward(uint256 amount) external pure returns (uint256) {
    return amount * 100 / 1000; // Potential overflow
}`,
        lineNumber: 2,
        recommendation: 'Use SafeMath or Solidity 0.8+ with overflow protection.',
        confidence: 88,
        automated: true,
        timestamp: new Date(),
        chainSpecific: ['ethereum']
      }
    ];

    const sampleGasOptimizations: GasOptimization[] = [
      {
        id: '1',
        type: 'storage',
        potential: 5000,
        description: 'Multiple storage reads can be optimized by caching values in memory.',
        codeSnippet: `// Current implementation
function processUser(address user) external {
    require(userInfo[user].isActive, "User not active");
    require(userInfo[user].balance > 0, "No balance");
    require(userInfo[user].lastActivity > block.timestamp - 30 days, "Inactive");
    // ... rest of function
}`,
        recommendation: 'Cache userInfo[user] in memory variable to reduce storage reads.',
        impact: 'high'
      },
      {
        id: '2',
        type: 'computation',
        potential: 3000,
        description: 'Expensive operations in loops can be optimized.',
        codeSnippet: `for (uint i = 0; i < users.length; i++) {
    // Expensive operation repeated in loop
    uint256 userBalance = calculateComplexBalance(users[i]);
    totalBalance += userBalance;
}`,
        recommendation: 'Move expensive calculations outside loops or use batch processing.',
        impact: 'medium'
      }
    ];

    const sampleSecurityPatterns: SecurityPattern[] = [
      {
        id: '1',
        name: 'Checks-Effects-Interactions Pattern',
        description: 'A security pattern that prevents reentrancy attacks by ordering operations correctly.',
        implementation: `function withdraw(uint256 amount) external {
    // 1. Checks
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // 2. Effects (state changes)
    balances[msg.sender] -= amount;
    
    // 3. Interactions (external calls)
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}`,
        bestPractices: [
          'Always update state before external calls',
          'Use reentrancy guards for complex interactions',
          'Validate all inputs before processing'
        ],
        examples: [
          'Withdraw functions',
          'Token transfers',
          'External contract calls'
        ]
      }
    ];

    setAnalysisResults(sampleVulnerabilities);
    setGasOptimizations(sampleGasOptimizations);
    setSecurityPatterns(sampleSecurityPatterns);
  };

  const runAnalysis = async () => {
    if (!codeInput.trim()) {
      toast.error('Please enter code to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate multi-stage analysis
    const stages = [
      { name: 'Static Analysis', duration: 1000 },
      { name: 'Vulnerability Detection', duration: 1500 },
      { name: 'Gas Optimization', duration: 1200 },
      { name: 'Security Pattern Analysis', duration: 800 },
      { name: 'Cross-Chain Validation', duration: 1000 }
    ];

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      setAnalysisProgress(((i + 1) / stages.length) * 100);
      toast.info(`Running ${stage.name}...`);
      await new Promise(resolve => setTimeout(resolve, stage.duration));
    }

    // Generate new analysis results
    const newVulnerability: VulnerabilityReport = {
      id: Date.now().toString(),
      type: 'access_control',
      severity: 'medium',
      title: 'Access Control Issue Detected',
      description: 'Function lacks proper access control mechanisms.',
      codeSnippet: codeInput,
      lineNumber: 1,
      recommendation: 'Implement access control using OpenZeppelin AccessControl or custom modifiers.',
      confidence: 82,
      automated: true,
      timestamp: new Date(),
      chainSpecific: [selectedChain]
    };

    setAnalysisResults(prev => [newVulnerability, ...prev]);
    setIsAnalyzing(false);
    setAnalysisProgress(100);
    toast.success('Analysis completed!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const totalGasSavings = gasOptimizations.reduce((sum, opt) => sum + opt.potential, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Code Analysis Engine</h1>
          <p className="text-muted-foreground">
            AI-powered multi-layer security analysis with cross-chain support
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedChain} 
            onChange={(e) => setSelectedChain(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">BSC</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
          </select>
          <Button onClick={runAnalysis} disabled={isAnalyzing}>
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
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>AI Analysis Progress</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Code Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Smart Contract Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your Solidity code here for analysis..."
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Supports Solidity, Vyper, and other EVM-compatible languages
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCodeInput('')}>
                Clear
              </Button>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(codeInput)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Vulnerabilities ({analysisResults.length})
          </TabsTrigger>
          <TabsTrigger value="gas" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Gas Optimization ({gasOptimizations.length})
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Patterns ({securityPatterns.length})
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
                      <p className="text-sm text-muted-foreground">Line {vulnerability.lineNumber}</p>
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
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-medium">Code Snippet</h5>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(vulnerability.codeSnippet)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                    <code>{vulnerability.codeSnippet}</code>
                  </pre>
                </div>

                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                  <p className="text-sm">{vulnerability.recommendation}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Confidence: {vulnerability.confidence}%</span>
                    <span>{vulnerability.automated ? 'Automated' : 'Manual'}</span>
                    {vulnerability.chainSpecific && (
                      <span>Chains: {vulnerability.chainSpecific.join(', ')}</span>
                    )}
                  </div>
                  <span>{vulnerability.timestamp.toLocaleTimeString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="gas" className="space-y-4">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Gas Optimization Opportunities</h3>
              <Badge variant="outline" className="text-green-600">
                Total Savings: {totalGasSavings.toLocaleString()} wei
              </Badge>
            </div>
          </div>

          {gasOptimizations.map((optimization) => (
            <Card key={optimization.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">{optimization.description}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{optimization.type} optimization</p>
                    </div>
                  </div>
                  <Badge className={getImpactColor(optimization.impact)}>
                    {optimization.potential.toLocaleString()} wei
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-medium">Code Snippet</h5>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(optimization.codeSnippet)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                    <code>{optimization.codeSnippet}</code>
                  </pre>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                  <p className="text-sm">{optimization.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          {securityPatterns.map((pattern) => (
            <Card key={pattern.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {pattern.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {pattern.description}
                </p>

                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Implementation</h5>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Example Code</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(pattern.implementation)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                    <code>{pattern.implementation}</code>
                  </pre>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Best Practices</h5>
                  <ul className="space-y-1">
                    {pattern.bestPractices.map((practice, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Use Cases</h5>
                  <div className="flex flex-wrap gap-2">
                    {pattern.examples.map((example, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h4 className="font-medium">Vulnerabilities Found</h4>
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
                  <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Gas Savings</h4>
                  <p className="text-2xl font-bold text-green-500">{totalGasSavings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">wei potential savings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">Security Score</h4>
                  <p className="text-2xl font-bold text-blue-500">
                    {Math.max(0, 100 - (analysisResults.length * 10))}%
                  </p>
                  <p className="text-xs text-muted-foreground">based on findings</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Analysis Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Chain</span>
                  <span className="capitalize">{selectedChain}</span>
                </div>
                <div className="flex justify-between">
                  <span>Code Lines Analyzed</span>
                  <span>{codeInput.split('\n').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Analysis Time</span>
                  <span>~5.5 seconds</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Fixes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CodeAnalysisEngine; 