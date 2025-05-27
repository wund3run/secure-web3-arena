
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain } from "lucide-react";
import { IntelligentRecommendationEngineProps, SmartRecommendation } from "./types";
import { generateSmartRecommendations } from "./utils/recommendationGenerator";
import { LoadingState } from "./components/LoadingState";
import { RecommendationsList } from "./components/RecommendationsList";

export function IntelligentRecommendationEngine({ 
  userType, 
  userBehaviorData 
}: IntelligentRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState("priority");

  useEffect(() => {
    // Simulate AI analysis
    const analyzeUserBehavior = async () => {
      setIsAnalyzing(true);
      
      // Simulate API call to AI recommendation service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const smartRecommendations = generateSmartRecommendations(userType, userBehaviorData);
      setRecommendations(smartRecommendations);
      setIsAnalyzing(false);
    };

    analyzeUserBehavior();
  }, [userType, userBehaviorData]);

  if (isAnalyzing) {
    return <LoadingState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI-Powered Smart Recommendations
        </CardTitle>
        <CardDescription>
          Personalized insights and actions based on advanced behavioral analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="priority">By Confidence</TabsTrigger>
            <TabsTrigger value="impact">By Impact</TabsTrigger>
            <TabsTrigger value="roi">By ROI</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <RecommendationsList 
              recommendations={recommendations} 
              activeTab={activeTab}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
