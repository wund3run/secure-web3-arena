
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Code2, 
  Shield, 
  Zap, 
  GitBranch, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface VulnerabilityFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  line: number;
  recommendation: string;
}

const mockFindings: VulnerabilityFinding[] = [
  {
    id: '1',
    severity: 'critical',
    type: 'Reentrancy',
    description: 'Potential reentrancy vulnerability in withdraw function',
    line: 45,
    recommendation: 'Use checks-effects-interactions pattern'
  },
  {
    id: '2',
    severity: 'high',
    type: 'Access Control',
    description: 'Missing access control modifier on admin function',
    line: 78,
    recommendation: 'Add onlyOwner or appropriate access control'
  },
  {
    id: '3',
    severity: 'medium',
    type: 'Gas Optimization',
    description: 'Loop can be optimized to reduce gas consumption',
    line: 156,
    recommendation: 'Consider using mappings instead of arrays'
  }
];

const tools = [
  {
    name: 'Slither',
    description: 'Static analysis framework for Solidity',
    status: 'ready',
    icon: Shield,
    lastRun: '2 hours ago'
  },
  {
    name: 'Mythril',
    description: 'Security analysis tool for EVM bytecode',
    status: 'running',
    icon: Search,
    lastRun: 'Running...'
  },
  {
    name: 'Gas Optimizer',
    description: 'Automated gas optimization suggestions',
    status: 'ready',
    icon: Zap,
    lastRun: '1 hour ago'
  },
  {
    name: 'Diff Analyzer',
    description: 'Compare contract versions for security changes',
    status: 'ready',
    icon: GitBranch,
    lastRun: '3 hours ago'
  }
];

export function TechnicalToolsHub() {
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const runAnalysis = (toolName: string) => {
    setActiveAnalysis(toolName);
    // Simulate analysis
    setTimeout(() => {
      setActiveAnalysis(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Technical Tools Hub</h2>
          <p className="text-muted-foreground">Advanced security analysis and optimization tools</p>
        </div>
        <Button>
          <Code2 className="h-4 w-4 mr-2" />
          Upload Contract
        </Button>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Static Analysis</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="gas">Gas Optimization</TabsTrigger>
          <TabsTrigger value="diff">Version Diff</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Card key={tool.name}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <tool.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                    <Badge variant={tool.status === 'running' ? 'default' : 'secondary'}>
                      {tool.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last run: {tool.lastRun}</span>
                    <Button 
                      size="sm" 
                      onClick={() => runAnalysis(tool.name)}
                      disabled={activeAnalysis === tool.name}
                    >
                      {activeAnalysis === tool.name ? 'Running...' : 'Run Analysis'}
                    </Button>
                  </div>
                  {activeAnalysis === tool.name && (
                    <Progress value={66} className="mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Security Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFindings.map((finding) => (
                  <div key={finding.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(finding.severity) as any}>
                          {finding.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{finding.type}</span>
                        <span className="text-sm text-muted-foreground">Line {finding.line}</span>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{finding.description}</p>
                    <div className="bg-muted p-2 rounded text-sm">
                      <strong>Recommendation:</strong> {finding.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Gas Optimization Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">-23%</div>
                    <div className="text-sm text-muted-foreground">Gas Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">47,892</div>
                    <div className="text-sm text-muted-foreground">Current Gas Cost</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">36,876</div>
                    <div className="text-sm text-muted-foreground">Optimized Cost</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-medium">Use calldata instead of memory</span>
                    <Badge variant="secondary">-15% gas</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-medium">Pack struct variables</span>
                    <Badge variant="secondary">-8% gas</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-medium">Remove redundant storage reads</span>
                    <Badge variant="secondary">-5% gas</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                Contract Version Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button variant="outline">Select Version A</Button>
                  <Button variant="outline">Select Version B</Button>
                  <Button>Compare</Button>
                </div>
                
                <div className="bg-muted p-4 rounded">
                  <p className="text-center text-muted-foreground">
                    Select two contract versions to see security-relevant changes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
