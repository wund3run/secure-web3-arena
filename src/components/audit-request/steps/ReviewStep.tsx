
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Edit, Globe, FileCode, Calendar, DollarSign, MessageSquare, Shield } from 'lucide-react';
import type { AuditFormData } from '@/types/audit-request.types';

interface ReviewStepProps {
  formData: AuditFormData;
  prevStep: () => void;
  isSubmitting: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  prevStep,
  isSubmitting
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Review Your Request</h2>
        <p className="text-muted-foreground">
          Please review all details before submitting your audit request
        </p>
      </div>

      <div className="grid gap-6">
        {/* Project Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-medium text-sm text-muted-foreground">Project Name</div>
              <div className="font-semibold">{formData.projectName}</div>
            </div>
            
            <div>
              <div className="font-medium text-sm text-muted-foreground">Description</div>
              <div className="text-sm">{formData.projectDescription}</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-sm text-muted-foreground">Blockchain</div>
                <Badge variant="outline">
                  {formData.blockchain === 'Other' ? formData.customBlockchain : formData.blockchain}
                </Badge>
              </div>
              
              {formData.repositoryUrl && (
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Repository</div>
                  <a 
                    href={formData.repositoryUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View Code Repository
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Technical Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="font-medium text-sm text-muted-foreground">Smart Contracts</div>
                <Badge variant="outline">{formData.contractCount}</Badge>
              </div>
              
              <div>
                <div className="font-medium text-sm text-muted-foreground">Lines of Code</div>
                <Badge variant="outline">{formData.linesOfCode}</Badge>
              </div>
              
              <div>
                <div className="font-medium text-sm text-muted-foreground">Audit Type</div>
                <Badge variant="outline">{formData.specializedAuditType}</Badge>
              </div>
            </div>

            {formData.auditScope && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Audit Scope</div>
                <div className="text-sm">{formData.auditScope}</div>
              </div>
            )}

            {(formData.collaborativeAudit || formData.continuousAuditing || formData.hybridModel) && (
              <div>
                <div className="font-medium text-sm text-muted-foreground">Enhanced Options</div>
                <div className="flex gap-2 flex-wrap">
                  {formData.collaborativeAudit && (
                    <Badge variant="secondary">Collaborative Process</Badge>
                  )}
                  {formData.continuousAuditing && (
                    <Badge variant="secondary">Continuous Monitoring</Badge>
                  )}
                  {formData.hybridModel && (
                    <Badge variant="secondary">Hybrid Model</Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Requirements & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-sm text-muted-foreground">Timeline</div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formData.deadline}
                </Badge>
              </div>
              
              <div>
                <div className="font-medium text-sm text-muted-foreground">Budget</div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formData.budget}
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-sm text-muted-foreground">Communication</div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {formData.preferredCommunication}
                </Badge>
              </div>
              
              <div>
                <div className="font-medium text-sm text-muted-foreground">Accountability</div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {formData.accountabilityPreference}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security History */}
        {(formData.previousAudits || formData.specificConcerns) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security History & Concerns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.previousAudits && (
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Previous Audits</div>
                  <Badge variant="outline">Previously Audited</Badge>
                  {formData.previousAuditLinks && (
                    <div className="text-sm mt-1">{formData.previousAuditLinks}</div>
                  )}
                </div>
              )}
              
              {formData.specificConcerns && (
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Specific Concerns</div>
                  <div className="text-sm">{formData.specificConcerns}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        {(formData.contactName || formData.contactEmail) && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.contactName && (
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Contact Name</div>
                    <div>{formData.contactName}</div>
                  </div>
                )}
                
                {formData.contactEmail && (
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Contact Email</div>
                    <div>{formData.contactEmail}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      <div className="bg-muted/50 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">Ready to Submit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your audit request will be processed by our AI matching system to find the most suitable auditors. 
              You'll receive notifications when auditors show interest in your project.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AI will match you with qualified auditors within 24 hours</li>
              <li>• You'll receive proposals from interested auditors</li>
              <li>• Escrow protection for secure payments</li>
              <li>• Real-time progress tracking and communication</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Request
        </Button>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Audit Request
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
