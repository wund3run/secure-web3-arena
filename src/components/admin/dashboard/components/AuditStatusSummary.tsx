
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AuditStatus {
  status: string;
  count: number;
  color?: string;
}

interface AuditStatusSummaryProps {
  data?: AuditStatus[];
  loading?: boolean;
  total?: number;
}

export function AuditStatusSummary({ 
  data = [
    { status: "Completed", count: 87, color: "bg-green-500" },
    { status: "In Progress", count: 32, color: "bg-blue-500" },
    { status: "Pending", count: 14, color: "bg-amber-500" },
    { status: "Rejected", count: 3, color: "bg-red-500" }
  ],
  loading = false,
  total = 136
}: AuditStatusSummaryProps) {
  
  // Calculate percentages
  const dataWithPercentages = data.map(item => ({
    ...item,
    percentage: Math.round((item.count / total) * 100)
  }));
  
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'outline';
      case 'in progress': return 'secondary';
      case 'pending': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="animate-pulse bg-muted h-6 w-40 rounded"></CardTitle>
          <CardDescription className="animate-pulse bg-muted h-4 w-60 rounded"></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="animate-pulse bg-muted h-5 w-20 rounded"></div>
                <div className="animate-pulse bg-muted h-5 w-10 rounded"></div>
              </div>
              <div className="animate-pulse bg-muted h-2 w-full rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Status Overview</CardTitle>
        <CardDescription>Distribution of audits by current status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dataWithPercentages.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                <span className="text-sm text-muted-foreground">{item.count} audits</span>
              </div>
              <span className="text-sm font-medium">{item.percentage}%</span>
            </div>
            <Progress value={item.percentage} className={item.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
