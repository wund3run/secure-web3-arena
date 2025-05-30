
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProjectInformationStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  errors?: any;
  onNext: () => void;
}

const blockchainOptions = [
  { value: 'ethereum', label: 'Ethereum', popular: true },
  { value: 'polygon', label: 'Polygon', popular: true },
  { value: 'bsc', label: 'Binance Smart Chain', popular: true },
  { value: 'arbitrum', label: 'Arbitrum', popular: false },
  { value: 'optimism', label: 'Optimism', popular: false },
  { value: 'solana', label: 'Solana', popular: true },
  { value: 'cardano', label: 'Cardano', popular: false },
  { value: 'polkadot', label: 'Polkadot', popular: false },
  { value: 'avalanche', label: 'Avalanche', popular: false },
  { value: 'cosmos', label: 'Cosmos', popular: false },
  { value: 'other', label: 'Other', popular: false }
];

const projectTypes = [
  { value: 'defi', label: 'DeFi Protocol', description: 'Decentralized Finance applications' },
  { value: 'nft', label: 'NFT Project', description: 'Non-Fungible Token platforms' },
  { value: 'gaming', label: 'Gaming/GameFi', description: 'Blockchain gaming and GameFi' },
  { value: 'dao', label: 'DAO', description: 'Decentralized Autonomous Organization' },
  { value: 'bridge', label: 'Cross-chain Bridge', description: 'Inter-blockchain connectivity' },
  { value: 'token', label: 'Token/Coin', description: 'Cryptocurrency or utility tokens' },
  { value: 'marketplace', label: 'Marketplace', description: 'Trading and commerce platforms' },
  { value: 'infrastructure', label: 'Infrastructure', description: 'Blockchain infrastructure tools' },
  { value: 'other', label: 'Other', description: 'Custom or specialized projects' }
];

export const ProjectInformationStep = ({ formData, handleInputChange, errors, onNext }: ProjectInformationStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Project Information</h3>
        <p className="text-muted-foreground mb-6">
          Tell us about your project so we can match you with the right auditors.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            placeholder="Enter your project name"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            className={errors?.projectName ? 'border-red-500' : ''}
            required
          />
          {errors?.projectName && (
            <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="projectDescription">Project Description *</Label>
          <Textarea
            id="projectDescription"
            placeholder="Describe your project, its purpose, key features, and what makes it unique..."
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => handleInputChange('projectDescription', e.target.value)}
            className={errors?.projectDescription ? 'border-red-500' : ''}
            required
          />
          {errors?.projectDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Minimum 50 characters. Be specific about your project's functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="blockchain">Primary Blockchain *</Label>
            <Select value={formData.blockchain} onValueChange={(value) => handleInputChange('blockchain', value)}>
              <SelectTrigger className={errors?.blockchain ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select blockchain" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Popular Options</p>
                  {blockchainOptions.filter(option => option.popular).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.label}
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      </div>
                    </SelectItem>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Other Options</p>
                    {blockchainOptions.filter(option => !option.popular).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </div>
                </div>
              </SelectContent>
            </Select>
            {errors?.blockchain && (
              <p className="text-red-500 text-sm mt-1">{errors.blockchain}</p>
            )}
          </div>

          <div>
            <Label htmlFor="projectType">Project Type *</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
              <SelectTrigger className={errors?.projectType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.projectType && (
              <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
            )}
          </div>
        </div>

        {formData.blockchain === 'other' && (
          <div>
            <Label htmlFor="customBlockchain">Custom Blockchain *</Label>
            <Input
              id="customBlockchain"
              placeholder="Specify the blockchain you're using"
              value={formData.customBlockchain}
              onChange={(e) => handleInputChange('customBlockchain', e.target.value)}
              className={errors?.customBlockchain ? 'border-red-500' : ''}
              required
            />
            {errors?.customBlockchain && (
              <p className="text-red-500 text-sm mt-1">{errors.customBlockchain}</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="repositoryUrl">Repository URL (Optional)</Label>
          <Input
            id="repositoryUrl"
            placeholder="https://github.com/your-org/project (or GitLab, Bitbucket)"
            value={formData.repositoryUrl}
            onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
            className={errors?.repositoryUrl ? 'border-red-500' : ''}
          />
          {errors?.repositoryUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.repositoryUrl}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Link to your code repository. Private repos will require access permissions later.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Privacy Note:</strong> All project information is kept confidential and only shared with selected auditors under NDA.
          </AlertDescription>
        </Alert>

        <div className="pt-4">
          <Button onClick={onNext} className="w-full md:w-auto">
            Continue to Technical Details
          </Button>
        </div>
      </div>
    </div>
  );
};
