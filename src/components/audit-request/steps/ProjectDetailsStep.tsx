
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { AuditFormData } from '@/types/audit-request.types';

interface ProjectDetailsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  projectType: string;
  setProjectType: (type: string) => void;
  handleEcosystemClick: (ecosystem: string) => void;
  nextStep: () => void;
  formErrors: Record<string, string>;
}

const ecosystems = [
  { name: 'Ethereum', color: 'bg-blue-500' },
  { name: 'Polygon', color: 'bg-purple-500' },
  { name: 'Binance Smart Chain', color: 'bg-yellow-500' },
  { name: 'Avalanche', color: 'bg-red-500' },
  { name: 'Solana', color: 'bg-green-500' },
  { name: 'Arbitrum', color: 'bg-indigo-500' },
  { name: 'Optimism', color: 'bg-pink-500' },
  { name: 'Other', color: 'bg-gray-500' }
];

const projectTypes = [
  { id: 'defi', name: 'DeFi Protocol', description: 'Decentralized Finance applications' },
  { id: 'nft', name: 'NFT Marketplace', description: 'Non-fungible token platforms' },
  { id: 'gamefi', name: 'GameFi', description: 'Gaming and metaverse projects' },
  { id: 'dao', name: 'DAO', description: 'Decentralized Autonomous Organizations' },
  { id: 'bridge', name: 'Cross-chain Bridge', description: 'Inter-blockchain connectivity' },
  { id: 'other', name: 'Other', description: 'Custom blockchain project' }
];

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({
  formData,
  handleChange,
  projectType,
  setProjectType,
  handleEcosystemClick,
  nextStep,
  formErrors
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Details</h2>
        <p className="text-muted-foreground">Tell us about your project and security needs</p>
      </div>

      {/* Project Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Project Type</CardTitle>
          <CardDescription>What type of project are you building?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                  projectType === type.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setProjectType(type.id)}
              >
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter your project name"
              className={formErrors.projectName ? 'border-red-500' : ''}
            />
            {formErrors.projectName && (
              <p className="text-sm text-red-500 mt-1">{formErrors.projectName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="projectDescription">Project Description *</Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Describe your project, its functionality, and what you're building"
              rows={4}
              className={formErrors.projectDescription ? 'border-red-500' : ''}
            />
            {formErrors.projectDescription && (
              <p className="text-sm text-red-500 mt-1">{formErrors.projectDescription}</p>
            )}
          </div>

          <div>
            <Label htmlFor="repositoryUrl">Repository URL (Optional)</Label>
            <Input
              id="repositoryUrl"
              name="repositoryUrl"
              value={formData.repositoryUrl}
              onChange={handleChange}
              placeholder="https://github.com/your-project/repo"
              type="url"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Private repositories can be shared securely during the audit process
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Ecosystem *</CardTitle>
          <CardDescription>Which blockchain will your project be deployed on?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ecosystems.map((ecosystem) => (
              <Badge
                key={ecosystem.name}
                variant={formData.blockchain === ecosystem.name ? "default" : "outline"}
                className={`p-3 cursor-pointer justify-center hover:bg-primary/10 ${
                  formData.blockchain === ecosystem.name ? ecosystem.color + ' text-white' : ''
                }`}
                onClick={() => handleEcosystemClick(ecosystem.name)}
              >
                {ecosystem.name}
              </Badge>
            ))}
          </div>
          {formErrors.blockchain && (
            <p className="text-sm text-red-500 mt-2">{formErrors.blockchain}</p>
          )}
          
          {formData.blockchain === 'Other' && (
            <div className="mt-4">
              <Label htmlFor="customBlockchain">Specify Blockchain</Label>
              <Input
                id="customBlockchain"
                name="customBlockchain"
                value={formData.customBlockchain}
                onChange={handleChange}
                placeholder="Enter blockchain name"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Concerns */}
      <Card>
        <CardHeader>
          <CardTitle>Security Priorities</CardTitle>
          <CardDescription>What are your main security concerns?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            name="specificConcerns"
            value={formData.specificConcerns}
            onChange={handleChange}
            placeholder="Describe any specific security concerns, previous vulnerabilities, or areas you want auditors to focus on..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Previous Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Audits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="previousAudits"
              checked={formData.previousAudits}
              onChange={(e) => handleChange({
                target: { name: 'previousAudits', value: e.target.checked }
              } as any)}
              className="rounded"
            />
            <Label htmlFor="previousAudits">This project has been audited before</Label>
          </div>
          
          {formData.previousAudits && (
            <div>
              <Label htmlFor="previousAuditLinks">Previous Audit Reports</Label>
              <Textarea
                name="previousAuditLinks"
                value={formData.previousAuditLinks}
                onChange={handleChange}
                placeholder="Please provide links to previous audit reports or describe the scope of previous audits..."
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={nextStep} size="lg">
          Continue to Technical Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
