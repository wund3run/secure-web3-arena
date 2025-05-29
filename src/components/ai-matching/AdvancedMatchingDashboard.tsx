
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock,
  DollarSign,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { EnhancedAIMatchingEngine } from './EnhancedAIMatchingEngine';
import { MLMatchingVisualization } from './MLMatchingVisualization';
import { useAdvancedMatching } from '@/hooks/useAdvancedMatching';

export const AdvancedMatchingDashboard = () => {
  const [selectedCriteria, setSelectedCriteria] = useState({
    technical_requirements: ['Solidity', 'DeFi'],
    project_complexity: 'medium' as const,
    budget_range: [10000, 50000] as [number, number],
    timeline_urgency: 'normal' as const,
    quality_threshold: 4.5,
    past_performance_weight: 0.3,
    availability_weight: 0.2,
    cost_weight: 0.2
  });

  const { 
    isProcessing, 
    mlResults, 
    modelMetrics, 
    runAdvancedMatching,
    generateMatchingReport 
  } = useAdvancedMatching();

  const [matchingReport, setMatchingReport] = useState<any>(null);

  const handleRunMatching = async () => {
    const results = await runAdvancedMatching(selectedCriteria);
    if (results.length > 0) {
      const report = generateMatchingReport(results);
      setMatchingReport(report);
    }
  };

  const renderMatchResult = (result: any, index: number) => (
    <Card key={result.auditor_id} className={`${index === 0 ? 'border-primary' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              {result.auditor_profile.name}
              {index === 0 && <Badge variant="default">Best Match</Badge>}
            </h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {result.auditor_profile.rating}
              </span>
              <span>{result.auditor_profile.past_audits} audits</span>
              <span>{result.auditor_profile.experience_years} years exp</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(result.ml_confidence_score * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">ML Confidence</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold">
              {Math.round(result.success_probability * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {Math.round(result.estimated_project_outcome.completion_probability * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {Math.round(result.estimated_project_outcome.quality_score * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Quality</div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <div>
            <h5 className="font-medium mb-2">Technical Compatibility</h5>
            <div className="flex flex-wrap gap-1">
              {result.auditor_profile.expertise.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {result.risk_factors.length > 0 && (
            <div>
              <h5 className="font-medium mb-2 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Risk Factors
              </h5>
              <ul className="text-sm space-y-1">
                {result.risk_factors.map((risk: string, idx: number) => (
                  <li key={idx} className="text-muted-foreground">• {risk}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h5 className="font-medium mb-2 flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Optimization Suggestions
            </h5>
            <ul className="text-sm space-y-1">
              {result.optimization_suggestions.map((suggestion: string, idx: number) => (
                <li key={idx} className="text-muted-foreground">• {suggestion}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Advanced AI Matching Dashboard</h2>
          <p className="text-muted-foreground">
            Machine learning powered auditor matching with predictive analytics
          </p>
        </div>
        <Button onClick={handleRunMatching} disabled={isProcessing}>
          <Brain className="mr-2 h-4 w-4" />
          {isProcessing ? 'Processing...' : 'Run Advanced Matching'}
        </Button>
      </div>

      <Tabs defaultValue="engine" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="engine">ML Engine</TabsTrigger>
          <TabsTrigger value="results">Match Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="engine">
          <EnhancedAIMatchingEngine 
            criteria={selectedCriteria}
            onMatchesFound={(matches) => console.log('Matches found:', matches)}
          />
        </TabsContent>

        <TabsContent value="results">
          <div className="space-y-4">
            {mlResults.length > 0 ? (
              mlResults.map((result, index) => renderMatchResult(result, index))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
                  <p className="text-muted-foreground">
                    Run the advanced matching algorithm to see results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          {mlResults.length > 0 && (
            <MLMatchingVisualization 
              matchResults={mlResults}
              insights={matchingReport}
            />
          )}
        </TabsContent>

        <TabsContent value="insights">
          {matchingReport ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Matching Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{matchingReport.summary.total_candidates}</div>
                      <div className="text-sm text-muted-foreground">Candidates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {Math.round(matchingReport.summary.average_confidence * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {Math.round(matchingReport.summary.top_match_score * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Top Score</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="default" className="text-sm">
                        {matchingReport.summary.recommendation}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Risk Level</span>
                      <Badge variant={matchingReport.risk_analysis.overall_risk_level === 'low' ? 'default' : 'destructive'}>
                        {matchingReport.risk_analysis.overall_risk_level}
                      </Badge>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Primary Concerns</h5>
                      <ul className="text-sm space-y-1">
                        {matchingReport.risk_analysis.primary_concerns.map((concern: string, idx: number) => (
                          <li key={idx} className="text-muted-foreground">• {concern}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Insights Pending</h3>
                <p className="text-muted-foreground">
                  Run matching analysis to generate AI insights and recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
