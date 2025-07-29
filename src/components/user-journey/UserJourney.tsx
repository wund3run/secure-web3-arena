
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditorJourney } from "./journeys/AuditorJourney";
import { ProjectOwnerJourney } from "./journeys/ProjectOwnerJourney";
import { AdminJourney } from "./journeys/AdminJourney";
import { GeneralUserJourney } from "./journeys/GeneralUserJourney";
import { RevenueInsights } from "./RevenueInsights";
import { ConversionFunnelAnalysis } from "./ConversionFunnelAnalysis";

export function UserJourney() {
  const [activeTab, setActiveTab] = React.useState("auditor");

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Journey Mapping</h2>
        <p className="text-muted-foreground">
          Optimized user paths for each stakeholder type to maximize engagement and revenue generation
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Platform User Journeys</CardTitle>
          <CardDescription>
            Select a user type to view their optimized journey through the Hawkly platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 gap-2">
              <TabsTrigger value="auditor">Auditors</TabsTrigger>
              <TabsTrigger value="project-owner">Project Owners</TabsTrigger>
              <TabsTrigger value="admin">Platform Admin</TabsTrigger>
              <TabsTrigger value="general">General Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auditor" className="space-y-4">
              <AuditorJourney />
            </TabsContent>
            
            <TabsContent value="project-owner" className="space-y-4">
              <ProjectOwnerJourney />
            </TabsContent>
            
            <TabsContent value="admin" className="space-y-4">
              <AdminJourney />
            </TabsContent>
            
            <TabsContent value="general" className="space-y-4">
              <GeneralUserJourney />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <ConversionFunnelAnalysis />
      <RevenueInsights />
    </div>
  );
}
