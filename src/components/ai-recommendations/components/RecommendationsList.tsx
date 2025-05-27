
import React from "react";
import { SmartRecommendation } from "../types";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationsListProps {
  recommendations: SmartRecommendation[];
  activeTab: string;
}

export function RecommendationsList({ recommendations, activeTab }: RecommendationsListProps) {
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (activeTab === "priority") return b.confidence - a.confidence;
    if (activeTab === "impact") {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
    if (activeTab === "roi" && a.predictedROI && b.predictedROI) {
      return b.predictedROI - a.predictedROI;
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      {sortedRecommendations.map((recommendation) => (
        <RecommendationCard key={recommendation.id} recommendation={recommendation} />
      ))}
    </div>
  );
}
