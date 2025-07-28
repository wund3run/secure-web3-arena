import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Code, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  Target,
  Activity,
  Zap,
  Brain,
  TrendingUp,
  Users,
  Settings,
  Play,
  Pause,
  Square,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface AuditPhase {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
  estimatedHours: number;
  actualHours: number;
  deliverables: string[];
  automationTools: string[];
  aiAssistance: boolean;
}

interface ActiveAudit {
  id: string;
  projectName: string;
  clientName: string;
  totalValue: number;
  deadline: string;
  complexity: string;
  currentPhase: string;
  overallProgress: number;
  riskScore: number;
  findings: { critical: number; high: number; medium: number; low: number };
  phases: AuditPhase[];
  automationEnabled: boolean;
  aiAssistanceLevel: 'basic' | 'advanced' | 'expert';
}

export function AuditorWorkspaceV2() {
  const [selectedAudit, setSelectedAudit] = useState<ActiveAudit | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeTracking, setTimeTracking] = useState<{ [phaseId: string]: { isRunning: boolean; startTime: number; totalTime: number } }>({});
  const [aiInsights, setAiInsights] = useState<unknown[]>([]);
  const [automationStatus, setAutomationStatus] = useState<{ [tool: string]: boolean }>({});

  // Mock data with enhanced auditor-focused features
  const mockActiveAudits: ActiveAudit[] = [
    {
      id: '1',
      projectName: 'DeFi Yield Aggregator V2',
      clientName: 'YieldMax Protocol',
      totalValue: 15000,
      deadline: '2025-01-30',
      complexity: 'High',
      currentPhase: 'Code Analysis',
      overallProgress: 45,
      riskScore: 7.2,
      findings: { critical: 2, high: 5, medium: 8, low: 12 },
      automationEnabled: true,
      aiAssistanceLevel: 'advanced',
      phases: [
        {
          id: '1',
          name: 'Initial Review',
          status: 'completed',
          progress: 100,
          estimatedHours: 8,
          actualHours: 6,
          deliverables: ['Project scope document', 'Initial risk assessment'],
          automationTools: ['Slither', 'Mythril'],
          aiAssistance: true
        },
        {
          id: '2',
          name: 'Code Analysis',
          status: 'in_progress',
          progress: 65,
          estimatedHours: 24,
          actualHours: 16,
          deliverables: ['Static analysis report', 'Manual code review'],
          automationTools: ['Slither', 'Mythril', 'Securify', 'AI Code Review'],
          aiAssistance: true
        },
        {
          id: '3',
          name: 'Vulnerability Assessment',
          status: 'pending',
          progress: 0,
          estimatedHours: 16,
          actualHours: 0,
          deliverables: ['Vulnerability report', 'Attack vector analysis'],
          automationTools: ['Automated Pentesting', 'AI Vulnerability Scanner'],
          aiAssistance: true
        },
        {
          id: '4',
          name: 'Report Generation',
          status: 'pending',
          progress: 0,
          estimatedHours: 12,
          actualHours: 0,
          deliverables: ['Final audit report', 'Executive summary'],
          automationTools: ['AI Report Generator', 'Template Engine'],
          aiAssistance: true
        }
      ]
    }
  ];

  useEffect(() => {
    setSelectedAudit(mockActiveAudits[0]);
    initializeAutomation();
    generateAIInsights();
  }, [mockActiveAudits]);

  const initializeAutomation = () => {
    setAutomationStatus({
      'slither': true,
      'mythril': true,
      'securify': false,
      'ai-code-review': true,
      'automated-pentesting': false,
      'ai-vulnerability-scanner': true,
      'ai-report-generator': true
    });
  };

  const generateAIInsights = () => {
    const insights = [
      {
        type: 'efficiency',
        title: 'Time Optimization Opportunity',
        description: 'Phase 2 can be completed 2 hours faster using advanced AI tools',
        impact: 'high',
        action: 'Enable AI Code Review'
      },
      {
        type: 'risk',
        title: 'High-Risk Pattern Detected',
        description: 'Similar vulnerability pattern found in 3 other DeFi protocols',
        impact: 'critical',
        action: 'Review Similar Cases'
      },
      {
        type: 'automation',
        title: 'Automation Available',
        description: 'Report generation can be 80% automated with AI assistance',
        impact: 'medium',
        action: 'Enable Auto-Report'
      }
    ];
    setAiInsights(insights);
  };

  const toggleTimeTracking = (phaseId: string) => {
    setTimeTracking(prev => {
      const current = prev[phaseId] || { isRunning: false, startTime: 0, totalTime: 0 };
      
      if (current.isRunning) {
        // Stop tracking
        const elapsed = Date.now() - current.startTime;
        toast.success(`Time tracked: ${Math.round(elapsed / 1000 / 60)} minutes`);
        return {
          ...prev,
          [phaseId]: {
            ...current,
            isRunning: false,
            totalTime: current.totalTime + elapsed
          }
        };
      } else {
        // Start tracking
        toast.success('Time tracking started');
        return {
          ...prev,
          [phaseId]: {
            ...current,
            isRunning: true,
            startTime: Date.now()
          }
        };
      }
    });
  };

  const toggleAutomation = (tool: string) => {
    setAutomationStatus(prev => ({
      ...prev,
      [tool]: !prev[tool]
    }));
    toast.success(`${tool} automation ${!automationStatus[tool] ? 'enabled' : 'disabled'}`);
  };

  const runAutomatedAnalysis = async (phaseId: string) => {
    toast.info('Running automated analysis...');
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Automated analysis completed!');
  };

  const generateAIReport = async () => {
    toast.info('Generating AI-assisted report...');
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast.success('AI report generated successfully!');
  };

  if (!selectedAudit) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Enhanced Audit Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                {selectedAudit.projectName}
                <Badge variant={selectedAudit.automationEnabled ? "default" : "secondary"}>
                  {selectedAudit.automationEnabled ? "AI Enhanced" : "Manual"}
                </Badge>
                <Badge variant="outline">
                  {selectedAudit.aiAssistanceLevel} AI
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">Client: {selectedAudit.clientName}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={getComplexityBadge(selectedAudit.complexity)}>
                {selectedAudit.complexity}
              </Badge>
              <div className="text-right">
                <p className="text-2xl font-bold">${selectedAudit.totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Progress: {selectedAudit.overallProgress}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Due: {new Date(selectedAudit.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-red-500" />
              <span className="text-sm">Risk Score: {selectedAudit.riskScore}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm">Phase: {selectedAudit.currentPhase}</span>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={selectedAudit.overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      {aiInsights.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border">
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        (typeof insight === 'object' && insight && 'impact' in insight)
                          ? insight.impact === 'critical'
                            ? 'bg-red-500'
                            : insight.impact === 'high'
                              ? 'bg-orange-500'
                              : 'bg-blue-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {(typeof insight === 'object' && insight && 'title' in insight) ? String(insight.title) : ''}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(typeof insight === 'object' && insight && 'description' in insight) ? String(insight.description) : ''}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        {(typeof insight === 'object' && insight && 'action' in insight) ? String(insight.action) : ''}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Workspace Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="phases">Audit Phases</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Time Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Smart Time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedAudit.phases.map((phase) => {
                    const tracking = timeTracking[phase.id];
                    const isRunning = tracking?.isRunning || false;
                    const totalMinutes = tracking ? Math.round((tracking.totalTime + (isRunning ? Date.now() - tracking.startTime : 0)) / 1000 / 60) : 0;
                    
                    return (
                      <div key={phase.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex-1">
                          <span className="text-sm font-medium">{phase.name}</span>
                          <div className="text-xs text-muted-foreground">
                            {totalMinutes}min / {phase.estimatedHours * 60}min
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isRunning ? "error" : "default"}
                          onClick={() => toggleTimeTracking(phase.id)}
                        >
                          {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Findings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  AI-Enhanced Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{selectedAudit.findings.critical}</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{selectedAudit.findings.high}</div>
                    <div className="text-xs text-muted-foreground">High</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{selectedAudit.findings.medium}</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{selectedAudit.findings.low}</div>
                    <div className="text-xs text-muted-foreground">Low</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Brain className="h-4 w-4 inline mr-1" />
                    AI detected 3 additional potential issues requiring manual review
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <div className="space-y-4">
            {selectedAudit.phases.map((phase, index) => (
              <Card key={phase.id} className={phase.aiAssistance ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getPhaseStatusColor(phase.status)}`} />
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <Badge variant="outline">{phase.status.replace('_', ' ')}</Badge>
                      {phase.aiAssistance && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          AI Enhanced
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Phase {index + 1} of {selectedAudit.phases.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Estimated: </span>
                        <span>{phase.estimatedHours}h</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actual: </span>
                        <span>{phase.actualHours}h</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Deliverables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Automation Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.automationTools.map((tool, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {phase.status === 'in_progress' && (
                        <Button size="sm" onClick={() => runAutomatedAnalysis(phase.id)}>
                          <Zap className="h-4 w-4 mr-2" />
                          Run Analysis
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation Control Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(automationStatus).map(([tool, enabled]) => (
                  <Card key={tool} className={enabled ? "border-green-200 bg-green-50" : "border-gray-200"}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium capitalize">{tool.replace('-', ' ')}</h4>
                          <p className="text-sm text-muted-foreground">
                            {enabled ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={enabled ? "default" : "outline"}
                          onClick={() => toggleAutomation(tool)}
                        >
                          {enabled ? 'Enabled' : 'Enable'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings">
          <Card>
            <CardHeader>
              <CardTitle>AI-Enhanced Security Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800">Critical Findings (2)</h4>
                  <p className="text-sm text-red-700 mt-1">
                    AI detected reentrancy vulnerability in withdraw function
                  </p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800">High Priority (5)</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Access control issues and potential overflow vulnerabilities
                  </p>
                </div>
                <Button onClick={generateAIReport} className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Generate AI-Enhanced Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  AI Code Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced AI-powered code analysis and vulnerability detection
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Code Review
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Vulnerability Scan
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Gas Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Specialized security verification and testing tools
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Reentrancy Check
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Access Control
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Threat Modeling
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  AI Report Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Intelligent report generation with AI assistance
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <Brain className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Executive Summary
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Custom Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getComplexityBadge(complexity: string) {
  switch (complexity.toLowerCase()) {
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'default';
    default: return 'outline';
  }
}

function getPhaseStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'in_progress': return 'bg-blue-500';
    case 'pending': return 'bg-gray-400';
    case 'blocked': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
} 