
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Fingerprint, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface WebAuthnSetupProps {
  onComplete: () => void;
}

export const WebAuthnSetup: React.FC<WebAuthnSetupProps> = ({ onComplete }) => {
  const [keyName, setKeyName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredKeys, setRegisteredKeys] = useState<Array<{ id: string; name: string; type: string }>>([]);

  const registerWebAuthnKey = async () => {
    if (!keyName.trim()) {
      toast.error('Please enter a name for your security key');
      return;
    }

    setIsRegistering(true);
    try {
      // Check if WebAuthn is available
      if (!window.PublicKeyCredential) {
        throw new Error('WebAuthn is not supported in this browser');
      }

      // Simulate WebAuthn registration
      // In production, this would make a call to your backend to initiate WebAuthn registration
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newKey = {
        id: `key-${Date.now()}`,
        name: keyName,
        type: 'Security Key'
      };

      setRegisteredKeys(prev => [...prev, newKey]);
      setKeyName('');
      toast.success('Security key registered successfully');
      
      if (registeredKeys.length === 0) {
        onComplete();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to register security key');
    } finally {
      setIsRegistering(false);
    }
  };

  const registerBiometric = async () => {
    setIsRegistering(true);
    try {
      // Simulate biometric registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      const biometricKey = {
        id: `bio-${Date.now()}`,
        name: 'Biometric Authentication',
        type: 'Biometric'
      };

      setRegisteredKeys(prev => [...prev, biometricKey]);
      toast.success('Biometric authentication enabled');
      onComplete();
    } catch (error: any) {
      toast.error('Failed to enable biometric authentication');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          Register a hardware security key or enable biometric authentication for secure login.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Key className="h-4 w-4" />
            Hardware Security Key
          </h3>
          
          <div className="space-y-2">
            <Label>Key Name</Label>
            <Input
              placeholder="e.g., YubiKey 5C"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
            />
          </div>

          <Button 
            onClick={registerWebAuthnKey}
            disabled={isRegistering || !keyName.trim()}
            className="w-full"
          >
            {isRegistering ? 'Registering...' : 'Register Security Key'}
          </Button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium flex items-center gap-2 mb-4">
            <Fingerprint className="h-4 w-4" />
            Biometric Authentication
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            Use your device's built-in biometric authentication (fingerprint, face recognition).
          </p>

          <Button 
            onClick={registerBiometric}
            disabled={isRegistering}
            variant="outline"
            className="w-full"
          >
            {isRegistering ? 'Enabling...' : 'Enable Biometric Authentication'}
          </Button>
        </div>

        {registeredKeys.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Registered Authentication Methods</h4>
            {registeredKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{key.name}</div>
                  <div className="text-sm text-muted-foreground">{key.type}</div>
                </div>
                <div className="text-green-600">✓ Active</div>
              </div>
            ))}
          </div>
        )}

        {registeredKeys.length > 0 && (
          <Button onClick={onComplete} className="w-full">
            Continue to Backup Codes
          </Button>
        )}
      </div>
    </div>
  );
};
