
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AuditorProfileService } from '@/services/auditor-profile-service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 'Avalanche', 
  'Arbitrum', 'Optimism', 'Cosmos', 'Polkadot', 'Cardano'
];

const AUDIT_TYPES = [
  'Smart Contract Audit', 'DeFi Protocol Audit', 'NFT Contract Audit', 
  'Cross-chain Bridge Audit', 'DAO Governance Audit', 'Tokenomics Review'
];

export function AuditorOnboardingWizard() {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    business_name: '',
    years_experience: 1,
    hourly_rate_min: '',
    hourly_rate_max: '',
    blockchain_expertise: [] as string[],
    audit_types: [] as string[],
    portfolio_url: '',
    github_username: '',
    linkedin_url: '',
    specialization_tags: [] as string[]
  });
  
  const navigate = useNavigate();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBlockchainToggle = (blockchain: string) => {
    setProfileData(prev => ({
      ...prev,
      blockchain_expertise: prev.blockchain_expertise.includes(blockchain)
        ? prev.blockchain_expertise.filter(b => b !== blockchain)
        : [...prev.blockchain_expertise, blockchain]
    }));
  };

  const handleAuditTypeToggle = (auditType: string) => {
    setProfileData(prev => ({
      ...prev,
      audit_types: prev.audit_types.includes(auditType)
        ? prev.audit_types.filter(t => t !== auditType)
        : [...prev.audit_types, auditType]
    }));
  };

  const handleSubmit = async () => {
    const success = await AuditorProfileService.createAuditorProfile({
      ...profileData,
      hourly_rate_min: parseFloat(profileData.hourly_rate_min) || undefined,
      hourly_rate_max: parseFloat(profileData.hourly_rate_max) || undefined
    });

    if (success) {
      toast.success('Welcome to Hawkly! Your auditor profile is being reviewed.');
      navigate('/dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_name">Business Name (Optional)</Label>
                <Input
                  id="business_name"
                  value={profileData.business_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, business_name: e.target.value }))}
                  placeholder="Your auditing firm name"
                />
              </div>
              <div>
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Select
                  value={profileData.years_experience.toString()}
                  onValueChange={(value) => setProfileData(prev => ({ ...prev, years_experience: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1-2 years</SelectItem>
                    <SelectItem value="3">3-4 years</SelectItem>
                    <SelectItem value="5">5+ years</SelectItem>
                    <SelectItem value="10">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hourly_rate_min">Minimum Hourly Rate ($)</Label>
                <Input
                  id="hourly_rate_min"
                  type="number"
                  value={profileData.hourly_rate_min}
                  onChange={(e) => setProfileData(prev => ({ ...prev, hourly_rate_min: e.target.value }))}
                  placeholder="150"
                />
              </div>
              <div>
                <Label htmlFor="hourly_rate_max">Maximum Hourly Rate ($)</Label>
                <Input
                  id="hourly_rate_max"
                  type="number"
                  value={profileData.hourly_rate_max}
                  onChange={(e) => setProfileData(prev => ({ ...prev, hourly_rate_max: e.target.value }))}
                  placeholder="300"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Blockchain Expertise</h3>
            <p className="text-sm text-muted-foreground">Select all blockchains you have experience auditing</p>
            <div className="grid grid-cols-3 gap-2">
              {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                <div key={blockchain} className="flex items-center space-x-2">
                  <Checkbox
                    id={blockchain}
                    checked={profileData.blockchain_expertise.includes(blockchain)}
                    onCheckedChange={() => handleBlockchainToggle(blockchain)}
                  />
                  <Label htmlFor={blockchain} className="text-sm">{blockchain}</Label>
                </div>
              ))}
            </div>
            {profileData.blockchain_expertise.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {profileData.blockchain_expertise.map((blockchain) => (
                  <Badge key={blockchain} variant="secondary">{blockchain}</Badge>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audit Specializations</h3>
            <p className="text-sm text-muted-foreground">What types of audits do you specialize in?</p>
            <div className="space-y-2">
              {AUDIT_TYPES.map((auditType) => (
                <div key={auditType} className="flex items-center space-x-2">
                  <Checkbox
                    id={auditType}
                    checked={profileData.audit_types.includes(auditType)}
                    onCheckedChange={() => handleAuditTypeToggle(auditType)}
                  />
                  <Label htmlFor={auditType}>{auditType}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Links</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="portfolio_url">Portfolio URL</Label>
                <Input
                  id="portfolio_url"
                  value={profileData.portfolio_url}
                  onChange={(e) => setProfileData(prev => ({ ...prev, portfolio_url: e.target.value }))}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div>
                <Label htmlFor="github_username">GitHub Username</Label>
                <Input
                  id="github_username"
                  value={profileData.github_username}
                  onChange={(e) => setProfileData(prev => ({ ...prev, github_username: e.target.value }))}
                  placeholder="your-github-username"
                />
              </div>
              <div>
                <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                <Input
                  id="linkedin_url"
                  value={profileData.linkedin_url}
                  onChange={(e) => setProfileData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
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
          <CardTitle>Complete Your Auditor Profile</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={step === 1}
            >
              Back
            </Button>
            
            {step < totalSteps ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
