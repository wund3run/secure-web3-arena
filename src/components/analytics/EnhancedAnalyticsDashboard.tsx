
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Database, BarChart3 } from 'lucide-react';
import { AITemplateGenerator } from './dashboard-templates/AITemplateGenerator';
import { DataConsistencyChecker } from './data-consistency/DataConsistencyChecker';
import { EnhancedKPIVisualizations } from './kpi/EnhancedKPIVisualizations';
import { ComprehensiveAnalyticsDashboard } from './ComprehensiveAnalyticsDashboard';

export const EnhancedAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered analytics with advanced data consistency and KPI visualizations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Enhanced
          </Badge>
          <Badge variant="outline">
            <Database className="h-3 w-3 mr-1" />
            Data Validated
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="kpi" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Enhanced KPIs
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Templates
          </TabsTrigger>
          <TabsTrigger value="consistency" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Quality
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ComprehensiveAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="kpi">
          <EnhancedKPIVisualizations />
        </TabsContent>

        <TabsContent value="templates">
          <AITemplateGenerator />
        </TabsContent>

        <TabsContent value="consistency">
          <DataConsistencyChecker />
        </TabsContent>
      </Tabs>
    </div>
  );
};
