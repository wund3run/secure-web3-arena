import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Award,
  TrendingUp,
  LucideIcon
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  className?: string;
}

function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              
              {trend && (
                <span className={cn(
                  "text-xs font-medium flex items-center gap-0.5",
                  trend.direction === 'up' && "text-green-500",
                  trend.direction === 'down' && "text-red-500",
                  trend.direction === 'neutral' && "text-muted-foreground"
                )}>
                  {trend.direction === 'up' && <TrendingUp className="h-3 w-3" />}
                  {trend.direction === 'down' && <TrendingUp className="h-3 w-3 rotate-180" />}
                  {trend.value}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricsOverviewProps {
  userId: string;
  className?: string;
}

export function MetricsOverview({ userId, className }: MetricsOverviewProps) {
  // In a real implementation, this would fetch data from an API
  // For now, we'll use mock data
  const metrics = [
    {
      title: "Total Projects",
      value: 5,
      description: "Active security projects",
      icon: ShieldCheck,
      trend: { direction: 'up' as const, value: '+2 this month' }
    },
    {
      title: "Security Issues",
      value: 12,
      description: "3 critical issues found",
      icon: AlertTriangle,
      trend: { direction: 'down' as const, value: '-5 from last audit' }
    },
    {
      title: "Avg Response Time",
      value: "24h",
      description: "Time to fix critical issues",
      icon: Clock,
      trend: { direction: 'neutral' as const, value: 'unchanged' }
    },
    {
      title: "Security Score",
      value: "86/100",
      description: "Improved by 12 points",
      icon: Award,
      trend: { direction: 'up' as const, value: '+12 pts' }
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          icon={metric.icon}
          trend={metric.trend}
        />
      ))}
    </div>
  );
}
