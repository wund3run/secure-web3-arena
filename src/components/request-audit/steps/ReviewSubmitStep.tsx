import React from 'react';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ReviewFormData {
  projectName?: string;
  blockchain?: string;
  projectType?: string;
  auditScope?: string[];
  budget?: string;
  deadline?: Date;
  urgency?: string;
}

interface ReviewSubmitStepProps {
  formData: ReviewFormData;
}

export const ReviewSubmitStep = ({ formData }: ReviewSubmitStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review Your Request</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div>
              <span className="font-medium">Project:</span> {formData.projectName || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Blockchain:</span> {formData.blockchain || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Type:</span> {formData.projectType || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Scope:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.auditScope?.map((scope: string) => (
                  <Badge key={scope} variant="secondary" className="text-xs">
                    {scope}
                  </Badge>
                )) || <span className="text-muted-foreground">Not specified</span>}
              </div>
            </div>
            <div>
              <span className="font-medium">Budget:</span> {formData.budget || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Deadline:</span> {formData.deadline ? format(formData.deadline, "PPP") : "Not specified"}
            </div>
            <div>
              <span className="font-medium">Urgency:</span> {formData.urgency || 'Not specified'}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• We'll review your request within 24 hours</li>
              <li>• You'll receive matched auditor recommendations</li>
              <li>• You can review profiles and select your preferred auditor</li>
              <li>• The audit begins once terms are agreed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
