
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Code, FileCode } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface ExpertiseSkillsStepProps {
  form: UseFormReturn<FormValues>;
  handleArrayToggle: (field: string, value: string) => void;
  expertiseAreas: { value: string; label: string }[];
  blockchainOptions: { value: string; label: string }[];
}

export function ExpertiseSkillsStep({ 
  form, 
  handleArrayToggle, 
  expertiseAreas, 
  blockchainOptions 
}: ExpertiseSkillsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Code className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Expertise & Skills</h2>
      </div>
      
      <FormField
        control={form.control}
        name="yearsExperience"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Years of Experience in Security Auditing</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap gap-4"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="0-1" />
                  </FormControl>
                  <FormLabel className="font-normal">0-1 years</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1-3" />
                  </FormControl>
                  <FormLabel className="font-normal">1-3 years</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="3-5" />
                  </FormControl>
                  <FormLabel className="font-normal">3-5 years</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="5+" />
                  </FormControl>
                  <FormLabel className="font-normal">5+ years</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="primaryExpertise"
        render={() => (
          <FormItem>
            <FormLabel>Primary Areas of Expertise</FormLabel>
            <FormDescription>
              Select all areas where you have significant experience
            </FormDescription>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {expertiseAreas.map((option) => {
                const currentValues = form.getValues("primaryExpertise") || [];
                const isSelected = currentValues.includes(option.value);
                
                return (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => handleArrayToggle("primaryExpertise", option.value)}
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
        name="blockchainExpertise"
        render={() => (
          <FormItem>
            <FormLabel>Blockchain Experience</FormLabel>
            <FormDescription>
              Select all blockchain platforms you're experienced with
            </FormDescription>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {blockchainOptions.map((option) => {
                const currentValues = form.getValues("blockchainExpertise") || [];
                const isSelected = currentValues.includes(option.value);
                
                return (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-background hover:bg-muted"
                    }`}
                    onClick={() => handleArrayToggle("blockchainExpertise", option.value)}
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
        <div>
          <FormLabel>Programming Language Proficiency</FormLabel>
          <FormDescription>Rate your proficiency level from 0-10</FormDescription>
        </div>
        
        <FormField
          control={form.control}
          name="solidity"
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4 space-y-1">
              <div className="flex justify-between mb-1">
                <FormLabel className="flex items-center">
                  <FileCode className="h-4 w-4 mr-1" />
                  Solidity
                </FormLabel>
                <span className="text-sm font-medium">{value}/10</span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rust"
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4 space-y-1">
              <div className="flex justify-between mb-1">
                <FormLabel className="flex items-center">
                  <FileCode className="h-4 w-4 mr-1" />
                  Rust
                </FormLabel>
                <span className="text-sm font-medium">{value}/10</span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="vyper"
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4 space-y-1">
              <div className="flex justify-between mb-1">
                <FormLabel className="flex items-center">
                  <FileCode className="h-4 w-4 mr-1" />
                  Vyper
                </FormLabel>
                <span className="text-sm font-medium">{value}/10</span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
