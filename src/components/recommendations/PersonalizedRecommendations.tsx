import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "action" | "learning" | "opportunity" | "security";
  priority: "high" | "medium" | "low";
  link: string;
  icon: React.ReactNode;
}

interface PersonalizedRecommendationsProps {
  userType: "project_owner" | "auditor" | "admin" | "general";
}

export function PersonalizedRecommendations({ userType }: PersonalizedRecommendationsProps) {
  const getRecommendations = (): Recommendation[] => {
    const recommendations: Record<string, Recommendation[]> = {
      project_owner: [
        {
          id: "security_audit",
          title: "Schedule Your First Security Audit",
          description: "Protect your smart contracts before deployment",
          type: "security",
          priority: "high",
          link: "/request-audit",
          icon: <Shield className="h-5 w-5" />
        },
        {
          id: "best_practices",
          title: "Learn Security Best Practices",
          description: "Essential guidelines for secure smart contract development",
          type: "learning",
          priority: "medium",
          link: "/resources/security-best-practices",
          icon: <Lightbulb className="h-5 w-5" />
        },
        {
          id: "roi_calculator",
          title: "Calculate Your Security ROI",
          description: "See how much you can save with early security audits",
          type: "action",
          priority: "medium",
          link: "/for-project-owners#calculator",
          icon: <TrendingUp className="h-5 w-5" />
        }
      ],
      auditor: [
        {
          id: "certification",
          title: "Complete Auditor Certification",
          description: "Increase your credibility and earning potential",
          type: "opportunity",
          priority: "high",
          link: "/certification",
          icon: <Shield className="h-5 w-5" />
        },
        {
          id: "new_projects",
          title: "5 New Projects Match Your Skills",
          description: "DeFi and NFT projects looking for security experts",
          type: "opportunity",
          priority: "high",
          link: "/marketplace?filter=recommended",
          icon: <TrendingUp className="h-5 w-5" />
        },
        {
          id: "advanced_tools",
          title: "Master Advanced Audit Tools",
          description: "Learn cutting-edge vulnerability detection techniques",
          type: "learning",
          priority: "medium",
          link: "/resources/advanced-tools",
          icon: <Lightbulb className="h-5 w-5" />
        }
      ],
      admin: [
        {
          id: "platform_health",
          title: "Review Platform Performance",
          description: "Check system metrics and user satisfaction scores",
          type: "action",
          priority: "high",
          link: "/admin/dashboard?tab=reports",
          icon: <TrendingUp className="h-5 w-5" />
        },
        {
          id: "user_feedback",
          title: "Address User Feedback",
          description: "12 new feedback items requiring attention",
          type: "action",
          priority: "medium",
          link: "/admin/feedback",
          icon: <Users className="h-5 w-5" />
        }
      ],
      general: [
        {
          id: "get_started",
          title: "Choose Your Path",
          description: "Are you a project owner or security auditor?",
          type: "action",
          priority: "high",
          link: "/onboarding",
          icon: <Users className="h-5 w-5" />
        },
        {
          id: "learn_web3_security",
          title: "Learn Web3 Security Basics",
          description: "Understanding blockchain security fundamentals",
          type: "learning",
          priority: "medium",
          link: "/resources/web3-security-intro",
          icon: <Shield className="h-5 w-5" />
        }
      ]
    };

    return recommendations[userType] || recommendations.general;
  };

  const recommendations = getRecommendations();

  const getPriorityColor = (priority: string): string => {
    const colors = {
      high: "destructive",
      medium: "secondary",
      low: "outline"
    };
    return colors[priority as keyof typeof colors] || "outline";
  };

  const getTypeIcon = (type: string): React.ReactNode => {
    const icons = {
      action: <TrendingUp className="h-4 w-4" />,
      learning: <Lightbulb className="h-4 w-4" />,
      opportunity: <Shield className="h-4 w-4" />,
      security: <Shield className="h-4 w-4" />
    };
    return icons[type as keyof typeof icons] || <Lightbulb className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Personalized Recommendations
        </CardTitle>
        <CardDescription>
          Actions and resources tailored to your role and activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg">
                {recommendation.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <Badge variant={getPriorityColor(recommendation.priority) as "default" | "secondary" | "destructive" | "outline"}>
                    {recommendation.priority}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(recommendation.type)}
                    <span className="text-xs text-muted-foreground capitalize">
                      {recommendation.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {recommendation.description}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={recommendation.link}>
                View
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
