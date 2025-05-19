
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface JourneyStepProps {
  stepNumber: number;
  title: string;
  description: string;
  pages: string[];
  conversionRate?: number;
  revenueImpact?: "high" | "medium" | "low";
  icon?: ReactNode;
  isActive?: boolean;
}

export function JourneyStep({
  stepNumber,
  title,
  description,
  pages,
  conversionRate,
  revenueImpact,
  icon,
  isActive = false
}: JourneyStepProps) {
  return (
    <Card className={`border ${isActive ? 'border-primary' : ''} transition-all duration-200`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {icon || stepNumber}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-medium">{title}</h4>
              {revenueImpact && (
                <Badge variant={revenueImpact === "high" ? "default" : revenueImpact === "medium" ? "secondary" : "outline"}>
                  {revenueImpact === "high" ? "High Revenue" : revenueImpact === "medium" ? "Medium Revenue" : "Low Revenue"}
                </Badge>
              )}
            </div>
            <CardDescription>{description}</CardDescription>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {pages.map((page, i) => (
                <Badge key={i} variant="secondary">
                  {page}
                </Badge>
              ))}
            </div>
            
            {conversionRate !== undefined && (
              <div className="mt-2 text-sm text-muted-foreground">
                Conversion Rate: <span className="font-medium">{conversionRate}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
