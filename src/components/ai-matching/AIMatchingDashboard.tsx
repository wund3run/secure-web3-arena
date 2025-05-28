
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, User, Clock, DollarSign, Award, TrendingUp } from 'lucide-react';
import { useAIMatching } from '@/hooks/useAIMatching';
import { useAuditProposals } from '@/hooks/useAuditProposals';
import type { AuditorProfile } from '@/types/auditor';

interface AIMatchingDashboardProps {
  auditRequestId: string;
  onAuditorSelect?: (auditorId: string) => void;
}

export function AIMatchingDashboard({ auditRequestId, onAuditorSelect }: AIMatchingDashboardProps) {
  const { loading, calculateAIMatching, getMatchingResults } = useAIMatching();
  const { submitProposal } = useAuditProposals();
  const [matchingResults, setMatchingResults] = useState<any[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculateMatching = async () => {
    try {
      await calculateAIMatching(auditRequestId);
      const results = await getMatchingResults(auditRequestId);
      setMatchingResults(results || []);
      setHasCalculated(true);
    } catch (error) {
      console.error('Matching calculation failed:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 0.8) return 'default';
    if (score >= 0.6) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI-Powered Auditor Matching
          </CardTitle>
          <CardDescription>
            Our AI analyzes auditor expertise, availability, and past performance to find the perfect match for your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasCalculated ? (
            <Button 
              onClick={handleCalculateMatching} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Calculating Matches...' : 'Find Best Auditors'}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top Matches Found</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCalculateMatching}
                  disabled={loading}
                >
                  Recalculate
                </Button>
              </div>
              
              <div className="grid gap-4">
                {matchingResults.map((result) => (
                  <Card key={result.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {result.auditor_profiles?.business_name || 'Professional Auditor'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {result.auditor_profiles?.total_audits_completed || 0} audits completed
                            </p>
                          </div>
                        </div>
                        <Badge variant={getScoreBadgeVariant(result.overall_score)}>
                          {Math.round(result.overall_score * 100)}% Match
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Award className="h-3 w-3" />
                            Expertise
                          </div>
                          <div className={`font-semibold ${getScoreColor(result.expertise_score)}`}>
                            {Math.round(result.expertise_score * 100)}%
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            Availability
                          </div>
                          <div className={`font-semibold ${getScoreColor(result.availability_score)}`}>
                            {Math.round(result.availability_score * 100)}%
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <DollarSign className="h-3 w-3" />
                            Budget Fit
                          </div>
                          <div className={`font-semibold ${getScoreColor(result.budget_compatibility_score)}`}>
                            {Math.round(result.budget_compatibility_score * 100)}%
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <TrendingUp className="h-3 w-3" />
                            Performance
                          </div>
                          <div className={`font-semibold ${getScoreColor(result.past_performance_score)}`}>
                            {Math.round(result.past_performance_score * 100)}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Overall Compatibility</span>
                          <span className="font-semibold">{Math.round(result.overall_score * 100)}%</span>
                        </div>
                        <Progress value={result.overall_score * 100} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => onAuditorSelect?.(result.auditor_id)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Trigger invitation to propose
                            console.log('Invite auditor:', result.auditor_id);
                          }}
                        >
                          Invite to Propose
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
