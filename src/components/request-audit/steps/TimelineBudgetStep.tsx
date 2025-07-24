import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TimelineBudgetFormData {
  deadline?: Date;
  budget?: string;
  urgency?: string;
  contactEmail?: string;
}

interface TimelineBudgetStepProps {
  formData: TimelineBudgetFormData;
  handleInputChange: (field: string, value: unknown) => void;
}

export const TimelineBudgetStep = ({ formData, handleInputChange }: TimelineBudgetStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Timeline & Budget</h3>
        <div className="space-y-4">
          <div>
            <Label>Preferred Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.deadline || undefined}
                  onSelect={(date) => handleInputChange('deadline', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Budget Range</Label>
            <Select value={formData.budget || ''} onValueChange={(value) => handleInputChange('budget', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k+">$50,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Urgency Level</Label>
            <RadioGroup 
              value={formData.urgency || ''} 
              onValueChange={(value) => handleInputChange('urgency', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal">Normal (2-4 weeks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent">Urgent (1-2 weeks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="critical" id="critical" />
                <Label htmlFor="critical">Critical (Rush - 1 week)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="contactEmail">Contact Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="your-email@example.com"
              value={formData.contactEmail || ''}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
