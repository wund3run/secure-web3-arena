
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, DollarSign, MessageCircle, Shield } from 'lucide-react';
import type { AuditFormData } from '@/types/audit-request.types';

interface RequirementsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof AuditFormData, value: string) => void;
  prevStep: () => void;
  nextStep: () => void;
  formErrors: Record<string, string>;
}

const deadlineOptions = [
  { value: "1-2 weeks", label: "1-2 weeks", description: "Urgent delivery" },
  { value: "3-4 weeks", label: "3-4 weeks", description: "Standard timeline" },
  { value: "1-2 months", label: "1-2 months", description: "Comprehensive audit" },
  { value: "3+ months", label: "3+ months", description: "Complex project" }
];

const budgetOptions = [
  { value: "$5,000 - $10,000", label: "$5,000 - $10,000", description: "Basic audit" },
  { value: "$10,000 - $25,000", label: "$10,000 - $25,000", description: "Standard audit" },
  { value: "$25,000 - $50,000", label: "$25,000 - $50,000", description: "Comprehensive audit" },
  { value: "$50,000+", label: "$50,000+", description: "Enterprise audit" }
];

const auditTypeOptions = [
  { value: "Standard", label: "Standard Audit", description: "Complete security review" },
  { value: "Express", label: "Express Audit", description: "Fast-track for urgent needs" },
  { value: "Comprehensive", label: "Comprehensive Audit", description: "In-depth analysis with additional testing" },
  { value: "Continuous", label: "Continuous Monitoring", description: "Ongoing security assessment" }
];

const communicationOptions = [
  { value: "email", label: "Email", icon: "📧" },
  { value: "slack", label: "Slack", icon: "💬" },
  { value: "discord", label: "Discord", icon: "🎮" },
  { value: "telegram", label: "Telegram", icon: "✈️" }
];

const RequirementsStep: React.FC<RequirementsStepProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  prevStep,
  nextStep,
  formErrors
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Requirements & Preferences</h2>
        <p className="text-muted-foreground">Set your timeline, budget, and communication preferences</p>
      </div>

      {/* Timeline & Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline *
            </CardTitle>
            <CardDescription>When do you need the audit completed?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deadlineOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                    formData.deadline === option.value ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handleSelectChange('deadline', option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              ))}
            </div>
            {formErrors.deadline && (
              <p className="text-sm text-red-500 mt-2">{formErrors.deadline}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget *
            </CardTitle>
            <CardDescription>What's your budget range for this audit?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {budgetOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                    formData.budget === option.value ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handleSelectChange('budget', option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              ))}
            </div>
            {formErrors.budget && (
              <p className="text-sm text-red-500 mt-2">{formErrors.budget}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Audit Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Audit Type
          </CardTitle>
          <CardDescription>Choose the type of audit that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditTypeOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                  formData.specializedAuditType === option.value ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handleSelectChange('specializedAuditType', option.value)}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Communication Preferences
          </CardTitle>
          <CardDescription>How would you like to communicate with auditors?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {communicationOptions.map((option) => (
              <div
                key={option.value}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary text-center ${
                  formData.preferredCommunication === option.value ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handleSelectChange('preferredCommunication', option.value)}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How should auditors contact you?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactName">Full Name</Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={nextStep}>
          Review & Submit
        </Button>
      </div>
    </div>
  );
};

export default RequirementsStep;
