import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Code, 
  Shield, 
  Users, 
  MessageSquare, 
  FileText, 
  Download, 
  Upload, 
  Play, 
  Pause, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  GitBranch,
  Eye,
  Search,
  Filter,
  Settings,
  Share2,
  Copy,
  Save,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  Award,
  Lightbulb,
  Sparkles,
  Bot,
  Cpu,
  Network,
  Database,
  Lock,
  Unlock,
  Key,
  Bug,
  AlertCircle as AlertCircleIcon,
  Info,
  HelpCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Trash2,
  Plus,
  Minus,
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
  Percent
} from 'lucide-react';
import { toast } from 'sonner';

interface Vulnerability {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  location: string;
  lineNumber: number;
  severity: number;
  category: string;
  recommendation: string;
  status: 'open' | 'fixed' | 'ignored' | 'reviewing';
  aiConfidence: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface AuditSession {
  id: string;
  projectName: string;
  status: 'analyzing' | 'reviewing' | 'completed' | 'paused';
  progress: number;
  vulnerabilities: Vulnerability[];
  teamMembers: string[];
  startTime: Date;
  estimatedCompletion: Date;
  aiInsights: string[];
  codeMetrics: {
    linesOfCode: number;
    complexity: number;
    securityScore: number;
    gasOptimization: number;
  };
}

interface CollaborationMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  type: 'comment' | 'suggestion' | 'question' | 'resolution';
  relatedVulnerability?: string;
}

