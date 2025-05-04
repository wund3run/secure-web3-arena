
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

// Define form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  companyName: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  experienceYears: z.string().min(1, "Please select your experience level."),
  blockchainExpertise: z.string().array().min(1, "Please select at least one blockchain."),
  specializations: z.string().min(10, "Please describe your specializations."),
  linkedinProfile: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  githubProfile: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  bio: z.string().min(20, "Bio must be at least 20 characters."),
  referral: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ServiceProviderOnboardingFormProps {
  providerType: "auditor" | "service";
}

export function ServiceProviderOnboardingForm({ providerType }: ServiceProviderOnboardingFormProps) {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      website: "",
      experienceYears: "",
      blockchainExpertise: [],
      specializations: "",
      linkedinProfile: "",
      githubProfile: "",
      bio: "",
      referral: "",
    },
  });

  useEffect(() => {
    // Pre-fill form with user data if available
    if (user) {
      supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            form.setValue("fullName", data.full_name || "");
            if (user.email) {
              form.setValue("email", user.email);
            }
          }
        });
    }
  }, [user, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (!user) {
        // If not logged in, create a new user
        await signUp(values.email, "tempPassword123", {
          full_name: values.fullName,
        });
        
        toast.info("Account created", {
          description: "Please check your email to confirm your account before proceeding.",
        });
      } else {
        // User is already logged in, update profile
        const userType = providerType === "auditor" ? "auditor" : "service_provider";
        
        const { error } = await supabase
          .from('extended_profiles')
          .update({
            full_name: values.fullName,
            display_name: values.fullName,
            bio: values.bio,
            website: values.website,
            user_type: userType,
            skills: values.blockchainExpertise,
            specializations: [values.specializations],
            years_of_experience: parseInt(values.experienceYears),
            social_links: {
              linkedin: values.linkedinProfile,
              github: values.githubProfile
            }
          })
          .eq('id', user.id);
        
        if (error) throw error;
        
        navigate('/application-submitted');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting application", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Blockchain options
  const blockchains = [
    "Ethereum",
    "Solana",
    "Polygon",
    "Avalanche",
    "BNB Chain",
    "Arbitrum",
    "Optimism",
    "Aptos",
    "Sui",
    "Other",
  ];

  // Experience levels
  const experienceLevels = [
    { value: "1-2", label: "1-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "6-10", label: "6-10 years" },
    { value: "10+", label: "More than 10 years" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personal Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      {...field} 
                      disabled={!!user}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {providerType === "service" && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave blank if you're applying as an individual
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourwebsite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Professional Information */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Professional Background</h3>

          <FormField
            control={form.control}
            name="experienceYears"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience in Web3 Security *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blockchain Expertise */}
          <div>
            <Label>Blockchain Expertise *</Label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {blockchains.map((blockchain) => (
                <div key={blockchain} className="flex items-start">
                  <input
                    id={`blockchain-${blockchain}`}
                    type="checkbox"
                    className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                    value={blockchain}
                    onChange={(e) => {
                      const value = e.target.value;
                      const current = form.getValues("blockchainExpertise") || [];
                      
                      if (e.target.checked) {
                        form.setValue("blockchainExpertise", [...current, value]);
                      } else {
                        form.setValue(
                          "blockchainExpertise",
                          current.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`blockchain-${blockchain}`}
                    className="ml-2 block text-sm"
                  >
                    {blockchain}
                  </label>
                </div>
              ))}
            </div>
            {form.formState.errors.blockchainExpertise && (
              <p className="text-sm font-medium text-destructive mt-1">
                {form.formState.errors.blockchainExpertise.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="specializations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specializations & Areas of Expertise *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your specializations in Web3 security (e.g., Smart contract auditing, DeFi protocols, ZK proofs, formal verification, etc.)"
                    className="h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Online Profiles */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Online Profiles</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="linkedinProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Bio & Additional Info */}
        <div className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Bio *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself, your background, and why you're interested in joining the Hawkly security network..."
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter referral code if you have one" {...field} />
                </FormControl>
                <FormDescription>
                  Optional: Enter a referral code if you were invited by another member
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
