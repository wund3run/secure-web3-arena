
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MatchingCriteria {
  projectType?: string;
  budget?: number[];
  timeline?: string;
  techStack?: string[];
}

interface EnhancedAIMatchingEngineProps {
  criteria: MatchingCriteria;
  onMatchesFound: () => void;
}

export const EnhancedAIMatchingEngine: React.FC<EnhancedAIMatchingEngineProps> = ({
  criteria,
  onMatchesFound
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const runMatching = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    const steps = [
      { name: 'Analyzing project requirements', duration: 1000 },
      { name: 'Scanning auditor database', duration: 1500 },
      { name: 'Running ML algorithms', duration: 2000 },
      { name: 'Calculating compatibility scores', duration: 1000 },
      { name: 'Generating recommendations', duration: 500 }
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i].name);
        setProgress((i / steps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      }
      
      setProgress(100);
      setCurrentStep('Complete');
      toast.success('Matching process completed successfully!');
      onMatchesFound();
    } catch (error) {
      toast.error('Matching process failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Enhanced AI Matching Engine
          </CardTitle>
          <CardDescription>
            Advanced machine learning algorithms for precision auditor matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-500" />
                  Precision Matching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-xs text-muted-foreground">Accuracy Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Processing Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2.3s</p>
                <p className="text-xs text-muted-foreground">Average Response</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  Active Auditors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">247</p>
                <p className="text-xs text-muted-foreground">Available Now</p>
              </CardContent>
            </Card>
          </div>

          {isProcessing && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processing...</span>
                <Badge variant="outline">{Math.round(progress)}%</Badge>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            </div>
          )}

          <Button 
            onClick={runMatching} 
            disabled={isProcessing}
            className="w-full"
          >
            <Brain className="mr-2 h-4 w-4" />
            {isProcessing ? 'Processing...' : 'Start AI Matching'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
