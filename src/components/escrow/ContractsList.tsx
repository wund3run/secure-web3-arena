
import { useState, useEffect } from "react";
import { useEscrow, EscrowContract } from "@/contexts/EscrowContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertTriangle,
  Check,
  Clock,
  ExternalLink,
  MoreHorizontal,
  PanelRight,
  Shield,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContractDetails } from "./ContractDetails";

export function ContractsList() {
  const { contracts, fetchContracts, loading, profile } = useEscrow();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewType, setViewType] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState<EscrowContract | null>(null);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const filteredContracts = contracts.filter(contract => {
    // Filter by status
    if (statusFilter !== "all" && contract.status !== statusFilter) {
      return false;
    }
    
    // Filter by role
    if (viewType === "client" && contract.client_id !== profile?.id) {
      return false;
    }
    if (viewType === "auditor" && contract.auditor_id !== profile?.id) {
      return false;
    }
    
    return true;
  });

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

  const handleViewContract = (contract: EscrowContract) => {
    setSelectedContract(contract);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Escrow Contracts</h3>
        <p className="text-muted-foreground mb-6">
          You haven't created or participated in any escrow contracts yet.
        </p>
        <Button>Create New Escrow</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
        
        <Button variant="outline" size="icon" onClick={() => fetchContracts()}>
          <Activity className="h-4 w-4" />
        </Button>
      </div>
      
      {filteredContracts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No contracts match your filters</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">{contract.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Users className="h-3 w-3" />
                      {profile?.id === contract.client_id ? 
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
                        <DropdownMenuItem onClick={() => handleViewContract(contract)}>
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
                    onClick={() => handleViewContract(contract)}
                  >
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {selectedContract && (
        <ContractDetails 
          contract={selectedContract}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      )}
    </div>
  );
}
