import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain,
  Zap,
  Shield,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileCode,
  Lightbulb,
  Search,
  Wand2,
  Bot,
  Eye,
  Settings,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SmartAnalysis {
  id: string;
  type: 'vulnerability' | 'optimization' | 'best_practice' | 'security_pattern';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  confidence: number;
  line_numbers?: number[];
  file_path?: string;
  recommendation: string;
  automated_fix?: string;
  impact_score: number;
  effort_estimation: 'low' | 'medium' | 'high';
}

interface AIInsight {
  category: 'risk_assessment' | 'trend_analysis' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface SmartAuditAnalyzerProps {
  auditId: string;
  className?: string;
}

export function SmartAuditAnalyzer({ auditId, className }: SmartAuditAnalyzerProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [smartAnalyses, setSmartAnalyses] = useState<SmartAnalysis[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SmartAnalysis | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const mockAnalyses: SmartAnalysis[] = [
    {
      id: '1',
      type: 'vulnerability',
      severity: 'critical',
      title: 'Reentrancy Vulnerability Detected',
      description: 'The withdraw function is susceptible to reentrancy attacks due to external calls before state updates.',
      confidence: 95,
      line_numbers: [156, 157, 158],
      file_path: 'contracts/TokenStaking.sol',
      recommendation: 'Implement the checks-effects-interactions pattern or use a reentrancy guard.',
      automated_fix: 'Add nonReentrant modifier and restructure state updates.',
      impact_score: 9.5,
      effort_estimation: 'medium'
    },
    {
      id: '2',
      type: 'optimization',
      severity: 'medium',
      title: 'Gas Optimization Opportunity',
      description: 'Multiple storage reads can be optimized by caching values in memory.',
      confidence: 88,
      line_numbers: [89, 94, 97],
      file_path: 'contracts/Governance.sol',
      recommendation: 'Cache storage variables in memory to reduce gas costs by ~2000 gas per transaction.',
      automated_fix: 'Cache storage variables at function start.',
      impact_score: 6.5,
      effort_estimation: 'low'
    }
  ];

  const mockInsights: AIInsight[] = [
    {
      category: 'risk_assessment',
      title: 'High-Risk Contract Interactions',
      description: 'The audit reveals 3 critical vulnerabilities that could lead to fund loss. Immediate attention required.',
      confidence: 94,
      actionable: true,
      priority: 'high'
    },
    {
      category: 'trend_analysis',
      title: 'Common Vulnerability Patterns',
      description: 'Analysis shows this codebase follows 78% of security best practices, above industry average of 65%.',
      confidence: 87,
      actionable: false,
      priority: 'medium'
    }
  ];

  const runSmartAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const steps = [
      'Parsing smart contracts...',
      'Analyzing control flow...',
      'Checking vulnerability patterns...',
      'Evaluating gas optimization...',
      'Generating recommendations...',
      'Calculating confidence scores...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      toast.info(steps[i]);
    }

    setSmartAnalyses(mockAnalyses);
    setAiInsights(mockInsights);
    setIsAnalyzing(false);
    toast.success('Smart analysis completed!');
  }, []);

  const getSeverityColor = (severity: SmartAnalysis['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'info': return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: SmartAnalysis['type']) => {
    switch (type) {
      case 'vulnerability': return <Shield className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      case 'best_practice': return <Target className="h-4 w-4" />;
      case 'security_pattern': return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Smart Audit Analyzer
          </h2>
          <p className="text-muted-foreground">
            AI-powered vulnerability detection and smart recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={runSmartAnalysis}
            disabled={isAnalyzing}
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary animate-pulse" />
                <span className="font-medium">AI Analysis in Progress</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Analyzing smart contracts using advanced AI models...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {smartAnalyses.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {smartAnalyses.filter(a => a.severity === 'critical').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Critical Issues</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {smartAnalyses.length > 0 ? Math.round(smartAnalyses.reduce((acc, a) => acc + a.confidence, 0) / smartAnalyses.length) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {smartAnalyses.filter(a => a.automated_fix).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Auto-fixable</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {smartAnalyses.length > 0 ? Math.round(smartAnalyses.reduce((acc, a) => acc + a.impact_score, 0) / smartAnalyses.length * 10) / 10 : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Impact</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="custom">Custom Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detected Issues</h3>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {smartAnalyses.map((analysis) => (
                    <Card 
                      key={analysis.id}
                      className={cn(
                        "cursor-pointer hover:shadow-md transition-all border",
                        getSeverityColor(analysis.severity),
                        selectedAnalysis?.id === analysis.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedAnalysis(analysis)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(analysis.type)}
                            <div>
                              <CardTitle className="text-lg">{analysis.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {analysis.severity}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {analysis.confidence}% confidence
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{analysis.description}</p>
                        {analysis.file_path && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileCode className="h-3 w-3" />
                            {analysis.file_path}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Analysis Details</h3>
              {selectedAnalysis ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getTypeIcon(selectedAnalysis.type)}
                      {selectedAnalysis.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedAnalysis.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Recommendation</h4>
                      <p className="text-sm text-muted-foreground">{selectedAnalysis.recommendation}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Reviewed
                      </Button>
                      {selectedAnalysis.automated_fix && (
                        <Button variant="outline">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Apply Fix
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select an analysis to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  {insight.actionable && (
                    <Button size="sm" variant="outline">
                      <Target className="h-3 w-3 mr-1" />
                      Take Action
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Custom AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Analysis Prompt
                </label>
                <Textarea
                  placeholder="e.g., 'Analyze the token transfer functions for potential front-running attacks'"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={4}
                />
              </div>
              <Button 
                disabled={isAnalyzing || !customPrompt.trim()}
                className="w-full gap-2"
              >
                <Brain className="h-4 w-4" />
                Run Custom Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}