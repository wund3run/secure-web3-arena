
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Building, CheckCircle } from 'lucide-react';
import type { UserType } from '../OnboardingWizard';

interface UserTypeSelectionProps {
  selected: UserType | null;
  onSelect: (type: UserType) => void;
  onNext: () => void;
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  selected,
  onSelect,
  onNext
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Role</h2>
        <p className="text-muted-foreground">
          Select how you plan to use the Hawkly platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selected === 'auditor' 
              ? 'ring-2 ring-primary border-primary' 
              : 'hover:border-primary/50'
          }`}
          onClick={() => onSelect('auditor')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 relative">
              <Shield className="h-12 w-12 text-primary" />
              {selected === 'auditor' && (
                <CheckCircle className="h-6 w-6 text-primary absolute -top-1 -right-1 bg-background rounded-full" />
              )}
            </div>
            <CardTitle>Security Auditor</CardTitle>
            <CardDescription>
              Provide security audit services to Web3 projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Review smart contracts for vulnerabilities</li>
              <li>• Build your reputation and portfolio</li>
              <li>• Set your own rates and availability</li>
              <li>• Access advanced audit tools</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selected === 'project_owner' 
              ? 'ring-2 ring-primary border-primary' 
              : 'hover:border-primary/50'
          }`}
          onClick={() => onSelect('project_owner')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 relative">
              <Building className="h-12 w-12 text-primary" />
              {selected === 'project_owner' && (
                <CheckCircle className="h-6 w-6 text-primary absolute -top-1 -right-1 bg-background rounded-full" />
              )}
            </div>
            <CardTitle>Project Owner</CardTitle>
            <CardDescription>
              Get your Web3 project audited by top security experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Find qualified security auditors</li>
              <li>• AI-powered auditor matching</li>
              <li>• Secure escrow payments</li>
              <li>• Track audit progress in real-time</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!selected}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
