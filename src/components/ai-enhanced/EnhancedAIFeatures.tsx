import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain,
  Zap,
  Cpu,
  Network,
  Database,
  Lock,
  Unlock,
  Key,
  Bug,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Activity,
  Award,
  Lightbulb,
  Sparkles,
  Bot,
  AlertCircle,
  Info,
  HelpCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Type,
  Hash,
  DollarSign,
  Percent,
  Timer,
  History,
  Bell,
  Mail,
  Phone,
  Video,
  MapPin,
  Globe,
  Building,
  User,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Briefcase,
  Folder,
  FolderOpen,
  File,
  FilePlus,
  FileText,
  Image,
  Music,
  Archive,
  Inbox,
  Send,
  Reply,
  Forward,
  Flag,
  Tag,
  Bookmark,
  Heart,
  Link,
  ExternalLink,
  Download,
  Upload,
  Filter,
  Search,
  Settings,
  Share2,
  Copy,
  Save,
  RefreshCw,
  Plus,
  Edit3,
  Trash2,
  MessageSquare,
  Play,
  Pause,
  Square,
  Target,
  Users,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface AIAnalysis {
  id: string;
  type: 'vulnerability' | 'code-quality' | 'security-pattern' | 'risk-assessment' | 'compliance';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  results: AIAnalysisResult[];
  metadata: Record<string, unknown>;
}

interface AIAnalysisResult {
  id: string;
  category: string;
  finding: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  recommendations: string[];
  codeSnippets: CodeSnippet[];
  references: string[];
  tags: string[];
}

interface CodeSnippet {
  id: string;
  file: string;
  line: number;
  code: string;
  context: string;
  issue: string;
}

interface MLModel {
  id: string;
  name: string;
  version: string;
  type: 'vulnerability-detection' | 'code-analysis' | 'risk-assessment' | 'compliance-check';
  accuracy: number;
  lastUpdated: Date;
  status: 'active' | 'training' | 'inactive' | 'error';
  performance: ModelPerformance;
  features: string[];
}

interface ModelPerformance {
  precision: number;
  recall: number;
  f1Score: number;
  accuracy: number;
  falsePositives: number;
  falseNegatives: number;
}

interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  createdAt: Date;
  data: Record<string, unknown>;
  actions: string[];
}

interface AIPrediction {
  id: string;
  target: string;
  prediction: string;
  confidence: number;
  factors: string[];
  createdAt: Date;
  timeframe: string;
}

