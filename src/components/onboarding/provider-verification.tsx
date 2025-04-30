
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, X, FileCheck, LinkIcon, Github, Globe, Shield, ArrowRight, CircleCheck, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  githubProfile: z.string().url({ message: "Please enter a valid GitHub URL" }).optional().or(z.literal("")),
  websiteUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  pastAudits: z.string().min(10, { message: "Please provide more details about your past audit experience" }),
  ethAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: "Please enter a valid Ethereum address" }).optional().or(z.literal("")),
  certifications: z.string().optional(),
});

interface VerificationStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "in-progress" | "completed" | "failed";
  children?: React.ReactNode;
}

const VerificationStep = ({ title, description, icon, status, children }: VerificationStepProps) => {
  const statusIcons = {
    "pending": <Shield className="h-5 w-5 text-muted-foreground" />,
    "in-progress": <Shield className="h-5 w-5 text-primary animate-pulse" />,
    "completed": <CircleCheck className="h-5 w-5 text-green-500" />,
    "failed": <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  return (
    <div className={`border rounded-lg p-4 ${status === 'in-progress' ? 'border-primary/50 bg-primary/5' : 'border-border'}`}>
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>
          {statusIcons[status]}
        </div>
      </div>
      {children && <div className={`${status === 'in-progress' ? 'block' : 'hidden'}`}>{children}</div>}
    </div>
  );
};

interface ProviderVerificationProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function ProviderVerification({ onComplete, onCancel }: ProviderVerificationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationSteps, setVerificationSteps] = useState([
    { id: 'identity', status: 'in-progress' as const },
    { id: 'credentials', status: 'pending' as const },
    { id: 'experience', status: 'pending' as const },
    { id: 'review', status: 'pending' as const }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubProfile: "",
      websiteUrl: "",
      pastAudits: "",
      ethAddress: "",
      certifications: "",
    },
  });

  const updateStepStatus = (stepId: string, status: 'pending' | 'in-progress' | 'completed' | 'failed') => {
    setVerificationSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const handleStepChange = (stepId: string) => {
    const stepIndex = verificationSteps.findIndex(step => step.id === stepId);
    
    // Complete current step
    updateStepStatus(verificationSteps[currentStep].id, 'completed');
    
    // Set next step as in-progress
    if (stepIndex >= 0 && stepIndex < verificationSteps.length) {
      updateStepStatus(stepId, 'in-progress');
      setCurrentStep(stepIndex);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send the data to your backend
    console.log(values);
    
    // Complete the current step
    updateStepStatus(verificationSteps[currentStep].id, 'completed');
    
    // If this is the last step, call onComplete
    if (currentStep === verificationSteps.length - 1) {
      toast.success("Verification submitted successfully!", {
        description: "We'll review your information and get back to you soon."
      });
      onComplete();
    } else {
      // Move to the next step
      const nextStep = verificationSteps[currentStep + 1];
      updateStepStatus(nextStep.id, 'in-progress');
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Security Provider Verification</CardTitle>
        <CardDescription>
          Complete the verification process to establish your credentials and build trust with potential clients
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
            <Separator className={`w-12 h-1 mx-2 ${currentStep > 0 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
            <Separator className={`w-12 h-1 mx-2 ${currentStep > 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>3</div>
            <Separator className={`w-12 h-1 mx-2 ${currentStep > 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>4</div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Step 1: Identity Verification */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Identity Verification</h3>
                <p className="text-muted-foreground">Provide your personal details to verify your identity</p>
                
                <FormField
                  control={form.control}
                  name="ethAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ethereum Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This address will be used for identity verification and payments
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Step 2: Credentials */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Credentials</h3>
                <p className="text-muted-foreground">Link your professional accounts and websites</p>
                
                <FormField
                  control={form.control}
                  name="githubProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="https://github.com/username" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Link to your GitHub profile with security-related repositories
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal/Company Website</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="https://yourwebsite.com" {...field} />
                        </div>
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
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any relevant certifications (e.g., CISSP, CEH, Web3 Security Expert)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter any certifications relevant to security and blockchain
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Step 3: Experience Verification */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Experience Verification</h3>
                <p className="text-muted-foreground">Provide details about your past security audit experience</p>
                
                <FormField
                  control={form.control}
                  name="pastAudits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Past Audit Experience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your past security audit experience, including projects, findings, and outcomes" 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include links to public audit reports, if available
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="mt-4 p-4 bg-muted/40 rounded-lg">
                  <h4 className="text-sm font-medium flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-primary" />
                    Upload Supporting Documents
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Upload proof of previous audits, certifications, or other relevant documents
                  </p>
                  <Button type="button" variant="outline" className="w-full h-24 border-dashed flex flex-col">
                    <LinkIcon className="h-6 w-6 mb-2" />
                    <span>Click to upload or drag files</span>
                    <span className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 5MB each</span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review & Submit</h3>
                <p className="text-muted-foreground">Review your information before submitting for verification</p>
                
                <div className="space-y-4 mt-4">
                  {form.getValues("ethAddress") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Ethereum Address</span>
                      <span className="text-sm font-medium">{form.getValues("ethAddress")}</span>
                    </div>
                  )}
                  
                  {form.getValues("githubProfile") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">GitHub Profile</span>
                      <a href={form.getValues("githubProfile")} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                        {form.getValues("githubProfile")}
                      </a>
                    </div>
                  )}
                  
                  {form.getValues("websiteUrl") && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Website</span>
                      <a href={form.getValues("websiteUrl")} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                        {form.getValues("websiteUrl")}
                      </a>
                    </div>
                  )}
                  
                  {form.getValues("certifications") && (
                    <div className="border-b pb-2">
                      <span className="text-sm text-muted-foreground">Certifications</span>
                      <p className="text-sm mt-1">{form.getValues("certifications")}</p>
                    </div>
                  )}
                  
                  <div className="border-b pb-2">
                    <span className="text-sm text-muted-foreground">Past Audit Experience</span>
                    <p className="text-sm mt-1">{form.getValues("pastAudits")}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mt-6">
                  <p className="text-sm text-amber-800 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    By submitting this verification request, you agree to our verification process which may include manual review of your credentials. Your information will be handled according to our privacy policy.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  if (currentStep === 0) {
                    onCancel();
                  } else {
                    // Go back to previous step
                    updateStepStatus(verificationSteps[currentStep].id, 'pending');
                    updateStepStatus(verificationSteps[currentStep - 1].id, 'in-progress');
                    setCurrentStep(currentStep - 1);
                  }
                }}
              >
                {currentStep === 0 ? "Cancel" : "Previous"}
              </Button>
              <Button type="submit">
                {currentStep === verificationSteps.length - 1 ? "Submit Verification" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
