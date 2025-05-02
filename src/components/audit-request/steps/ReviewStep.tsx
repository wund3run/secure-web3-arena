
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AuditFormData } from '../AuditRequestForm';

interface ReviewStepProps {
  formData: AuditFormData;
  prevStep: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  prevStep
}) => {
  const formatValue = (key: string, value: any): string => {
    if (value === "" || value === undefined) return "Not provided";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ClipboardCheck className="mr-2 h-5 w-5 text-primary" /> Review Your Information
      </h2>
      
      <div className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-5">
          <h3 className="font-medium text-lg mb-3">Project Details</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Project Name</TableCell>
                <TableCell>{formatValue('projectName', formData.projectName)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Name</TableCell>
                <TableCell>{formatValue('contactName', formData.contactName)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Email</TableCell>
                <TableCell>{formatValue('contactEmail', formData.contactEmail)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Blockchain</TableCell>
                <TableCell>{formatValue('blockchain', formData.blockchain)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Project Description</TableCell>
                <TableCell className="whitespace-pre-wrap">{formatValue('projectDescription', formData.projectDescription)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-5">
          <h3 className="font-medium text-lg mb-3">Technical Information</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Repository URL</TableCell>
                <TableCell>{formatValue('repositoryUrl', formData.repositoryUrl)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Number of Smart Contracts</TableCell>
                <TableCell>{formatValue('contractCount', formData.contractCount)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Approximate Lines of Code</TableCell>
                <TableCell>{formatValue('linesOfCode', formData.linesOfCode)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Previous Audits</TableCell>
                <TableCell>{formData.previousAudits ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Audit Scope</TableCell>
                <TableCell className="whitespace-pre-wrap">{formatValue('auditScope', formData.auditScope)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-5">
          <h3 className="font-medium text-lg mb-3">Requirements</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Budget Range</TableCell>
                <TableCell>{formatValue('budget', formData.budget)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Expected Timeline/Deadline</TableCell>
                <TableCell>{formatValue('deadline', formData.deadline)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Specific Security Concerns</TableCell>
                <TableCell className="whitespace-pre-wrap">{formatValue('specificConcerns', formData.specificConcerns)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6 flex items-start">
        <div className="text-amber-600 mr-3 mt-0.5">
          <ArrowLeft className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-amber-800">Please Review Your Information</h3>
          <p className="text-sm text-amber-700 mt-1">
            Before submitting, please review the information above carefully. You can go back to any previous step to make changes if needed.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          onClick={prevStep}
          variant="outline"
        >
          Back
        </Button>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Submit Audit Request
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
