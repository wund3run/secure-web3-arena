
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Clock, DollarSign, FileText, Globe, Mail, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewSubmitStepProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ReviewSubmitStep = ({ formData, onBack, onSubmit, isSubmitting }: ReviewSubmitStepProps) => {
  const formatAuditScope = (scope: string | string[]) => {
    if (Array.isArray(scope)) {
      return scope.map(s => s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ');
    }
    return scope || 'Not specified';
  };

  const getBudgetDisplay = (budget: string) => {
    if (budget === 'flexible') return 'Flexible / Custom Quote';
    return budget;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600';
      case 'urgent': return 'text-orange-600';
      default: return 'text-green-600';
    }
  };

  const getUrgencyDisplay = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'Critical Priority';
      case 'urgent': return 'High Priority';
      default: return 'Normal Priority';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review Your Audit Request</h3>
        <p className="text-muted-foreground mb-6">
          Please review all details carefully before submitting your audit request.
        </p>
      </div>

      <div className="space-y-6">
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
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Project Name</h4>
              <p className="font-medium">{formData.projectName}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
              <p className="text-sm">{formData.projectDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Blockchain</h4>
                <Badge variant="secondary">
                  <Globe className="h-3 w-3 mr-1" />
                  {formData.customBlockchain || formData.blockchain}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Project Type</h4>
                <Badge variant="outline">{formData.projectType}</Badge>
              </div>
            </div>
            {formData.repositoryUrl && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Repository</h4>
                <a href={formData.repositoryUrl} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline text-sm">
                  {formData.repositoryUrl}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Contract Count</h4>
                <p className="font-medium">{formData.contractCount}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Lines of Code</h4>
                <p className="font-medium">{formData.linesOfCode}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Audit Scope</h4>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(formData.auditScope) ? (
                  formData.auditScope.map((scope: string) => (
                    <Badge key={scope} variant="secondary" className="text-xs">
                      {scope.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm">No specific scope selected</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Previous Audits</h4>
              <p className="font-medium capitalize">{formData.previousAudits || 'Not specified'}</p>
            </div>
            {formData.specificConcerns && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Specific Concerns</h4>
                <p className="text-sm">{formData.specificConcerns}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budget & Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget & Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Budget Range</h4>
                <p className="font-medium">{getBudgetDisplay(formData.budget)}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Timeline</h4>
                <p className="font-medium">{formData.deadline}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Priority Level</h4>
              <p className={`font-medium ${getUrgencyColor(formData.urgency)}`}>
                {getUrgencyDisplay(formData.urgency)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Contact Name</h4>
                <p className="font-medium">{formData.contactName}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Email</h4>
                <p className="font-medium">{formData.contactEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <div>
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="text-sm space-y-1">
                <li>• Your request will be reviewed within 2 hours</li>
                <li>• You'll receive matched auditor recommendations</li>
                <li>• You can review profiles and select your preferred auditor</li>
                <li>• Smart escrow contract will be created upon agreement</li>
                <li>• Audit begins with milestone-based progress tracking</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>

        {formData.urgency === 'critical' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Critical Priority:</strong> Our team will contact you within 2 hours to expedite the matching process.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button 
            onClick={onSubmit} 
            className="flex-1 md:flex-none" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Audit Request'}
          </Button>
        </div>
      </div>
    </div>
  );
};
