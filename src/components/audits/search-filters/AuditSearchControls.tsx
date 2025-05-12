
import React from "react";
import { AuditSearchBar } from "./AuditSearchBar";
import { AuditViewControls } from "./AuditViewControls";

interface AuditSearchControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const AuditSearchControls: React.FC<AuditSearchControlsProps> = (props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex flex-1 max-w-md">
        <AuditSearchBar />
      </div>
      <AuditViewControls {...props} />
    </div>
  );
};
