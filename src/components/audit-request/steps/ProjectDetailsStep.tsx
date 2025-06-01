
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Globe, Github } from 'lucide-react';
import type { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';

interface ProjectDetailsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  projectType: string;
  setProjectType: (type: string) => void;
  handleEcosystemClick: (ecosystem: string) => void;
  nextStep: () => void;
  formErrors: AuditFormErrors;
}

const blockchainEcosystems = [
  'Ethereum', 'Polygon', 'Binance Smart Chain', 'Arbitrum', 'Optimism', 
  'Solana', 'Avalanche', 'Fantom', 'Cardano', 'Polkadot', 'Other'
];

const projectTypes = [
  { value: 'defi', label: 'DeFi Protocol', description: 'Decentralized Finance applications' },
  { value: 'nft', label: 'NFT Project', description: 'Non-Fungible Token platforms' },
  { value: 'gaming', label: 'Gaming/GameFi', description: 'Blockchain gaming applications' },
  { value: 'dao', label: 'DAO', description: 'Decentralized Autonomous Organizations' },
  { value: 'bridge', label: 'Cross-chain Bridge', description: 'Interoperability solutions' },
  { value: 'token', label: 'Token/Coin', description: 'Cryptocurrency tokens' },
  { value: 'other', label: 'Other', description: 'Custom blockchain solutions' }
];

export const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({
  formData,
  handleChange,
  projectType,
  setProjectType,
  handleEcosystemClick,
  nextStep,
  formErrors
}) => {
  const isValid = formData.projectName.trim() && formData.projectDescription.trim() && formData.blockchain;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Project Details</h2>
        <p className="text-muted-foreground">
          Tell us about your project to help us find the perfect auditors
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Project Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Provide essential details about your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Enter your project name"
                value={formData.projectName}
                onChange={handleChange}
                className={formErrors.projectName ? 'border-destructive' : ''}
              />
              {formErrors.projectName && (
                <p className="text-sm text-destructive">{formErrors.projectName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                placeholder="Describe your project, its purpose, key features, and what makes it unique..."
                rows={4}
                value={formData.projectDescription}
                onChange={handleChange}
                className={formErrors.projectDescription ? 'border-destructive' : ''}
              />
              {formErrors.projectDescription && (
                <p className="text-sm text-destructive">{formErrors.projectDescription}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="repositoryUrl" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Repository URL
              </Label>
              <Input
                id="repositoryUrl"
                name="repositoryUrl"
                placeholder="https://github.com/your-org/project"
                value={formData.repositoryUrl}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Link to your code repository (GitHub, GitLab, etc.)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Project Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Project Type</CardTitle>
            <CardDescription>
              Select the category that best describes your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <div
                  key={type.value}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md
                    ${projectType === type.value 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => setProjectType(type.value)}
                >
                  <div className="font-medium">{type.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Ecosystem */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Blockchain Ecosystem *
            </CardTitle>
            <CardDescription>
              Which blockchain network is your project built on?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {blockchainEcosystems.map((ecosystem) => (
                <Badge
                  key={ecosystem}
                  variant={formData.blockchain === ecosystem ? "default" : "outline"}
                  className="cursor-pointer p-3 justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleEcosystemClick(ecosystem)}
                >
                  {ecosystem}
                </Badge>
              ))}
            </div>
            
            {formData.blockchain === 'Other' && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="customBlockchain">Specify Blockchain</Label>
                <Input
                  id="customBlockchain"
                  name="customBlockchain"
                  placeholder="Enter blockchain name"
                  value={formData.customBlockchain || ''}
                  onChange={handleChange}
                />
              </div>
            )}
            
            {formErrors.blockchain && (
              <p className="text-sm text-destructive mt-2">{formErrors.blockchain}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={nextStep} disabled={!isValid} size="lg">
          Continue to Technical Details
        </Button>
      </div>
    </div>
  );
};
