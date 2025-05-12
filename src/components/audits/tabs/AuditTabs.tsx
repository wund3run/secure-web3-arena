
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditTabContent } from "./AuditTabContent";
import { AuditFilters } from "@/components/audits/audit-filters";

interface AuditTabsProps {
  viewMode: "grid" | "list";
  showFilters: boolean;
}

export const AuditTabs: React.FC<AuditTabsProps> = ({
  viewMode,
  showFilters
}) => {
  return (
    <Tabs defaultValue="all" className="w-full mt-6">
      <TabsList className="w-full md:w-auto inline-flex mb-6">
        <TabsTrigger value="all">All Audits</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="requests">Requests</TabsTrigger>
      </TabsList>

      <div className="flex gap-6">
        {/* Filters Panel - Conditionally Shown */}
        {showFilters && (
          <div className="w-64 shrink-0">
            <AuditFilters />
          </div>
        )}

        {/* Audit Results */}
        <AuditTabContent viewMode={viewMode} />
      </div>
    </Tabs>
  );
};
