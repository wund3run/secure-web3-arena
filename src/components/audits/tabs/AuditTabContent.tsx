
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { AuditCard } from "@/components/audits/audit-card";

interface AuditTabContentProps {
  viewMode: "grid" | "list";
}

export const AuditTabContent: React.FC<AuditTabContentProps> = ({
  viewMode
}) => {
  return (
    <>
      <TabsContent value="all" className="w-full m-0 p-0">
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          <AuditCard 
            id="1"
            title="DeFi Lending Protocol Audit"
            projectName="LendFlow Finance"
            startDate="2025-03-15"
            status="completed"
            progress={100}
            severity="high"
            criticalIssues={2}
            highIssues={3}
          />
          <AuditCard 
            id="2"
            title="NFT Marketplace Smart Contract Audit"
            projectName="PixelVerse Market"
            startDate="2025-04-20"
            status="in-progress"
            progress={65}
            severity="medium"
            highIssues={2}
          />
          <AuditCard 
            id="3"
            title="Cross-Chain Bridge Security Review"
            projectName="OmniBridge"
            startDate="2025-03-28"
            status="completed"
            progress={100}
            severity="critical"
            criticalIssues={3}
            highIssues={5}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="completed" className="w-full m-0 p-0">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Select "All Audits" to see completed audits</p>
        </div>
      </TabsContent>
      
      <TabsContent value="in-progress" className="w-full m-0 p-0">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Select "All Audits" to see in-progress audits</p>
        </div>
      </TabsContent>
      
      <TabsContent value="requests" className="w-full m-0 p-0">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Select "All Audits" to see audit requests</p>
        </div>
      </TabsContent>
    </>
  );
};
