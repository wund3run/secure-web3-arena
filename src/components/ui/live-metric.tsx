import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface LiveMetricProps {
  title: string;
  value: string | number;
  trend?: string;
  icon?: LucideIcon | React.ElementType;
  className?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

export function LiveMetric({
  title,
  value,
  trend,
  icon: Icon,
  className,
  trendType
}: LiveMetricProps) {
  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    if (trendType === 'positive') return "text-green-500";
    if (trendType === 'negative') return "text-red-500";
    return trend.startsWith('+') ? "text-green-500" : "text-red-500";
  };
  
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {Icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          {trend && (
            <span className={cn("text-sm font-medium", getTrendColor())}>
              {trend}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
