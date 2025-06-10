
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEscrow } from '@/contexts/EscrowContext';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { AlertTriangle, MessageSquare, User } from 'lucide-react';

export function ArbitrationPanel() {
  const { disputes, loading } = useEscrow();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'opened': return 'destructive';
      case 'in_review': return 'default';
      case 'resolved': return 'outline';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <EnhancedSkeleton key={i} variant="card" className="h-40" />
        ))}
      </div>
    );
  }

  const allDisputes = Object.values(disputes).flat();

  if (allDisputes.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Disputes</h3>
          <p className="text-muted-foreground">
            All contracts are running smoothly
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {allDisputes.map((dispute) => (
        <Card key={dispute.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Dispute #{dispute.id.slice(-8)}</CardTitle>
              <Badge variant={getStatusColor(dispute.status)}>
                {dispute.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Raised by: {dispute.raiser?.full_name || 'Unknown'}
                  </span>
                </div>
                
                {dispute.arbitrator && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Arbitrator: {dispute.arbitrator.full_name}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Reason:</h4>
                <p className="text-sm text-muted-foreground">{dispute.reason}</p>
              </div>

              {dispute.evidence && (
                <div>
                  <h4 className="font-medium mb-2">Evidence:</h4>
                  <p className="text-sm text-muted-foreground">{dispute.evidence}</p>
                </div>
              )}

              {dispute.resolution && (
                <div>
                  <h4 className="font-medium mb-2">Resolution:</h4>
                  <p className="text-sm text-muted-foreground">{dispute.resolution}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Comments ({dispute.comments?.length || 0})
                </Button>
                
                {dispute.status === 'opened' && (
                  <Button size="sm">
                    Assign Arbitrator
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
