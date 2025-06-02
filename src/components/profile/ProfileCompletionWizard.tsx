
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { User, Briefcase, Shield, CheckCircle } from 'lucide-react';

interface ProfileData {
  fullName: string;
  displayName: string;
  bio: string;
  website: string;
  userType: 'auditor' | 'project_owner';
  skills: string[];
  specializations: string[];
  yearsExperience: number;
  blockchainExpertise: string[];
  githubUsername: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

const SKILLS_OPTIONS = [
  'Smart Contract Auditing', 'Solidity', 'Rust', 'Vyper', 'Go',
  'Formal Verification', 'Static Analysis', 'Dynamic Analysis',
  'Penetration Testing', 'Code Review', 'Architecture Review'
];

const SPECIALIZATION_OPTIONS = [
  'DeFi Protocols', 'NFT Platforms', 'Cross-Chain Bridges',
  'DAO Governance', 'Zero-Knowledge Proofs', 'Layer 2 Solutions',
  'Gaming Protocols', 'Oracle Security', 'Tokenomics'
];

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain',
  'Arbitrum', 'Optimism', 'Avalanche', 'Cosmos', 'Polkadot'
];

export const ProfileCompletionWizard: React.FC = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: userProfile?.full_name || '',
    displayName: userProfile?.display_name || '',
    bio: userProfile?.bio || '',
    website: userProfile?.website || '',
    userType: userProfile?.user_type || 'project_owner',
    skills: userProfile?.skills || [],
    specializations: userProfile?.specializations || [],
    yearsExperience: userProfile?.years_of_experience || 0,
    blockchainExpertise: [],
    githubUsername: '',
    linkedinUrl: '',
    portfolioUrl: ''
  });

  const totalSteps = profileData.userType === 'auditor' ? 4 : 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleArrayToggle = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field] instanceof Array 
        ? prev[field].includes(value)
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value]
        : [value]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile({
        full_name: profileData.fullName,
        display_name: profileData.displayName,
        bio: profileData.bio,
        website: profileData.website,
        user_type: profileData.userType,
        skills: profileData.skills,
        specializations: profileData.specializations,
        years_of_experience: profileData.yearsExperience,
        verification_status: 'pending'
      });

      toast.success('Profile completed successfully!');
    } catch (error) {
      console.error('Profile completion error:', error);
      toast.error('Failed to complete profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Public display name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">I am a *</Label>
              <Select value={profileData.userType} onValueChange={(value: 'auditor' | 'project_owner') => 
                setProfileData(prev => ({ ...prev, userType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project_owner">Project Owner - Looking for security audits</SelectItem>
                  <SelectItem value="auditor">Security Auditor - Providing audit services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself and your experience..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Experience & Skills</h3>
            </div>

            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Select value={profileData.yearsExperience.toString()} 
                onValueChange={(value) => setProfileData(prev => ({ ...prev, yearsExperience: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Less than 1 year</SelectItem>
                  <SelectItem value="1">1-2 years</SelectItem>
                  <SelectItem value="3">3-4 years</SelectItem>
                  <SelectItem value="5">5-7 years</SelectItem>
                  <SelectItem value="8">8-10 years</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Skills & Expertise</Label>
              <div className="grid grid-cols-2 gap-2">
                {SKILLS_OPTIONS.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={profileData.skills.includes(skill)}
                      onCheckedChange={() => handleArrayToggle('skills', skill)}
                    />
                    <Label htmlFor={skill} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Specializations</Label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALIZATION_OPTIONS.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={profileData.specializations.includes(spec)}
                      onCheckedChange={() => handleArrayToggle('specializations', spec)}
                    />
                    <Label htmlFor={spec} className="text-sm">{spec}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        if (profileData.userType === 'auditor') {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Blockchain Expertise</h3>
              </div>

              <div className="space-y-3">
                <Label>Blockchain Platforms</Label>
                <div className="grid grid-cols-2 gap-2">
                  {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                    <div key={blockchain} className="flex items-center space-x-2">
                      <Checkbox
                        id={blockchain}
                        checked={profileData.blockchainExpertise.includes(blockchain)}
                        onCheckedChange={() => handleArrayToggle('blockchainExpertise', blockchain)}
                      />
                      <Label htmlFor={blockchain} className="text-sm">{blockchain}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUsername">GitHub Username</Label>
                  <Input
                    id="githubUsername"
                    value={profileData.githubUsername}
                    onChange={(e) => setProfileData(prev => ({ ...prev, githubUsername: e.target.value }))}
                    placeholder="github-username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    value={profileData.portfolioUrl}
                    onChange={(e) => setProfileData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                    placeholder="https://portfolio.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                <Input
                  id="linkedinUrl"
                  value={profileData.linkedinUrl}
                  onChange={(e) => setProfileData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold">Profile Complete</h3>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-2">Ready to Get Started!</h4>
                <p className="text-green-700">
                  Your profile is now complete. You can start requesting security audits 
                  from our verified professionals.
                </p>
              </div>
            </div>
          );
        }

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h3 className="text-xl font-semibold">Profile Complete</h3>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-2">Verification Process</h4>
              <p className="text-blue-700 mb-4">
                Your auditor profile will be reviewed by our team. This typically takes 1-2 business days.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-blue-600">Next steps:</p>
                <ul className="text-sm text-blue-600 list-disc list-inside space-y-1">
                  <li>Profile review and verification</li>
                  <li>Background check (if applicable)</li>
                  <li>Portfolio review</li>
                  <li>Account activation</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                disabled={loading || !profileData.fullName}
              >
                {loading ? 'Completing...' : 'Complete Profile'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
