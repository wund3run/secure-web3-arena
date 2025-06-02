
import React, { useState } from 'react';
import { useEscrowPayments } from '@/hooks/useEscrowPayments';
import { usePaymentProcessing } from '@/hooks/usePaymentProcessing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';

interface PaymentManagerProps {
  auditRequestId: string;
  auditorId: string;
  totalAmount: number;
  milestones: Array<{
    title: string;
    amount: number;
    description: string;
    deadline: Date;
  }>;
}

export const PaymentManager: React.FC<PaymentManagerProps> = ({
  auditRequestId,
  auditorId,
  totalAmount,
  milestones
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'escrow' | 'direct'>('escrow');
  const [processing, setProcessing] = useState(false);
  
  const { createEscrowContract, fundEscrow, loading: escrowLoading } = useEscrowPayments();
  const { createPaymentIntent, confirmPayment, loading: paymentLoading } = usePaymentProcessing();

  const handleEscrowPayment = async () => {
    try {
      setProcessing(true);
      
      const escrowContract = await createEscrowContract(
        auditorId,
        totalAmount,
        'USD',
        milestones.map(m => ({
          title: m.title,
          description: m.description,
          amount: m.amount,
          deadline: m.deadline
        }))
      );

      toast.success('Escrow contract created successfully');
      
      // Redirect to funding page or show payment form
      window.location.href = `/escrow/${escrowContract.id}/fund`;
      
    } catch (error) {
      console.error('Escrow payment failed:', error);
      toast.error('Failed to create escrow contract');
    } finally {
      setProcessing(false);
    }
  };

  const handleDirectPayment = async () => {
    try {
      setProcessing(true);
      
      const paymentIntent = await createPaymentIntent({
        amount: totalAmount,
        currency: 'USD',
        description: `Security audit payment for request ${auditRequestId}`,
        auditRequestId
      });

      // Redirect to Stripe checkout
      window.location.href = `/payment/checkout?intent=${paymentIntent.paymentIntentId}`;
      
    } catch (error) {
      console.error('Direct payment failed:', error);
      toast.error('Failed to initiate payment');
    } finally {
      setProcessing(false);
    }
  };

  const platformFee = totalAmount * 0.05; // 5% platform fee
  const totalWithFees = totalAmount + platformFee;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${
                paymentMethod === 'escrow' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('escrow')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-blue-500" />
                  <h3 className="font-semibold">Escrow Payment</h3>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Funds held securely until milestones complete</li>
                  <li>• Automatic milestone-based releases</li>
                  <li>• Dispute resolution protection</li>
                  <li>• Full refund if audit fails</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                paymentMethod === 'direct' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('direct')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold">Direct Payment</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Immediate payment to auditor</li>
                  <li>• Faster audit start time</li>
                  <li>• Lower processing fees</li>
                  <li>• Suitable for trusted auditors</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Payment Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Audit Fee</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Platform Fee (5%)</span>
                <span>${platformFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>${totalWithFees.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {paymentMethod === 'escrow' && (
            <div className="space-y-4">
              <h4 className="font-semibold">Milestone Schedule</h4>
              <div className="space-y-2">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${milestone.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Due {milestone.deadline.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={paymentMethod === 'escrow' ? handleEscrowPayment : handleDirectPayment}
              disabled={processing || escrowLoading || paymentLoading}
              className="flex-1"
            >
              {processing ? 'Processing...' : `Pay with ${paymentMethod === 'escrow' ? 'Escrow' : 'Direct Payment'}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
