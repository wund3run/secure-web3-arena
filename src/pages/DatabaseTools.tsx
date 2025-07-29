
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CacheManager } from '@/components/caching/CacheManager';
import { ResourceOptimizer } from '@/components/optimization/ResourceOptimizer';

export default function DatabaseTools() {
  return (
    <StandardLayout 
      title="Database Tools - Hawkly"
      description="Database management, optimization, and monitoring tools"
    >
      <Helmet>
        <title>Database Tools - Hawkly</title>
        <meta name="description" content="Comprehensive database management and optimization tools" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Database Tools</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive database management, caching, and optimization tools
            </p>
          </div>

          <Tabs defaultValue="cache" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="cache">Cache Manager</TabsTrigger>
              <TabsTrigger value="optimization">Resource Optimizer</TabsTrigger>
            </TabsList>

            <TabsContent value="cache">
              <CacheManager />
            </TabsContent>

            <TabsContent value="optimization">
              <ResourceOptimizer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
