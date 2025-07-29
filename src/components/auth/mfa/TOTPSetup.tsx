
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { OTPInput } from '../otp-input';
import { toast } from 'sonner';

interface TOTPSetupProps {
  onComplete: () => void;
}

export const TOTPSetup: React.FC<TOTPSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [secret] = useState('HAWKLY2FA3SECRET4CODE5DEMO'); // Demo secret

  const handleStartVerification = () => {
    setStep('verify');
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a complete verification code');
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept '123456' as valid
      if (verificationCode === '123456') {
        toast.success('Two-factor authentication enabled successfully!');
        onComplete();
      } else {
        toast.error('Invalid verification code. For demo, use 123456');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success('Secret copied to clipboard');
  };

  if (step === 'setup') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Set up Authenticator App</h3>
          <p className="text-sm text-muted-foreground">
            Scan the QR code or manually enter the key into your authenticator app
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center p-6 bg-white border rounded-lg">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center text-sm text-gray-500">
                <div className="mb-2">📱</div>
                QR Code
                <div className="text-xs">(Demo)</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Manual entry key:</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-muted rounded text-sm font-mono break-all">
                {secret}
              </code>
              <Button variant="outline" size="sm" onClick={copySecret}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Make sure to save this secret key in a secure location as backup.
            </AlertDescription>
          </Alert>
        </div>

        <Button onClick={handleStartVerification} className="w-full">
          I've added the account to my authenticator
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Verify Setup</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <div className="space-y-4">
        <OTPInput
          value={verificationCode}
          onChange={setVerificationCode}
          numInputs={6}
        />

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            For demo purposes, use <strong>123456</strong> as the verification code.
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setStep('setup')}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={verificationCode.length !== 6 || isVerifying}
          className="flex-1"
        >
          {isVerifying ? 'Verifying...' : 'Verify & Enable'}
        </Button>
      </div>
    </div>
  );
};
