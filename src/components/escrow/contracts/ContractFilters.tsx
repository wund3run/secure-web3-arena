
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <div className="relative group">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] transition-all border-input hover:border-primary/50 focus:border-primary group-hover:shadow-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="border-input shadow-md animate-in fade-in-50 zoom-in-95 duration-200">
              <SelectItem value="all" className="cursor-pointer transition-colors hover:bg-primary/5">All Statuses</SelectItem>
              <SelectItem value="pending" className="cursor-pointer transition-colors hover:bg-primary/5">Pending</SelectItem>
              <SelectItem value="in_progress" className="cursor-pointer transition-colors hover:bg-primary/5">In Progress</SelectItem>
              <SelectItem value="completed" className="cursor-pointer transition-colors hover:bg-primary/5">Completed</SelectItem>
              <SelectItem value="disputed" className="cursor-pointer transition-colors hover:bg-primary/5">Disputed</SelectItem>
              <SelectItem value="refunded" className="cursor-pointer transition-colors hover:bg-primary/5">Refunded</SelectItem>
              <SelectItem value="cancelled" className="cursor-pointer transition-colors hover:bg-primary/5">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative group">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-[180px] transition-all border-input hover:border-primary/50 focus:border-primary group-hover:shadow-sm">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent className="border-input shadow-md animate-in fade-in-50 zoom-in-95 duration-200">
              <SelectItem value="all" className="cursor-pointer transition-colors hover:bg-primary/5">All Contracts</SelectItem>
              <SelectItem value="client" className="cursor-pointer transition-colors hover:bg-primary/5">As Client</SelectItem>
              <SelectItem value="auditor" className="cursor-pointer transition-colors hover:bg-primary/5">As Auditor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={onRefresh}
              className="transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95"
            >
              <Activity className="h-4 w-4 transition-transform hover:scale-110 group-hover:rotate-12" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Refresh contract list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
