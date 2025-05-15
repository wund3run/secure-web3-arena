
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiskArea {
  name: string;
  score: number;
  risk: 'critical' | 'high' | 'medium' | 'low' | 'info';
}

interface RiskBreakdownProps {
  riskAreas: RiskArea[];
}

export function RiskBreakdown({ riskAreas }: RiskBreakdownProps) {
  // Helper function to get risk color
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-destructive';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Area Breakdown</CardTitle>
        <CardDescription>Security analysis by vulnerability category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {riskAreas.map((area, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(area.risk)} mr-2`} />
                  <span>{area.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${area.score >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {area.score}%
                  </span>
                  <span className="text-xs uppercase bg-muted px-2 py-0.5 rounded text-muted-foreground">
                    {area.risk}
                  </span>
                </div>
              </div>
              <Progress 
                value={area.score} 
                className="h-2" 
                indicatorClassName={`
                  ${area.score >= 90 ? 'bg-green-500' : 
                    area.score >= 70 ? 'bg-blue-500' : 
                    area.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}
                `}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
