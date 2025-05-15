
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPercentage } from "../utils/formatters";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  tooltipContent?: string;
}

function MetricCard({ title, value, change, changeLabel, tooltipContent }: MetricCardProps) {
  const isPositiveChange = typeof change === 'number' ? change > 0 : false;
  const changeColorClass = isPositiveChange ? 'text-green-600' : 'text-red-600';
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {title}
            {tooltipContent && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground ml-1 inline-block cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{tooltipContent}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change !== undefined || changeLabel) && (
          <p className="text-xs text-muted-foreground">
            {change !== undefined && (
              <span className={changeColorClass}>
                {isPositiveChange ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            )}
            {changeLabel && <span className="ml-1">{changeLabel}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface PlatformMetricsDisplayProps {
  metrics?: {
    usersCount?: number;
    userGrowth?: number;
    auditorsCount?: number;
    auditorGrowth?: number;
    auditsCompleted?: number;
    auditGrowth?: number;
    averageRating?: number;
  };
  loading?: boolean;
}

export function PlatformMetricsDisplay({ 
  metrics = {
    usersCount: 0,
    userGrowth: 0,
    auditorsCount: 0,
    auditorGrowth: 0,
    auditsCompleted: 0,
    auditGrowth: 0,
    averageRating: 0
  }, 
  loading = false 
}: PlatformMetricsDisplayProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard 
        title="Total Users" 
        value={formatNumber(metrics.usersCount || 0)} 
        change={metrics.userGrowth} 
        changeLabel="vs. last month"
        tooltipContent="Total number of registered users on the platform" 
      />
      
      <MetricCard 
        title="Security Providers" 
        value={formatNumber(metrics.auditorsCount || 0)} 
        change={metrics.auditorGrowth} 
        changeLabel="vs. last month"
        tooltipContent="Number of verified security auditors and service providers" 
      />
      
      <MetricCard 
        title="Completed Audits" 
        value={formatNumber(metrics.auditsCompleted || 0)} 
        change={metrics.auditGrowth} 
        changeLabel="vs. last month"
        tooltipContent="Total number of security audits completed on the platform" 
      />
      
      <MetricCard 
        title="Average Rating" 
        value={`${metrics.averageRating?.toFixed(1) || '0.0'} / 5.0`} 
        tooltipContent="Average rating of security services based on client reviews" 
      />
    </div>
  );
}
