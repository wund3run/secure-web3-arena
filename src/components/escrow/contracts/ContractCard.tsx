
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, MoreHorizontal, PanelRight, Users, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EscrowContract, Profile } from "@/contexts/types/escrow-types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ContractCardProps {
  contract: EscrowContract;
  currentUser: Profile | null;
  onViewDetails: (contract: EscrowContract) => void;
}

export function ContractCard({ contract, currentUser, onViewDetails }: ContractCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'disputed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Disputed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Refunded</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base line-clamp-1">{contract.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <Users className="h-3 w-3" />
              {currentUser?.id === contract.client_id ? 
                <span>You (Client) ↔ {contract.auditor?.full_name || "Unknown Auditor"}</span> :
                <span>{contract.client?.full_name || "Unknown Client"} ↔ You (Auditor)</span>
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(contract.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onViewDetails(contract)}>
                  <PanelRight className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                {contract.smart_contract_address && (
                  <DropdownMenuItem asChild>
                    <a 
                      href={`https://etherscan.io/address/${contract.smart_contract_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Etherscan
                    </a>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Created: {formatDate(contract.created_at)}</span>
            </div>
            {contract.requires_multisig && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-amber-600">
                      <Users className="h-3.5 w-3.5" />
                      <span>Requires multi-signature</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs max-w-[200px]">
                      This contract requires multiple signatures to execute transactions
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Wallet className="h-4 w-4" />
            <span>
              {contract.total_amount} {contract.currency}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            ID: {contract.id.substring(0, 8)}...
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(contract)}
            className="transition-all hover:bg-primary/10"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
