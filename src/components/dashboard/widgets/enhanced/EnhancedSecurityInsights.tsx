
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { fetchSecurityInsights } from './security-insights/SecurityInsightsService';
import { SecurityScoreCard } from './security-insights/SecurityScoreCard';
import { RiskLevelCard } from './security-insights/RiskLevelCard';
import { VulnerabilitiesFixedCard } from './security-insights/VulnerabilitiesFixedCard';
import { RecentFindingsCard } from './security-insights/RecentFindingsCard';
import { SecurityInsightsLoading } from './security-insights/SecurityInsightsLoading';
import { SecurityInsightsError } from './security-insights/SecurityInsightsError';

interface SecurityInsightsProps {
  userId: string;
}

export function EnhancedSecurityInsights({ userId }: SecurityInsightsProps) {
  const { data: insights, isLoading, error } = useQuery({
    queryKey: ['security-insights', userId],
    queryFn: () => fetchSecurityInsights(userId),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <SecurityInsightsLoading />;
  }

  if (error) {
    return <SecurityInsightsError />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SecurityScoreCard 
          averageScore={insights?.averageScore || 0}
          securityTrend={insights?.securityTrend || 'stable'}
        />

        <RiskLevelCard riskLevel={insights?.riskLevel || 'medium'} />

        <VulnerabilitiesFixedCard 
          vulnerabilitiesFixed={insights?.vulnerabilitiesFixed || 0}
        />

        <RecentFindingsCard 
          recentFindings={insights?.recentFindings || []}
        />
      </CardContent>
    </Card>
  );
}
