
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { OptimizationOpportunity, PredictiveModel } from "./types";
import { getMockOptimizations, getMockPredictiveModels } from "./data/mockData";
import { LoadingState } from "./components/LoadingState";
import { OptimizationCard } from "./components/OptimizationCard";
import { PredictiveModelCard } from "./components/PredictiveModelCard";

export function PredictiveOptimization() {
  const [optimizations, setOptimizations] = useState<OptimizationOpportunity[]>([]);
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    const performPredictiveAnalysis = async () => {
      setIsAnalyzing(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setOptimizations(getMockOptimizations());
      setPredictiveModels(getMockPredictiveModels());
      setIsAnalyzing(false);
    };

    performPredictiveAnalysis();
  }, []);

  if (isAnalyzing) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Optimization Engine
          </CardTitle>
          <CardDescription>
            AI-powered predictions and optimization opportunities based on data analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="opportunities" className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="opportunities">Optimization Opportunities</TabsTrigger>
              <TabsTrigger value="predictions">Predictive Models</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="space-y-4">
              {optimizations.map((optimization) => (
                <OptimizationCard key={optimization.id} optimization={optimization} />
              ))}
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              {predictiveModels.map((model, index) => (
                <PredictiveModelCard key={index} model={model} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
