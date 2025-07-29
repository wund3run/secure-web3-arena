
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { SmartRecommendation } from "../types";
import { getImpactColor } from "../utils/badgeUtils";
import { getCategoryIcon } from "../utils/iconUtils";

interface RecommendationCardProps {
  recommendation: SmartRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-primary/10 rounded-lg">
            {getCategoryIcon(recommendation.category)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{recommendation.title}</h4>
              <Badge variant={getImpactColor(recommendation.impact)}>
                {recommendation.impact} impact
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Brain className="h-3 w-3" />
                {recommendation.confidence}% confidence
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {recommendation.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-medium">AI Reasoning:</span>
                <p className="text-muted-foreground mt-1">{recommendation.aiReasoning}</p>
              </div>
              <div>
                <span className="font-medium">Expected Outcome:</span>
                <p className="text-muted-foreground mt-1">{recommendation.expectedOutcome}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span>⏱️ {recommendation.timeToImplement}</span>
              {recommendation.predictedROI && (
                <span>📈 {recommendation.predictedROI}x ROI</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button size="sm" asChild>
            <Link to={recommendation.actionUrl}>
              Take Action
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Confidence Score</span>
          <span className="font-medium">{recommendation.confidence}%</span>
        </div>
        <Progress value={recommendation.confidence} className="h-1 mt-1" />
      </div>
    </div>
  );
}
