
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';

type UserType = 'auditor' | 'project-owner' | 'project_owner';

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

const commonSkills = [
  'Solidity', 'Smart Contract Auditing', 'Security Testing', 'Vulnerability Assessment',
  'Code Review', 'Penetration Testing', 'Blockchain Security', 'DeFi Protocols',
  'NFT Security', 'Gas Optimization', 'Formal Verification', 'Static Analysis'
];

const blockchainNetworks = [
  'Ethereum', 'Polygon', 'Binance Smart Chain', 'Solana', 'Avalanche',
  'Arbitrum', 'Optimism', 'Fantom', 'Cardano', 'Polkadot'
];

export const SkillsAndExpertise: React.FC<SkillsAndExpertiseProps> = ({
  data,
  userType,
  onChange,
  onNext,
  onPrev
}) => {
  const [newSkill, setNewSkill] = React.useState('');

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] });
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({ ...data, skills: data.skills.filter(skill => skill !== skillToRemove) });
  };

  const toggleBlockchain = (blockchain: string) => {
    const isSelected = data.blockchainExpertise.includes(blockchain);
    if (isSelected) {
      onChange({
        ...data,
        blockchainExpertise: data.blockchainExpertise.filter(b => b !== blockchain)
      });
    } else {
      onChange({
        ...data,
        blockchainExpertise: [...data.blockchainExpertise, blockchain]
      });
    }
  };

  const updateExperience = (value: number[]) => {
    onChange({ ...data, experience: value[0] });
  };

  const isValid = userType === 'auditor' 
    ? data.skills.length > 0 && data.blockchainExpertise.length > 0
    : true; // Project owners don't need technical skills

  if (userType === 'project_owner') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Project Preferences</h2>
          <p className="text-muted-foreground">
            Tell us about your project to help us find the right auditors
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blockchain Networks</CardTitle>
            <CardDescription>
              Which blockchain networks is your project built on?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {blockchainNetworks.map(blockchain => (
                <Button
                  key={blockchain}
                  variant={data.blockchainExpertise.includes(blockchain) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleBlockchain(blockchain)}
                  className="justify-start"
                >
                  {blockchain}
                </Button>
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
        <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        <p className="text-muted-foreground">
          Share your technical expertise to showcase your capabilities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Years of Experience</CardTitle>
          <CardDescription>
            How many years of security auditing experience do you have?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="px-3">
              <Slider
                value={[data.experience]}
                onValueChange={updateExperience}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
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
            Add your security and blockchain-related skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(newSkill);
                }
              }}
            />
            <Button onClick={() => addSkill(newSkill)} disabled={!newSkill}>
              Add
            </Button>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Common Skills</h4>
            <div className="flex flex-wrap gap-2">
              {commonSkills.map(skill => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill(skill)}
                  disabled={data.skills.includes(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Your Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <Badge key={skill} variant="default" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blockchain Expertise</CardTitle>
          <CardDescription>
            Which blockchain networks do you have experience auditing?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {blockchainNetworks.map(blockchain => (
              <Button
                key={blockchain}
                variant={data.blockchainExpertise.includes(blockchain) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleBlockchain(blockchain)}
                className="justify-start"
              >
                {blockchain}
              </Button>
            ))}
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
