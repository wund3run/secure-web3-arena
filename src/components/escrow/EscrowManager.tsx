
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEscrowPayments } from '@/hooks/useEscrowPayments';
import { EscrowContract } from '@/contexts/types/escrow-types';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export const EscrowManager: React.FC = () => {
  const [contracts, setContracts] = useState<EscrowContract[]>([]);
  const { getEscrowContracts, loading } = useEscrowPayments();

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const data = await getEscrowContracts();
      // Map database status values to our EscrowStatus type
      const mappedContracts = data.map(contract => ({
        ...contract,
        status: mapDatabaseStatus(contract.status) as EscrowContract['status']
      }));
      setContracts(mappedContracts);
    } catch (error) {
      console.error('Failed to load contracts:', error);
    }
  };

  const mapDatabaseStatus = (dbStatus: string): EscrowContract['status'] => {
    // Map database status values to our TypeScript enum
    switch (dbStatus) {
      case 'in_progress':
        return 'active';
      case 'refunded':
        return 'cancelled';
      default:
        return dbStatus as EscrowContract['status'];
    }
  };

  const getStatusColor = (status: EscrowContract['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'active':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'disputed':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading escrow contracts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Escrow Management</h1>
        <Button onClick={loadContracts}>
          Refresh
        </Button>
      </div>

      {contracts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No escrow contracts found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Amount:</span> {contract.total_amount} {contract.currency}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {formatDistanceToNow(new Date(contract.created_at), { addSuffix: true })}
                  </div>
                  <div>
                    <span className="font-medium">Client ID:</span> {contract.client_id.slice(0, 8)}...
                  </div>
                  <div>
                    <span className="font-medium">Auditor ID:</span> {contract.auditor_id.slice(0, 8)}...
                  </div>
                </div>
                {contract.description && (
                  <p className="mt-4 text-sm text-muted-foreground">{contract.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
