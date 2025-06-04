
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { OTPInput } from '../otp-input';
import { toast } from 'sonner';

interface TOTPSetupProps {
  onComplete: () => void;
}

export const TOTPSetup: React.FC<TOTPSetupProps> = ({ onComplete }) => {
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    generateTOTPSecret();
  }, []);

  const generateTOTPSecret = async () => {
    // In production, this would call your backend to generate a real TOTP secret
    const mockSecret = 'JBSWY3DPEHPK3PXP'; // Base32 encoded secret
    setSecret(mockSecret);
    
    // Generate QR code URL for the secret
    const issuer = 'Hawkly';
    const accountName = 'user@example.com'; // This would be the actual user's email
    const qrUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${mockSecret}&issuer=${encodeURIComponent(issuer)}`;
    setQrCodeUrl(qrUrl);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success('Secret copied to clipboard');
  };

  const handleVerification = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate verification - in production, verify against backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode === '123456') { // Mock verification
        toast.success('TOTP setup successful');
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

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          Scan the QR code with your authenticator app or manually enter the secret key.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-white border rounded-lg flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              <div className="mb-2">QR Code</div>
              <div className="text-xs break-all p-2">{qrCodeUrl}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Manual Entry Key</Label>
          <div className="flex items-center gap-2">
            <Input
              type={showSecret ? 'text' : 'password'}
              value={secret}
              readOnly
              className="font-mono"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={copySecret}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Verification Code</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Enter the 6-digit code from your authenticator app
          </p>
          <OTPInput
            value={verificationCode}
            onChange={setVerificationCode}
            numInputs={6}
          />
        </div>

        <Button 
          onClick={handleVerification}
          disabled={verificationCode.length !== 6 || isVerifying}
          className="w-full"
        >
          {isVerifying ? 'Verifying...' : 'Verify and Continue'}
        </Button>

        <Alert>
          <AlertDescription>
            For demo purposes, use code <strong>123456</strong> to verify.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
