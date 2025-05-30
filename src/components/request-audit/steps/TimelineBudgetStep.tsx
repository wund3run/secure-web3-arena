
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock, DollarSign, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TimelineBudgetStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  errors?: any;
  onNext: () => void;
  onBack: () => void;
}

const budgetRanges = [
  { value: '$2,500 - $5,000', label: '$2,500 - $5,000', description: 'Small projects, simple contracts' },
  { value: '$5,000 - $10,000', label: '$5,000 - $10,000', description: 'Medium complexity projects' },
  { value: '$10,000 - $25,000', label: '$10,000 - $25,000', description: 'Complex DeFi protocols' },
  { value: '$25,000 - $50,000', label: '$25,000 - $50,000', description: 'Enterprise-grade projects' },
  { value: '$50,000 - $100,000', label: '$50,000 - $100,000', description: 'Large-scale protocols' },
  { value: '$100,000+', label: '$100,000+', description: 'Critical infrastructure' },
  { value: 'flexible', label: 'Flexible / Custom Quote', description: 'Get personalized pricing' }
];

const timelineOptions = [
  { value: '1-2 weeks', label: '1-2 weeks', description: 'Rush delivery', premium: true },
  { value: '2-4 weeks', label: '2-4 weeks', description: 'Standard timeline', premium: false },
  { value: '1-2 months', label: '1-2 months', description: 'Comprehensive review', premium: false },
  { value: '2-3 months', label: '2-3 months', description: 'Complex projects', premium: false },
  { value: 'flexible', label: 'Flexible', description: 'Auditor recommendation', premium: false }
];

export const TimelineBudgetStep = ({ 
  formData, 
  handleInputChange, 
  errors, 
  onNext, 
  onBack 
}: TimelineBudgetStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Timeline & Budget</h3>
        <p className="text-muted-foreground mb-6">
          Set your project timeline and budget to match with available auditors.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget Range *
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetRanges.map((budget) => (
                <div
                  key={budget.value}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    formData.budget === budget.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('budget', budget.value)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{budget.label}</span>
                    {budget.value === 'flexible' && (
                      <Badge variant="outline">Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{budget.description}</p>
                </div>
              ))}
            </div>
            {errors?.budget && (
              <p className="text-red-500 text-sm">{errors.budget}</p>
            )}
            <Alert>
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                <strong>Pricing Note:</strong> Final pricing may vary based on project complexity. These ranges help us match you with auditors in your budget tier.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Preferred Timeline *
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {timelineOptions.map((timeline) => (
                <div
                  key={timeline.value}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    formData.deadline === timeline.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('deadline', timeline.value)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{timeline.label}</span>
                    {timeline.premium && (
                      <Badge variant="secondary">Rush +25%</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{timeline.description}</p>
                </div>
              ))}
            </div>
            {errors?.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline}</p>
            )}
          </CardContent>
        </Card>

        <div>
          <Label className="text-base font-medium">Urgency Level *</Label>
          <p className="text-sm text-muted-foreground mb-3">
            How critical is this audit for your project timeline?
          </p>
          <RadioGroup 
            value={formData.urgency} 
            onValueChange={(value) => handleInputChange('urgency', value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="normal" id="normal" />
              <div className="flex-1">
                <Label htmlFor="normal" className="font-normal">Normal Priority</Label>
                <p className="text-sm text-muted-foreground">Standard audit process, no rush</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="urgent" id="urgent" />
              <div className="flex-1">
                <Label htmlFor="urgent" className="font-normal">High Priority</Label>
                <p className="text-sm text-muted-foreground">Need results quickly, willing to pay premium</p>
              </div>
              <Badge variant="secondary">+15%</Badge>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg border-orange-200 bg-orange-50">
              <RadioGroupItem value="critical" id="critical" />
              <div className="flex-1">
                <Label htmlFor="critical" className="font-normal">Critical Priority</Label>
                <p className="text-sm text-muted-foreground">Emergency audit needed ASAP</p>
              </div>
              <Badge variant="destructive">+30%</Badge>
            </div>
          </RadioGroup>
          {errors?.urgency && (
            <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Contact Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="your-email@example.com"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              className={errors?.contactEmail ? 'border-red-500' : ''}
              required
            />
            {errors?.contactEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              placeholder="Your full name"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className={errors?.contactName ? 'border-red-500' : ''}
              required
            />
            {errors?.contactName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
            )}
          </div>
        </div>

        {formData.urgency === 'critical' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Critical Priority:</strong> Emergency audits may require immediate payment and have limited auditor availability. Our team will contact you within 2 hours to discuss options.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="flex-1 md:flex-none">
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
};
