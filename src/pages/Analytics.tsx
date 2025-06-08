
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedAnalyticsDashboard } from '@/components/analytics/EnhancedAnalyticsDashboard';
import { AdvancedPredictiveAnalytics } from '@/components/analytics/AdvancedPredictiveAnalytics';
import { IntelligentAutomationDashboard } from '@/components/automation/IntelligentAutomationDashboard';
import { SmartRecommendationEngine } from '@/components/recommendations/SmartRecommendationEngine';

export default function Analytics() {
  return (
    <StandardLayout 
      title="Analytics - Hawkly"
      description="Advanced analytics, AI insights, and automation dashboard"
    >
      <Helmet>
        <title>Analytics - Hawkly</title>
        <meta name="description" content="Comprehensive analytics with AI-powered insights, predictive modeling, and intelligent automation" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Advanced Analytics Center</h1>
            <p className="text-muted-foreground text-lg">
              AI-powered insights, predictive analytics, automation, and personalized recommendations
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Analytics Overview</TabsTrigger>
              <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
              <TabsTrigger value="automation">AI Automation</TabsTrigger>
              <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <EnhancedAnalyticsDashboard />
            </TabsContent>

            <TabsContent value="predictive">
              <AdvancedPredictiveAnalytics />
            </TabsContent>

            <TabsContent value="automation">
              <IntelligentAutomationDashboard />
            </TabsContent>

            <TabsContent value="recommendations">
              <SmartRecommendationEngine />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
