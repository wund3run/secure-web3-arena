
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ValidationIssue } from "@/utils/validation/types";
import { OverviewTabContent, CategoryTabContent } from "./DetailedTabContent";

interface DetailedAnalysisProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  issues: ValidationIssue[];
  highSeverityCount: number;
  accessibilityIssues: ValidationIssue[];
  performanceIssues: ValidationIssue[];
  designIssues: ValidationIssue[];
  contentIssues: ValidationIssue[];
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  activeTab,
  setActiveTab,
  issues,
  highSeverityCount,
  accessibilityIssues,
  performanceIssues,
  designIssues,
  contentIssues
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analysis</CardTitle>
        <CardDescription>
          Comprehensive breakdown of issues by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="design">Design & UI</TabsTrigger>
            <TabsTrigger value="content">Content & Navigation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTabContent 
              issues={issues}
              highSeverityCount={highSeverityCount}
              accessibilityIssues={accessibilityIssues}
              performanceIssues={performanceIssues}
              designIssues={designIssues}
              contentIssues={contentIssues}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          
          <TabsContent value="accessibility">
            <CategoryTabContent 
              title="Accessibility Issues" 
              issues={accessibilityIssues} 
            />
          </TabsContent>
          
          <TabsContent value="performance">
            <CategoryTabContent 
              title="Performance Issues" 
              issues={performanceIssues} 
            />
          </TabsContent>
          
          <TabsContent value="design">
            <CategoryTabContent 
              title="Design & UI Issues" 
              issues={designIssues} 
            />
          </TabsContent>
          
          <TabsContent value="content">
            <CategoryTabContent 
              title="Content & Navigation Issues" 
              issues={contentIssues} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
