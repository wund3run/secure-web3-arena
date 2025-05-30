
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FileText, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProjectInformationStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const blockchainOptions = [
  { id: 'ethereum', name: 'Ethereum', popular: true },
  { id: 'polygon', name: 'Polygon', popular: true },
  { id: 'bsc', name: 'Binance Smart Chain', popular: true },
  { id: 'arbitrum', name: 'Arbitrum', popular: true },
  { id: 'optimism', name: 'Optimism', popular: false },
  { id: 'avalanche', name: 'Avalanche', popular: false },
  { id: 'solana', name: 'Solana', popular: true },
  { id: 'cardano', name: 'Cardano', popular: false },
  { id: 'other', name: 'Other', popular: false }
];

const projectTypes = [
  { id: 'defi', name: 'DeFi Protocol', description: 'Decentralized finance applications' },
  { id: 'nft', name: 'NFT Project', description: 'Non-fungible token collections and marketplaces' },
  { id: 'gaming', name: 'GameFi/Gaming', description: 'Blockchain gaming and play-to-earn' },
  { id: 'dao', name: 'DAO/Governance', description: 'Decentralized autonomous organizations' },
  { id: 'infrastructure', name: 'Infrastructure', description: 'Blockchain infrastructure and tooling' },
  { id: 'other', name: 'Other', description: 'Other blockchain applications' }
];

export function EnhancedProjectInformationStep({ formData, handleInputChange, errors }: ProjectInformationStepProps) {
  const handleBlockchainSelect = (blockchain: string) => {
    handleInputChange('blockchain', blockchain);
  };

  const handleProjectTypeSelect = (type: string) => {
    handleInputChange('projectType', type);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Tell us about your project</h2>
        <p className="text-muted-foreground">
          Provide basic information about your project to help us match you with the right auditors
        </p>
      </div>

      <div className="grid gap-6">
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            placeholder="Enter your project name"
            value={formData.projectName || ''}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            className={errors?.projectName ? 'border-red-500' : ''}
          />
          {errors?.projectName && (
            <p className="text-sm text-red-500">{errors.projectName}</p>
          )}
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label htmlFor="projectDescription">Project Description *</Label>
          <Textarea
            id="projectDescription"
            placeholder="Describe your project, its purpose, and key features..."
            rows={4}
            value={formData.projectDescription || ''}
            onChange={(e) => handleInputChange('projectDescription', e.target.value)}
            className={errors?.projectDescription ? 'border-red-500' : ''}
          />
          {errors?.projectDescription && (
            <p className="text-sm text-red-500">{errors.projectDescription}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Include information about your project's functionality, user base, and any unique features
          </p>
        </div>

        {/* Repository URL */}
        <div className="space-y-2">
          <Label htmlFor="repositoryUrl">Repository URL (Optional)</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="repositoryUrl"
              placeholder="https://github.com/yourproject/repo"
              className="pl-10"
              value={formData.repositoryUrl || ''}
              onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Provide access to your code repository for more accurate audit scoping
          </p>
        </div>

        {/* Project Type */}
        <div className="space-y-3">
          <Label>Project Type *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.projectType === type.id 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleProjectTypeSelect(type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.projectType === type.id 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`} />
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {errors?.projectType && (
            <p className="text-sm text-red-500">{errors.projectType}</p>
          )}
        </div>

        {/* Blockchain Selection */}
        <div className="space-y-3">
          <Label>Primary Blockchain *</Label>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {blockchainOptions.filter(b => b.popular).map((blockchain) => (
                <Button
                  key={blockchain.id}
                  variant={formData.blockchain === blockchain.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleBlockchainSelect(blockchain.id)}
                  className="flex items-center gap-2"
                >
                  {blockchain.name}
                  {blockchain.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                </Button>
              ))}
            </div>
            
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                Show more blockchains
              </summary>
              <div className="mt-2 flex flex-wrap gap-2">
                {blockchainOptions.filter(b => !b.popular).map((blockchain) => (
                  <Button
                    key={blockchain.id}
                    variant={formData.blockchain === blockchain.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleBlockchainSelect(blockchain.id)}
                  >
                    {blockchain.name}
                  </Button>
                ))}
              </div>
            </details>
          </div>
          {errors?.blockchain && (
            <p className="text-sm text-red-500">{errors.blockchain}</p>
          )}
        </div>

        {/* Custom Blockchain Input */}
        {formData.blockchain === 'other' && (
          <div className="space-y-2">
            <Label htmlFor="customBlockchain">Specify Blockchain</Label>
            <Input
              id="customBlockchain"
              placeholder="Enter blockchain name"
              value={formData.customBlockchain || ''}
              onChange={(e) => handleInputChange('customBlockchain', e.target.value)}
            />
          </div>
        )}

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This information helps our AI matching system identify the most suitable auditors for your project. 
            You can always update these details later in the process.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
