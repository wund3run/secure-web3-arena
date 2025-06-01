
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Github, Linkedin } from 'lucide-react';
import type { UserType } from '../OnboardingWizard';

interface VerificationData {
  documents: File[];
  portfolioLinks: string[];
  githubUsername: string;
  linkedinUrl: string;
}

interface VerificationStepProps {
  data: VerificationData;
  userType: UserType | null;
  onChange: (data: VerificationData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  data,
  userType,
  onChange,
  onNext,
  onPrev
}) => {
  const updateField = (field: keyof VerificationData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  if (userType !== 'auditor') {
    // Simplified version for project owners
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Optional Information</h2>
          <p className="text-muted-foreground">
            Help auditors understand your project better
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Links</CardTitle>
            <CardDescription>
              Share your professional profiles (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  <Linkedin className="h-4 w-4" />
                </div>
                <Input
                  id="linkedin"
                  value={data.linkedinUrl}
                  onChange={(e) => updateField('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            Back
          </Button>
          <Button onClick={onNext}>
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Verification & Portfolio</h2>
        <p className="text-muted-foreground">
          Build trust with potential clients by sharing your credentials
        </p>
      </div>

      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          Verification helps build trust with clients and may be required for certain high-value audits.
          All information is optional but recommended for serious auditors.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Professional Profiles</CardTitle>
          <CardDescription>
            Connect your professional accounts to build credibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub Username</Label>
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                <Github className="h-4 w-4" />
              </div>
              <Input
                id="github"
                value={data.githubUsername}
                onChange={(e) => updateField('githubUsername', e.target.value)}
                placeholder="username"
                className="rounded-l-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                <Linkedin className="h-4 w-4" />
              </div>
              <Input
                id="linkedin"
                value={data.linkedinUrl}
                onChange={(e) => updateField('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="rounded-l-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Links</CardTitle>
          <CardDescription>
            Share links to your previous audit reports or security research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.portfolioLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={link}
                  onChange={(e) => {
                    const newLinks = [...data.portfolioLinks];
                    newLinks[index] = e.target.value;
                    updateField('portfolioLinks', newLinks);
                  }}
                  placeholder="https://example.com/audit-report"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newLinks = data.portfolioLinks.filter((_, i) => i !== index);
                    updateField('portfolioLinks', newLinks);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                updateField('portfolioLinks', [...data.portfolioLinks, '']);
              }}
            >
              Add Portfolio Link
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};