export function EnhancedAIFeatures() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAnalysis, setSelectedAnalysis] = useState<AIAnalysis | null>(null);
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
  const [mlModels, setMlModels] = useState<MLModel[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    initializeEnhancedAI();
  }, []);

  const initializeEnhancedAI = () => {
    // Mock AI Analyses
    const mockAnalyses: AIAnalysis[] = [
      {
        id: 'analysis-001',
        type: 'vulnerability',
        title: 'Smart Contract Reentrancy Analysis',
        description: 'Advanced AI-powered analysis for reentrancy vulnerabilities in DeFi protocols',
        severity: 'high',
        confidence: 94.5,
        status: 'completed',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        results: generateMockResults(),
        metadata: {
          contractAddress: '0x1234...5678',
          blockchain: 'Ethereum',
          tokenStandard: 'ERC-20',
          analysisDepth: 'comprehensive'
        }
      },
      {
        id: 'analysis-002',
        type: 'code-quality',
        title: 'Code Quality & Best Practices Assessment',
        description: 'AI-driven code quality analysis with security best practices validation',
        severity: 'medium',
        confidence: 87.2,
        status: 'running',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        results: [],
        metadata: {
          language: 'Solidity',
          linesOfCode: 15420,
          complexity: 'high',
          framework: 'Hardhat'
        }
      },
      {
        id: 'analysis-003',
        type: 'security-pattern',
        title: 'Security Pattern Recognition',
        description: 'Machine learning-based security pattern detection and classification',
        severity: 'low',
        confidence: 91.8,
        status: 'completed',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        results: generateMockResults(),
        metadata: {
          patternsDetected: 23,
          falsePositiveRate: 0.02,
          coverage: 98.5
        }
      }
    ];

    // Mock ML Models
    const mockModels: MLModel[] = [
      {
        id: 'model-001',
        name: 'VulnDetect Pro',
        version: '2.1.0',
        type: 'vulnerability-detection',
        accuracy: 96.8,
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: 'active',
        performance: {
          precision: 0.94,
          recall: 0.97,
          f1Score: 0.95,
          accuracy: 0.968,
          falsePositives: 0.03,
          falseNegatives: 0.02
        },
        features: ['reentrancy', 'overflow', 'access-control', 'logic-flaws']
      },
      {
        id: 'model-002',
        name: 'CodeQuality AI',
        version: '1.5.2',
        type: 'code-analysis',
        accuracy: 89.3,
        lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        status: 'active',
        performance: {
          precision: 0.87,
          recall: 0.91,
          f1Score: 0.89,
          accuracy: 0.893,
          falsePositives: 0.08,
          falseNegatives: 0.06
        },
        features: ['code-complexity', 'best-practices', 'maintainability', 'documentation']
      },
      {
        id: 'model-003',
        name: 'RiskAssess ML',
        version: '3.0.1',
        type: 'risk-assessment',
        accuracy: 92.1,
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'training',
        performance: {
          precision: 0.90,
          recall: 0.93,
          f1Score: 0.91,
          accuracy: 0.921,
          falsePositives: 0.05,
          falseNegatives: 0.04
        },
        features: ['risk-scoring', 'threat-modeling', 'impact-analysis', 'mitigation-prioritization']
      }
    ];

    // Mock AI Insights
    const mockInsights: AIInsight[] = [
      {
        id: 'insight-001',
        type: 'trend',
        title: 'Increasing Reentrancy Vulnerabilities',
        description: 'AI detected a 23% increase in reentrancy vulnerabilities across DeFi protocols in the last 30 days',
        impact: 'high',
        confidence: 89.5,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        data: {
          trend: 'increasing',
          percentage: 23,
          timeframe: '30 days',
          affectedProtocols: 12
        },
        actions: ['Update detection models', 'Enhance static analysis', 'Review recent audits']
      },
      {
        id: 'insight-002',
        type: 'anomaly',
        title: 'Unusual Access Control Pattern',
        description: 'AI identified an unusual access control pattern in a recently audited contract',
        impact: 'medium',
        confidence: 76.8,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        data: {
          anomalyType: 'access-control',
          severity: 'medium',
          contractAddress: '0xabcd...efgh',
          deviation: 2.3
        },
        actions: ['Investigate pattern', 'Update training data', 'Flag for manual review']
      },
      {
        id: 'insight-003',
        type: 'pattern',
        title: 'Common Vulnerability Cluster',
        description: 'AI discovered a cluster of similar vulnerabilities across multiple contracts',
        impact: 'high',
        confidence: 94.2,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        data: {
          clusterSize: 8,
          vulnerabilityType: 'integer-overflow',
          commonFactor: 'library-usage',
          affectedContracts: 8
        },
        actions: ['Create detection rule', 'Update library guidelines', 'Notify affected projects']
      }
    ];

    // Mock AI Predictions
    const mockPredictions: AIPrediction[] = [
      {
        id: 'pred-001',
        target: 'Vulnerability Discovery Rate',
        prediction: 'Expected 15% increase in vulnerability discovery rate over next 30 days',
        confidence: 87.3,
        factors: ['Increased DeFi activity', 'New attack vectors', 'Enhanced detection capabilities'],
        createdAt: new Date(),
        timeframe: '30 days'
      },
      {
        id: 'pred-002',
        target: 'False Positive Rate',
        prediction: 'False positive rate expected to decrease by 8% with model updates',
        confidence: 92.1,
        factors: ['Improved training data', 'Enhanced algorithms', 'Better validation'],
        createdAt: new Date(),
        timeframe: '14 days'
      }
    ];

    setAnalyses(mockAnalyses);
    setMlModels(mockModels);
    setInsights(mockInsights);
    setPredictions(mockPredictions);
    setSelectedAnalysis(mockAnalyses[0]);
    setIsLoading(false);
  };

  const generateMockResults = (): AIAnalysisResult[] => [
    {
      id: 'result-001',
      category: 'Reentrancy',
      finding: 'Potential reentrancy vulnerability in withdraw function',
      description: 'The withdraw function allows external calls before state updates, creating a reentrancy risk',
      severity: 'high',
      confidence: 94.5,
      recommendations: [
        'Use ReentrancyGuard modifier',
        'Implement checks-effects-interactions pattern',
        'Add state validation before external calls'
      ],
      codeSnippets: [
        {
          id: 'snippet-001',
          file: 'LendingPool.sol',
          line: 156,
          code: 'function withdraw(uint256 amount) external {\n    require(balances[msg.sender] >= amount);\n    (bool success, ) = msg.sender.call{value: amount}("");\n    balances[msg.sender] -= amount;\n}',
          context: 'Withdraw function implementation',
          issue: 'State update after external call'
        }
      ],
      references: [
        'SWC-107: Reentrancy',
        'Consensys Best Practices',
        'OpenZeppelin Security Guidelines'
      ],
      tags: ['reentrancy', 'critical', 'withdraw']
    },
    {
      id: 'result-002',
      category: 'Access Control',
      finding: 'Missing access control on admin function',
      description: 'The setInterestRate function lacks proper access control mechanisms',
      severity: 'medium',
      confidence: 87.2,
      recommendations: [
        'Add onlyOwner modifier',
        'Implement role-based access control',
        'Add multi-signature requirements for critical functions'
      ],
      codeSnippets: [
        {
          id: 'snippet-002',
          file: 'InterestRateModel.sol',
          line: 89,
          code: 'function setInterestRate(uint256 newRate) external {\n    interestRate = newRate;\n    emit InterestRateUpdated(newRate);\n}',
          context: 'Interest rate setter function',
          issue: 'No access control'
        }
      ],
      references: [
        'SWC-105: Unprotected Ether Withdrawal',
        'Access Control Best Practices',
        'OpenZeppelin AccessControl'
      ],
      tags: ['access-control', 'admin', 'interest-rate']
    }
  ];

  const startAnalysis = (type: AIAnalysis['type']) => {
    const newAnalysis: AIAnalysis = {
      id: `analysis-${Date.now()}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Analysis`,
      description: `AI-powered ${type} analysis initiated`,
      severity: 'medium',
      confidence: 0,
      status: 'running',
      createdAt: new Date(),
      results: [],
      metadata: {}
    };
    
    setAnalyses(prev => [newAnalysis, ...prev]);
    setSelectedAnalysis(newAnalysis);
    toast.success(`${type} analysis started`);
    
    // Simulate analysis completion
    setTimeout(() => {
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === newAnalysis.id 
          ? { ...analysis, status: 'completed', results: generateMockResults() }
          : analysis
      ));
      toast.success(`${type} analysis completed`);
    }, 3000);
  };

  const retrainModel = (modelId: string) => {
    setMlModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'training' }
        : model
    ));
    toast.success('Model retraining started');
    
    // Simulate training completion
    setTimeout(() => {
      setMlModels(prev => prev.map(model => 
        model.id === modelId 
          ? { ...model, status: 'active', accuracy: model.accuracy + 0.5 }
          : model
      ));
      toast.success('Model retraining completed');
    }, 5000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'training': return 'text-purple-600 bg-purple-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-semibold mb-2">Loading Enhanced AI Features</h3>
          <p className="text-muted-foreground">Initializing AI models and analysis tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Enhanced AI Features</h1>
              <p className="text-muted-foreground">Advanced AI-powered analysis tools, machine learning models, and intelligent insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analyses">AI Analyses</TabsTrigger>
            <TabsTrigger value="models">ML Models</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Brain className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{analyses.length}</div>
                    <div className="text-sm text-muted-foreground">AI Analyses</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Cpu className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{mlModels.length}</div>
                    <div className="text-sm text-muted-foreground">ML Models</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Lightbulb className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{insights.length}</div>
                    <div className="text-sm text-muted-foreground">AI Insights</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{predictions.length}</div>
                    <div className="text-sm text-muted-foreground">Predictions</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights.slice(0, 3).map((insight) => (
                      <div key={insight.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{insight.title}</div>
                            <div className="text-sm text-muted-foreground">{insight.description}</div>
                          </div>
                          <Badge className={getSeverityColor(insight.impact)}>
                            {insight.impact}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{insight.confidence}% confidence</span>
                          <span>{insight.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mlModels.map((model) => (
                      <div key={model.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{model.name}</span>
                          <Badge className={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{model.accuracy}% accuracy</span>
                          <span>v{model.version}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analyses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search analyses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex space-x-2">
                {(['vulnerability', 'code-quality', 'security-pattern', 'risk-assessment', 'compliance'] as const).map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    onClick={() => startAnalysis(type)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.map((analysis) => (
                <Card 
                  key={analysis.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedAnalysis(analysis)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{analysis.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{analysis.description}</p>
                      </div>
                      <Badge className={getSeverityColor(analysis.severity)}>
                        {analysis.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Confidence: {analysis.confidence}%</span>
                        <Badge className={getStatusColor(analysis.status)}>
                          {analysis.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Type: {analysis.type}</span>
                        <span>{analysis.results.length} findings</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Created: {analysis.createdAt.toLocaleDateString()}</span>
                        {analysis.completedAt && (
                          <span>Completed: {analysis.completedAt.toLocaleDateString()}</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Machine Learning Models</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Deploy Model
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mlModels.map((model) => (
                <Card key={model.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">v{model.version} - {model.type}</p>
                      </div>
                      <Badge className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Accuracy</span>
                          <span>{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Precision</div>
                          <div className="text-muted-foreground">{(model.performance.precision * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Recall</div>
                          <div className="text-muted-foreground">{(model.performance.recall * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="font-medium">F1 Score</div>
                          <div className="text-muted-foreground">{(model.performance.f1Score * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Last Updated</div>
                          <div className="text-muted-foreground">{model.lastUpdated.toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Features</div>
                        <div className="flex flex-wrap gap-1">
                          {model.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => retrainModel(model.id)}
                          disabled={model.status === 'training'}
                        >
                          {model.status === 'training' ? 'Training...' : 'Retrain'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
              <Button>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Insights
              </Button>
            </div>

            <div className="space-y-4">
              {insights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{insight.type}</Badge>
                          <Badge className={getSeverityColor(insight.impact)}>
                            {insight.impact} impact
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{insight.confidence}%</div>
                        <div className="text-sm text-muted-foreground">confidence</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium text-sm mb-2">Key Data</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {Object.entries(insight.data).map(([key, value]) => (
                            <div key={key}>
                              <div className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                              <div className="text-muted-foreground">{String(value)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Recommended Actions</div>
                        <div className="space-y-2">
                          {insight.actions.map((action, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <ArrowRight className="h-4 w-4 text-blue-500" />
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Generated: {insight.createdAt.toLocaleString()}</span>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">AI Predictions</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate Prediction
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{prediction.target}</CardTitle>
                        <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                        <div className="text-sm text-muted-foreground">confidence</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm mb-2">Key Factors</div>
                        <div className="space-y-1">
                          {prediction.factors.map((factor, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <TrendingUp className="h-4 w-4 text-blue-500" />
                              <span>{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Timeframe: {prediction.timeframe}</span>
                        <span>Created: {prediction.createdAt.toLocaleDateString()}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">AI Automation</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Automated Vulnerability Scanning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="text-green-600 bg-green-100">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frequency</span>
                      <span className="text-sm">Every 6 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Run</span>
                      <span className="text-sm">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Scans Today</span>
                      <span className="text-sm">4</span>
                    </div>
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Intelligent Report Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="text-green-600 bg-green-100">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trigger</span>
                      <span className="text-sm">Analysis Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reports Generated</span>
                      <span className="text-sm">23 today</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Generation Time</span>
                      <span className="text-sm">2.3 minutes</span>
                    </div>
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Smart Alert System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="text-green-600 bg-green-100">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alerts Today</span>
                      <span className="text-sm">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">False Positives</span>
                      <span className="text-sm">1 (14%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm">Avg. 15 min</span>
                    </div>
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Auto-Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="text-blue-600 bg-blue-100">Training</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Schedule</span>
                      <span className="text-sm">Weekly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ETA</span>
                      <span className="text-sm">2 hours</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 