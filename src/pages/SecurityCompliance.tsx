
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdvancedSecurityMonitoring } from '@/components/security/AdvancedSecurityMonitoring';
import { ComplianceFrameworkManager } from '@/components/compliance/ComplianceFrameworkManager';
import { ThreatIntelligenceDashboard } from '@/components/threat-intelligence/ThreatIntelligenceDashboard';
import { AutomatedSecurityScanning } from '@/components/security/AutomatedSecurityScanning';

export default function SecurityCompliance() {
  return (
    <StandardLayout 
      title="Security & Compliance - Hawkly"
      description="Advanced security monitoring and compliance management"
    >
      <Helmet>
        <title>Security & Compliance - Hawkly</title>
        <meta name="description" content="Comprehensive security and compliance management dashboard" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Security & Compliance</h1>
            <p className="text-muted-foreground text-lg">
              Advanced security monitoring, threat intelligence, and compliance management
            </p>
          </div>

          <Tabs defaultValue="monitoring" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="monitoring">Security Monitoring</TabsTrigger>
              <TabsTrigger value="scanning">Automated Scanning</TabsTrigger>
              <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring">
              <AdvancedSecurityMonitoring />
            </TabsContent>

            <TabsContent value="scanning">
              <AutomatedSecurityScanning />
            </TabsContent>

            <TabsContent value="threats">
              <ThreatIntelligenceDashboard />
            </TabsContent>

            <TabsContent value="compliance">
              <ComplianceFrameworkManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
