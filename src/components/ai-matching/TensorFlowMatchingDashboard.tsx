
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Cpu, 
  TrendingUp, 
  Target,
  Zap,
  BarChart3,
  Activity,
  Award
} from 'lucide-react';
import { useEnhancedAIMatchingV2 } from '@/hooks/useEnhancedAIMatchingV2';

export const TensorFlowMatchingDashboard: React.FC = () => {
  const { 
    isInitializing, 
    isAnalyzing, 
    modelMetrics, 
    findEnhancedMatches,
    initializeAI 
  } = useEnhancedAIMatchingV2();

  const [demoResults, setDemoResults] = useState<any[]>([]);

  const runDemoMatching = async () => {
    const mockCriteria = {
      blockchain: 'ethereum',
      project_type: 'defi',
      project_description: 'A decentralized lending protocol with complex smart contract interactions requiring thorough security analysis.',
      budget_range: [10000, 25000] as [number, number],
      timeline: '4 weeks',
      complexity: 'high' as const,
      specific_requirements: ['smart contracts', 'defi', 'security audit'],
      quality_threshold: 4.5,
      experience_preference: 'senior' as const,
      audit_type: ['security', 'formal verification']
    };

    const mockAuditors = [
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        description: 'Expert in DeFi security with 8+ years of blockchain experience',
        expertise: ['Solidity', 'DeFi', 'Formal Verification'],
        experience_years: 8,
        rating: 4.9,
        hourly_rate: 200,
        availability: 'available' as const,
        specializations: ['DeFi Protocols', 'Smart Contract Security'],
        past_audits: 67,
        success_rate: 0.98,
        response_time_avg: 2.5,
        blockchain_expertise: ['ethereum', 'polygon']
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        description: 'Blockchain security specialist focusing on DeFi and NFT protocols',
        expertise: ['Security Analysis', 'Smart Contracts', 'DeFi'],
        experience_years: 6,
        rating: 4.7,
        hourly_rate: 180,
        availability: 'available' as const,
        specializations: ['DeFi Security', 'Protocol Analysis'],
        past_audits: 43,
        success_rate: 0.95,
        response_time_avg: 4.2,
        blockchain_expertise: ['ethereum', 'arbitrum']
      }
    ];

    try {
      const results = await findEnhancedMatches(mockCriteria, mockAuditors);
      setDemoResults(results);
    } catch (error) {
      console.error('Demo matching failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TensorFlow.js AI Matching Engine</h2>
          <p className="text-muted-foreground">
            Advanced machine learning for auditor-project matching
          </p>
        </div>
        {!isInitializing && (
          <Button onClick={runDemoMatching} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Run Demo Matching'}
          </Button>
        )}
      </div>

      {/* Model Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Model Status</p>
                <div className="flex items-center mt-2">
                  <Cpu className="h-4 w-4 mr-2" />
                  <Badge variant={isInitializing ? 'secondary' : 'default'}>
                    {isInitializing ? 'Initializing' : 'Ready'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Precision</p>
                <div className="flex items-center mt-2">
                  <Target className="h-4 w-4 mr-2" />
                  <span className="text-2xl font-bold">
                    {modelMetrics ? (modelMetrics.precision * 100).toFixed(1) : '--'}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recall</p>
                <div className="flex items-center mt-2">
                  <Activity className="h-4 w-4 mr-2" />
                  <span className="text-2xl font-bold">
                    {modelMetrics ? (modelMetrics.recall * 100).toFixed(1) : '--'}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">F1 Score</p>
                <div className="flex items-center mt-2">
                  <Award className="h-4 w-4 mr-2" />
                  <span className="text-2xl font-bold">
                    {modelMetrics ? (modelMetrics.f1Score * 100).toFixed(1) : '--'}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Matching Results</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {demoResults.length > 0 ? (
            <div className="grid gap-4">
              {demoResults.map((result, index) => (
                <Card key={result.auditor.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {result.auditor.name}
                          {index === 0 && <Badge>Best Match</Badge>}
                        </CardTitle>
                        <CardDescription>{result.auditor.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {(result.combined_score * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Combined Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">TensorFlow Score</p>
                        <Progress value={result.tf_confidence_score * 100} className="mt-1" />
                        <p className="text-xs mt-1">{(result.tf_confidence_score * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Semantic Score</p>
                        <Progress value={result.semantic_score * 100} className="mt-1" />
                        <p className="text-xs mt-1">{(result.semantic_score * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="font-medium">{result.auditor.experience_years} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="font-medium">{(result.auditor.success_rate * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="text-sm bg-muted/50 p-3 rounded">
                      <p className="font-medium mb-1">AI Recommendation:</p>
                      <p>{result.recommendation_reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Run demo matching to see TensorFlow.js AI results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {modelMetrics ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Precision</span>
                        <span>{(modelMetrics.precision * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={modelMetrics.precision * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Recall</span>
                        <span>{(modelMetrics.recall * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={modelMetrics.recall * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>F1 Score</span>
                        <span>{(modelMetrics.f1Score * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={modelMetrics.f1Score * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy</span>
                        <span>{(modelMetrics.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={modelMetrics.accuracy * 100} />
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Model metrics will appear after initialization</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Precision Target ({'>'}90%)</span>
                    <Badge variant={modelMetrics?.precision && modelMetrics.precision > 0.9 ? 'default' : 'secondary'}>
                      {modelMetrics?.precision && modelMetrics.precision > 0.9 ? 'Met' : 'Below Target'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recall Target ({'>'}90%)</span>
                    <Badge variant={modelMetrics?.recall && modelMetrics.recall > 0.9 ? 'default' : 'secondary'}>
                      {modelMetrics?.recall && modelMetrics.recall > 0.9 ? 'Met' : 'Below Target'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">TensorFlow.js Status</span>
                    <Badge variant={!isInitializing ? 'default' : 'secondary'}>
                      {!isInitializing ? 'Active' : 'Loading'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hugging Face Integration</span>
                    <Badge variant="default">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          {demoResults.length > 0 && demoResults[0]?.feature_importance ? (
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance Analysis</CardTitle>
                <CardDescription>
                  Understanding which factors most influence matching decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(demoResults[0].feature_importance)
                    .sort(([,a], [,b]) => (b as number) - (a as number))
                    .slice(0, 8)
                    .map(([feature, importance]) => (
                      <div key={feature}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{feature.replace(/_/g, ' ')}</span>
                          <span>{((importance as number) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(importance as number) * 100} />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Feature importance analysis will appear after running a matching demo
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
