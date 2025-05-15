
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityOverview } from "./SecurityOverview";
import { VulnerabilityScanner } from "./VulnerabilityScanner";
import { ThreatDetection } from "./ThreatDetection";
import { SecurityReports } from "./SecurityReports";
import { SecurityAssessmentForm } from "./SecurityAssessmentForm";

interface SecurityDashboardProps {
  hasInitialAssessment: boolean;
}

export function SecurityDashboard({ hasInitialAssessment }: SecurityDashboardProps) {
  const [activeTab, setActiveTab] = useState(hasInitialAssessment ? "overview" : "assess");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="assess">Assessment</TabsTrigger>
          <TabsTrigger value="overview" disabled={!hasInitialAssessment}>Overview</TabsTrigger>
          <TabsTrigger value="vulnerabilities" disabled={!hasInitialAssessment}>Vulnerabilities</TabsTrigger>
          <TabsTrigger value="threats" disabled={!hasInitialAssessment}>Threats</TabsTrigger>
          <TabsTrigger value="reports" disabled={!hasInitialAssessment}>Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assess" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Assessment</CardTitle>
              <CardDescription>
                Connect your project for a comprehensive security scan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityAssessmentForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overview" className="mt-6">
          <SecurityOverview />
        </TabsContent>
        
        <TabsContent value="vulnerabilities" className="mt-6">
          <VulnerabilityScanner />
        </TabsContent>
        
        <TabsContent value="threats" className="mt-6">
          <ThreatDetection />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <SecurityReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
