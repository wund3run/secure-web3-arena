
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';

interface MatchingResultsListProps {
  demoResults: any[];
}

export const MatchingResultsList: React.FC<MatchingResultsListProps> = ({
  demoResults
}) => {
  if (demoResults.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Run demo matching to see TensorFlow.js AI results
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};
