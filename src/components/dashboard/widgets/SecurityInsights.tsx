import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface AuditRequest {
  id: string;
  status: string;
  security_score?: number;
  [key: string]: unknown;
}

interface SecurityInsightsProps {
  securityScore: number;
  auditRequests: unknown[];
}

export const SecurityInsights = ({ securityScore, auditRequests }: SecurityInsightsProps) => {
  // Type guard for audit request
  const isAuditRequest = (req: unknown): req is AuditRequest => {
    return typeof req === 'object' && req !== null && 'id' in req;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    if (score >= 70) return TrendingUp;
    return AlertTriangle;
  };

  const validRequests = auditRequests.filter(isAuditRequest);
  
  const criticalIssues = validRequests.reduce((count, req) => {
    // This would come from audit findings in a real implementation
    const secScore = typeof req.security_score === 'number' ? req.security_score : 100;
    return count + (secScore < 70 ? 1 : 0);
  }, 0);

  const ScoreIcon = getScoreIcon(securityScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ScoreIcon className={`h-6 w-6 ${getScoreColor(securityScore)}`} />
            <span className={`text-3xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Overall Security Score</p>
          <Progress value={securityScore} className="mt-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Projects</span>
            <Badge variant="outline">{validRequests.length}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Critical Issues</span>
            <Badge variant={criticalIssues > 0 ? 'destructive' : 'default'}>
              {criticalIssues}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Completed Audits</span>
            <Badge variant="secondary">
              {validRequests.filter(req => req.status === 'completed').length}
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            {securityScore >= 90 
              ? '🎉 Excellent security posture! Keep up the great work.'
              : securityScore >= 70
              ? '✅ Good security status. Consider additional audits for improvement.'
              : '⚠️ Security needs attention. Schedule audits for critical projects.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
