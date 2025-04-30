
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

interface ContractFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  viewType: string;
  setViewType: (value: string) => void;
  onRefresh: () => void;
}

export function ContractFilters({
  statusFilter,
  setStatusFilter,
  viewType,
  setViewType,
  onRefresh,
}: ContractFiltersProps) {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contracts</SelectItem>
            <SelectItem value="client">As Client</SelectItem>
            <SelectItem value="auditor">As Auditor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button variant="outline" size="icon" onClick={onRefresh}>
        <Activity className="h-4 w-4" />
      </Button>
    </div>
  );
}
