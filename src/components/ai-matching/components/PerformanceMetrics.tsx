
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ModelMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  accuracy: number;
}

interface PerformanceMetricsProps {
  modelMetrics: ModelMetrics | null;
  isInitializing: boolean;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  modelMetrics,
  isInitializing
}) => {
  return (
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
  );
};
