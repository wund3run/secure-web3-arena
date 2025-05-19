
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SeverityCardProps {
  highSeverityCount: number;
  mediumSeverityCount: number;
  lowSeverityCount: number;
  totalIssuesCount: number;
}

export const SeverityCard: React.FC<SeverityCardProps> = ({ 
  highSeverityCount, 
  mediumSeverityCount, 
  lowSeverityCount, 
  totalIssuesCount 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Issues by Severity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
              <span className="text-sm">High: {highSeverityCount}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
              <span className="text-sm">Medium: {mediumSeverityCount}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
              <span className="text-sm">Low: {lowSeverityCount}</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold">{totalIssuesCount}</div>
            <div className="text-xs text-muted-foreground">Total Issues</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
