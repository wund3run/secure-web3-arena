
import React from "react";
import { EscrowContract, Profile } from "@/contexts/types/escrow-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  ExternalLink,
  MoreHorizontal,
  PanelRight,
  Users,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1">{contract.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Users className="h-3 w-3" />
              {currentUser?.id === contract.client_id ? 
                <span>You (Client) ↔ {contract.auditor?.full_name || "Unknown Auditor"}</span> :
                <span>{contract.client?.full_name || "Unknown Client"} ↔ You (Auditor)</span>
              }
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(contract.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
        <div className="flex justify-between text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Created: {new Date(contract.created_at).toLocaleDateString()}</span>
            </div>
            {contract.requires_multisig && (
              <div className="flex items-center gap-1 text-amber-600">
                <Users className="h-3.5 w-3.5" />
                <span>Requires multi-signature</span>
              </div>
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
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            ID: {contract.id.substring(0, 8)}...
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(contract)}
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
