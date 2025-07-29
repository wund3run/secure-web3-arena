
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressSteps } from '@/components/ui/progress-steps';
import { TOTPSetup } from '@/components/auth/mfa/TOTPSetup';
import { 
  Shield, 
  Smartphone, 
  MessageSquare, 
  Key,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const TwoFactorSetup = () => {
  const [currentStep, setCurrentStep] = useState('method');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: 'method',
      title: 'Choose Method',
      description: 'Select your preferred 2FA method',
    },
    {
      id: 'setup',
      title: 'Setup Authenticator',
      description: 'Configure your authenticator app',
    },
    {
      id: 'backup',
      title: 'Backup Codes',
      description: 'Save your recovery codes',
    },
    {
      id: 'complete',
      title: 'Complete Setup',
      description: 'Verify and finish setup',
    },
  ];

  const methods = [
    {
      id: 'totp',
      title: 'Authenticator App',
      description: 'Use Google Authenticator, Authy, or similar apps',
      icon: <Smartphone className="h-6 w-6" />,
      recommended: true,
    },
    {
      id: 'sms',
      title: 'SMS Codes',
      description: 'Receive codes via text message',
      icon: <MessageSquare className="h-6 w-6" />,
      recommended: false,
    },
  ];

  const backupCodes = [
    'HK1234-5678',
    'HK2345-6789',
    'HK3456-7890',
    'HK4567-8901',
    'HK5678-9012',
    'HK6789-0123',
    'HK7890-1234',
    'HK8901-2345',
  ];

  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    // Redirect to dashboard or security settings
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'method':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Your 2FA Method</h3>
            <p className="text-muted-foreground">
              Two-factor authentication adds an extra layer of security to your account.
            </p>
            <div className="grid gap-4">
              {methods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedMethod === method.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{method.title}</h4>
                          {method.recommended && (
                            <Badge>Recommended</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Setup Authenticator App</h3>
            {selectedMethod === 'totp' ? (
              <TOTPSetup onComplete={handleNext} />
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium mb-2">SMS Setup</h4>
                <p className="text-muted-foreground">
                  SMS 2FA setup would be implemented here
                </p>
              </div>
            )}
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Save Your Backup Codes</h3>
            <p className="text-muted-foreground">
              These codes can be used to access your account if you lose your authenticator device.
              Store them in a safe place.
            </p>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="p-2 bg-muted rounded font-mono text-center"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Download Codes
              </Button>
              <Button variant="outline" className="flex-1">
                Print Codes
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-4 text-center">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
            <h3 className="text-lg font-semibold">Setup Complete!</h3>
            <p className="text-muted-foreground">
              Your two-factor authentication has been successfully configured.
              Your account is now more secure.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Keep your backup codes in a safe place</li>
                <li>• Test your 2FA setup by signing out and back in</li>
                <li>• Consider enabling additional security features</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StandardLayout
      title="Two-Factor Authentication Setup | Hawkly"
      description="Secure your account with two-factor authentication"
    >
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Two-Factor Authentication</h1>
          <p className="text-muted-foreground">
            Protect your account with an additional layer of security
          </p>
        </div>

        <Card>
          <CardHeader>
            <ProgressSteps 
              steps={steps} 
              currentStepId={currentStep}
              className="mb-4"
            />
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 'method'}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={currentStep === 'complete' ? handleComplete : handleNext}
                disabled={currentStep === 'method' && !selectedMethod}
              >
                {currentStep === 'complete' ? 'Complete Setup' : 'Next'}
                {currentStep !== 'complete' && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default TwoFactorSetup;
