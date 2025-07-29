import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  Target,
  Clock,
  FileText,
  Download,
  Play,
  Loader2,
  Eye,
  Settings,
  TrendingUp,
  Activity,
  Zap,
  Network,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

interface SecurityThreat {
  id: string;
  type: 'vulnerability' | 'misconfiguration' | 'compliance' | 'performance';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  confidence: number;
  automated: boolean;
  timestamp: Date;
  category: string;
}

interface SecurityScore {
  overall: number;
  vulnerability: number;
  compliance: number;
  performance: number;
  configuration: number;
}

interface AnalysisMetrics {
  threatsDetected: number;
  criticalIssues: number;
  complianceScore: number;
  performanceScore: number;
  analysisTime: number;
}

export function IntegratedSecurityAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<SecurityThreat[]>([]);
  const [securityScore, setSecurityScore] = useState<SecurityScore>({
    overall: 0,
    vulnerability: 0,
    compliance: 0,
    performance: 0,
    configuration: 0
  });
  const [metrics, setMetrics] = useState<AnalysisMetrics>({
    threatsDetected: 0,
    criticalIssues: 0,
    complianceScore: 0,
    performanceScore: 0,
    analysisTime: 0
  });
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    generateSampleData();
  }, []);

  const generateSampleData = () => {
    const sampleThreats: SecurityThreat[] = [
      {
        id: '1',
        type: 'vulnerability',
        severity: 'critical',
        title: 'Smart Contract Reentrancy Risk',
        description: 'Potential reentrancy vulnerability detected in withdraw function.',
        impact: 'Funds could be drained from the contract',
        recommendation: 'Implement checks-effects-interactions pattern and reentrancy guards',
        confidence: 95,
        automated: true,
        timestamp: new Date(),
        category: 'Smart Contract Security'
      },
      {
        id: '2',
        type: 'misconfiguration',
        severity: 'high',
        title: 'Insecure Admin Privileges',
        description: 'Admin role has excessive permissions without proper safeguards.',
        impact: 'Single point of failure for contract security',
        recommendation: 'Implement multi-signature wallet and time-locked operations',
        confidence: 88,
        automated: true,
        timestamp: new Date(),
        category: 'Access Control'
      },
      {
        id: '3',
        type: 'compliance',
        severity: 'medium',
        title: 'Missing Event Emissions',
        description: 'Critical state changes are not properly logged with events.',
        impact: 'Reduced transparency and audit trail',
        recommendation: 'Add comprehensive event emissions for all state changes',
        confidence: 92,
        automated: true,
        timestamp: new Date(),
        category: 'Compliance'
      }
    ];

    const sampleScore: SecurityScore = {
      overall: 78,
      vulnerability: 72,
      compliance: 85,
      performance: 76,
      configuration: 80
    };

    const sampleMetrics: AnalysisMetrics = {
      threatsDetected: sampleThreats.length,
      criticalIssues: sampleThreats.filter(t => t.severity === 'critical').length,
      complianceScore: 85,
      performanceScore: 76,
      analysisTime: 12.5
    };

    setAnalysisResults(sampleThreats);
    setSecurityScore(sampleScore);
    setMetrics(sampleMetrics);
  };

  const runIntegratedAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate comprehensive security analysis
    const stages = [
      { name: 'Smart Contract Scanning', duration: 2000 },
      { name: 'Vulnerability Assessment', duration: 2500 },
      { name: 'Compliance Checking', duration: 1800 },
      { name: 'Performance Analysis', duration: 1500 },
      { name: 'Configuration Review', duration: 2200 },
      { name: 'Threat Correlation', duration: 1000 }
    ];

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      setAnalysisProgress(((i + 1) / stages.length) * 100);
      toast.info(`Running ${stage.name}...`);
      await new Promise(resolve => setTimeout(resolve, stage.duration));
    }

    // Generate new threat
    const newThreat: SecurityThreat = {
      id: Date.now().toString(),
      type: 'vulnerability',
      severity: 'high',
      title: 'Flash Loan Attack Vector',
      description: 'Contract vulnerable to flash loan manipulation attacks.',
      impact: 'Price oracle manipulation leading to fund loss',
      recommendation: 'Implement flash loan protection mechanisms and oracle validation',
      confidence: 89,
      automated: true,
      timestamp: new Date(),
      category: 'DeFi Security'
    };

    setAnalysisResults(prev => [newThreat, ...prev]);
    setIsAnalyzing(false);
    setAnalysisProgress(100);
    
    toast.success('Integrated security analysis completed!');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-500" />
            Integrated Security Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive security analysis for Web3 applications and smart contracts
          </p>
        </div>
        <Button 
          onClick={runIntegratedAnalysis} 
          disabled={isAnalyzing}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="h-4 w-4 mr-2" />
              Run Full Analysis
            </>
          )}
        </Button>
      </div>

      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analysis Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(securityScore.overall)}`}>
                  {securityScore.overall}
                </div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(securityScore.vulnerability)}`}>
                  {securityScore.vulnerability}
                </div>
                <div className="text-xs text-muted-foreground">Vulnerability</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(securityScore.compliance)}`}>
                  {securityScore.compliance}
                </div>
                <div className="text-xs text-muted-foreground">Compliance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(securityScore.performance)}`}>
                  {securityScore.performance}
                </div>
                <div className="text-xs text-muted-foreground">Performance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(securityScore.configuration)}`}>
                  {securityScore.configuration}
                </div>
                <div className="text-xs text-muted-foreground">Configuration</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.threatsDetected}</div>
                    <div className="text-sm text-muted-foreground">Threats Detected</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-orange-500" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.criticalIssues}</div>
                    <div className="text-sm text-muted-foreground">Critical Issues</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.complianceScore}%</div>
                    <div className="text-sm text-muted-foreground">Compliance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.analysisTime}s</div>
                    <div className="text-sm text-muted-foreground">Analysis Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Security Threats</h3>
            <Badge variant="outline">
              {analysisResults.length} threats detected
            </Badge>
          </div>

          {analysisResults.map((threat) => (
            <Card key={threat.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <CardTitle className="text-lg">{threat.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{threat.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(threat.severity)}>
                      {threat.severity}
                    </Badge>
                    <Badge variant="outline">
                      {threat.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium mb-1">Description</h5>
                    <p className="text-sm">{threat.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-1">Impact</h5>
                    <p className="text-sm text-red-600">{threat.impact}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                    <p className="text-sm text-green-600">{threat.recommendation}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Detected: {threat.timestamp.toLocaleString()}</span>
                    <span>{threat.automated ? 'Automated Detection' : 'Manual Review'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Smart Contract Standards</span>
                  <Badge className="bg-green-500 text-white">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Security Best Practices</span>
                  <Badge className="bg-yellow-500 text-black">Partial</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Documentation Requirements</span>
                  <Badge className="bg-green-500 text-white">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Trail</span>
                  <Badge className="bg-red-500 text-white">Non-Compliant</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Analysis Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Analysis Duration</span>
                  <span>{metrics.analysisTime} seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Threats Identified</span>
                  <span>{metrics.threatsDetected}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Overall Security Score</span>
                  <span className={getScoreColor(securityScore.overall)}>
                    {securityScore.overall}/100
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
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

export default IntegratedSecurityAnalyzer; 