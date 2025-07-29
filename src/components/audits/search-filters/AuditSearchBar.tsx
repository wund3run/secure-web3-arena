
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const AuditSearchBar: React.FC = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input 
        type="text" 
        placeholder="Search audits by project, auditor or type..." 
        className="pl-10 w-full"
        aria-label="Search audits"
      />
    </div>
  );
};
