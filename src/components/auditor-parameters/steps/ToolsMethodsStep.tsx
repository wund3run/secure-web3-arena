
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface ToolsMethodsStepProps {
  form: UseFormReturn<FormValues>;
  handleArrayToggle: (field: string, value: string) => void;
  securityToolOptions: { value: string; label: string }[];
}

export function ToolsMethodsStep({ form, handleArrayToggle, securityToolOptions }: ToolsMethodsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Tools & Methods</h2>
      </div>
      
      <FormField
        control={form.control}
        name="securityTools"
        render={() => (
          <FormItem>
            <FormLabel>Security Tools Experience</FormLabel>
            <FormDescription>
              Select all security tools you're proficient with
            </FormDescription>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {securityToolOptions.map((option) => {
                const currentValues = form.getValues("securityTools") || [];
                const isSelected = currentValues.includes(option.value);
                
                return (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => handleArrayToggle("securityTools", option.value)}
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
      
      <div className="space-y-4">
        <FormLabel>Auditing Methods</FormLabel>
        <FormDescription>
          Select methods you apply in your auditing process
        </FormDescription>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="staticAnalysis"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Static Analysis</FormLabel>
                  <FormDescription>
                    Code review and static analysis tools
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="formalVerification"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Formal Verification</FormLabel>
                  <FormDescription>
                    Mathematical verification of code properties
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fuzzTesting"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Fuzz Testing</FormLabel>
                  <FormDescription>
                    Finding vulnerabilities with random inputs
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
