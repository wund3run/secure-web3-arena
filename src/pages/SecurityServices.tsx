
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionManager } from '@/components/security-services/SubscriptionManager';
import { ThreatIntelligenceDashboard } from '@/components/security-services/ThreatIntelligenceDashboard';
import { CertificationCenter } from '@/components/security-services/CertificationCenter';
import { Shield, AlertTriangle, Award, BarChart3 } from 'lucide-react';

export default function SecurityServices() {
  return (
    <StandardLayout 
      title="Security Services - Hawkly"
      description="Comprehensive security-as-a-service platform with continuous monitoring, threat intelligence, and certification programs"
    >
      <Helmet>
        <title>Security Services - Hawkly</title>
        <meta name="description" content="Advanced security services including continuous monitoring, threat intelligence, insurance coverage, and professional certifications" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security-as-a-Service</h1>
          <p className="text-muted-foreground">
            Comprehensive security monitoring, threat intelligence, and certification programs for Web3 projects
          </p>
        </div>

        <Tabs defaultValue="subscription" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subscription" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Threat Intelligence</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Certifications</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscription">
            <SubscriptionManager />
          </TabsContent>

          <TabsContent value="monitoring">
            <ThreatIntelligenceDashboard />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationCenter />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                Advanced security analytics and market intelligence coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
}
