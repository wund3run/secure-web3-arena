
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface MatchResult {
  auditor_id: string;
  ml_confidence_score: number;
  success_probability: number;
  estimated_project_outcome: {
    quality_score: number;
  };
  auditor_profile: {
    name: string;
  };
}

interface Insights {
  summary?: {
    total_candidates?: number;
    average_confidence?: number;
    recommendation?: string;
  };
  risk_analysis?: {
    overall_risk_level?: string;
  };
}

interface MLMatchingVisualizationProps {
  matchResults: MatchResult[];
  insights: Insights | null;
}

export const MLMatchingVisualization: React.FC<MLMatchingVisualizationProps> = ({ 
  matchResults, 
  insights 
}) => {
  if (!matchResults.length) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No data to visualize yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              ML Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(matchResults[0]?.ml_confidence_score * 100)}%
            </div>
            <Progress value={matchResults[0]?.ml_confidence_score * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Top match confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(matchResults[0]?.success_probability * 100)}%
            </div>
            <Progress value={matchResults[0]?.success_probability * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Predicted success</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(matchResults[0]?.estimated_project_outcome.quality_score * 100)}%
            </div>
            <Progress value={matchResults[0]?.estimated_project_outcome.quality_score * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Expected quality</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matchResults.slice(0, 5).map((result, index) => (
              <div key={result.auditor_id} className="flex items-center gap-3">
                <div className="w-16 text-sm font-medium">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      {result.auditor_profile.name}
                    </span>
                    <span className="text-sm">
                      {Math.round(result.ml_confidence_score * 100)}%
                    </span>
                  </div>
                  <Progress value={result.ml_confidence_score * 100} className="h-2" />
                </div>
                <div>
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    {index === 0 ? 'Best' : 'Good'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {insights && (
        <Card>
          <CardHeader>
            <CardTitle>AI Insights Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold">{insights.summary?.total_candidates || 0}</div>
                <div className="text-xs text-muted-foreground">Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {Math.round((insights.summary?.average_confidence || 0) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {insights.risk_analysis?.overall_risk_level || 'N/A'}
                </div>
                <div className="text-xs text-muted-foreground">Risk Level</div>
              </div>
              <div className="text-center">
                <Badge variant="default">
                  {insights.summary?.recommendation || 'Processing'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
