
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEscrowPayments } from '@/hooks/useEscrowPayments';
import { toast } from 'sonner';
import { CreditCard, Shield, DollarSign } from 'lucide-react';

interface EscrowPaymentProcessorProps {
  auditRequestId: string;
  auditorId: string;
  totalAmount: number;
  milestones: Array<{
    title: string;
    description: string;
    amount: number;
    deadline: Date;
  }>;
  onPaymentComplete: (contractId: string) => void;
}

export const EscrowPaymentProcessor: React.FC<EscrowPaymentProcessorProps> = ({
  auditRequestId,
  auditorId,
  totalAmount,
  milestones,
  onPaymentComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const { createEscrowContract, fundEscrow, loading, error } = useEscrowPayments();

  const handlePayment = async () => {
    try {
      setProcessing(true);

      // Convert milestones with proper date handling
      const processedMilestones = milestones.map(milestone => ({
        title: milestone.title,
        description: milestone.description,
        amount: milestone.amount,
        deadline: milestone.deadline.toISOString(),
      }));

      // Create escrow contract
      const contract = await createEscrowContract(
        auditorId,
        totalAmount,
        'USD',
        processedMilestones
      );

      // Fund the escrow (in production, this would integrate with Stripe)
      if (paymentMethod) {
        await fundEscrow(contract.id, paymentMethod);
      }

      onPaymentComplete(contract.id);
      toast.success('Escrow payment processed successfully');
    } catch (error: unknown) {
      console.error('Payment processing error:', error);
      toast.error('Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  const platformFee = totalAmount * 0.05; // 5% platform fee
  const totalWithFee = totalAmount + platformFee;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Secure Escrow Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="space-y-2 p-4 bg-muted rounded-lg">
          <div className="flex justify-between">
            <span>Audit Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee (5%):</span>
            <span>${platformFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${totalWithFee.toFixed(2)}</span>
          </div>
        </div>

        {/* Milestone Breakdown */}
        <div>
          <h4 className="font-medium mb-2">Payment Milestones:</h4>
          <div className="space-y-2">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                <span>{milestone.title}</span>
                <span>${milestone.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment Method</Label>
          <Input
            id="payment-method"
            placeholder="Card ending in 1234"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your payment is secured by our escrow system. Funds are only released when milestones are completed and approved.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={!paymentMethod || processing || loading}
          className="w-full"
          size="lg"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          {processing ? 'Processing...' : `Pay $${totalWithFee.toFixed(2)} via Escrow`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our Terms of Service and understand that payments are held in escrow until milestone completion.
        </p>
      </CardContent>
    </Card>
  );
};
