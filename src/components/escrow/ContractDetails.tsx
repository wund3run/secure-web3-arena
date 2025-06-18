
import React, { useEffect, useState } from 'react';
import { useEscrow } from '@/contexts/EscrowContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { EscrowContract } from '@/contexts/types/escrow-types';

interface ContractDetailsProps {
  contract: EscrowContract;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContractDetails({ contract, open, onOpenChange }: ContractDetailsProps) {
  const {
    milestones,
    transactions,
    disputes,
    fetchMilestones,
    fetchTransactions,
    fetchDisputes,
    profile
  } = useEscrow();

  useEffect(() => {
    if (contract && open) {
      fetchMilestones(contract.id);
      fetchTransactions(contract.id);
      fetchDisputes(contract.id);
    }
  }, [contract, open, fetchMilestones, fetchTransactions, fetchDisputes]);

  if (!contract) {
    return null;
  }

  const contractMilestones = milestones[contract.id] || [];
  const contractTransactions = transactions[contract.id] || [];
  const contractDisputes = disputes[contract.id] || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      case 'disputed':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Disputed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contract Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{contract.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contract ID: {contract.id.substring(0, 8)}...
                  </p>
                </div>
                {getStatusBadge(contract.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contract Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount:</span>{' '}
                      {contract.total_amount} {contract.currency}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>{' '}
                      {format(new Date(contract.created_at), 'MMM d, yyyy')}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Multi-signature:</span>{' '}
                      {contract.requires_multisig ? 'Required' : 'Not required'}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Parties</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client:</span>{' '}
                      {contract.client?.full_name || 'Unknown'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Auditor:</span>{' '}
                      {contract.auditor?.full_name || 'Unknown'}
                    </div>
                  </div>
                </div>
              </div>
              
              {contract.description && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{contract.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Milestones ({contractMilestones.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {contractMilestones.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No milestones defined</p>
              ) : (
                <div className="space-y-3">
                  {contractMilestones.map((milestone) => (
                    <div key={milestone.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{milestone.title}</h5>
                          {milestone.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {milestone.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {milestone.amount} {contract.currency}
                          </span>
                          <Badge variant={milestone.is_completed ? "default" : "secondary"}>
                            {milestone.is_completed ? 'Completed' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions ({contractTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {contractTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No transactions yet</p>
              ) : (
                <div className="space-y-3">
                  {contractTransactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium capitalize">{transaction.type}</span>
                            <Badge variant="outline">{transaction.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(transaction.created_at), 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          {transaction.amount} {contract.currency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Disputes */}
          {contractDisputes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Disputes ({contractDisputes.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contractDisputes.map((dispute) => (
                    <div key={dispute.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{dispute.reason}</h5>
                          <p className="text-sm text-muted-foreground mt-1">
                            Raised by {dispute.raiser?.full_name || 'Unknown'} on{' '}
                            {format(new Date(dispute.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <Badge variant="outline">{dispute.status}</Badge>
                      </div>
                      {dispute.resolution && (
                        <div className="mt-2 p-2 bg-green-50 rounded">
                          <p className="text-sm text-green-800">
                            <span className="font-medium">Resolution:</span> {dispute.resolution}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
