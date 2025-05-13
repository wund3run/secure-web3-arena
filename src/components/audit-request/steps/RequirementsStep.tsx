
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";
import EnhancedAuditOptions from "./EnhancedAuditOptions";

interface RequirementsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  prevStep: () => void;
  nextStep: () => void;
  formErrors: AuditFormErrors;
}

export default function RequirementsStep({
  formData,
  handleChange,
  handleSelectChange,
  prevStep,
  nextStep,
  formErrors
}: RequirementsStepProps) {
  // Define the checkbox change handler
  const handleCheckboxChange = (name: string, checked: boolean) => {
    const changeEvent = {
      target: {
        name,
        value: checked,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleChange(changeEvent);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Audit Requirements</h2>
        <p className="text-muted-foreground">Specify your audit preferences, timing, and budget.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Timeline & Budget</CardTitle>
          <CardDescription>Define your audit deadline and available budget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deadline">
              Preferred Timeline
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={formErrors.deadline ? "border-red-500" : ""}
            />
            {formErrors.deadline && (
              <p className="text-red-500 text-sm">{formErrors.deadline}</p>
            )}
            <p className="text-sm text-muted-foreground">
              When do you need the audit completed by?
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">
              Budget Range
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="text"
              id="budget"
              name="budget"
              placeholder="e.g. $10,000 - $15,000"
              value={formData.budget}
              onChange={handleChange}
              className={formErrors.budget ? "border-red-500" : ""}
            />
            {formErrors.budget && (
              <p className="text-red-500 text-sm">{formErrors.budget}</p>
            )}
            <p className="text-sm text-muted-foreground">
              What is your budget for this audit?
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audit Scope</CardTitle>
          <CardDescription>Define what should be included in the audit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auditScope">
              Audit Scope
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea
              id="auditScope"
              name="auditScope"
              placeholder="Describe what should be included in the audit..."
              value={formData.auditScope}
              onChange={handleChange}
              rows={4}
              className={formErrors.auditScope ? "border-red-500" : ""}
            />
            {formErrors.auditScope && (
              <p className="text-red-500 text-sm">{formErrors.auditScope}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Specify which parts of your project should be audited.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specificConcerns">
              Specific Security Concerns
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea
              id="specificConcerns"
              name="specificConcerns"
              placeholder="Describe any specific security concerns you have..."
              value={formData.specificConcerns}
              onChange={handleChange}
              rows={3}
              className={formErrors.specificConcerns ? "border-red-500" : ""}
            />
            {formErrors.specificConcerns && (
              <p className="text-red-500 text-sm">{formErrors.specificConcerns}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Are there specific areas of concern you'd like auditors to focus on?
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="previousAudits"
                checked={formData.previousAudits}
                onCheckedChange={(checked) => handleCheckboxChange("previousAudits", checked === true)}
              />
              <Label htmlFor="previousAudits">This project has been audited before</Label>
            </div>
            
            {formData.previousAudits && (
              <div className="space-y-2 mt-2">
                <Label htmlFor="previousAuditLinks">Previous Audit Reports</Label>
                <Input
                  type="text"
                  id="previousAuditLinks"
                  name="previousAuditLinks"
                  placeholder="Links to previous audit reports"
                  value={formData.previousAuditLinks}
                  onChange={handleChange}
                  className={formErrors.previousAuditLinks ? "border-red-500" : ""}
                />
                {formErrors.previousAuditLinks && (
                  <p className="text-red-500 text-sm">{formErrors.previousAuditLinks}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredCommunication">Preferred Communication Method</Label>
            <Select
              value={formData.preferredCommunication || 'email'} 
              onValueChange={(value) => handleSelectChange("preferredCommunication", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How would you like to communicate?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="discord">Discord</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Add our new component here */}
      <EnhancedAuditOptions
        formData={formData}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectChange={handleSelectChange}
        formErrors={formErrors}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between space-x-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
