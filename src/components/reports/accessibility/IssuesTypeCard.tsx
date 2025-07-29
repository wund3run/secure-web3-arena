
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IssuesTypeCardProps {
  accessibilityIssues: number;
  performanceIssues: number;
  designIssues: number;
  contentIssues: number;
}

export const IssuesTypeCard: React.FC<IssuesTypeCardProps> = ({ 
  accessibilityIssues, 
  performanceIssues, 
  designIssues, 
  contentIssues 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Issues by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Accessibility</span>
            <Badge variant={accessibilityIssues > 0 ? "error" : "secondary"}>
              {accessibilityIssues}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Performance</span>
            <Badge variant={performanceIssues > 0 ? "error" : "secondary"}>
              {performanceIssues}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Design & UI</span>
            <Badge variant={designIssues > 0 ? "error" : "secondary"}>
              {designIssues}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Content & Navigation</span>
            <Badge variant={contentIssues > 0 ? "error" : "secondary"}>
              {contentIssues}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
