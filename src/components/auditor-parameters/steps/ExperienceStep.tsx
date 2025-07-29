
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface ExperienceStepProps {
  form: UseFormReturn<FormValues>;
  handleArrayToggle: (field: string, value: string) => void;
  experienceOptions: { value: string; label: string }[];
}

export function ExperienceStep({ form, handleArrayToggle, experienceOptions }: ExperienceStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Experience & Portfolio</h2>
      </div>
      
      <FormField
        control={form.control}
        name="completedAudits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Completed Audits</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                className="bg-background"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="experienceTypes"
        render={() => (
          <FormItem>
            <FormLabel>Types of Projects Audited</FormLabel>
            <FormDescription>
              Select all that apply to your experience
            </FormDescription>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {experienceOptions.map((option) => {
                const currentValues = form.getValues("experienceTypes") || [];
                const isSelected = currentValues.includes(option.value);
                
                return (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => handleArrayToggle("experienceTypes", option.value)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="pastProjects"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notable Past Projects & Findings</FormLabel>
            <FormDescription>
              Describe notable past audits and key findings (public information only)
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="E.g., Discovered critical reentrancy vulnerability in XYZ protocol, Audited ABC DeFi platform..."
                className="min-h-[150px] bg-background"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="certifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certifications & Credentials</FormLabel>
            <FormDescription>
              List relevant security or blockchain certifications
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="E.g., Certified Ethereum Security Specialist, Security+..."
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
