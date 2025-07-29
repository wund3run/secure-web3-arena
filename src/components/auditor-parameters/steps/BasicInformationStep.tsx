
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface BasicInformationStepProps {
  form: UseFormReturn<FormValues>;
}

export function BasicInformationStep({ form }: BasicInformationStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Basic Information</h2>
      </div>
      
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} className="bg-background" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="walletAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ethereum Wallet Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} className="bg-background" />
            </FormControl>
            <FormDescription>
              This address will be used for identity verification and payments
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="githubProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Profile (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="personalWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
