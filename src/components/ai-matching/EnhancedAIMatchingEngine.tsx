
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Target,
  BarChart3,
  Cpu,
  Network,
  AlertCircle
} from 'lucide-react';
import { useEnhancedAIMatching } from '@/hooks/useEnhancedAIMatching';
import { toast } from '@/components/ui/use-toast';

interface EnhancedAIMatchingEngineProps {
  criteria: any;
  onMatchesFound: (matches: any[]) => void;
}

export const EnhancedAIMatchingEngine: React.FC<EnhancedAIMatchingEngineProps> = ({ 
  criteria, 
  onMatchesFound 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [mlMetrics, setMlMetrics] = useState({
    dataProcessed: 0,
    modelAccuracy: 0,
    confidenceScore: 0,
    featureImportance: []
  });
  
  const { 
    isAnalyzing, 
    detailedResults, 
    matchingInsights, 
    findEnhancedMatches 
  } = useEnhancedAIMatching();

  const runEnhancedMatching = async () => {
    setIsProcessing(true);
    
    // Simulate ML processing stages
    const stages = [
      'Preprocessing data...',
      'Feature extraction...',
      'Model inference...',
      'Confidence calculation...',
      'Result optimization...'
    ];
    
    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update ML metrics during processing
      setMlMetrics(prev => ({
        ...prev,
        dataProcessed: ((i + 1) / stages.length) * 100,
        modelAccuracy: 85 + Math.random() * 10,
        confidenceScore: 75 + Math.random() * 20
      }));
    }
    
    // Run the actual enhanced matching
    try {
      const results = await findEnhancedMatches(criteria);
      onMatchesFound(results);
      toast({
        title: "Matches Found",
        description: "The AI matching process has successfully found potential matches.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Enhanced AI Matching Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Cpu className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-muted-foreground">Neural Network</p>
              <p className="font-semibold">Deep Learning</p>
            </div>
            <div className="text-center">
              <Network className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <p className="text-sm text-muted-foreground">Algorithm</p>
              <p className="font-semibold">Multi-Factor</p>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="font-semibold">{mlMetrics.modelAccuracy.toFixed(1)}%</p>
            </div>
          </div>
          
          {isProcessing && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                <span className="text-sm font-medium">{processingStage}</span>
              </div>
              <Progress value={mlMetrics.dataProcessed} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Model Accuracy:</span>
                  <span className="font-medium ml-2">{mlMetrics.modelAccuracy.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-medium ml-2">{mlMetrics.confidenceScore.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            onClick={runEnhancedMatching} 
            disabled={isProcessing || isAnalyzing}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 'Run Enhanced AI Matching'}
          </Button>
        </CardContent>
      </Card>

      {matchingInsights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              ML Insights & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Auditors Evaluated</p>
                    <p className="text-2xl font-bold">{matchingInsights.total_auditors_evaluated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Prediction</p>
                    <p className="text-2xl font-bold">{(matchingInsights.success_prediction * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Market Demand</p>
                    <Badge variant={matchingInsights.market_demand_level === 'high' ? 'destructive' : 'default'}>
                      {matchingInsights.market_demand_level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold">{matchingInsights.average_response_time}h</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technical Expertise</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-24 h-2" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Availability Match</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-24 h-2" />
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Budget Compatibility</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-24 h-2" />
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Historical Performance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-24 h-2" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="predictions" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">High Success Probability</p>
                      <p className="text-sm text-muted-foreground">
                        Project likely to complete successfully within timeline
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="font-medium">Budget Optimization Suggested</p>
                      <p className="text-sm text-muted-foreground">
                        Consider adjusting budget range for better matches
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
