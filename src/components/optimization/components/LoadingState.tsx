
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

export function LoadingState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 animate-pulse" />
          Predictive Optimization Engine
        </CardTitle>
        <CardDescription>
          AI is analyzing patterns and generating optimization predictions...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-sm">Running predictive models...</span>
          </div>
          <Progress value={85} className="h-2" />
          <div className="text-xs text-muted-foreground">
            Analyzing conversion patterns, user behavior, and performance metrics
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
