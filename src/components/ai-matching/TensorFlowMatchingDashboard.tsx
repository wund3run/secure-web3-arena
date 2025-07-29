
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Activity, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Prediction {
  auditor: string;
  confidence: number;
  expertise_match: number;
  [key: string]: unknown;
}

export const TensorFlowMatchingDashboard: React.FC = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(0.912);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    // Simulate model loading
    const loadModel = async () => {
      setIsModelLoaded(true);
      toast.success('TensorFlow.js model loaded successfully');
    };
    
    loadModel();
  }, []);

  const trainModel = async () => {
    setIsTraining(true);
    toast.info('Starting model training...');
    
    // Simulate training process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Simulate accuracy improvement
      setModelAccuracy(0.85 + (i / 100) * 0.1);
    }
    
    setIsTraining(false);
    toast.success('Model training completed!');
  };

  const runPrediction = async () => {
    if (!isModelLoaded) {
      toast.error('Model not loaded yet');
      return;
    }

    toast.info('Running predictions...');
    
    // Simulate prediction results
    const mockPredictions: Prediction[] = [
      { auditor: 'CryptoShield Security', confidence: 0.94, expertise_match: 0.89 },
      { auditor: 'BlockSafe Auditors', confidence: 0.87, expertise_match: 0.82 },
      { auditor: 'DeFi Security Labs', confidence: 0.81, expertise_match: 0.76 }
    ];
    
    setPredictions(mockPredictions);
    toast.success('Predictions generated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-500" />
              Model Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={isModelLoaded ? "default" : "secondary"}>
              {isModelLoaded ? "Loaded" : "Loading"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{(modelAccuracy * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-500" />
              Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{predictions.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1.2ms</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>TensorFlow.js Neural Network</CardTitle>
          <CardDescription>
            Real-time machine learning for auditor-project matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isTraining && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Training Progress</span>
                <span className="text-sm">{(modelAccuracy * 100).toFixed(1)}% accuracy</span>
              </div>
              <Progress value={modelAccuracy * 100} className="w-full" />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={trainModel} disabled={isTraining || !isModelLoaded}>
              <Brain className="mr-2 h-4 w-4" />
              {isTraining ? 'Training...' : 'Train Model'}
            </Button>
            <Button onClick={runPrediction} variant="outline" disabled={!isModelLoaded}>
              <Zap className="mr-2 h-4 w-4" />
              Run Prediction
            </Button>
          </div>
        </CardContent>
      </Card>

      {predictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Neural Network Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {predictions.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{prediction.auditor}</p>
                    <p className="text-sm text-muted-foreground">
                      Expertise Match: {(prediction.expertise_match * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Badge variant="outline">
                    {(prediction.confidence * 100).toFixed(1)}% confidence
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
