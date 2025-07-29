
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, DollarSign, Shield } from 'lucide-react';
import { usePaymentProcessing } from '@/hooks/usePaymentProcessing';

interface PaymentProcessorProps {
  auditRequestId?: string;
  defaultAmount?: number;
  onPaymentSuccess?: (result: unknown) => void;
}

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  auditRequestId,
  defaultAmount = 0,
  onPaymentSuccess,
}) => {
  const [amount, setAmount] = useState(defaultAmount);
  const [description, setDescription] = useState('');
  const [currency] = useState('USD');
  
  const { createPaymentIntent, loading, error } = usePaymentProcessing();

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await createPaymentIntent({
        amount,
        currency: currency.toLowerCase(),
        description: description || 'Security audit payment',
        auditRequestId,
      });

      // In a real implementation, you would integrate with Stripe Elements here
      // For now, we'll simulate payment success
      setTimeout(() => {
        onPaymentSuccess?.(result);
      }, 2000);
      
    } catch (err) {
      console.error('Payment processing error:', err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleProcessPayment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({currency})</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                min="1"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Payment description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading || amount <= 0}>
            {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Secured by Stripe encryption</span>
        </div>
      </CardContent>
    </Card>
  );
};
