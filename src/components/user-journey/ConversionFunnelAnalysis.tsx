
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunnelTabContent } from "./conversion-funnel/FunnelTabContent";
import { funnelData } from "./conversion-funnel/funnelData";

export function ConversionFunnelAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel Analysis</CardTitle>
        <CardDescription>
          Visualize user journey conversion rates and identify optimization opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="auditor">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auditor">Auditors</TabsTrigger>
            <TabsTrigger value="projectOwner">Project Owners</TabsTrigger>
            <TabsTrigger value="general">General Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auditor">
            <FunnelTabContent userType="auditor" funnelData={funnelData} />
          </TabsContent>
          
          <TabsContent value="projectOwner">
            <FunnelTabContent userType="projectOwner" funnelData={funnelData} />
          </TabsContent>
          
          <TabsContent value="general">
            <FunnelTabContent userType="general" funnelData={funnelData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
