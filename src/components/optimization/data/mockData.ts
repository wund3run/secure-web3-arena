
import { OptimizationOpportunity, PredictiveModel } from "../types";

export const getMockOptimizations = (): OptimizationOpportunity[] => [
  {
    id: "checkout-optimization",
    title: "Streamline Audit Request Flow",
    description: "Reduce form fields by 40% to increase completion rate",
    impact: "high",
    effort: "medium",
    category: "conversion",
    predictedImprovement: 34,
    implementationTime: "2 weeks",
    confidence: 89,
    currentValue: 23,
    projectedValue: 31,
    aiInsight: "Analysis of 10,000+ user sessions shows form abandonment at step 3 due to information overload"
  },
  {
    id: "load-time-optimization",
    title: "Optimize Critical Render Path",
    description: "Implement lazy loading to reduce initial load time by 45%",
    impact: "high",
    effort: "low",
    category: "performance",
    predictedImprovement: 45,
    implementationTime: "1 week",
    confidence: 92,
    currentValue: 3.2,
    projectedValue: 1.8,
    aiInsight: "Page load time directly correlates with 15% conversion rate decrease per additional second"
  },
  {
    id: "personalization-engine",
    title: "Dynamic Content Personalization",
    description: "AI-powered content adaptation based on user behavior",
    impact: "high",
    effort: "high",
    category: "engagement",
    predictedImprovement: 28,
    implementationTime: "6 weeks",
    confidence: 85,
    currentValue: 4.2,
    projectedValue: 5.4,
    aiInsight: "Personalized content shows 28% higher engagement in similar platforms"
  },
  {
    id: "notification-optimization",
    title: "Smart Notification Timing",
    description: "AI-optimized notification delivery based on user activity patterns",
    impact: "medium",
    effort: "low",
    category: "retention",
    predictedImprovement: 22,
    implementationTime: "3 days",
    confidence: 78,
    currentValue: 45,
    projectedValue: 55,
    aiInsight: "User activity patterns show optimal notification windows vary by 3-hour intervals"
  }
];

export const getMockPredictiveModels = (): PredictiveModel[] => [
  {
    metric: "User Conversion Rate",
    currentTrend: [23, 25, 24, 26, 28, 27, 29],
    predictedTrend: [31, 33, 35, 37, 39, 41, 43],
    accuracy: 87,
    factors: ["Page load time", "Form complexity", "Trust signals", "User onboarding"]
  },
  {
    metric: "User Retention",
    currentTrend: [78, 76, 79, 81, 83, 85, 84],
    predictedTrend: [87, 89, 91, 93, 95, 97, 98],
    accuracy: 82,
    factors: ["Feature adoption", "Support interactions", "Satisfaction scores", "Engagement frequency"]
  }
];
