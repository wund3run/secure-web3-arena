
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const updateSocialLink = (platform: string, url: string) => {
    onChange({
      ...data,
      socialLinks: { ...data.socialLinks, [platform]: url }
    });
  };

  const isValid = data.fullName.trim() && data.displayName.trim();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Set Up Your Profile</h2>
        <p className="text-muted-foreground">
          Tell us about yourself to help others understand your expertise
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            This information will be visible on your public profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={data.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                value={data.displayName}
                onChange={(e) => updateField('displayName', e.target.value)}
                placeholder="How you want to be known"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={data.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              placeholder={
                userType === 'auditor' 
                  ? "Tell potential clients about your security expertise and experience..."
                  : "Tell auditors about your project and what you're looking for..."
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={data.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://your-website.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>
            Connect your social profiles to build trust
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={data.socialLinks.twitter || ''}
                onChange={(e) => updateSocialLink('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.socialLinks.linkedin || ''}
                onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
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
