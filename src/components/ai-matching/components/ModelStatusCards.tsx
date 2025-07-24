import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Target, Activity, Award } from 'lucide-react';

interface ModelMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  [key: string]: unknown;
}

interface ModelStatusCardsProps {
  isInitializing: boolean;
  modelMetrics: ModelMetrics | null;
}

export const ModelStatusCards: React.FC<ModelStatusCardsProps> = ({
  isInitializing,
  modelMetrics
}) => {
  return (
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
  );
};
