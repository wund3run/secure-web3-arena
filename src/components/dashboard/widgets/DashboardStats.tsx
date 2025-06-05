
import React from 'react';
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

export const DashboardStats = ({ data }: DashboardStatsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent', variant: 'default' as const };
    if (score >= 70) return { text: 'Good', variant: 'secondary' as const };
    return { text: 'Needs Attention', variant: 'destructive' as const };
  };

  const stats = [
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                {stat.badge && (
                  <Badge variant={stat.badge.variant} className="text-xs">
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
};
