
import { SmartRecommendation } from "../types";

export const generateSmartRecommendations = (userType: string, behaviorData?: any): SmartRecommendation[] => {
  const baseRecommendations: Record<string, SmartRecommendation[]> = {
    project_owner: [
      {
        id: "ai-audit-matching",
        title: "AI-Optimized Auditor Matching",
        description: "Our AI has identified 3 auditors with 94% compatibility for your DeFi project",
        confidence: 94,
        impact: "high",
        category: "optimization",
        actionUrl: "/marketplace?ai-match=true",
        aiReasoning: "Based on your project complexity, previous audit history, and auditor success rates",
        expectedOutcome: "23% faster audit completion, 15% higher satisfaction rate",
        timeToImplement: "5 minutes",
        predictedROI: 4.2
      },
      {
        id: "security-risk-prevention",
        title: "Proactive Security Risk Assessment",
        description: "Early vulnerability patterns detected - schedule preventive audit now",
        confidence: 87,
        impact: "high",
        category: "security",
        actionUrl: "/security-assessment",
        aiReasoning: "Code patterns similar to 12 previously audited projects with critical vulnerabilities",
        expectedOutcome: "Prevent potential $500K+ in security breaches",
        timeToImplement: "15 minutes",
        predictedROI: 8.7
      },
      {
        id: "cost-optimization",
        title: "Smart Budget Optimization",
        description: "Adjust audit scope to save 18% on costs while maintaining security coverage",
        confidence: 79,
        impact: "medium",
        category: "efficiency",
        actionUrl: "/audit-scope-optimizer",
        aiReasoning: "Similar projects achieved equal security with reduced scope in non-critical areas",
        expectedOutcome: "18% cost reduction, same security level",
        timeToImplement: "10 minutes",
        predictedROI: 3.4
      }
    ],
    auditor: [
      {
        id: "skill-enhancement",
        title: "Personalized Skill Development Path",
        description: "AI-curated learning path to increase your earning potential by 32%",
        confidence: 91,
        impact: "high",
        category: "growth",
        actionUrl: "/skill-development",
        aiReasoning: "Analysis of top-earning auditors with similar backgrounds shows key skill gaps",
        expectedOutcome: "32% higher hourly rates within 3 months",
        timeToImplement: "2 hours/week",
        predictedROI: 5.8
      },
      {
        id: "optimal-project-selection",
        title: "Smart Project Selection Algorithm",
        description: "5 high-value projects identified that match your expertise perfectly",
        confidence: 88,
        impact: "high",
        category: "optimization",
        actionUrl: "/recommended-projects",
        aiReasoning: "Projects align with your success patterns and expertise areas",
        expectedOutcome: "40% higher project completion rate",
        timeToImplement: "Immediate",
        predictedROI: 6.2
      },
      {
        id: "efficiency-tools",
        title: "Automated Workflow Enhancement",
        description: "AI-powered tools to reduce audit time by 25% while improving quality",
        confidence: 82,
        impact: "medium",
        category: "efficiency",
        actionUrl: "/workflow-automation",
        aiReasoning: "Workflow analysis shows repetitive tasks that can be automated",
        expectedOutcome: "25% faster audits, improved consistency",
        timeToImplement: "30 minutes setup",
        predictedROI: 4.1
      }
    ],
    admin: [
      {
        id: "platform-optimization",
        title: "Platform Performance Optimization",
        description: "AI detected bottlenecks - implement fixes to improve user satisfaction by 19%",
        confidence: 93,
        impact: "high",
        category: "optimization",
        actionUrl: "/platform-optimization",
        aiReasoning: "User behavior analysis shows friction points in key conversion flows",
        expectedOutcome: "19% user satisfaction increase, 12% conversion improvement",
        timeToImplement: "2 hours",
        predictedROI: 7.3
      },
      {
        id: "user-retention",
        title: "Predictive User Retention Strategy",
        description: "AI identified at-risk users - implement retention strategies to reduce churn by 28%",
        confidence: 86,
        impact: "high",
        category: "growth",
        actionUrl: "/retention-strategy",
        aiReasoning: "Behavioral patterns indicate users likely to churn in next 30 days",
        expectedOutcome: "28% churn reduction, $150K annual revenue protection",
        timeToImplement: "1 hour",
        predictedROI: 9.4
      }
    ]
  };

  return baseRecommendations[userType] || [];
};
