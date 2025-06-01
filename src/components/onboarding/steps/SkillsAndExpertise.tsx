
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import type { UserType } from '../OnboardingWizard';

interface SkillsData {
  skills: string[];
  specializations: string[];
  experience: number;
  blockchainExpertise: string[];
}

interface SkillsAndExpertiseProps {
  data: SkillsData;
  userType: UserType | null;
  onChange: (data: SkillsData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const COMMON_SKILLS = [
  'Smart Contract Auditing',
  'Solidity',
  'Rust',
  'JavaScript/TypeScript',
  'DeFi Protocols',
  'NFT Standards',
  'Gas Optimization',
  'Security Best Practices',
  'Formal Verification',
  'Penetration Testing'
];

const BLOCKCHAIN_NETWORKS = [
  'Ethereum',
  'Polygon',
  'Binance Smart Chain',
  'Avalanche',
  'Solana',
  'Cardano',
  'Polkadot',
  'Cosmos',
  'Near',
  'Algorand'
];

const SPECIALIZATIONS = [
  'DeFi Security',
  'NFT Security',
  'Cross-chain Bridges',
  'Layer 2 Solutions',
  'DAO Governance',
  'Token Economics',
  'Smart Contract Architecture',
  'Consensus Mechanisms'
];

export const SkillsAndExpertise: React.FC<SkillsAndExpertiseProps> = ({
  data,
  userType,
  onChange,
  onNext,
  onPrev
}) => {
  const toggleSkill = (skill: string, type: 'skills' | 'specializations' | 'blockchainExpertise') => {
    const current = data[type];
    const updated = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    
    onChange({ ...data, [type]: updated });
  };

  const updateExperience = (value: number[]) => {
    onChange({ ...data, experience: value[0] });
  };

  if (userType !== 'auditor') {
    // Simplified version for project owners
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Project Preferences</h2>
          <p className="text-muted-foreground">
            Help us understand your project needs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blockchain Networks</CardTitle>
            <CardDescription>
              Which networks do you work with?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {BLOCKCHAIN_NETWORKS.map(network => (
                <Badge
                  key={network}
                  variant={data.blockchainExpertise.includes(network) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(network, 'blockchainExpertise')}
                >
                  {network}
                </Badge>
              ))}
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
        <h2 className="text-2xl font-bold">Your Expertise</h2>
        <p className="text-muted-foreground">
          Help clients understand your security audit capabilities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Years of Experience</CardTitle>
          <CardDescription>
            How many years have you been doing security audits?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={[data.experience]}
              onValueChange={updateExperience}
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold">{data.experience}</span>
              <span className="text-muted-foreground ml-1">
                {data.experience === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>
            Select the technologies and practices you're proficient in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {COMMON_SKILLS.map(skill => (
              <Badge
                key={skill}
                variant={data.skills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSkill(skill, 'skills')}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blockchain Networks</CardTitle>
          <CardDescription>
            Which blockchain networks do you have experience auditing?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {BLOCKCHAIN_NETWORKS.map(network => (
              <Badge
                key={network}
                variant={data.blockchainExpertise.includes(network) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSkill(network, 'blockchainExpertise')}
              >
                {network}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
          <CardDescription>
            What are your areas of specialization?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map(spec => (
              <Badge
                key={spec}
                variant={data.specializations.includes(spec) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSkill(spec, 'specializations')}
              >
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext} disabled={data.skills.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
};
