
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown, Shield, Clock, DollarSign, Users } from 'lucide-react';

interface MetricsOverviewProps {
  userId: string;
}

interface DashboardMetrics {
  totalProjects: number;
  activeAudits: number;
  completedAudits: number;
  totalSpent: number;
  averageRating: number;
  securityScore: number;
  pendingReviews: number;
  monthlyGrowth: number;
}

async function fetchDashboardMetrics(userId: string): Promise<DashboardMetrics> {
  try {
    // Fetch audit requests data
    const { data: auditData, error: auditError } = await supabase
      .from('audit_requests')
      .select('status, budget, completion_percentage, security_score')
      .eq('client_id', userId);

    if (auditError) throw auditError;

    // Fetch payment data
    const { data: paymentData, error: paymentError } = await supabase
      .from('payment_transactions')
      .select('amount, status')
      .eq('client_id', userId)
      .eq('status', 'completed');

    if (paymentError) throw paymentError;

    // Fetch reviews data
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('auditor_reviews')
      .select('rating')
      .eq('client_id', userId);

    if (reviewsError) throw reviewsError;

    // Calculate metrics
    const totalProjects = auditData?.length || 0;
    const activeAudits = auditData?.filter(audit => 
      ['in_progress', 'review', 'revision'].includes(audit.status || '')
    ).length || 0;
    const completedAudits = auditData?.filter(audit => audit.status === 'completed').length || 0;
    const totalSpent = paymentData?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
    const averageRating = reviewsData?.length 
      ? reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewsData.length 
      : 0;
    const securityScore = auditData?.length 
      ? Math.round(auditData.reduce((sum, audit) => sum + (audit.security_score || 0), 0) / auditData.length)
      : 0;
    const pendingReviews = auditData?.filter(audit => audit.status === 'review').length || 0;

    return {
      totalProjects,
      activeAudits,
      completedAudits,
      totalSpent,
      averageRating,
      securityScore,
      pendingReviews,
      monthlyGrowth: 12 // TODO: Calculate actual growth
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error;
  }
}

export function MetricsOverview({ userId }: MetricsOverviewProps) {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['dashboard-metrics', userId],
    queryFn: () => fetchDashboardMetrics(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Failed to load metrics. Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  const metricCards = [
    {
      title: 'Active Audits',
      value: metrics?.activeAudits || 0,
      subtitle: `${metrics?.totalProjects || 0} total projects`,
      icon: Shield,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Security Score',
      value: `${metrics?.securityScore || 0}/100`,
      subtitle: 'Average across projects',
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Spent',
      value: `$${(metrics?.totalSpent || 0).toLocaleString()}`,
      subtitle: `${metrics?.completedAudits || 0} completed audits`,
      icon: DollarSign,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Average Rating',
      value: `${(metrics?.averageRating || 0).toFixed(1)}/5.0`,
      subtitle: `${metrics?.pendingReviews || 0} pending reviews`,
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricCards.map((metric, index) => (
        <Card key={index} className="hover:shadow-brand transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {metric.subtitle}
            </p>
            {index === 0 && metrics?.monthlyGrowth && (
              <Badge variant="secondary" className="mt-2 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{metrics.monthlyGrowth}% this month
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
