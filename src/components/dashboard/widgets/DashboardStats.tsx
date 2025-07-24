import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, FileText, CheckCircle, DollarSign, Shield } from 'lucide-react';

interface DashboardStatsProps {
  data: {
    activeAudits: number;
    completedAudits: number;
    totalSpent: number;
    securityScore: number;
  };
}

export const DashboardStats = React.memo(({ data }: DashboardStatsProps) => {
  const formatCurrency = useMemo(() => (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);

  const getScoreColor = useMemo(() => (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }, []);

  const getScoreBadge = useMemo(() => (score: number) => {
    if (score >= 90) return { text: 'Excellent', variant: 'default' as const };
    if (score >= 70) return { text: 'Good', variant: 'secondary' as const };
    return { text: 'Needs Attention', variant: 'destructive' as const };
  }, []);

  const stats = useMemo(() => [
    {
      title: 'Active Audits',
      value: data.activeAudits,
      icon: FileText,
      description: 'Currently in progress',
      trend: data.activeAudits > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Completed Audits',
      value: data.completedAudits,
      icon: CheckCircle,
      description: 'Successfully finished',
      trend: 'up'
    },
    {
      title: 'Total Investment',
      value: formatCurrency(data.totalSpent),
      icon: DollarSign,
      description: 'In security audits',
      trend: 'up'
    },
    {
      title: 'Security Score',
      value: `${data.securityScore}%`,
      icon: Shield,
      description: 'Average across projects',
      trend: data.securityScore >= 70 ? 'up' : 'down',
      badge: getScoreBadge(data.securityScore)
    }
  ], [data.activeAudits, data.completedAudits, data.totalSpent, data.securityScore, formatCurrency, getScoreBadge]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-card rounded-[1.15rem] shadow-[0_8px_40px_0_rgba(50,60,130,0.23)] p-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-tight text-accent-primary" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif", letterSpacing: '0.08em' }}>{stat.title}</CardTitle>
              <Icon className="h-5 w-5 text-accent-secondary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-primary">{stat.value}</div>
                {stat.trend === 'up' && <TrendingUp className="h-5 w-5 text-success" />}
                {stat.trend === 'down' && <TrendingDown className="h-5 w-5 text-error" />}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-secondary" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{stat.description}</p>
                {stat.badge && (
                  <Badge variant={stat.badge.variant === 'destructive' ? 'error' : stat.badge.variant} className="text-xs font-medium rounded-full px-3 py-1">
                    {stat.badge.text}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});

DashboardStats.displayName = 'DashboardStats';
