
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Bug, 
  Zap, 
  FileCode, 
  Upload,
  Download,
  Play,
  RefreshCw
} from 'lucide-react';

interface Vulnerability {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file: string;
  line: number;
  category: string;
  suggestion: string;
  confidence: number;
}

interface AnalysisResult {
  totalIssues: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  securityScore: number;
  gasOptimizations: number;
}

export const SmartContractAnalyzer: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const mockVulnerabilities: Vulnerability[] = [
    {
      id: '1',
      severity: 'critical',
      title: 'Reentrancy Vulnerability',
      description: 'External call made before state changes in withdraw function',
      file: 'Token.sol',
      line: 45,
      category: 'Reentrancy',
      suggestion: 'Implement checks-effects-interactions pattern',
      confidence: 95
    },
    {
      id: '2',
      severity: 'high',
      title: 'Integer Overflow',
      description: 'Arithmetic operation without SafeMath protection',
      file: 'Vault.sol',
      line: 78,
      category: 'Arithmetic',
      suggestion: 'Use SafeMath library or Solidity 0.8+',
      confidence: 87
    },
    {
      id: '3',
      severity: 'medium',
      title: 'Unchecked Return Value',
      description: 'External call return value not checked',
      file: 'Exchange.sol',
      line: 123,
      category: 'Error Handling',
      suggestion: 'Check return value and handle failures',
      confidence: 78
    }
  ];

  const analysisResult: AnalysisResult = {
    totalIssues: 15,
    criticalIssues: 1,
    highIssues: 2,
    mediumIssues: 7,
    lowIssues: 5,
    securityScore: 72,
    gasOptimizations: 8
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Bug className="h-4 w-4" />;
      case 'medium': return <Shield className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setAnalysisComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Smart Contract Analyzer</h2>
          <p className="text-muted-foreground">AI-powered vulnerability detection and code analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Contract
          </Button>
          <Button onClick={runAnalysis} disabled={analyzing}>
            {analyzing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {analyzing ? 'Analyzing...' : 'Start Analysis'}
          </Button>
        </div>
      </div>

      {analyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analysis Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Running security checks, gas optimization analysis, and vulnerability detection...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisComplete && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Security Score</p>
                  <p className="text-2xl font-bold">{analysisResult.securityScore}/100</p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold">{analysisResult.totalIssues}</p>
                </div>
                <Bug className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold text-red-500">{analysisResult.criticalIssues}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Gas Optimizations</p>
                  <p className="text-2xl font-bold">{analysisResult.gasOptimizations}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {analysisComplete && (
        <Tabs defaultValue="vulnerabilities">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="gas">Gas Optimization</TabsTrigger>
            <TabsTrigger value="report">Generate Report</TabsTrigger>
          </TabsList>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Detected Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {mockVulnerabilities.map((vuln) => (
                      <div key={vuln.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(vuln.severity)}
                            <span className="font-medium">{vuln.title}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-white ${getSeverityColor(vuln.severity)}`}
                            >
                              {vuln.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <Badge variant="outline">
                            {vuln.confidence}% confidence
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <FileCode className="h-4 w-4" />
                            {vuln.file}:{vuln.line}
                          </span>
                          <Badge variant="secondary">{vuln.category}</Badge>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="text-sm">
                            <strong>Suggestion:</strong> {vuln.suggestion}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Gas Optimization Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    {analysisResult.gasOptimizations} gas optimization opportunities detected
                  </p>
                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  Generate Audit Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Report title" />
                  <Input placeholder="Client name" />
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Generate PDF Report
                  </Button>
                  <Button variant="outline">
                    <FileCode className="h-4 w-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
