
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

interface FeatureImportanceAnalysisProps {
  demoResults: any[];
}

export const FeatureImportanceAnalysis: React.FC<FeatureImportanceAnalysisProps> = ({
  demoResults
}) => {
  if (demoResults.length === 0 || !demoResults[0]?.feature_importance) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Feature importance analysis will appear after running a matching demo
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};
