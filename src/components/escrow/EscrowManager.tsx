
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useEscrowPayments } from '@/hooks/useEscrowPayments';
import { useAuth } from '@/contexts/auth';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  FileText,
  Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EscrowContract {
  id: string;
  title: string;
  client_id: string;
  auditor_id: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'cancelled';
  created_at: string;
  milestones: any[];
}

export function EscrowManager() {
  const { user } = useAuth();
  const { getEscrowContracts, releaseMilestonePayment, loading } = useEscrowPayments();
  const [contracts, setContracts] = useState<EscrowContract[]>([]);
  const [selectedContract, setSelectedContract] = useState<EscrowContract | null>(null);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    const data = await getEscrowContracts();
    setContracts(data);
  };

  const handleReleaseMilestone = async (milestoneId: string) => {
    try {
      await releaseMilestonePayment(milestoneId);
      await loadContracts();
    } catch (error) {
      console.error('Failed to release milestone payment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'disputed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'disputed': return <AlertTriangle className="h-4 w-4" />;
      case 'cancelled': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const calculateProgress = (milestones: any[]) => {
    if (!milestones || milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.is_completed).length;
    return (completed / milestones.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Escrow Management</h1>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Secure Payment Processing</span>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <Card 
            key={contract.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedContract?.id === contract.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedContract(contract)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{contract.title}</CardTitle>
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(contract.status)} text-white flex items-center gap-1`}
                >
                  {getStatusIcon(contract.status)}
                  {contract.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">
                    {contract.total_amount} {contract.currency}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(contract.created_at), { addSuffix: true })}
                </div>
              </div>

              {contract.milestones && contract.milestones.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress(contract.milestones))}%</span>
                  </div>
                  <Progress value={calculateProgress(contract.milestones)} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {contract.milestones.filter(m => m.is_completed).length} of {contract.milestones.length} milestones completed
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{contract.milestones?.length || 0} milestones</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contracts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Escrow Contracts</h3>
            <p className="text-muted-foreground text-center">
              You don't have any escrow contracts yet. 
              Start an audit to create your first secure payment contract.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Selected Contract Details */}
      {selectedContract && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Contract Details: {selectedContract.title}</span>
              <Badge variant="outline">
                {selectedContract.client_id === user?.id ? 'Client' : 'Auditor'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contract Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedContract.total_amount}</div>
                <div className="text-sm text-muted-foreground">{selectedContract.currency}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedContract.milestones?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Milestones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(calculateProgress(selectedContract.milestones))}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            {/* Milestones */}
            {selectedContract.milestones && selectedContract.milestones.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold">Milestones</h4>
                {selectedContract.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{milestone.title}</div>
                      {milestone.description && (
                        <div className="text-sm text-muted-foreground">{milestone.description}</div>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {milestone.amount} {selectedContract.currency}
                        </div>
                        {milestone.deadline && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(milestone.deadline), { addSuffix: true })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {milestone.is_completed ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <>
                          <Badge variant="outline">Pending</Badge>
                          {selectedContract.client_id === user?.id && selectedContract.status === 'active' && (
                            <Button
                              size="sm"
                              onClick={() => handleReleaseMilestone(milestone.id)}
                              disabled={loading}
                            >
                              Release Payment
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
