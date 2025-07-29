
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface PreferencesStepProps {
  form: UseFormReturn<FormValues>;
}

export function PreferencesStep({ form }: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Availability & Preferences</h2>
      </div>
      
      <FormField
        control={form.control}
        name="responseTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Typical Response Time</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select your typical response time" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="24h">Within 24 hours</SelectItem>
                <SelectItem value="48h">Within 48 hours</SelectItem>
                <SelectItem value="72h">Within 72 hours</SelectItem>
                <SelectItem value="1week">Within 1 week</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              This helps clients understand when to expect a response
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="availability"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Availability</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap gap-4"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="full-time" />
                  </FormControl>
                  <FormLabel className="font-normal">Full-time</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="part-time" />
                  </FormControl>
                  <FormLabel className="font-normal">Part-time</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="weekends" />
                  </FormControl>
                  <FormLabel className="font-normal">Weekends</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="variable" />
                  </FormControl>
                  <FormLabel className="font-normal">Variable</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="projectPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Preferences (Optional)</FormLabel>
            <FormDescription>
              Describe any specific project types you prefer to work with
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="E.g., I prefer DeFi protocols, NFT marketplaces..."
                className="min-h-[100px] bg-background"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="specializedCredentials"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information (Optional)</FormLabel>
            <FormDescription>
              Anything else that might help match you with the right projects
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Additional expertise, languages spoken, preferred working methods..."
                className="min-h-[100px] bg-background"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
