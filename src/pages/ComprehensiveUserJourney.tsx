
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserJourneyAnalytics } from '@/components/user-journey/UserJourneyAnalytics';
import { TouchpointAnalysis } from '@/components/user-journey/TouchpointAnalysis';
import { WorkflowOptimization } from '@/components/user-journey/WorkflowOptimization';
import { ComplianceReadiness } from '@/components/user-journey/ComplianceReadiness';
import { ConversionFunnelAnalysis } from '@/components/user-journey/ConversionFunnelAnalysis';
import { 
  BarChart3, 
  Users, 
  Workflow, 
  Shield, 
  TrendingUp,
  Target
} from 'lucide-react';

export default function ComprehensiveUserJourney() {
  return (
    <>
      <Helmet>
        <title>Comprehensive User Journey Analysis | Hawkly</title>
        <meta name="description" content="Complete analysis of user journeys, touchpoints, workflows, and compliance readiness for the Hawkly platform" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Comprehensive User Journey Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Deep dive into user experiences, touchpoint optimization, workflow efficiency, 
                and production readiness across the entire Hawkly platform ecosystem
              </p>
            </div>

            {/* Main Analysis Tabs */}
            <Tabs defaultValue="journey-analytics" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="journey-analytics" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Journey Analytics
                </TabsTrigger>
                <TabsTrigger value="touchpoints" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Touchpoint Analysis
                </TabsTrigger>
                <TabsTrigger value="workflows" className="flex items-center gap-2">
                  <Workflow className="h-4 w-4" />
                  Workflow Optimization
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Compliance Readiness
                </TabsTrigger>
                <TabsTrigger value="conversion" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Conversion Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journey-analytics" className="space-y-6">
                <UserJourneyAnalytics />
              </TabsContent>

              <TabsContent value="touchpoints" className="space-y-6">
                <TouchpointAnalysis />
              </TabsContent>

              <TabsContent value="workflows" className="space-y-6">
                <WorkflowOptimization />
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <ComplianceReadiness />
              </TabsContent>

              <TabsContent value="conversion" className="space-y-6">
                <ConversionFunnelAnalysis />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
