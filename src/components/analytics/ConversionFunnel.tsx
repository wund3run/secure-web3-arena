
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, CheckCircle } from "lucide-react";

interface FunnelStep {
  name: string;
  visitors: number;
  conversionRate: number;
  icon: React.ReactNode;
}

export function ConversionFunnel() {
  const funnelSteps: FunnelStep[] = [
    {
      name: "Landing Page Visits",
      visitors: 10000,
      conversionRate: 100,
      icon: <Users className="h-5 w-5" />
    },
    {
      name: "Service Exploration",
      visitors: 7500,
      conversionRate: 75,
      icon: <Target className="h-5 w-5" />
    },
    {
      name: "Account Registration",
      visitors: 3000,
      conversionRate: 30,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      name: "First Service Request",
      visitors: 1200,
      conversionRate: 12,
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Conversion Funnel</CardTitle>
        <CardDescription>
          Track user progression through key platform milestones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {funnelSteps.map((step, index) => (
          <div key={step.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {step.icon}
                <span className="font-medium">{step.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {step.visitors.toLocaleString()} users
                </span>
                <span className="text-sm font-medium">
                  {step.conversionRate}%
                </span>
              </div>
            </div>
            <Progress value={step.conversionRate} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
