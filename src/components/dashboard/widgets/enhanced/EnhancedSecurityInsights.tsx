
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityInsightsProps {
  userId: string;
}

interface SecurityData {
  averageScore: number;
  vulnerabilitiesFixed: number;
  securityTrend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  recentFindings: Array<{
    severity: string;
    count: number;
  }>;
}

async function fetchSecurityInsights(userId: string): Promise<SecurityData> {
  try {
    const { data, error } = await supabase
      .from('audit_requests')
      .select('security_score')
      .eq('client_id', userId)
      .not('security_score', 'is', null);

    if (error) throw error;

    const scores = data?.map(d => d.security_score).filter(Boolean) || [];
    const averageScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    // Fetch audit findings for vulnerability count
    const { data: findingsData, error: findingsError } = await supabase
      .from('audit_findings')
      .select('severity, status')
      .in('audit_request_id', 
        data?.map(req => req.id) || []
      );

    if (findingsError) console.error('Error fetching findings:', findingsError);

    const vulnerabilitiesFixed = findingsData?.filter(f => f.status === 'fixed').length || 0;

    // Mock trend calculation - in real app, compare with previous period
    const securityTrend: 'up' | 'down' | 'stable' = averageScore > 75 ? 'up' : averageScore < 50 ? 'down' : 'stable';
    const riskLevel: 'low' | 'medium' | 'high' = averageScore > 80 ? 'low' : averageScore > 60 ? 'medium' : 'high';

    // Process findings by severity
    const findingsBySeverity = findingsData?.reduce((acc, finding) => {
      acc[finding.severity] = (acc[finding.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      averageScore,
      vulnerabilitiesFixed,
      securityTrend,
      riskLevel,
      recentFindings: [
        { severity: 'critical', count: findingsBySeverity.critical || 0 },
        { severity: 'high', count: findingsBySeverity.high || 0 },
        { severity: 'medium', count: findingsBySeverity.medium || 0 },
        { severity: 'low', count: findingsBySeverity.low || 0 }
      ]
    };
  } catch (error) {
    console.error('Error fetching security insights:', error);
    throw error;
  }
}

export function EnhancedSecurityInsights({ userId }: SecurityInsightsProps) {
  const { data: insights, isLoading, error } = useQuery({
    queryKey: ['security-insights', userId],
    queryFn: () => fetchSecurityInsights(userId),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Failed to load security insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-error" />;
      default: return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Security Score</span>
            <div className="flex items-center gap-1">
              {getTrendIcon(insights?.securityTrend || 'stable')}
              <span className="font-bold text-lg">
                {Math.round(insights?.averageScore || 0)}/100
              </span>
            </div>
          </div>
          <Progress value={insights?.averageScore || 0} className="h-2" />
        </div>

        {/* Risk Level */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">Risk Level</span>
          <Badge 
            variant={insights?.riskLevel === 'low' ? 'default' : 
                    insights?.riskLevel === 'medium' ? 'secondary' : 'destructive'}
            className={getRiskColor(insights?.riskLevel || 'medium')}
          >
            {insights?.riskLevel?.toUpperCase()}
          </Badge>
        </div>

        {/* Vulnerabilities Fixed */}
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-success mb-1">
            {insights?.vulnerabilitiesFixed || 0}
          </div>
          <div className="text-sm text-muted-foreground">
            Vulnerabilities Fixed
          </div>
        </div>

        {/* Recent Findings */}
        <div>
          <h4 className="font-medium mb-3">Recent Findings</h4>
          <div className="space-y-2">
            {insights?.recentFindings.map((finding, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="capitalize">{finding.severity}</span>
                <Badge variant="outline">
                  {finding.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
