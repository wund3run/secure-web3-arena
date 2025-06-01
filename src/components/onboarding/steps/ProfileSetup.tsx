
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Globe } from 'lucide-react';
import type { UserType } from '../OnboardingWizard';

interface ProfileData {
  fullName: string;
  displayName: string;
  bio: string;
  website: string;
  socialLinks: Record<string, string>;
}

interface ProfileSetupProps {
  data: ProfileData;
  userType: UserType | null;
  onChange: (data: ProfileData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  data,
  userType,
  onChange,
  onNext,
  onPrev
}) => {
  const updateField = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const isValid = data.fullName.trim() && data.displayName.trim();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Set up your profile</h2>
        <p className="text-muted-foreground">
          Tell us about yourself to create a compelling {userType === 'auditor' ? 'auditor' : 'project owner'} profile
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Your basic profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={data.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                placeholder="johndoe"
                value={data.displayName}
                onChange={(e) => updateField('displayName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder={userType === 'auditor' 
                ? "Tell potential clients about your security expertise and experience..."
                : "Describe your project or organization..."
              }
              value={data.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Label>
            <Input
              id="website"
              placeholder="https://yourwebsite.com"
              value={data.website}
              onChange={(e) => updateField('website', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Continue
        </Button>
      </div>
    </div>
  );
};
