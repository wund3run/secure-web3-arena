
export interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  category: "optimization" | "security" | "growth" | "efficiency";
  actionUrl: string;
  aiReasoning: string;
  expectedOutcome: string;
  timeToImplement: string;
  predictedROI?: number;
}

export interface IntelligentRecommendationEngineProps {
  userType: "project_owner" | "auditor" | "admin";
  userBehaviorData?: unknown;
}
