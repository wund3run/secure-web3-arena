
export interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  category: "conversion" | "performance" | "engagement" | "retention";
  predictedImprovement: number;
  implementationTime: string;
  confidence: number;
  currentValue: number;
  projectedValue: number;
  aiInsight: string;
}

export interface PredictiveModel {
  metric: string;
  currentTrend: number[];
  predictedTrend: number[];
  accuracy: number;
  factors: string[];
}
