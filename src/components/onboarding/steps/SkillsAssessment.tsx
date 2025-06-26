
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface SkillsData {
  expertise: string[];
  experience: string;
  certifications: string[];
  languages: string[];
}

interface SkillsAssessmentProps {
  skillsData: SkillsData;
  onSkillsChange: (data: SkillsData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EXPERTISE_OPTIONS = [
  'Smart Contract Security',
  'DeFi Protocols',
  'NFT Security',
  'Layer 2 Solutions',
  'Cross-Chain Bridges',
  'DAO Governance',
  'Tokenomics',
  'Gas Optimization',
  'MEV Protection'
];

const PROGRAMMING_LANGUAGES = [
  'Solidity',
  'Vyper',
  'Rust',
  'JavaScript',
  'TypeScript',
  'Python',
  'Go',
  'C++',
  'Move'
];

export const SkillsAssessment: React.FC<SkillsAssessmentProps> = ({
  skillsData,
  onSkillsChange,
  onNext,
  onPrev
}) => {
  const addExpertise = (expertise: string) => {
    if (!skillsData.expertise.includes(expertise)) {
      onSkillsChange({
        ...skillsData,
        expertise: [...skillsData.expertise, expertise]
      });
    }
  };

  const removeExpertise = (expertise: string) => {
    onSkillsChange({
      ...skillsData,
      expertise: skillsData.expertise.filter(e => e !== expertise)
    });
  };

  const addLanguage = (language: string) => {
    if (!skillsData.languages.includes(language)) {
      onSkillsChange({
        ...skillsData,
        languages: [...skillsData.languages, language]
      });
    }
  };

  const removeLanguage = (language: string) => {
    onSkillsChange({
      ...skillsData,
      languages: skillsData.languages.filter(l => l !== language)
    });
  };

  const updateField = (field: keyof SkillsData, value: string | string[]) => {
    onSkillsChange({ ...skillsData, [field]: value });
  };

  const handleCertificationsChange = (value: string) => {
    const certifications = value.split('\n').filter(cert => cert.trim() !== '');
    updateField('certifications', certifications);
  };

  const isValid = skillsData.expertise.length > 0 && skillsData.experience && skillsData.languages.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Showcase Your Expertise</h2>
        <p className="text-muted-foreground">
          Help us understand your security auditing skills and experience
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Areas of Expertise</CardTitle>
          <CardDescription>Select your primary security focus areas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {EXPERTISE_OPTIONS.map((option) => (
              <Button
                key={option}
                variant={skillsData.expertise.includes(option) ? "default" : "outline"}
                size="sm"
                onClick={() => 
                  skillsData.expertise.includes(option) 
                    ? removeExpertise(option)
                    : addExpertise(option)
                }
              >
                {option}
              </Button>
            ))}
          </div>
          
          {skillsData.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skillsData.expertise.map((expertise) => (
                <Badge key={expertise} variant="secondary" className="flex items-center gap-1">
                  {expertise}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeExpertise(expertise)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience Level</CardTitle>
          <CardDescription>How would you describe your auditing experience?</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={skillsData.experience} onValueChange={(value) => updateField('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (0-2 years)</SelectItem>
              <SelectItem value="mid-level">Mid-level (2-5 years)</SelectItem>
              <SelectItem value="senior">Senior (5+ years)</SelectItem>
              <SelectItem value="expert">Expert (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Programming Languages</CardTitle>
          <CardDescription>Which languages are you proficient in?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PROGRAMMING_LANGUAGES.map((language) => (
              <Button
                key={language}
                variant={skillsData.languages.includes(language) ? "default" : "outline"}
                size="sm"
                onClick={() => 
                  skillsData.languages.includes(language)
                    ? removeLanguage(language)
                    : addLanguage(language)
                }
              >
                {language}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications & Credentials</CardTitle>
          <CardDescription>List any relevant security certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., CEH, CISSP, blockchain security certifications..."
            value={skillsData.certifications.join('\n')}
            onChange={(e) => handleCertificationsChange(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};
