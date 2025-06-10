
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEscrow } from '@/contexts/EscrowContext';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { ArrowDownLeft, ArrowUpRight, DollarSign, Clock } from 'lucide-react';

export function TransactionsPanel() {
  const { transactions, loading } = useEscrow();

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'milestone_payment':
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case 'refund':
        return <ArrowUpRight className="h-4 w-4 text-orange-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <EnhancedSkeleton key={i} variant="card" className="h-20" />
        ))}
      </div>
    );
  }

  const allTransactions = Object.values(transactions).flat();

  if (allTransactions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Transactions</h3>
          <p className="text-muted-foreground">
            Transaction history will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {allTransactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <div className="font-medium">
                    {transaction.type.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.sender?.full_name || 'Unknown'} 
                    {transaction.recipient && ` → ${transaction.recipient.full_name}`}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">
                  {transaction.amount} ETH
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {transaction.transaction_hash && (
              <div className="mt-2 text-xs text-muted-foreground font-mono">
                Hash: {transaction.transaction_hash.slice(0, 16)}...
              </div>
            )}

            {transaction.approvals && transaction.approvals.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                Approvals: {transaction.approvals.length}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
