
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
      <TabsList className="w-full md:w-auto inline-flex mb-6 overflow-x-auto pb-1 no-scrollbar">
        <TabsTrigger value="all">All Audits</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="requests">Requests</TabsTrigger>
      </TabsList>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Panel - Conditionally Shown */}
        {showFilters && (
          <div className="w-full lg:w-64 lg:shrink-0 order-1 lg:order-none">
            <AuditFilters />
          </div>
        )}

        {/* Audit Results */}
        <div className="flex-1 order-2 lg:order-none">
          <AuditTabContent viewMode={viewMode} />
        </div>
      </div>
    </Tabs>
  );
};
