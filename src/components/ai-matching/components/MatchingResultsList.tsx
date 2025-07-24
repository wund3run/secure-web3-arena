import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';

interface Auditor {
  id: string | number;
  name: string;
  description: string;
  experience_years: number;
  success_rate: number;
}

interface MatchingResult {
  auditor: Auditor;
  combined_score: number;
  tf_confidence_score: number;
  semantic_score: number;
  recommendation_reason: string;
  [key: string]: unknown;
}

interface MatchingResultsListProps {
  demoResults: unknown[];
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

  // Type guard function
  const isValidMatchingResult = (result: unknown): result is MatchingResult => {
    return (
      typeof result === 'object' && 
      result !== null && 
      'auditor' in result &&
      'combined_score' in result
    );
  };

  return (
    <div className="grid gap-4">
      {demoResults.map((result, index) => {
        if (!isValidMatchingResult(result)) {
          return (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Invalid result data</p>
              </CardContent>
            </Card>
          );
        }

        return (
          <Card key={String(result.auditor.id)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {String(result.auditor.name)}
                    {index === 0 && <Badge>Best Match</Badge>}
                  </CardTitle>
                  <CardDescription>{String(result.auditor.description)}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {((result.combined_score || 0) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Combined Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">TensorFlow Score</p>
                  <Progress value={(result.tf_confidence_score || 0) * 100} className="mt-1" />
                  <p className="text-xs mt-1">{((result.tf_confidence_score || 0) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Semantic Score</p>
                  <Progress value={(result.semantic_score || 0) * 100} className="mt-1" />
                  <p className="text-xs mt-1">{((result.semantic_score || 0) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{result.auditor.experience_years || 0} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{((result.auditor.success_rate || 0) * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="text-sm bg-muted/50 p-3 rounded">
                <p className="font-medium mb-1">AI Recommendation:</p>
                <p>{String(result.recommendation_reason || 'No recommendation available')}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
