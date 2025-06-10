
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEscrow } from '@/contexts/EscrowContext';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { FileText, DollarSign, Users, Clock } from 'lucide-react';

export function ContractsList() {
  const { contracts, loading, cancelContract, completeContract } = useEscrow();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in_progress': return 'default';
      case 'completed': return 'outline';
      case 'disputed': return 'destructive';
      case 'cancelled': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleCancel = async (contractId: string) => {
    if (confirm('Are you sure you want to cancel this contract?')) {
      await cancelContract(contractId);
    }
  };

  const handleComplete = async (contractId: string) => {
    if (confirm('Mark this contract as completed?')) {
      await completeContract(contractId);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <EnhancedSkeleton key={i} variant="card" className="h-32" />
        ))}
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Escrow Contracts</h3>
          <p className="text-muted-foreground">
            Create your first escrow contract to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <Card key={contract.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{contract.title}</CardTitle>
              <Badge variant={getStatusColor(contract.status)}>
                {contract.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {contract.total_amount} {contract.currency}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Client: {contract.client?.full_name || 'Unknown'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Created: {new Date(contract.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {contract.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {contract.description}
              </p>
            )}

            <div className="flex gap-2">
              {contract.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancel(contract.id)}
                >
                  Cancel
                </Button>
              )}
              
              {contract.status === 'in_progress' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleComplete(contract.id)}
                >
                  Mark Complete
                </Button>
              )}
              
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
