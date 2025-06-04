
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Smartphone, Key, CheckCircle } from 'lucide-react';
import { TOTPSetup } from './TOTPSetup';
import { WebAuthnSetup } from './WebAuthnSetup';
import { BackupCodesGeneration } from './BackupCodesGeneration';
import { ProgressSteps } from '@/components/ui/progress-steps';

interface MFASetupWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const MFASetupWizard: React.FC<MFASetupWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState('method');
  const [selectedMethod, setSelectedMethod] = useState<'totp' | 'webauthn' | null>(null);
  const [setupComplete, setSetupComplete] = useState(false);

  const steps = [
    { id: 'method', title: 'Choose Method', description: 'Select your preferred 2FA method' },
    { id: 'setup', title: 'Setup', description: 'Configure your authentication method' },
    { id: 'backup', title: 'Backup Codes', description: 'Generate recovery codes' },
    { id: 'verify', title: 'Verify', description: 'Test your setup' }
  ];

  const handleMethodSelect = (method: 'totp' | 'webauthn') => {
    setSelectedMethod(method);
    setCurrentStep('setup');
  };

  const handleSetupComplete = () => {
    setCurrentStep('backup');
  };

  const handleBackupComplete = () => {
    setCurrentStep('verify');
    setSetupComplete(true);
  };

  const handleVerificationComplete = () => {
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Multi-Factor Authentication Setup
          </CardTitle>
          <ProgressSteps 
            steps={steps} 
            currentStepId={currentStep}
            className="mt-4"
          />
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 'method' && (
            <div className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Choose your preferred two-factor authentication method to secure your account.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleMethodSelect('totp')}
                >
                  <CardContent className="p-6 text-center">
                    <Smartphone className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-medium mb-2">Authenticator App</h3>
                    <p className="text-sm text-muted-foreground">
                      Use Google Authenticator, Authy, or similar apps
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleMethodSelect('webauthn')}
                >
                  <CardContent className="p-6 text-center">
                    <Key className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-medium mb-2">Security Key</h3>
                    <p className="text-sm text-muted-foreground">
                      Hardware security keys or biometric authentication
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 'setup' && selectedMethod === 'totp' && (
            <TOTPSetup onComplete={handleSetupComplete} />
          )}

          {currentStep === 'setup' && selectedMethod === 'webauthn' && (
            <WebAuthnSetup onComplete={handleSetupComplete} />
          )}

          {currentStep === 'backup' && (
            <BackupCodesGeneration onComplete={handleBackupComplete} />
          )}

          {currentStep === 'verify' && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-lg font-medium">Setup Complete!</h3>
              <p className="text-muted-foreground">
                Your multi-factor authentication has been successfully configured.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleVerificationComplete}>
                  Complete Setup
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {currentStep !== 'verify' && (
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              {currentStep === 'method' && (
                <div className="text-sm text-muted-foreground">
                  Select a method to continue
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