export function IntelligentAuditWorkspace() {
  const [activeSession, setActiveSession] = useState<AuditSession | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [collaborationMessages, setCollaborationMessages] = useState<CollaborationMessage[]>([]);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [codeView, setCodeView] = useState<'editor' | 'diff' | 'flow'>('editor');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [reportTemplate, setReportTemplate] = useState('comprehensive');
  const [workspaceMode, setWorkspaceMode] = useState<'individual' | 'team' | 'ai-assisted'>('ai-assisted');
  
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeWorkspace();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [collaborationMessages]);

  const initializeWorkspace = () => {
    const mockSession: AuditSession = {
      id: 'audit-001',
      projectName: 'DeFi Lending Protocol',
      status: 'analyzing',
      progress: 65,
      vulnerabilities: generateMockVulnerabilities(),
      teamMembers: ['Alice Smith', 'Bob Johnson', 'Carol Davis'],
      startTime: new Date(Date.now() - 3600000),
      estimatedCompletion: new Date(Date.now() + 7200000),
      aiInsights: [
        'High reentrancy risk detected in lending functions',
        'Gas optimization opportunities identified',
        'Access control patterns need review'
      ],
      codeMetrics: {
        linesOfCode: 2847,
        complexity: 8.2,
        securityScore: 72,
        gasOptimization: 85
      }
    };
    
    setActiveSession(mockSession);
    setCollaborationMessages(generateMockMessages());
    setAiSuggestions([
      'Consider implementing ReentrancyGuard for all external calls',
      'Add input validation for user-provided parameters',
      'Implement circuit breakers for emergency situations'
    ]);
  };

  const generateMockVulnerabilities = (): Vulnerability[] => {
    return [
      {
        id: 'vuln-001',
        type: 'critical',
        title: 'Reentrancy Vulnerability',
        description: 'External call before state changes allows reentrancy attacks',
        location: 'LendingPool.sol:156',
        lineNumber: 156,
        severity: 9.5,
        category: 'Reentrancy',
        recommendation: 'Implement ReentrancyGuard and follow CEI pattern',
        status: 'open',
        aiConfidence: 94,
        tags: ['reentrancy', 'critical', 'state-management'],
        createdAt: new Date(Date.now() - 1800000),
        updatedAt: new Date(Date.now() - 900000)
      },
      {
        id: 'vuln-002',
        type: 'high',
        title: 'Integer Overflow Risk',
        description: 'Potential integer overflow in balance calculations',
        location: 'TokenMath.sol:89',
        lineNumber: 89,
        severity: 7.8,
        category: 'Arithmetic',
        recommendation: 'Use SafeMath or Solidity 0.8+ overflow protection',
        status: 'reviewing',
        aiConfidence: 87,
        tags: ['overflow', 'arithmetic', 'safe-math'],
        createdAt: new Date(Date.now() - 1200000),
        updatedAt: new Date(Date.now() - 600000)
      },
      {
        id: 'vuln-003',
        type: 'medium',
        title: 'Access Control Weakness',
        description: 'Missing access control on admin functions',
        location: 'AdminPanel.sol:45',
        lineNumber: 45,
        severity: 6.2,
        category: 'Access Control',
        recommendation: 'Add proper access control modifiers',
        status: 'open',
        aiConfidence: 76,
        tags: ['access-control', 'admin', 'authorization'],
        createdAt: new Date(Date.now() - 900000),
        updatedAt: new Date(Date.now() - 300000)
      }
    ];
  };

  const generateMockMessages = (): CollaborationMessage[] => {
    return [
      {
        id: 'msg-001',
        sender: 'Alice Smith',
        message: 'Found a potential reentrancy issue in the lending function. Should we prioritize this?',
        timestamp: new Date(Date.now() - 1800000),
        type: 'comment',
        relatedVulnerability: 'vuln-001'
      },
      {
        id: 'msg-002',
        sender: 'Bob Johnson',
        message: 'I agree, this is critical. Let\'s implement ReentrancyGuard immediately.',
        timestamp: new Date(Date.now() - 1700000),
        type: 'suggestion',
        relatedVulnerability: 'vuln-001'
      },
      {
        id: 'msg-003',
        sender: 'AI Assistant',
        message: 'Analysis complete: 3 vulnerabilities detected, 1 critical. Recommended next steps: 1) Fix reentrancy issue, 2) Review access controls, 3) Optimize gas usage.',
        timestamp: new Date(Date.now() - 1600000),
        type: 'resolution'
      }
    ];
  };

  const startAIAnalysis = async () => {
    setIsAnalyzing(true);
    toast.info('AI analysis started...', {
      description: 'Analyzing code for vulnerabilities and optimization opportunities'
    });

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsAnalyzing(false);
    toast.success('AI analysis completed!', {
      description: 'Found 3 new vulnerabilities and 5 optimization suggestions'
    });
  };

  const generateReport = async () => {
    toast.info('Generating comprehensive audit report...', {
      description: 'This may take a few moments'
    });

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Report generated successfully!', {
      description: 'Download available in Reports section'
    });
  };

  const addCollaborationMessage = (message: string, type: CollaborationMessage['type'] = 'comment') => {
    const newMessage: CollaborationMessage = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      message,
      timestamp: new Date(),
      type
    };
    setCollaborationMessages(prev => [...prev, newMessage]);
  };

  const updateVulnerabilityStatus = (vulnerabilityId: string, status: Vulnerability['status']) => {
    if (!activeSession) return;
    
    setActiveSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        vulnerabilities: prev.vulnerabilities.map(v => 
          v.id === vulnerabilityId ? { ...v, status, updatedAt: new Date() } : v
        )
      };
    });
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 9) return 'text-red-500 bg-red-50';
    if (severity >= 7) return 'text-orange-500 bg-orange-50';
    if (severity >= 5) return 'text-yellow-500 bg-yellow-50';
    return 'text-blue-500 bg-blue-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'fixed': return 'text-green-600 bg-green-100';
      case 'ignored': return 'text-gray-600 bg-gray-100';
      case 'reviewing': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Initializing Workspace</h3>
          <p className="text-muted-foreground">Loading audit session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Intelligent Audit Workspace</h1>
            </div>
            <Badge variant="outline" className="text-sm">
              {activeSession.projectName}
            </Badge>
            <Badge className={getStatusColor(activeSession.status)}>
              {activeSession.status.charAt(0).toUpperCase() + activeSession.status.slice(1)}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={startAIAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  AI Analysis
                </>
              )}
            </Button>
            <Button onClick={generateReport} variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Code Editor & Analysis */}
        <div className="w-2/3 flex flex-col border-r">
          <Tabs value={codeView} onValueChange={(value) => setCodeView(value as 'editor' | 'diff' | 'flow')} className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor" className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Code Editor</span>
                </TabsTrigger>
                <TabsTrigger value="diff" className="flex items-center space-x-2">
                  <GitBranch className="h-4 w-4" />
                  <span>Diff View</span>
                </TabsTrigger>
                <TabsTrigger value="flow" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Control Flow</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="flex-1 flex flex-col p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="font-semibold">Smart Contract Analysis</h3>
                  <Badge variant="outline">{activeSession.codeMetrics.linesOfCode} LOC</Badge>
                  <Badge variant="outline">Security Score: {activeSession.codeMetrics.securityScore}/100</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Code
                  </Button>
                  <Button size="sm" variant="outline">
                    <GitBranch className="h-4 w-4 mr-2" />
                    Connect Repo
                  </Button>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <Card className="flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Source Code</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Textarea
                      ref={codeEditorRef}
                      placeholder="// Your smart contract code here..."
                      className="h-full resize-none font-mono text-sm"
                      defaultValue={`// DeFi Lending Protocol
contract LendingPool {
    mapping(address => uint256) public balances;
    
    function deposit() external payable {
        // TODO: Add reentrancy protection
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Critical: External call before state change
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= amount;
    }
}`}
                    />
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Brain className="h-4 w-4" />
                      <span>AI Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Vulnerabilities Detected</h4>
                      {activeSession.vulnerabilities.map((vuln) => (
                        <div
                          key={vuln.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedVulnerability?.id === vuln.id ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setSelectedVulnerability(vuln)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className={`h-4 w-4 ${
                                vuln.type === 'critical' ? 'text-red-500' :
                                vuln.type === 'high' ? 'text-orange-500' :
                                vuln.type === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                              }`} />
                              <span className="font-medium text-sm">{vuln.title}</span>
                            </div>
                            <Badge className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                              {vuln.severity.toFixed(1)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{vuln.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{vuln.location}</span>
                            <Badge className={`text-xs ${getStatusColor(vuln.status)}`}>
                              {vuln.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">AI Suggestions</h4>
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                          <Lightbulb className="h-3 w-3 inline mr-1" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="diff" className="flex-1 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Code Changes & Fixes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Suggested Fix for Reentrancy</h4>
                      <pre className="text-sm text-green-700 bg-green-100 p-3 rounded">
{`+ import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LendingPool is ReentrancyGuard {
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount; // State change first
        (bool success, ) = msg.sender.call{value: amount}(""); // External call last
        require(success, "Transfer failed");
    }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flow" className="flex-1 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Control Flow Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Function Calls</div>
                        <div className="text-2xl font-bold text-blue-600">24</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Safe Paths</div>
                        <div className="text-2xl font-bold text-green-600">18</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Risky Paths</div>
                        <div className="text-2xl font-bold text-red-600">6</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Collaboration & Details */}
        <div className="w-1/3 flex flex-col">
          <Tabs defaultValue="collaboration" className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="collaboration">Team Chat</TabsTrigger>
                <TabsTrigger value="details">Vulnerability Details</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="collaboration" className="flex-1 flex flex-col p-4">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Team Collaboration</h3>
                  <Badge variant="outline">{activeSession.teamMembers.length} members</Badge>
                </div>

                <div 
                  ref={chatRef}
                  className="flex-1 space-y-3 overflow-y-auto mb-4"
                >
                  {collaborationMessages.map((message) => (
                    <div key={message.id} className="flex space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {message.sender === 'AI Assistant' ? '🤖' : message.sender.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {message.type}
                          </Badge>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="min-h-[80px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const target = e.target as HTMLTextAreaElement;
                        if (target.value.trim()) {
                          addCollaborationMessage(target.value.trim());
                          target.value = '';
                        }
                      }
                    }}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="flex-1 p-4">
              {selectedVulnerability ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Vulnerability Details</h3>
                    <Badge className={getSeverityColor(selectedVulnerability.severity)}>
                      {selectedVulnerability.type.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedVulnerability.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-sm font-mono bg-muted p-2 rounded">{selectedVulnerability.location}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Recommendation</h4>
                      <p className="text-sm text-muted-foreground">{selectedVulnerability.recommendation}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">AI Confidence</h4>
                      <Progress value={selectedVulnerability.aiConfidence} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{selectedVulnerability.aiConfidence}% confident</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Status</h4>
                      <div className="flex space-x-2">
                        {(['open', 'reviewing', 'fixed', 'ignored'] as const).map((status) => (
                          <Button
                            key={status}
                            size="sm"
                            variant={selectedVulnerability.status === status ? "default" : "outline"}
                            onClick={() => updateVulnerabilityStatus(selectedVulnerability.id, status)}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedVulnerability.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a vulnerability to view details</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="metrics" className="flex-1 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Audit Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{activeSession.progress}%</span>
                      </div>
                      <Progress value={activeSession.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{activeSession.vulnerabilities.length}</div>
                        <div className="text-xs text-blue-600">Vulnerabilities</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {activeSession.vulnerabilities.filter(v => v.status === 'fixed').length}
                        </div>
                        <div className="text-xs text-green-600">Fixed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Code Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Lines of Code</span>
                      <span className="text-sm font-medium">{activeSession.codeMetrics.linesOfCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Complexity</span>
                      <span className="text-sm font-medium">{activeSession.codeMetrics.complexity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Security Score</span>
                      <span className="text-sm font-medium">{activeSession.codeMetrics.securityScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gas Optimization</span>
                      <span className="text-sm font-medium">{activeSession.codeMetrics.gasOptimization}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">AI Insights</h3>
                  <div className="space-y-2">
                    {activeSession.aiInsights.map((insight, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                        <Sparkles className="h-4 w-4 inline mr-2 text-blue-500" />
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 