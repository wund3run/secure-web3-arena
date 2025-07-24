
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFormData {
  projectName?: string;
  projectDescription?: string;
  blockchain?: string;
  projectType?: string;
  repositoryUrl?: string;
}

interface ProjectInformationStepProps {
  formData: ProjectFormData;
  handleInputChange: (field: string, value: unknown) => void;
}

export const ProjectInformationStep = ({ formData, handleInputChange }: ProjectInformationStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Project Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              placeholder="Enter your project name"
              value={formData.projectName || '' || ''}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="projectDescription">Project Description *</Label>
            <Textarea
              id="projectDescription"
              placeholder="Describe your project, its purpose, and key features"
              rows={4}
              value={formData.projectDescription || ''}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="blockchain">Blockchain *</Label>
              <Select value={formData.blockchain || '' || ''} onValueChange={(value) => handleInputChange('blockchain', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="projectType">Project Type *</Label>
              <Select value={formData.projectType || '' || ''} onValueChange={(value) => handleInputChange('projectType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defi">DeFi Protocol</SelectItem>
                  <SelectItem value="nft">NFT Project</SelectItem>
                  <SelectItem value="gaming">Gaming/GameFi</SelectItem>
                  <SelectItem value="dao">DAO</SelectItem>
                  <SelectItem value="bridge">Cross-chain Bridge</SelectItem>
                  <SelectItem value="token">Token/Coin</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="repositoryUrl">Repository URL</Label>
            <Input
              id="repositoryUrl"
              placeholder="https://github.com/your-org/project"
              value={formData.repositoryUrl || ''}
              onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
