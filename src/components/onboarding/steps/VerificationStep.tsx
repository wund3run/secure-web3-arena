
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, ExternalLink, Shield } from 'lucide-react';
import { UserType } from '../OnboardingWizard';

interface VerificationStepProps {
  userType: UserType;
  onComplete: () => void;
  isSubmitting: boolean;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  userType,
  onComplete,
  isSubmitting
}) => {
  const updateField = (field: keyof VerificationData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addPortfolioLink = () => {
    updateField('portfolioLinks', [...data.portfolioLinks, '']);
  };

  const updatePortfolioLink = (index: number, value: string) => {
    const links = [...data.portfolioLinks];
    links[index] = value;
    updateField('portfolioLinks', links);
  };

  const removePortfolioLink = (index: number) => {
    const links = data.portfolioLinks.filter((_, i) => i !== index);
    updateField('portfolioLinks', links);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Shield className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Identity Verification</h2>
        <p className="text-muted-foreground">
          {userType === 'auditor' 
            ? 'Verify your credentials to start receiving audit opportunities'
            : 'Complete verification to access premium features'
          }
        </p>
      </div>

      {userType === 'auditor' && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Documentation</CardTitle>
            <CardDescription>
              Upload certificates, resumes, or portfolio documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, PNG, JPG up to 10MB each
                </p>
              </label>
            </div>

            {documents.length > 0 && (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeDocument(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Professional Profiles</CardTitle>
          <CardDescription>
            Link your professional profiles for additional verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <div className="flex gap-2">
              <Input
                id="github"
                placeholder="https://github.com/yourusername"
                value={githubProfile}
                onChange={(e) => setGithubProfile(e.target.value)}
              />
              {githubProfile && (
                <Button size="icon" variant="outline" asChild>
                  <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <div className="flex gap-2">
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourusername"
                value={linkedinProfile}
                onChange={(e) => setLinkedinProfile(e.target.value)}
              />
              {linkedinProfile && (
                <Button size="icon" variant="outline" asChild>
                  <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {userType === 'auditor' && (
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio/Website</Label>
              <div className="flex gap-2">
                <Input
                  id="portfolio"
                  placeholder="https://yourportfolio.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
                {portfolioUrl && (
                  <Button size="icon" variant="outline" asChild>
                    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>
            Your account will be reviewed within 24-48 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Pending Review</Badge>
            <span className="text-sm text-muted-foreground">
              You'll receive an email notification once verified
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={onComplete} 
          disabled={isSubmitting}
          size="lg"
          className="px-8"
        >
          {isSubmitting ? 'Setting up your account...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};
