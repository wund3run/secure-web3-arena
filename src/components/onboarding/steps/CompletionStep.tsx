
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, Shield, Building } from 'lucide-react';
import type { OnboardingData } from '../OnboardingWizard';

interface CompletionStepProps {
  data: OnboardingData;
  onComplete: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
  data,
  onComplete,
  onPrev,
  isSubmitting
}) => {
  const isAuditor = data.accountType.userType === 'auditor';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">Almost Done!</h2>
        <p className="text-muted-foreground">
          Review your information and complete your profile setup
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isAuditor ? <Shield className="h-5 w-5" /> : <Building className="h-5 w-5" />}
            Profile Summary
          </CardTitle>
          <CardDescription>
            Your role: <Badge variant="outline">{isAuditor ? 'Security Auditor' : 'Project Owner'}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Name</h4>
              <p className="text-muted-foreground">{data.personalInfo.name || 'Not provided'}</p>
            </div>
            <div>
              <h4 className="font-medium">Email</h4>
              <p className="text-muted-foreground">{data.personalInfo.email || 'Not provided'}</p>
            </div>
            <div>
              <h4 className="font-medium">Country</h4>
              <p className="text-muted-foreground">{data.personalInfo.country || 'Not provided'}</p>
            </div>
            <div>
              <h4 className="font-medium">Language</h4>
              <p className="text-muted-foreground">{data.personalInfo.language || 'Not provided'}</p>
            </div>
          </div>

          {isAuditor && data.skillsData && (
            <>
              {data.skillsData.experience && (
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-muted-foreground">
                    {data.skillsData.experience}
                  </p>
                </div>
              )}

              {data.skillsData.specializations && data.skillsData.specializations.length > 0 && (
                <div>
                  <h4 className="font-medium">Specializations</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.skillsData.specializations.slice(0, 5).map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {data.skillsData.specializations.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{data.skillsData.specializations.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {data.skillsData.github && (
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-muted-foreground">{data.skillsData.github}</p>
                </div>
              )}
            </>
          )}

          {!isAuditor && data.projectData && (
            <>
              {data.projectData.projectName && (
                <div>
                  <h4 className="font-medium">Project Name</h4>
                  <p className="text-muted-foreground">{data.projectData.projectName}</p>
                </div>
              )}
              
              {data.projectData.description && (
                <div>
                  <h4 className="font-medium">Project Description</h4>
                  <p className="text-muted-foreground">{data.projectData.description}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {isAuditor ? (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Complete your auditor profile
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Browse available audit requests
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Set up your service offerings
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Start building your reputation
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Complete your project owner profile
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Submit your first audit request
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Browse qualified auditors
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Set up secure escrow payments
                </li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={onComplete} disabled={isSubmitting}>
          {isSubmitting ? 'Setting up your account...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};
