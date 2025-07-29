
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Copy, CheckCircle } from 'lucide-react';
import { OTPInput } from './otp-input';
import { toast } from 'sonner';

interface TwoFactorSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('EXAMPLE2FA3SECRET4CODE5');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSetupStart = () => {
    // In a real implementation, this would generate a QR code and secret
    setQrCode('data:image/png;base64,example-qr-code-data');
    setStep('verify');
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a complete verification code');
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode === '123456') { // Demo code
        toast.success('Two-factor authentication enabled successfully');
        onComplete();
      } else {
        toast.error('Invalid verification code. Please try again.');
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
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enable Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Two-factor authentication adds an extra layer of security to your account by requiring a code from your authenticator app in addition to your password.
          </div>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You'll need an authenticator app like Google Authenticator, Authy, or 1Password.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button onClick={handleSetupStart} className="flex-1">
              Start Setup
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Authenticator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            1. Open your authenticator app and scan the QR code below, or manually enter the secret key.
          </p>
          
          <div className="flex justify-center p-4 bg-white border rounded-lg">
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              QR Code Placeholder
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Manual Entry Key:</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                {secret}
              </code>
              <Button variant="outline" size="sm" onClick={copySecret}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            2. Enter the 6-digit code from your authenticator app:
          </p>
          
          <OTPInput
            value={verificationCode}
            onChange={setVerificationCode}
            numInputs={6}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleVerify} 
            disabled={verificationCode.length !== 6 || isVerifying}
            className="flex-1"
          >
            {isVerifying ? 'Verifying...' : 'Verify & Enable'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            For demo purposes, use code <strong>123456</strong> to verify.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
