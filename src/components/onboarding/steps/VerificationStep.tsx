
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Github, Linkedin } from 'lucide-react';
import type { UserType } from '../OnboardingWizard';

interface VerificationData {
  documents: File[];
  portfolioLinks: string[];
  githubUsername: string;
  linkedinUrl: string;
}

interface VerificationStepProps {
  data: VerificationData;
  userType: UserType | null;
  onChange: (data: VerificationData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  data,
  userType,
  onChange,
  onNext,
  onPrev
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
    updateField('documents', [...data.documents, ...files]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {userType === 'auditor' ? 'Verification & Portfolio' : 'Project Information'}
        </h2>
        <p className="text-muted-foreground">
          {userType === 'auditor' 
            ? 'Help us verify your expertise and build trust with clients'
            : 'Provide additional information about your organization'
          }
        </p>
      </div>

      {userType === 'auditor' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Verification Documents
              </CardTitle>
              <CardDescription>
                Upload certificates, credentials, or other verification documents (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drop files here or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>
              
              {data.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                  <ul className="space-y-1">
                    {data.documents.map((file, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Links</CardTitle>
              <CardDescription>
                Share links to your previous work, audit reports, or project showcases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.portfolioLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="https://example.com/my-audit-report"
                    value={link}
                    onChange={(e) => updatePortfolioLink(index, e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removePortfolioLink(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addPortfolioLink}>
                Add Portfolio Link
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Professional Profiles</CardTitle>
          <CardDescription>
            Connect your professional social profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub Username
            </Label>
            <Input
              id="github"
              placeholder="your-username"
              value={data.githubUsername}
              onChange={(e) => updateField('githubUsername', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn Profile URL
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/your-profile"
              value={data.linkedinUrl}
              onChange={(e) => updateField('linkedinUrl', e.target.value)}
            />
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
};
