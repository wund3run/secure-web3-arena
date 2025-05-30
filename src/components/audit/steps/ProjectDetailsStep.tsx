
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectDetailsStepProps {
  values: any;
  setValue: (field: string, value: any) => void;
  errors: any;
}

export function ProjectDetailsStep({ values, setValue, errors }: ProjectDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            value={values.projectName}
            onChange={(e) => setValue('projectName', e.target.value)}
            placeholder="Enter your project name"
          />
          {errors.projectName && <p className="text-sm text-red-500">{errors.projectName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="blockchain">Blockchain *</Label>
          <Select value={values.blockchain} onValueChange={(value) => setValue('blockchain', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
              <SelectItem value="bsc">Binance Smart Chain</SelectItem>
              <SelectItem value="avalanche">Avalanche</SelectItem>
            </SelectContent>
          </Select>
          {errors.blockchain && <p className="text-sm text-red-500">{errors.blockchain}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType">Project Type</Label>
        <Select value={values.projectType} onValueChange={(value) => setValue('projectType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="defi">DeFi Protocol</SelectItem>
            <SelectItem value="nft">NFT Marketplace</SelectItem>
            <SelectItem value="dao">DAO</SelectItem>
            <SelectItem value="gamefi">GameFi</SelectItem>
            <SelectItem value="bridge">Cross-chain Bridge</SelectItem>
            <SelectItem value="token">Token Contract</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectDescription">Project Description *</Label>
        <Textarea
          id="projectDescription"
          value={values.projectDescription}
          onChange={(e) => setValue('projectDescription', e.target.value)}
          placeholder="Provide a detailed description of your project, its functionality, and key features..."
          rows={4}
        />
        {errors.projectDescription && <p className="text-sm text-red-500">{errors.projectDescription}</p>}
      </div>
    </div>
  );
}
