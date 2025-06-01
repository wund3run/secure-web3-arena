
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEscrowPayments } from '@/hooks/useEscrowPayments';
import { usePaymentProcessing } from '@/hooks/usePaymentProcessing';
import { EnhancedToastSystem } from '@/components/ui/enhanced-toast-system';
import { Loader2, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function EscrowManager() {
  const [activeContracts, setActiveContracts] = useState([]);
  const { loading: escrowLoading, createEscrowContract, releaseMilestone } = useEscrowPayments();
  const { loading: paymentLoading, createPaymentIntent } = usePaymentProcessing();

  const handleCreateEscrow = async () => {
    try {
      const contract = await createEscrowContract(
        'auditor-id',
        5000, // $50.00
        'usd',
        [
          { title: 'Initial Review', description: 'Initial code review', amount: 2000, deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
          { title: 'Detailed Analysis', description: 'Comprehensive security analysis', amount: 2000, deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
          { title: 'Final Report', description: 'Security audit report delivery', amount: 1000, deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) }
        ]
      );
      
      if (contract) {
        EnhancedToastSystem.success('Escrow Created', 'Your escrow contract has been established');
      }
    } catch (error) {
      EnhancedToastSystem.error('Escrow Creation Failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handlePayment = async () => {
    try {
      const paymentResult = await createPaymentIntent({
        amount: 50.00,
        currency: 'usd',
        description: 'Security Audit Payment',
        escrowContractId: 'contract-id'
      });
      
      if (paymentResult) {
        EnhancedToastSystem.payment.processing();
        // Redirect to Stripe Checkout
        window.open(paymentResult.clientSecret, '_blank');
      }
    } catch (error) {
      EnhancedToastSystem.payment.failed(error instanceof Error ? error.message : undefined);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Escrow Management</h1>
          <p className="text-muted-foreground">Secure payment management for audit services</p>
        </div>
        <Button onClick={handleCreateEscrow} disabled={escrowLoading}>
          {escrowLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Escrow Contract
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Contracts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="disputed">Disputed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Smart Contract Security Audit
                  </CardTitle>
                  <CardDescription>Comprehensive security review for DeFi protocol</CardDescription>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Initial Review</span>
                  </div>
                  <div className="text-2xl font-bold">$20.00</div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Detailed Analysis</span>
                  </div>
                  <div className="text-2xl font-bold">$20.00</div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Final Report</span>
                  </div>
                  <div className="text-2xl font-bold">$10.00</div>
                  <Badge variant="outline">Awaiting</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handlePayment} disabled={paymentLoading}>
                  {paymentLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Fund Escrow
                </Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No completed contracts yet</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputed">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No disputed contracts</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
