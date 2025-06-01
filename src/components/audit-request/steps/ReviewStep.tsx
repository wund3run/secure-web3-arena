
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock, DollarSign, FileText, Shield, Users } from 'lucide-react';
import type { AuditFormData } from '@/types/audit-request.types';

interface ReviewStepProps {
  formData: AuditFormData;
  prevStep: () => void;
  isSubmitting: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, prevStep, isSubmitting }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Request</h2>
        <p className="text-muted-foreground">Please review all details before submitting your audit request</p>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Project Name</Label>
            <p className="font-medium">{formData.projectName}</p>
          </div>
          <div>
            <Label>Description</Label>
            <p className="text-muted-foreground">{formData.projectDescription}</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Label>Blockchain</Label>
              <Badge variant="secondary">{formData.blockchain}</Badge>
            </div>
            {formData.repositoryUrl && (
              <div>
                <Label>Repository</Label>
                <p className="text-sm text-muted-foreground">Provided</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Technical Scope
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Contracts</Label>
              <p className="font-medium">{formData.contractCount}</p>
            </div>
            <div>
              <Label>Lines of Code</Label>
              <p className="font-medium">{formData.linesOfCode}</p>
            </div>
            <div>
              <Label>Audit Scope</Label>
              <p className="font-medium">{formData.auditScope}</p>
            </div>
            <div>
              <Label>Audit Type</Label>
              <p className="font-medium">{formData.specializedAuditType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Timeline</Label>
              <p className="font-medium">{formData.deadline}</p>
            </div>
            <div>
              <Label>Budget</Label>
              <p className="font-medium">{formData.budget}</p>
            </div>
            <div>
              <Label>Communication</Label>
              <p className="font-medium capitalize">{formData.preferredCommunication}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      {(formData.collaborativeAudit || formData.continuousAuditing || formData.hybridModel) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Additional Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.collaborativeAudit && (
                <Badge variant="outline">Collaborative Audit</Badge>
              )}
              {formData.continuousAuditing && (
                <Badge variant="outline">Continuous Monitoring</Badge>
              )}
              {formData.hybridModel && (
                <Badge variant="outline">AI + Human Hybrid</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Concerns */}
      {formData.specificConcerns && (
        <Card>
          <CardHeader>
            <CardTitle>Security Priorities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{formData.specificConcerns}</p>
          </CardContent>
        </Card>
      )}

      {/* Previous Audits */}
      {formData.previousAudits && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>This project has been audited before</span>
            </div>
            {formData.previousAuditLinks && (
              <p className="text-muted-foreground text-sm">{formData.previousAuditLinks}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submit Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">1</div>
            <div>
              <p className="font-medium">AI Matching</p>
              <p className="text-sm text-muted-foreground">Our AI will match you with the best auditors for your project</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">2</div>
            <div>
              <p className="font-medium">Proposals & Selection</p>
              <p className="text-sm text-muted-foreground">Review proposals from qualified auditors and select your preferred team</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">3</div>
            <div>
              <p className="font-medium">Audit Execution</p>
              <p className="text-sm text-muted-foreground">Work with your chosen auditor through our secure platform</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Audit Request'}
        </Button>
      </div>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-sm font-medium text-muted-foreground">{children}</span>
);

export default ReviewStep;
