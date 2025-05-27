
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";
import { OptimizationOpportunity } from "../types";
import { getImpactColor, getEffortColor } from "../utils/badgeUtils";
import { getCategoryIcon } from "../utils/iconUtils";

interface OptimizationCardProps {
  optimization: OptimizationOpportunity;
}

export function OptimizationCard({ optimization }: OptimizationCardProps) {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              {getCategoryIcon(optimization.category)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">{optimization.title}</h4>
                <Badge variant={getImpactColor(optimization.impact)}>
                  {optimization.impact} impact
                </Badge>
                <Badge variant={getEffortColor(optimization.effort)}>
                  {optimization.effort} effort
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {optimization.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    +{optimization.predictedImprovement}%
                  </div>
                  <div className="text-xs text-muted-foreground">Predicted Improvement</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded">
                  <div className="text-lg font-semibold">
                    {optimization.currentValue} → {optimization.projectedValue}
                  </div>
                  <div className="text-xs text-muted-foreground">Current → Projected</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded">
                  <div className="text-lg font-semibold">{optimization.confidence}%</div>
                  <div className="text-xs text-muted-foreground">AI Confidence</div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">AI Insight:</span>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{optimization.aiInsight}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Implementation time: {optimization.implementationTime}</span>
                <div className="flex items-center gap-1">
                  <span>Confidence:</span>
                  <Progress value={optimization.confidence} className="w-16 h-2" />
                  <span>{optimization.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="sm">
              Implement
            </Button>
            <Button variant="outline" size="sm">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
