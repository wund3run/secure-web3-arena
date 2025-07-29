
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, MessageSquare, Clock } from 'lucide-react';
import type { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';

interface RequirementsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof AuditFormData, value: string) => void;
  prevStep: () => void;
  nextStep: () => void;
  formErrors: AuditFormErrors;
}

const deadlineOptions = [
  "1-2 weeks", "2-4 weeks", "1-2 months", "2-3 months", "3+ months", "Flexible"
];

const budgetOptions = [
  "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", 
  "$50,000 - $100,000", "$100,000+", "Custom Budget"
];

const communicationOptions = [
  { value: "email", label: "Email", description: "Traditional email communication" },
  { value: "slack", label: "Slack", description: "Real-time team collaboration" },
  { value: "discord", label: "Discord", description: "Community-focused communication" },
  { value: "telegram", label: "Telegram", description: "Instant messaging" },
  { value: "video-calls", label: "Video Calls", description: "Regular video meetings" }
];

const accountabilityOptions = [
  { value: "standard", label: "Standard Accountability", description: "Regular progress updates and final report" },
  { value: "enhanced", label: "Enhanced Transparency", description: "Daily updates, live dashboards, and detailed logs" },
  { value: "enterprise", label: "Enterprise Grade", description: "Dedicated project manager and SLA guarantees" }
];

export const RequirementsStep: React.FC<RequirementsStepProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  prevStep,
  nextStep,
  formErrors
}) => {
  const isValid = formData.deadline && formData.budget;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Requirements & Preferences</h2>
        <p className="text-muted-foreground">
          Set your timeline, budget, and communication preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Timeline & Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline & Budget
            </CardTitle>
            <CardDescription>
              Specify your project constraints and budget range
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Preferred Timeline *
                </Label>
                <Select 
                  value={formData.deadline} 
                  onValueChange={(value) => handleSelectChange('deadline', value)}
                >
                  <SelectTrigger className={formErrors.deadline ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {deadlineOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.deadline && (
                  <p className="text-sm text-destructive">{formErrors.deadline}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget Range *
                </Label>
                <Select 
                  value={formData.budget} 
                  onValueChange={(value) => handleSelectChange('budget', value)}
                >
                  <SelectTrigger className={formErrors.budget ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.budget && (
                  <p className="text-sm text-destructive">{formErrors.budget}</p>
                )}
              </div>
            </div>

            {formData.budget === "Custom Budget" && (
              <div className="space-y-2">
                <Label htmlFor="customBudget">Custom Budget Amount</Label>
                <Input
                  id="customBudget"
                  name="customBudget"
                  placeholder="Enter your budget (e.g., $75,000)"
                  value={formData.customBudget || ''}
                  onChange={handleChange}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Communication Preferences
            </CardTitle>
            <CardDescription>
              Choose how you'd like to communicate with your auditor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {communicationOptions.map((option) => (
                <div
                  key={option.value}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md
                    ${formData.preferredCommunication === option.value 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handleSelectChange('preferredCommunication', option.value)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    </div>
                    {formData.preferredCommunication === option.value && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accountability Level */}
        <Card>
          <CardHeader>
            <CardTitle>Accountability & Transparency Level</CardTitle>
            <CardDescription>
              Choose the level of oversight and transparency you prefer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {accountabilityOptions.map((option) => (
                <div
                  key={option.value}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md
                    ${formData.accountabilityPreference === option.value 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handleSelectChange('accountabilityPreference', option.value)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    </div>
                    {formData.accountabilityPreference === option.value && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Provide your contact details for auditor communication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  placeholder="Your full name"
                  value={formData.contactName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!isValid} size="lg">
          Continue to Review
        </Button>
      </div>
    </div>
  );
};
